import { ENDPOINT } from "@/constants/Endpoint";
import publicRequest from "@/utils/request/publicRequest";
import {
	clearToken,
	getBearerTokenConfig,
	getRefreshToken,
	saveToken,
} from "@/utils/request/utils";
import { AxiosResponse, HttpStatusCode } from "axios";
import { ErrorHandler, SuccessHandler } from "./types";
import AppAsyncStorage from "@/utils/AppAsyncStorage";
import { StorageKey } from "@/constants/AppProperties";
import { EventName } from "@/constants/EventName";
import { emitEvent } from "@/utils/event";
import { AxiosRequestConfigExtends } from "T/axios-extends";

export async function userAlreadyLoggedIn() {
	const [accessToken, refreshToken] = await Promise.all([
		AppAsyncStorage.getItem(StorageKey.ACCESS_TOKEN),
		AppAsyncStorage.getItem(StorageKey.REFRESH_TOKEN),
	]);

	// Kiểm tra nếu cả accessToken và refreshToken đều khác null
	return accessToken !== null && refreshToken !== null;
}

export async function login(
	requestBody: {
		username: string;
		password: string;
	},

	/**
	 * This function will be called after the response is received and the status code is not 200
	 *
	 * @param statusCode - The status code of the response
	 * @param error - The error object of the response
	 */
	onError: ErrorHandler,

	/**
	 *
	 * This function will be called after the response is received and the status code is 200
	 * If the function returns false, the function will not do anything default logic after get the response
	 *
	 * @param statusCode - The status code of the response
	 * @param data - The data of the response
	 * @returns - Bollean value, if false, the function will not do anything default logic
	 * after
	 * get the response
	 */
	onSuccess?: SuccessHandler,

	config?: AxiosRequestConfigExtends,
) {
	try {
		config = {
			...config,
			_skip_no_network_retry: true,
		};

		const response: AxiosResponse = await publicRequest.post(
			ENDPOINT.LOGIN_V1,
			requestBody,
			config,
		);
		const { data, status } = response;
		if (onSuccess && !onSuccess(status, response)) {
			return;
		}
		if (status === HttpStatusCode.Ok) {
			const { accessToken, refreshToken } = data.jwt;
			saveToken(accessToken, refreshToken);
			return data;
		}
		return {};
	} catch (error: any) {
		console.log(
			"Login unsuccessful " + error + " with status code: ",
			error.status,
		);
		return onError(error.status, error);
	}
}

export async function register(
	requestBody: {
		username: string;
		password: string;
		name: string;
	},
	/**
	 * This function will be called after the response is received and the status code is not 200
	 *
	 * @param statusCode - The status code of the response
	 * @param error - The error object of the response
	 */
	onError: ErrorHandler,

	/**
	 *
	 * This function will be called after the response is received and the status code is 200
	 * If the function returns false, the function will not do anything default logic after get the response
	 *
	 * @param statusCode - The status code of the response
	 * @param data - The data of the response
	 * @returns - Bollean value, if false, the function will not do anything default logic
	 * after
	 * get the response
	 */
	onSuccess?: SuccessHandler,

	// Optional config for axios
	config?: AxiosRequestConfigExtends,
) {
	try {
		const response: AxiosResponse = await publicRequest.post(
			ENDPOINT.REGISTER_V1,
			requestBody,
			config,
		);
		const { data, status } = response;
		if (onSuccess && !onSuccess(status, response)) {
			return;
		}
		return data;
	} catch (error: any) {
		console.log(
			"Register unsuccessful " + error + " with status code: ",
			error.status,
		);
		return onError(error.status, error);
	}
}

export async function logout(
	/**
	 * This function will be called after the response is received and the status code is not 200
	 *
	 * @param statusCode - The status code of the response
	 * @param error - The error object of the response
	 */
	onError: ErrorHandler,

	/**
	 *
	 * This function will be called after the response is received and the status code is 200
	 * If the function returns false, the function will not do anything default logic after get the response
	 *
	 * @param statusCode - The status code of the response
	 * @param data - The data of the response
	 * @returns - Bollean value, if false, the function will not do anything default logic
	 * after
	 * get the response
	 */
	onSuccess?: SuccessHandler,

	// Optional config for axios
	config?: AxiosRequestConfigExtends,
) {
	try {
		const refreshToken = await getRefreshToken();

		if (!refreshToken) return;

		const response: AxiosResponse = await publicRequest.post(
			ENDPOINT.LOGOUT_V1,
			{},
			getBearerTokenConfig(refreshToken, {
				...config,
				_skip_no_network_retry: true,
			}),
		);
		const { status } = response;
		await clearToken();
		emitEvent(EventName.LOGOUT);

		if (onSuccess && onSuccess(status, response) === false) {
			return;
		}
	} catch (error: any) {
		console.log(
			"Logout unsuccessful " + error + " with status code: ",
			error.status,
		);
		return onError(error.status, error);
	}
}
