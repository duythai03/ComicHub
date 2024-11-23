import { StatusBar } from "expo-status-bar";
// import { StyleSheet, Text, View } from "react-native";
import AppNavigation from "./src/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { ThemeProvider as ThemeProviderV2 } from "@/hooks/theme/ThemeContext";
import { ThemeProvider as ThemeProviderV1 } from "./src/utils/Context";

const queryClient = new QueryClient();

export default function App() {
	return (
		<ThemeProviderV2>
			<QueryClientProvider client={queryClient}>
				<ThemeProviderV1>
					<AppNavigation />
					<StatusBar style="auto" />
				</ThemeProviderV1>
			</QueryClientProvider>
		</ThemeProviderV2>
	);
}
