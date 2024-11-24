import { ActivityIndicator, ActivityIndicatorProps, View } from "react-native";
import { useThemeColor } from "@/theme/useThemeColor";

export type ThemedLoadingCircleProps = ActivityIndicatorProps & {
	loading: boolean;
	lightColor?: string;
	darkColor?: string;
};

export default function ThemedLoadingCircle({
	size = "large",
	loading,
	style,
	lightColor,
	darkColor,
	...props
}: ThemedLoadingCircleProps) {
	const color = useThemeColor("primary", {
		light: lightColor,
		dark: darkColor,
	});

	return (
		loading && (
			<ActivityIndicator size={size} color={color} style={style} {...props} />
		)
	);
}
