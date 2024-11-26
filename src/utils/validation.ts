import { AppRegexp } from "@/constants/AppRegrex";

export const Password = (value: string) =>
	AppRegexp.PASSWORD.test(value)
		? null
		: "Password must have 1 upper case character, 1 lower case character and at least 8 character";
