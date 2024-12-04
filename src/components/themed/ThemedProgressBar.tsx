import { Text, TextStyle, View, ViewStyle } from "react-native";
import { ProgressBar } from "react-native-paper";
import ThemedView from "./ThemedView";
import ThemedText from "./ThemedText";
import { useThemeColor } from "@/theme/useThemeColor";

export type ThemedProgressBarProps = {
	filledValue: number;
	maxValue: number;

	lightProgressColor?: string;
	darkProgressColor?: string;
	progressStyle?: ViewStyle;

	lightRemainingColor?: string;
	darkRemainingColor?: string;
	remainingStyle?: ViewStyle;

	lightValueTextColor?: string;
	darkValueTextColor?: string;

	valueTextStyle?: TextStyle;
};

export function ThemedProgressBar({
	filledValue,
	maxValue = 100,

	lightProgressColor,
	darkProgressColor,
	progressStyle,
	lightRemainingColor,
	darkRemainingColor,
	remainingStyle,

	lightValueTextColor,
	darkValueTextColor,
	valueTextStyle,
}: ThemedProgressBarProps) {
	if (filledValue > maxValue) {
		filledValue = maxValue;
	}

	const progress = (filledValue / maxValue) * 100;

	const remainingColor = useThemeColor("surface", {
		light: lightRemainingColor,
		dark: darkRemainingColor,
	});

	const progressColor = useThemeColor("success", {
		light: lightProgressColor,
		dark: darkProgressColor,
	});

	const valueTextColor = useThemeColor("text", {
		light: lightValueTextColor,
		dark: darkValueTextColor,
	});

	return (
		<View
			className="relative flex-1 h-6 bg-gray-300 rounded-full overflow-hidden justify-center"
			style={[
				{
					backgroundColor: remainingColor,
				},
				remainingStyle,
			]}
		>
			<View
				className="h-full rounded-full"
				style={[
					{
						width: `${progress}%`,
						backgroundColor: progressColor,
					},
					progressStyle,
				]}
			/>

			<Text
				style={[
					{
						fontSize: 14,
						transform: [{ translateX: 20 }],
						color: valueTextColor,
					},
					valueTextStyle,
				]}
				className="ml-2 absolute right-2/4"
			>
				{filledValue}/{maxValue}
			</Text>
		</View>
	);
}
export default ThemedProgressBar;
