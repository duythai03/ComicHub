import { useThemeContext } from "@/hooks/theme/ThemeContext";
import { createContext, useContext } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const { isDarkMode, toggleDarkTheme } = useThemeContext();

	return (
		<ThemeContext.Provider
			value={{ isDarkMode: isDarkMode, toggleTheme: toggleDarkTheme }}
		>
			{children}
		</ThemeContext.Provider>
	);
};

export const useTheme = () => useContext(ThemeContext);
