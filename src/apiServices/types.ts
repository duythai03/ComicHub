import { AxiosResponse, HttpStatusCode } from "axios";

export type ErrorHandler = (statusCode: HttpStatusCode, error: any) => void;

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
export type SuccessHandler = (
	statusCode: HttpStatusCode,
	response: AxiosResponse,
) => boolean;
