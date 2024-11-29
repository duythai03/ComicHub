import ThemedMaterialsIcon from "@/components/themed/ThemedMaterialsIcon";
import { ThemedText } from "@/components/themed/ThemedText";
import ThemedTouchableText from "@/components/themed/ThemedTouchableText";
import { ThemedView } from "@/components/themed/ThemedView";
import { ScreenName } from "@/constants/ScreenName";
import { useThemeColor } from "@/theme/useThemeColor";
import { useNavigation } from "@react-navigation/native";
import { HttpStatusCode } from "axios";

export default function ErrorComponent({ error, style }) {
	const navigation = useNavigation();
	let { status, messag: message } = error;
	let buttonMessage = "Go Home";
	let iconName = "error";
	let action = () => {
		navigation.navigate("HomeTab", { screen: "Home" });
	};

	switch (status) {
		case HttpStatusCode.Unauthorized:
			message = "You are not authorized. Please authorize to continue";
			buttonMessage = "Login";
			iconName = "lock";
			action = () => {
				navigation.navigate(ScreenName.LOGIN);
			};
			break;

		default:
			message = "Some thing happens";
			buttonMessage = "Go Home";
			iconName = "error";
	}

	const errorColor = useThemeColor("error");

	return (
		<ThemedView style={style}>
			<ThemedMaterialsIcon color={errorColor} name={iconName} size={80} />
			<ThemedText className="text-center mt-10 mb-8">{message}</ThemedText>
			<ThemedTouchableText
				onPress={action}
				className="text-2xl font-bold text-center"
			>
				{buttonMessage}
			</ThemedTouchableText>
		</ThemedView>
	);
}
