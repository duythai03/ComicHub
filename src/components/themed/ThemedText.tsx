import { useThemeColor } from "@/theme/useThemeColor";
import { Text, type TextProps, StyleSheet } from "react-native";

export type ThemedTextProps = TextProps & {
	primary?: boolean;
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
};

export function ThemedText({
	style,
	primary,
	lightColor,
	darkColor,
	type = "default",
	...rest
}: ThemedTextProps) {
	const color = useThemeColor(primary ? "primary" : "text", {
		light: lightColor,
		dark: darkColor,
	});

	return (
		<Text
			style={[
				type === "default" ? styles.default : undefined,
				type === "title" ? styles.title : undefined,
				type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
				type === "subtitle" ? styles.subtitle : undefined,
				type === "link" ? styles.link : undefined,
				{ color },
				style,
			]}
			{...rest}
		/>
	);
}

const styles = StyleSheet.create({
	default: {
		fontSize: 16,
		lineHeight: 24,
	},
	defaultSemiBold: {
		fontSize: 16,
		lineHeight: 24,
		fontWeight: "600",
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		lineHeight: 32,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: "bold",
	},
	link: {
		lineHeight: 30,
		fontSize: 16,
		color: "#0a7ea4",
	},
});
