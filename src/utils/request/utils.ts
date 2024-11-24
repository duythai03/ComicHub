import { StorageKey } from "@/constants/AppProperties";
import AppAsyncStorage from "../AppAsyncStorage";
import { ENDPOINT } from "@/constants/Endpoint";
import publicRequest from "./publicRequest";

export async function saveToken(
	accessToken: string,
	refreshToken: string,
): Promise<void> {
	await AppAsyncStorage.setItem(StorageKey.ACCESS_TOKEN, accessToken);
	await AppAsyncStorage.setItem(StorageKey.REFRESH_TOKEN, refreshToken);
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
			ENDPOINT.REFRESH_TOKEN,
			null,
			config,
		);

		const { accessToken, refreshToken } = response.data.accessToken;

		// make sure that token already saved before return
		// await saveToken(accessToken, refreshToken);

		saveToken(accessToken, refreshToken);

		return accessToken;
	} catch (error) {
		console.log(
			"Error refreshing accessToken when trying to refresh accessToken",
		);
		console.log("Details: ", error);
		return null;
	}
}
