import { useThemeColor } from "@/hooks/theme/useThemeColor";
import {
	SafeAreaView,
	SafeAreaViewProps,
} from "react-native-safe-area-context";

function ThemedSaveAreaView({ style, children, ...props }: SafeAreaViewProps) {
	const backgroundColor = useThemeColor("background");

	return (
		<SafeAreaView style={[style, { backgroundColor }]} {...props}>
			{children}
		</SafeAreaView>
	);
}

export default ThemedSaveAreaView;
