import { useThemeColor } from "@/hooks/theme/useThemeColor";
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
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export default function ThemedTextInput({
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
			style={[
				style,
				{
					borderWidth: 1,
					borderRadius: 5,
					borderColor,
					backgroundColor,
					padding: 10,
					margin: 5,
					color,
				},
			]}
			{...props}
			placeholderTextColor={placeholderTextColor}
		/>
	);
}
