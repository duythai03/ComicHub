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
	handleNetworkError,
	handleNetworkUnavailable,
	isNetworkAvailable,
} from "./retryRequest";

let isRefreshing = false;
let refreshSubscribers = [];
let requestQueue = [];

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
function handleTokenRefreshing(config, abortController, url) {
	return new Promise((resolve) => {
		addRequestToQueue((newAccessToken) => {
			if (newAccessToken) {
				console.log(
					`Token refreshed. Retrying request with new token for request uri ${url}`,
				);
				resolve(getBearerTokenConfig(newAccessToken, config));
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

privateRequest.interceptors.request.use(
	async (config) => {
		const url = config.url;
		const abortController = new AbortController();

		if (!isNetworkAvailable()) {
			return handleNetworkUnavailable(config);
		} else if (isRefreshing) {
			console.log(
				`Refresh token in progress. Adding request with uri ${url} to queue`,
			);
			return handleTokenRefreshing(config, abortController, url);
		}

		const accessToken = await AppAsyncStorage.getItem(StorageKey.ACCESS_TOKEN);
		if (accessToken) {
			return getBearerTokenConfig(accessToken, config);
		}
		abortController.abort();
		return { ...config, signal: abortController.signal };
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
