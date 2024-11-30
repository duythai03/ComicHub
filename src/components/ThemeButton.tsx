import { useTheme } from "../utils/Context";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import day from "../../assets/image/day.png";
import night from "../../assets/image/night.png";
import { ThemedText } from "./themed/ThemedText";

export type ThemeButtonProps = {
	title?: string;
};

export default function ThemeButton({ title }: ThemeButtonProps) {
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
					{isDarkMode ? "Chế độ tối" : "Chế độ sáng"}
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
