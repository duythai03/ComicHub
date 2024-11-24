import { ENDPOINT } from "@/constants/Endpoint";
import publicRequest from "@/utils/request/publicRequest";
import { saveToken } from "@/utils/request/utils";
import { HttpStatusCode } from "axios";

export async function login(
	requestBody: {
		username: string;
		password: string;
	},
	handleErrors: (statusCode: HttpStatusCode, error: any) => void,
) {
	try {
		const response = await publicRequest.post(ENDPOINT.LOGIN_V1, requestBody);
		const { data } = response;
		const { accessToken, refreshToken } = data.jwt;
		saveToken(accessToken, refreshToken);
		return data;
	} catch (error: any) {
		console.log(error);
		handleErrors(error.status, error);
	}
}

export async function register(
	requestBody: {
		username: string;
		password: string;
		name: string;
	},
	handleErrors: (statusCode: HttpStatusCode, error: any) => void,
) {
	try {
		const response = await publicRequest.post(
			ENDPOINT.REGISTER_V1,
			requestBody,
		);
		const { data } = response;
		return data;
	} catch (error: any) {
		console.log("Login unsuccessful with status code: ", error.status);
		handleErrors(error.status, error);
	}
	return {};
}

export async function logout() {}
