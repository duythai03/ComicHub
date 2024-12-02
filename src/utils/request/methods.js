import { navigateToLogin, NotLoggedInError } from "./utils";
import { userAlreadyLoggedIn } from "@/apiServices/authService";

// key : method name
// value : position of config object in the arguments
const axios_methods = {
	get: 0,
	post: 1,
	put: 1,
	patch: 0,
	delete: 1,
	head: 1,
	options: 0,
	postForm: 1,
	putForm: 1,
	patchForm: 1,
	request: 0,
};

export function checkLoginBeforeRequest(instance) {
	for (const method in axios_methods) {
		const originalMethod = instance[method];

		instance[method] = async function (url, ...args) {
			const config = args[axios_methods[method]];
			if (config && config._optional_jwt_auth) {
				return await originalMethod(url, ...args);
			}

			const loggedIn = await userAlreadyLoggedIn();

			if (!loggedIn) {
				console.log(
					"User not logged in while making request with method: ",
					method.toUpperCase(),
				);

				if (config && config._navigate_to_login_if_unauthorized) {
					navigateToLogin();
				}

				return Promise.reject(NotLoggedInError());
			}
			return await originalMethod(url, ...args);
		};
	}
}

export default axios_methods;
