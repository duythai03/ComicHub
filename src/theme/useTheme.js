import { Colors } from "./Colors";
import { useThemeContext } from "./ThemeContext";

export function useTheme() {
	const { isDarkMode, toggleDarkTheme } = useThemeContext();

	return {
		isDarkMode,
		toggleDarkTheme,
		colors: Colors[isDarkMode ? "dark" : "light"],
	};
}
