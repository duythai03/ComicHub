import axios, { HttpStatusCode } from "axios";
import AppAsyncStorage from "../AppAsyncStorage";
import { ENDPOINT } from "@/constants/Endpoint";
import { StorageKey } from "@/constants/AppProperties";
import { refreshToken } from "./utils";
import publicRequest from "./publicRequest";
import Toast from "react-native-toast-message";
import { navigate } from "@/navigation/utils";

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

			const newAccessToken = await refreshToken();

			if (newAccessToken) {
				config.headers = {
					...config.headers,
					Authorization: `Bearer ${newAccessToken}`,
				};
				return publicRequest(config);
			}

			// logout without sending the refresh token back to server
			navigate("LoginScreen", {
				screen: "LoginScreen",
				purpose: "session-expired",
			});

			Toast.show({
				type: "error",
				text1: "Session expired",
				text2: "Please login again",
			});
			return Promise.reject(error);
		}
		return Promise.reject(error);
	},
);

export default privateRequest;
