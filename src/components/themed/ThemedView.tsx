import { useThemeColor } from "@/theme/useThemeColor";
import { View, type ViewProps } from "react-native";

export type ThemedViewProps = ViewProps & {
	lightColor?: string;
	darkColor?: string;
};

export function ThemedView({
	style,
	lightColor,
	darkColor,
	...otherProps
}: ThemedViewProps) {
	const backgroundColor = useThemeColor("background", {
		light: lightColor,
		dark: darkColor,
	}) as string;

	return <View style={[style, { backgroundColor }]} {...otherProps} />;
}
