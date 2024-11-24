import { StatusBar } from "expo-status-bar";
import AppNavigation from "./src/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as ThemeProviderV1 } from "./src/utils/Context";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useThemeColor } from "@/theme/useThemeColor";
import { ThemeProvider as ThemeProviderV2 } from "@/theme/ThemeContext";

const queryClient = new QueryClient();

function SafeApp() {
	const backgroundColor = useThemeColor("background");

	return (
		<GestureHandlerRootView>
			<SafeAreaProvider style={{ backgroundColor }}>
				<SafeAreaView
					style={{
						flex: 1,
					}}
				>
					<AppNavigation />
					<StatusBar style="auto" />
				</SafeAreaView>
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
}

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<ThemeProviderV2>
				<ThemeProviderV1>
					<SafeApp />
				</ThemeProviderV1>
			</ThemeProviderV2>
		</QueryClientProvider>
	);
}
