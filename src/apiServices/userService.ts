import { ENDPOINT } from "@/constants/Endpoint";
import privateRequest from "@/utils/request/privateRequest";
import { ErrorHandler, SuccessHandler } from "./types";
import { AxiosRequestConfig } from "axios";

export const getUserProfile = async (
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
	config?: AxiosRequestConfig<any>,
) => {
	try {
		const response = await privateRequest.get(
			ENDPOINT.GET_USER_PROFILE_V1,
			config,
		);

		const { data, status } = response;
		if (onSuccess && !onSuccess(status, response)) {
			return;
		}
		return data;
	} catch (error: any) {
		console.log("Error in getUserProfile with status code: ", error.status);
		onError(error.status, error);
	}
};
