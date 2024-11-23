import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { useThemeContext } from "@/hooks/theme/ThemeContext";
import { useTheme } from "@/hooks/theme/useTheme";
// @ts-nocheck
import { useThemeColor } from "@/hooks/theme/useThemeColor";

function LoginScreen() {
	const {
		theme, // Current theme
		setTheme, // Function to set the theme
		isDarkMode, // Boolean to check if the current theme is dark
		toggleDarkMode, // Function to toggle the theme
		colors, // All colors from the current theme
	} = useThemeContext();

	const {
		isDarkMode, // Boolean to check if the current theme is dark
		toggleDarkMode, // Function to toggle the theme
		colors, // All colors from the current theme
	} = useTheme();

	const textColor = useThemeColor(
		"text", // theme colorKey
		{ light: "black", dark: "white" }, // override colors
	);

	return (
		<ThemedView>
			<ThemedText>Login</ThemedText>
		</ThemedView>
	);
}
