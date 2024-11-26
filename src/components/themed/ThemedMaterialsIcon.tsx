import { useThemeColor } from "@/theme/useThemeColor";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";

type ThemedMaterialsIconProps = React.ComponentProps<typeof MaterialIcons> & {
	lightColor?: string;
	darkColor?: string;
};

export default function ThemedMaterialsIcon({
	style,
	lightColor,
	darkColor,
	...props
}: ThemedMaterialsIconProps) {
	const iconColor = useThemeColor("icon", {
		light: lightColor,
		dark: darkColor,
	});

	return <MaterialIcons color={iconColor} style={[style]} {...props} />;
}
