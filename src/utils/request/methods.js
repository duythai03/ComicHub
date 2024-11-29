import { navigateToLogin, NotLoggedInError } from "./utils";
import { userAlreadyLoggedIn } from "@/apiServices/authService";

const axios_methods = [
	"get",
	"delete",
	"head",
	"options",
	"post",
	"put",
	"patch",
	"postForm",
	"putForm",
	"patchForm",
	"request",
];

export function checkLoginBeforeRequest(instance) {
	for (const method of axios_methods) {
		const originalMethod = instance[method];

		instance[method] = async function (url, ...args) {
			const loggedIn = await userAlreadyLoggedIn();
			if (!loggedIn) {
				console.log(
					"User not logged in while making request with method: ",
					method.toUpperCase(),
				);
				const config = method === "get" ? args[0] : args[1];

				if (config && config.navigateToLogin) {
					navigateToLogin();
				}

				return Promise.reject(NotLoggedInError());
			}
			return originalMethod(url, ...args);
		};
	}
}

export default axios_methods;
