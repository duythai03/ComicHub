import { Image, TouchableWithoutFeedback } from "react-native";

import day from "R/image/day.png";
import night from "R/image/night.png";
import { useTheme } from "@/theme/useTheme";

export default function ThemeButton() {
	const { isDarkMode, toggleDarkTheme } = useTheme();

	return (
		<TouchableWithoutFeedback onPress={toggleDarkTheme}>
			<Image
				source={isDarkMode ? night : day}
				style={{ resizeMode: "contain", width: 70, height: 70 }}
			/>
		</TouchableWithoutFeedback>
	);
}
