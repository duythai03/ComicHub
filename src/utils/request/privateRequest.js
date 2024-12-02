import axios, { HttpStatusCode } from "axios";
import AppAsyncStorage from "../AppAsyncStorage";
import { ENDPOINT } from "@/constants/Endpoint";
import { StorageKey } from "@/constants/AppProperties";
import {
	clearToken,
	getBearerTokenConfig,
	navigateToLogin,
	NotLoggedInError,
	refreshToken,
} from "./utils";
import publicRequest from "./publicRequest";
import { checkLoginBeforeRequest } from "./methods";
import Toast from "react-native-toast-message";
import { EventName } from "@/constants/EventName";
import { emitEvent } from "../event";
import {
	addRequestToRetryQueue,
	handleNetworkError,
	isNetworkAvailable,
} from "./retryRequest";

let isRefreshing = false;
let requestQueue = [];
let refreshSubscribers = [];

const privateRequest = axios.create({
	baseURL: ENDPOINT.BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * Adds a callback to the refresh subscribers queue.
 * @param {Function} callback - Function to execute after refresh.
 */
function addRefreshSubscriber(callback) {
	refreshSubscribers.push(callback);
}

/**
 * Adds a request to the request queue to retry after refresh.
 * @param {Function} callback - Function to execute with new token or error.
 */
function addRequestToQueue(callback) {
	requestQueue.push(callback);
}

/**
 * Processes all refresh subscribers with the new token or an error.
 * @param {string|null} newAccessToken - The refreshed token or null on failure.
 * @param {Error|null} error - Error if the refresh failed.
 */
function processRefreshSubscribers(newAccessToken, error) {
	refreshSubscribers.forEach((callback) => callback(newAccessToken, error));
	refreshSubscribers = [];
}

/**
 * Processes all queued requests with the new token or an error.
 * @param {string|null} newAccessToken - The refreshed token or null on failure.
 * @param {Error|null} error - Error if the refresh failed.
 */
function processRequestQueue(newAccessToken, error) {
	requestQueue.forEach((callback) => callback(newAccessToken, error));
	requestQueue = [];
}

/**
 *  Handles token refreshing by adding the request to the queue.
 *
 *  @param {Object} config - Axios request configuration.
 *  @param {AbortController} abortController - Abort controller for the request.
 *  @param {string} url - Request URI.
 *  @returns {Promise} Promise that resolves with the updated request configuration.
 *  */
async function handleAccessTokenRefreshing(config, abortController) {
	return new Promise((resolve) => {
		addRequestToQueue((newAccessToken) => {
			const url = config.url;
			if (newAccessToken) {
				console.log(
					`Token refreshed. Retrying request with new token for request uri ${url}`,
				);
				resolve(getBearerTokenConfig(newAccessToken, config));
			} else if (config._optional_jwt_auth) {
				console.log(
					`Token refresh failed but jwt auth is optional. Proceeding with request without token for request uri ${url}`,
				);
				return config;
			} else {
				console.log(
					`Token refresh failed. Rejecting request for request uri ${url}`,
				);
				abortController.abort();
				resolve({
					...config,
					signal: abortController.signal,
				});
			}
		});
	});
}

/**
 * Returns the request configuration with the bearer token.
 *
 *  @param {Object} config - Axios request configuration.
 *  @param {AbortController} abortController  - Abort controller for the request.
 *
 *  @returns {Promise}
 * */
async function getBearerAccessTokenConfig(config, abortController) {
	// lock the request until the token is refreshed
	if (isRefreshing) {
		console.log(
			`Refresh token in progress. Adding request with uri ${url} to queue`,
		);
		return handleAccessTokenRefreshing(config);
	}

	const accessToken = await AppAsyncStorage.getItem(StorageKey.ACCESS_TOKEN);
	if (accessToken) {
		return getBearerTokenConfig(accessToken, config);
	} else if (config._optional_jwt_auth) {
		return config;
	}
	abortController.abort("No access token found");
	return { ...config, signal: abortController.signal };
}

/**
 * Handle network unavailable
 * @param {import("T/axios-extends").AxiosRequestConfigExtends} config
 * @param {AbortController} abortController
 * @returns {Promise} Promise
 */
async function handleNetworkUnavailable(config, abortController) {
	if (config._skip_no_network_retry) {
		return getBearerAccessTokenConfig(config, abortController);
	}

	console.log(
		"Network unavailable. Adding request to retry queue for request uri",
		config.url,
	);

	// check again if network is available to avoid network is available but retryQueue is not processed
	if (isNetworkAvailable()) return getBearerAccessTokenConfig();
	return new Promise((resolve) => {
		const retry = async function () {
			console.log(
				"Netwoek available. Retrying request for request uri",
				config.url,
			);
			const valid_config = await getBearerAccessTokenConfig(
				config,
				abortController,
			);
			resolve(valid_config);
		};
		addRequestToRetryQueue(retry);
	});
}

privateRequest.interceptors.request.use(
	async (config) => {
		const abortController = new AbortController();
		if (!isNetworkAvailable()) {
			return handleNetworkUnavailable(config, abortController);
		}
		return getBearerAccessTokenConfig(config, abortController);
	},
	(error) => Promise.reject(error),
);

/**
 * Xử lý lỗi khi refresh token không thành công.
 */
function handleRefreshError(refreshError, config) {
	switch (refreshError.status) {
		case HttpStatusCode.Unauthorized:
			clearToken();
			emitEvent(EventName.LOGOUT);
			if (config._navigate_to_login_if_unauthorized) {
				navigateToLogin();
			}
			break;
		case HttpStatusCode.Forbidden:
			Toast.show({
				type: "error",
				text1: "Forbidden",
				text2: "You don't have permission to access this resource",
			});
			break;
		default:
			break;
	}
}

/**
 * Waits for the token to be refreshed before retrying the request.
 * @param {Object} config - Axios request configuration.
 *
 * @returns {Promise} Promise that resolves with the response or rejects with an error.
 */
function waitForTokenRefresh(config) {
	const { url } = config;
	return new Promise((resolve, reject) => {
		addRefreshSubscriber((newAccessToken, error) => {
			if (newAccessToken) {
				console.log(
					`Token refreshed. Retrying request with new token for request uri ${url}`,
				);
				resolve(publicRequest(getBearerTokenConfig(newAccessToken, config)));
			} else {
				console.log(
					`Token refresh failed. Rejecting request for request uri ${url}`,
				);
				reject(error || NotLoggedInError());
			}
		});
	});
}

privateRequest.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const config = error?.config;
		if (error.message === "Network Error") {
			return handleNetworkError(refreshError, config, privateRequest);
		}

		if (
			error?.response?.status === HttpStatusCode.Unauthorized &&
			!config?.sent
		) {
			config.sent = true;

			if (!isRefreshing) {
				// If we're not refreshing the token, initiate a refresh
				isRefreshing = true;
				try {
					console.log("Attempting to refresh token...");
					const newAccessToken = await refreshToken();
					isRefreshing = false;

					// Notify all subscribers and retry queued requests
					processRefreshSubscribers(newAccessToken, null);
					processRequestQueue(newAccessToken, null);

					return publicRequest(getBearerTokenConfig(newAccessToken, config));
				} catch (error) {
					console.log("Error refreshing token:", error.status);
					// Notify all subscribers and retry queued requests
					processRefreshSubscribers(null, error);
					processRequestQueue(null, error);

					handleRefreshError(error, config);
				}
			}

			console.log("Access token is still being refreshed...");
			// Nếu token đang được refresh, chờ đến khi hoàn thành và retry request
			return waitForTokenRefresh(config);
		}
		return Promise.reject(error);
	},
);

checkLoginBeforeRequest(privateRequest);

export default privateRequest;
