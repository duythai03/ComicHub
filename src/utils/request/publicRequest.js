import { ENDPOINT } from "@/constants/Endpoint";
import axios from "axios";
import {
	handleNetworkError,
	handleNetworkUnavailable,
	isNetworkAvailable,
} from "./retryRequest";

const publicRequest = axios.create({
	baseURL: ENDPOINT.BASE_URL,
	headers: {
		"Content-Type": "application/json",
	},
});

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
