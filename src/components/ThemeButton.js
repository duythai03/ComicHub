import { useTheme } from "../utils/Context";
import {
	View,
	Text,
	Button,
	Image,
	TouchableWithoutFeedback,
} from "react-native";
import day from "../../assets/image/day.png";
import night from "../../assets/image/night.png";

export default function ThemeButton() {
	const { isDarkMode, toggleTheme } = useTheme();

	return (
		<TouchableWithoutFeedback onPress={toggleTheme}>
			<Image
				source={isDarkMode ? night : day}
				style={{ resizeMode: "contain", width: 70, height: 70 }}
			/>
		</TouchableWithoutFeedback>
	);
}
