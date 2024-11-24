import { createContext, useContext, useState } from "react";

const UserContext = createContext();

export function UserProvider({ children }) {
	const [user, setUser] = useState({
		name: "",
		avatar: "",
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
