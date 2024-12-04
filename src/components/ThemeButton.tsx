import { useTheme } from "../utils/Context";
import { Image, TouchableWithoutFeedback, View } from "react-native";
import ThemedText from "./themed/ThemedText";

const day = require("../../assets/image/day.png");
const night = require("../../assets/image/night.png");

export type ThemeButtonProps = {
	lightTitle?: string;
	darkTitle?: string;
	title?: boolean;
};

export default function ThemeButton({
	lightTitle,
	darkTitle,
	title,
}: ThemeButtonProps) {
	const { isDarkMode, toggleTheme } = useTheme();

	if (title) {
		return (
			<View className="flex-row items-center">
				<TouchableWithoutFeedback onPress={toggleTheme}>
					<Image
						source={isDarkMode ? night : day}
						style={{ resizeMode: "contain", width: 70, height: 70 }}
					/>
				</TouchableWithoutFeedback>
				<ThemedText className="text-lg ml-4">
					{isDarkMode ? darkTitle || "Chế độ tối" : lightTitle || "Chế độ sáng"}
				</ThemedText>
			</View>
		);
	}

	return (
		<TouchableWithoutFeedback onPress={toggleTheme}>
			<Image
				source={isDarkMode ? night : day}
				style={{ resizeMode: "contain", width: 70, height: 70 }}
			/>
		</TouchableWithoutFeedback>
	);
}
