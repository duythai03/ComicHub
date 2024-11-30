import { View } from "react-native";
import ThemedTextInput, { ThemedTextInputProps } from "./ThemedTextInput";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useThemeColor } from "@/theme/useThemeColor";

type ThemedSearchBarProps = ThemedTextInputProps & {
	iconOnly?: boolean;
};

function ThemedSearchBar({
	placeholder = "Search",
	style,
	iconOnly = true,
	...props
}: ThemedSearchBarProps) {
	const iconColor = useThemeColor("icon");

	return (
		<View className="relative flex-row ">
			<ThemedTextInput
				{...props}
				className="py-3 pl-8 rounded-3xl w-full"
				placeholder={placeholder}
				style={style}
			/>

			<View
				style={{
					top: "50%",
					position: "absolute",
					transform: [{ translateY: -22 }],
				}}
				className="absolute right-4"
			>
				<MaterialIcons name="search" size={30} color={iconColor} />
			</View>
		</View>
	);
}

export default ThemedSearchBar;
