import NetInfo from "@react-native-community/netinfo";
import { AxiosError } from "axios";

let retryQueue = [];
let networkAvailable = true;

export const isNetworkAvailable = () => networkAvailable;

export const addRequestToRetryQueue = (callback) => {
	retryQueue.push(callback);
};

const processRetryQueue = (...args) => {
	retryQueue.forEach((callback) => callback(...args));
	retryQueue = [];
};

NetInfo.addEventListener((state) => {
	networkAvailable = state.isInternetReachable;

	console.log(
		`Network Available: ${networkAvailable} - Retry Queue Length: ${retryQueue.length}`,
	);

	if (retryQueue.length > 0 && networkAvailable) {
		processRetryQueue();
	}
});

/**
 * Handle network unavailable
 * @param {import("T/axios-extends").AxiosRequestConfigExtends} config
 * @returns {Promise} Promise
 */
export function handleNetworkUnavailable(config) {
	if (config._skip_no_network_retry) {
		return config;
	}
	console.log(
		"Network unavailable. Adding request to retry queue for request uri",
		config.url,
	);
	return new Promise((resolve) => {
		addRequestToRetryQueue(() => {
			console.log(
				"Netwoek available. Retrying request for request uri",
				config.url,
			);
			resolve(config);
		});
	});
}

/**
 * Handle network unavailable
 * @param {AxiosError} error
 * @param {import("T/axios-extends").AxiosRequestConfigExtends} config
 * @param {import("axios").AxiosInstance} requestInstance
 * @returns {Promise} Promise
 */
export function handleNetworkError(error, config, requestInstance) {
	if (config._skip_no_network_retry) {
		return Promise.reject(error);
	} else if (!isNetworkAvailable()) {
		console.log(
			"Network unavailable. Adding request to retry queue for request uri",
			config.url,
		);
		addRequestToRetryQueue(() => {
			console.log(
				"Network available. Retrying request for request uri",
				config.url,
			);
			requestInstance(config);
		});
	}
	return Promise.reject(error);
}
