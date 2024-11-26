import axios, { HttpStatusCode } from "axios";
import AppAsyncStorage from "../AppAsyncStorage";
import { ENDPOINT } from "@/constants/Endpoint";
import { StorageKey } from "@/constants/AppProperties";
import { navigateToLogin, refreshToken } from "./utils";
import publicRequest from "./publicRequest";

const privateRequest = axios.create({
	baseURL: ENDPOINT.BASE_URL_V1,
	headers: {
		"Content-Type": "application/json",
	},
});

privateRequest.interceptors.request.use(
	async (config) => {
		const accessToken = await AppAsyncStorage.getItem(StorageKey.ACCESS_TOKEN);
		if (accessToken) {
			config.headers = {
				...config.headers,
				Authorization: `Bearer ${accessToken}`,
			};
			return config;
		}
		console.log("You are not logged in");
		return Promise.reject("You are not logged in");
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

			try {
				const newAccessToken = await refreshToken();
				if (newAccessToken) {
					config.headers = {
						...config.headers,
						Authorization: `Bearer ${newAccessToken}`,
					};
					return publicRequest(config);
				}
				navigateToLogin();
			} catch (error) {
				const statusCode = error?.status;
				switch (statusCode) {
					case HttpStatusCode.Unauthorized:
						navigateToLogin();
						break;
					default:
				}
			}
			return Promise.reject(error);
		}
		return Promise.reject(error);
	},
);

export default privateRequest;
