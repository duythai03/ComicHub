import { userAlreadyLoggedIn } from "@/apiServices/authService";
import { getUserProfile } from "@/apiServices/userService";
import {
	addEventListener,
	addListener,
	eventEmitter,
} from "@/components/event";
import { EventName } from "@/constants/EventName";
import { getAccessToken } from "@/utils/request/utils";
import { HttpStatusCode } from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
	//user type :
	// {
	// 		name: "",
	// 		avatar: "",
	// 		status: "",
	// 		roles: [],
	// 		enabled: false,
	// 	}
	const [user, setUser] = useState(); // if user is not logged in the user will be trash value

	useEffect(() => {
		async function getUserInfo() {
			const accessToken = await getAccessToken();
			console.log("UserProvider -> accessToken: " + accessToken);

			const user = await getUserProfile((code) => {
				switch (code) {
					case HttpStatusCode.Unauthorized:
						break;
					case HttpStatusCode.Forbidden:
						break;
					default:
				}
			});
			if (user) {
				setUser(user);
			}
		}
		getUserInfo();

		const loginEvent = addEventListener(EventName.LOGIN, ({ name }) => {
			console.log("User logged in with name: " + name + " in UserProvider");
			setUser({ name });
		});

		const logoutEvent = addEventListener(EventName.LOGOUT, () => {
			console.log("User logged out in UserProvider");
			setUser(null);
		});

		return () => {
			loginEvent.remove();
			logoutEvent.remove();
		};
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export function useLoggedIn() {
	const [isLoading, setIsLoading] = useState(true);
	const [loggedIn, setLoggedIn] = useState(false);

	useEffect(() => {
		async function checkUserLoggedIn() {
			const loggedIn = await userAlreadyLoggedIn();
			setLoggedIn(loggedIn);
			setIsLoading(false);
			if (!loggedIn) {
			}
		}
		checkUserLoggedIn();
	}, []);

	return { isLoading, loggedIn };
}

export function useUserContext() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
}
