import React, { createContext, useCallback, useContext } from "react";
import { useColorScheme } from "./useColorScheme";
import { Colors } from "@/constants/Colors";
import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider as ThemeProviderDefault,
} from "@react-navigation/native";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
	const { theme, setTheme } = useColorScheme();

	const isDarkMode = theme === "dark";

	const toggleDarkTheme = useCallback(() => {
		const newTheme = isDarkMode ? "light" : "dark";
		setTheme(newTheme);
		return newTheme;
	}, [theme, setTheme]);

	return (
		<ThemeContext.Provider
			value={{
				theme,
				setTheme,
				isDarkMode,
				toggleDarkTheme,
				colors: Colors[theme],
			}}
		>
			<ThemeProviderDefault value={(isDarkMode && DarkTheme) || DefaultTheme}>
				{children}
			</ThemeProviderDefault>
		</ThemeContext.Provider>
	);
};

export function useThemeContext() {
	const context = useContext(ThemeContext);
	if (!context) {
		throw new Error("useThemeContext must be used within a ThemeProvider");
	}
	return context;
}
