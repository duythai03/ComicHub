import { useThemeColor } from "@/theme/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

type ThemedMaterialsIconProps = React.ComponentProps<typeof MaterialIcons> & {
	lightColor?: string;
	darkColor?: string;
	primary?: boolean;
};

export default function ThemedMaterialsIcon({
	primary,
	style,
	lightColor,
	darkColor,
	...props
}: ThemedMaterialsIconProps) {
	const iconColor = useThemeColor(primary ? "primary" : "icon", {
		light: lightColor,
		dark: darkColor,
	});

	return <MaterialIcons color={iconColor} style={[style]} {...props} />;
}
