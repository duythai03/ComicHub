import { StorageKey } from "@/constants/AppProperties";
import AppAsyncStorage from "../AppAsyncStorage";
import { ENDPOINT } from "@/constants/Endpoint";
import { AxiosError, HttpStatusCode, InternalAxiosRequestConfig } from "axios";
import { ScreenName } from "@/constants/ScreenName";
import Toast, { ToastShowParams } from "react-native-toast-message";
import { navigate } from "@/navigation/utils";
import publicRequest from "./publicRequest";
import { AxiosRequestConfigExtends } from "T/axios-extends";

export async function getAccessToken(): Promise<string | null> {
	return AppAsyncStorage.getItem(StorageKey.ACCESS_TOKEN);
}

export async function getRefreshToken(): Promise<string | null> {
	return AppAsyncStorage.getItem(StorageKey.REFRESH_TOKEN);
}

export async function saveAccessToken(accessToken: string): Promise<void> {
	await AppAsyncStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
}

export async function saveRefreshToken(refreshToken: string): Promise<void> {
	await AppAsyncStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
}

export async function removeAccessToken(): Promise<void> {
	await AppAsyncStorage.removeItem(StorageKey.ACCESS_TOKEN);
}

export async function removeRefreshToken(): Promise<void> {
	await AppAsyncStorage.removeItem(StorageKey.REFRESH_TOKEN);
}

export async function clearToken(): Promise<void> {
	await Promise.all([removeAccessToken(), removeRefreshToken()]);
}

export async function saveToken(
	accessToken: string,
	refreshToken: string,
): Promise<void> {
	await Promise.all([
		saveAccessToken(accessToken),
		saveRefreshToken(refreshToken),
	]);
}

export function navigateToLogin(
	params: object = {
		screen: ScreenName.LOGIN,
		purpose: "session-expired",
	},
	toastParams: ToastShowParams = {
		type: "error",
		text1: "Session expired",
		text2: "Please login again",
	},
): void {
	// logout without sending the refresh token back to server
	navigate(ScreenName.LOGIN, params);

	Toast.show(toastParams);
}

export function NotLoggedInError(
	config?: InternalAxiosRequestConfig<any>,
	request?: any,
): AxiosError {
	return new AxiosError(
		"You are not logged in",
		HttpStatusCode.Unauthorized.toString(),
		config,
		request,
		{
			data: {},
			status: HttpStatusCode.Unauthorized,
			statusText: "You are not logged in",
			headers: null as any,
			config: null as any,
		},
	);
}

export function getBearerTokenConfig(
	token: string,
	config?: AxiosRequestConfigExtends,
) {
	return {
		...config,
		headers: {
			...config?.headers,
			Authorization: `Bearer ${token}`,
		},
	};
}

export async function refreshToken() {
	console.log("System has auto requested a new access token !!!");
	const refreshToken = await AppAsyncStorage.getItem(StorageKey.REFRESH_TOKEN);
	if (!refreshToken) {
		console.log("No refresh token found when trying to refresh accessToken");
		return Promise.reject(NotLoggedInError());
	}
	try {
		const response = await publicRequest.post(
			ENDPOINT.REFRESH_TOKEN_V1,
			null,
			getBearerTokenConfig(refreshToken),
		);

		if (!response) {
			return Promise.reject(NotLoggedInError());
		}

		const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
			response.data;

		await saveToken(newAccessToken, newRefreshToken);

		console.log("New access token has been saved !!!" + newAccessToken);
		return newAccessToken;
	} catch (error) {
		console.log(
			"Error refreshing accessToken when trying to refresh accessToken. Details: " +
				error,
		);
		return Promise.reject(error);
	}
}
