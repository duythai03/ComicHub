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
import { emitEvent } from "@/components/event";
import { EventName } from "@/constants/EventName";

let isRefreshing = false;
let refreshSubscribers = [];
let requestQueue = [];

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

const privateRequest = axios.create({
	baseURL: ENDPOINT.BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

privateRequest.interceptors.request.use(
	async (config) => {
		// synchronous function to get the access token
		if (isRefreshing) {
			console.log("Refresh token in progress. Adding request to queue.");
			return new Promise((resolve, reject) => {
				addRequestToQueue((newAccessToken, error) => {
					if (newAccessToken) {
						console.log("Token refreshed. Retrying request...");
						resolve(getBearerTokenConfig(newAccessToken, config));
					} else {
						console.log("Token refresh failed. Rejecting request...");
						reject(error || NotLoggedInError());
					}
				});
			});
		}

		const accessToken = await AppAsyncStorage.getItem(StorageKey.ACCESS_TOKEN);

		if (accessToken) {
			return getBearerTokenConfig(accessToken, config);
		}

		return config;
	},
	(error) => Promise.reject(error),
);

privateRequest.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const config = error?.config;

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
					processRefreshSubscribers(null, error);
					processRequestQueue(null, error);
					switch (error.status) {
						case HttpStatusCode.Unauthorized:
							clearToken();
							emitEvent(EventName.LOGOUT);
							if (config.navigateToLogin) {
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
					}
				}
			}

			console.log("Access token is still being refreshed...");
			// If the token is still being refreshed, wait for it to complete and retry the request
			return new Promise((resolve, reject) => {
				addRefreshSubscriber((newAccessToken, error) => {
					if (newAccessToken) {
						console.log("Token refreshed. Retrying request...");
						return resolve(
							publicRequest(getBearerTokenConfig(newAccessToken, config)),
						);
					} else {
						console.log("Token refresh failed. Rejecting request...");
						return reject(error || NotLoggedInError());
					}
				});
			});
		}
		return Promise.reject(error);
	},
);

checkLoginBeforeRequest(privateRequest);

export default privateRequest;
