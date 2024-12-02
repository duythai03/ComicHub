import { ENDPOINT } from "@/constants/Endpoint";
import axios from "axios";
import { handleNetworkError, isNetworkAvailable } from "./retryRequest";

const publicRequest = axios.create({
	baseURL: ENDPOINT.BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

/**
 * Handle network unavailable
 * @param {import("T/axios-extends").AxiosRequestConfigExtends} config
 * @returns {Promise} Promise
 */
async function handleNetworkUnavailable(config) {
	if (config._skip_no_network_retry) {
		return config;
	}
	console.log(
		"Network unavailable. Adding request to retry queue for request uri",
		config.url,
	);
	if (isNetworkAvailable()) return config;
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

publicRequest.interceptors.request.use(
	async (config) => {
		if (!isNetworkAvailable()) {
			return handleNetworkUnavailable(config);
		}
		return config;
	},
	(error) => Promise.reject(error),
);

publicRequest.interceptors.response.use(
	(response) => {
		return response;
	},
	async (error) => {
		const config = error?.config;
		if (error.message === "Network Error") {
			return handleNetworkError(error, config, publicRequest);
		}
		return Promise.reject(error);
	},
);

export default publicRequest;
