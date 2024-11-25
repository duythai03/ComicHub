import { userAlreadyLoggedIn } from "@/apiServices/authService";
import { getUserProfile } from "@/apiServices/userService";
import { navigate } from "@/navigation/utils";
import { HttpStatusCode } from "axios";
import { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState({
		name: "",
		avatar: "",
		status: "",
		roles: [],
		enabled: false,
	});

	useEffect(() => {
		async function getUserInfo() {
			const loggedIn = await userAlreadyLoggedIn();
			if (!loggedIn) return;
			navigate("HomeTab");

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
	});

	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
}

export function useUserContext() {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error("useUserContext must be used within a UserProvider");
	}
	return context;
}
