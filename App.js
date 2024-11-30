import { StatusBar } from "expo-status-bar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider as ThemeProviderV1 } from "./src/utils/Context";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useThemeColor } from "@/theme/useThemeColor";
import { ThemeProvider as ThemeProviderV2 } from "@/theme/ThemeContext";
import Toast from "react-native-toast-message";
import { UserProvider } from "@/contexts/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import HomeStack from "@/navigation/HomeStack";
import { FavoriteProvider } from "@/contexts/FavoriteContext";
import { navigationRef } from "@/navigation/utils";
import NetworkStatusObserver from "@/components/NetworkStatusObserver";

const queryClient = new QueryClient();

function SafeApp() {
	const backgroundColor = useThemeColor("background");

	return (
		<SafeAreaProvider style={{ backgroundColor }}>
			<SafeAreaView
				style={{
					flex: 1,
				}}
			>
				<UserProvider>
					<FavoriteProvider>
						<HomeStack />
					</FavoriteProvider>
				</UserProvider>
				<StatusBar style="auto" />
			</SafeAreaView>
		</SafeAreaProvider>
	);
}

export default function App() {
	return (
		<NavigationContainer ref={navigationRef}>
			<NetworkStatusObserver>
				<QueryClientProvider client={queryClient}>
					<GestureHandlerRootView>
						<ThemeProviderV2>
							<ThemeProviderV1>
								<SafeApp />
								<Toast />
							</ThemeProviderV1>
						</ThemeProviderV2>
					</GestureHandlerRootView>
				</QueryClientProvider>
			</NetworkStatusObserver>
		</NavigationContainer>
	);
}
