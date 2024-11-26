import { useThemeColor } from "@/theme/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Text, type TextProps, StyleSheet } from "react-native";
import { ThemedView } from "./ThemedView";
import { MaterialIconsName } from "T/material-icons-types";

export type ThemedTextProps = TextProps & {
	subtitle?: boolean;
	primary?: boolean;
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
	iconPrefixName?: MaterialIconsName;
	iconSuffixName?: MaterialIconsName;
};

export function ThemedText({
	iconPrefixName,
	iconSuffixName,
	style,
	subtitle,
	primary,
	lightColor,
	darkColor,
	type = "default",
	...rest
}: ThemedTextProps) {
	const color = useThemeColor(
		primary ? "primary" : subtitle ? "subtitle" : "text",
		{
			light: lightColor,
			dark: darkColor,
		},
	);

	return iconPrefixName || iconSuffixName ? (
		<ThemedView className="flex-row items-center">
			{iconPrefixName && (
				<MaterialIcons
					name={iconPrefixName}
					size={24}
					color={color}
					className="mr-2"
				/>
			)}
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
			{iconSuffixName && (
				<MaterialIcons
					name={iconSuffixName}
					size={24}
					color={color}
					className="ml-2"
				/>
			)}
		</ThemedView>
	) : (
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
