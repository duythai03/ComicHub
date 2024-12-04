import { useThemeColor } from "@/theme/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
	Text,
	type TextProps,
	StyleSheet,
	TextStyle,
	OpaqueColorValue,
} from "react-native";
import ThemedView from "./ThemedView";
import { MaterialIconsName, MaterialIconsStyle } from "T/material-icons-types";
import { Style } from "nativewind/dist/style-sheet/runtime";

export type ThemedTextProps = TextProps & {
	subtitle?: boolean;
	primary?: boolean;
	lightColor?: string;
	darkColor?: string;
	type?: "default" | "title" | "defaultSemiBold" | "subtitle" | "link";
	iconPrefixName?: MaterialIconsName;
	iconPrefixStyle?: MaterialIconsStyle;
	iconPrefixColor?: string | OpaqueColorValue;

	iconSuffixName?: MaterialIconsName;
	iconSuffixStyle?: MaterialIconsStyle;
	iconSuffixColor?: string | OpaqueColorValue;
};

export function ThemedText({
	iconPrefixName,
	iconPrefixColor,
	iconPrefixStyle,

	iconSuffixName,
	iconSuffixStyle,
	iconSuffixColor,

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

	if (iconPrefixName || iconSuffixName) {
		let mergeStyle =
			(Object.assign(
				{},
				type === "default"
					? styles.default
					: type === "title"
						? styles.title
						: type === "defaultSemiBold"
							? styles.defaultSemiBold
							: type === "subtitle"
								? styles.subtitle
								: type === "link"
									? styles.link
									: {},
				...(Array.isArray(style) ? style.filter(Boolean) : []),
			) as TextStyle) || {};
		const sharedIconStyle: Style = {
			lineHeight: mergeStyle.lineHeight,
			marginBottom: mergeStyle.marginBottom,
			marginTop: mergeStyle.marginTop,
		};
		return (
			<ThemedView className="flex-row items-center">
				{iconPrefixName && (
					<MaterialIcons
						name={iconPrefixName}
						size={24}
						color={iconPrefixColor || color}
						className="mr-2"
						style={[sharedIconStyle, iconPrefixStyle]}
					/>
				)}
				<Text {...rest} style={[{ color }, mergeStyle]} />
				{iconSuffixName && (
					<MaterialIcons
						style={[sharedIconStyle, iconSuffixStyle]}
						name={iconSuffixName}
						size={24}
						color={iconSuffixColor || color}
						className="ml-2"
					/>
				)}
			</ThemedView>
		);
	}

	return (
		<Text
			{...rest}
			style={[
				type === "default" ? styles.default : undefined,
				type === "title" ? styles.title : undefined,
				type === "defaultSemiBold" ? styles.defaultSemiBold : undefined,
				type === "subtitle" ? styles.subtitle : undefined,
				type === "link" ? styles.link : undefined,
				{ color },
				style,
			]}
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

export default ThemedText;
