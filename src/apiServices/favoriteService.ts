import { ENDPOINT } from "@/constants/Endpoint";
import privateRequest from "@/utils/request/privateRequest";
import { ErrorHandler, SuccessHandler } from "./types";
import { AxiosResponse } from "axios";
import { AxiosRequestConfigExtends } from "T/axios-extends";

export const favoriteComic = async (
	comicId: string,
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
) => {
	try {
		const response: AxiosResponse = await privateRequest.post(
			ENDPOINT.ADD_FAVORITE_V1(comicId),
			null,
			config,
		);
		const { status, data } = response;
		if (onSuccess && onSuccess(status, response) === false) {
			return;
		}
		console.log("Favorite comic successfully with status code: ", status);
		return data;
	} catch (error: any) {
		console.log("Error when favorite comic with status code: ", error.status);
		return onError(error.status, error);
	}
};

export const unfavoriteComic = async (
	comicId: string,
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
	 * after get the response
	 */
	onSuccess?: SuccessHandler,

	config?: AxiosRequestConfigExtends,
) => {
	try {
		const response = await privateRequest.delete(
			ENDPOINT.REMOVE_FAVORITE_V1(comicId),
			config,
		);
		const { status } = response;
		if (onSuccess && !onSuccess(status, response) === false) {
			return;
		}
		console.log("Unfavorite comic successfully with status code: ", status);
		return comicId;
	} catch (error: any) {
		console.log(
			"Error when unfavorite comic with id: " +
				comicId +
				" statusCode: " +
				error.status,
		);
		return onError(error.status, error);
	}
};

export const getFavoriteComicsV1 = async (
	pagination_params: {
		page: number;
		size?: number;
		sort?: Array<string>;
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
	 * after get the response
	 */

	onSuccess?: SuccessHandler,

	config?: AxiosRequestConfigExtends,
) => {
	try {
		pagination_params.size = pagination_params.size || 20;
		const response = await privateRequest.get(ENDPOINT.GET_FAVORITE_V1, {
			...config,
			params: pagination_params,
		});

		const { status, data } = response;
		if (onSuccess && onSuccess(status, response) === false) {
			return;
		}

		console.log(
			"Fetch favorite comics successfully with status code: ",
			status,
		);
		return data;
	} catch (error: any) {
		console.log(
			"Error when fetch favorite comics " +
				error +
				" statusCode: " +
				error?.status,
		);
		return onError(error.status, error);
	}
};

export const getFavoriteComicStatusV1 = async (
	comicId: string,

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
	 * after get the response
	 */

	onSuccess?: SuccessHandler,

	config?: AxiosRequestConfigExtends,
) => {
	try {
		config = {
			...config,
			_optional_jwt_auth: true,
		};

		const response = await privateRequest.get(
			ENDPOINT.GET_FAVORITE_COMIC_STATUS_V1(comicId),
			config,
		);

		const { status, data } = response;
		if (onSuccess && onSuccess(status, response) === false) {
			return;
		}

		console.log(
			"Fetch favorite comic status successfully with status code: ",
			status,
		);
		return data;
	} catch (error: any) {
		console.log(
			"Error when fetch favorite comic status " +
				error +
				" statusCode: " +
				error?.status,
		);
		return onError(error.status, error);
	}
};
