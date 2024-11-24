import { useThemeColor } from "@/theme/useThemeColor";
import { TextInput, TextInputProps } from "react-native";

export type ThemedTextInputProps = TextInputProps & {
	lightBorderColor?: string;
	darkBorderColor?: string;
	lightBackgroundColor?: string;
	darkBackgroundColor?: string;
	lightColor?: string;
	darkColor?: string;
	lightPlaceholderTextColor?: string;
	darkPlaceholderTextColor?: string;
};

export default function ThemedTextInput({
	value,
	onChangeText,
	style,
	lightBorderColor,
	darkBorderColor,
	lightBackgroundColor,
	darkBackgroundColor,
	lightPlaceholderTextColor,
	darkPlaceholderTextColor,
	lightColor,
	darkColor,
	...props
}: ThemedTextInputProps) {
	const color = useThemeColor("onSurface", {
		light: lightColor,
		dark: darkColor,
	});
	const placeholderTextColor = useThemeColor("onSurface", {
		light: lightPlaceholderTextColor,
		dark: darkPlaceholderTextColor,
	});
	const borderColor = useThemeColor("border", {
		light: lightBorderColor,
		dark: darkBorderColor,
	});
	const backgroundColor = useThemeColor("surface", {
		light: lightBackgroundColor,
		dark: darkBackgroundColor,
	});

	return (
		<TextInput
			value={value}
			onChangeText={onChangeText}
			style={[
				{
					borderWidth: 1,
					borderColor,
					backgroundColor,
					color,
				},
				style,
			]}
			{...props}
			placeholderTextColor={placeholderTextColor}
		/>
	);
}
