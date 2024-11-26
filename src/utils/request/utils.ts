import { StorageKey } from "@/constants/AppProperties";
import AppAsyncStorage from "../AppAsyncStorage";
import { ENDPOINT } from "@/constants/Endpoint";
import publicRequest from "./publicRequest";
import { HttpStatusCode } from "axios";
import { navigate } from "@/navigation/utils";
import { ScreenName } from "@/constants/ScreenName";
import Toast, { ToastShowParams } from "react-native-toast-message";

export async function saveToken(
	accessToken: string,
	refreshToken: string,
): Promise<void> {
	await AppAsyncStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
	await AppAsyncStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
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

export async function clearToken(): Promise<void> {
	await AppAsyncStorage.removeItem(StorageKey.ACCESS_TOKEN);
	await AppAsyncStorage.removeItem(StorageKey.REFRESH_TOKEN);
}

export async function refreshToken(): Promise<string | null> {
	console.log("System has auto requested a new access token !!!");

	const refreshToken = await AppAsyncStorage.getItem(StorageKey.REFRESH_TOKEN);

	if (!refreshToken) {
		console.log("No refresh token found when trying to refresh accessToken");
		return null;
	}

	const config = {
		headers: {
			Authorization: `Bearer ${refreshToken}`,
		},
	};

	try {
		const response = await publicRequest.post(
			ENDPOINT.REFRESH_TOKEN_V1,
			null,
			config,
		);

		const { accessToken, refreshToken } = response.data.accessToken;

		await saveToken(accessToken, refreshToken);

		return accessToken;
	} catch (error: any) {
		console.log(
			"Error refreshing accessToken when trying to refresh accessToken",
		);
		console.log("Details: ", error);

		const statusCode = error?.status;
		switch (statusCode) {
			case HttpStatusCode.Unauthorized:
				await clearToken();
				break;
			default:
		}
		return Promise.reject(error);
	}
}
