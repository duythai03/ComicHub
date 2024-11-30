import { navigateToLogin, NotLoggedInError } from "./utils";
import { userAlreadyLoggedIn } from "@/apiServices/authService";

// key : method name
// value : position of config object in the arguments
const axios_methods = {
	get: 1,
	post: 2,
	put: 2,
	patch: 2,
	delete: 1,
	head: 1,
	options: 1,
	postForm: 2,
	putForm: 2,
	patchForm: 2,
	request: 1,
};

export function checkLoginBeforeRequest(instance) {
	for (const method in axios_methods) {
		const originalMethod = instance[method];

		instance[method] = async function (url, ...args) {
			const loggedIn = await userAlreadyLoggedIn();
			if (!loggedIn) {
				console.log(
					"User not logged in while making request with method: ",
					method.toUpperCase(),
				);
				const config = args[axios_methods[method]];

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
