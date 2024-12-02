import { TextInput, View } from "react-native";
import { ThemedTextInputProps } from "./ThemedTextInput";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useThemeColor } from "@/theme/useThemeColor";

type ThemedSearchBarProps = ThemedTextInputProps & {
	iconOnly?: boolean;
	wrapperStyle?: any;
	suffixIconName?: string;
};

function ThemedSearchBar({
	placeholder = "Search",
	wrapperStyle,
	style,
	iconOnly = true,
	suffixIconName,
	...props
}: ThemedSearchBarProps) {
	const iconColor = useThemeColor("icon");

	return (
		<View style={wrapperStyle} className="flex-row items-center">
			<TextInput
				{...props}
				className="py-3 pl-8 rounded-3xl w-full"
				placeholder={placeholder}
				style={[style, { borderWidth: 0 }]}
			/>

			<View style={{}} className="right-4">
				<MaterialIcons name="search" size={30} color={iconColor} />
			</View>
		</View>
	);
}

export default ThemedSearchBar;
