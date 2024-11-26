import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import GenreScreen from "../screens/GenreScreen";
import ComicScreen from "../screens/ComicScreen";
import ReadingScreen from "../screens/ReadingScreen";
import { useTheme } from "../utils/Context";
import { lightTheme, darkTheme } from "../utils/Theme";
import LoginScreen from "@/screens/authentication/LoginScreen";
import WelcomeScreen from "@/screens/WelcomeScreen";
import { RegisterScreen } from "@/screens/authentication";
import { GlobalNavigation } from "./utils";
import { ScreenName } from "@/constants/ScreenName";
import FavoriteScreen from "@/screens/FavoriteScreen";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
	const { isDarkMode } = useTheme();

	const theme = isDarkMode ? darkTheme : lightTheme;
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="LoginScreen"
		>
			<Stack.Screen name="HomeTab" component={HomeTab} />
			<Stack.Screen name="Welcome" component={WelcomeScreen} />
			<Stack.Screen name={ScreenName.LOGIN} component={LoginScreen} />
			<Stack.Screen name={ScreenName.REGISTER} component={RegisterScreen} />
			<Stack.Screen
				name="Search"
				component={SearchScreen}
				options={{ headerShown: true }}
			/>
			<Stack.Screen name="ComicStack" component={ComicStack} />
		</Stack.Navigator>
	);
}

function ComicStack({ route }) {
	const { isDarkMode } = useTheme();

	const theme = isDarkMode ? darkTheme : lightTheme;
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="Comic"
		>
			<Stack.Screen
				name="Comic"
				component={ComicScreen}
				initialParams={route?.params}
			/>
			<Stack.Screen name="Reading" component={ReadingScreen} />
		</Stack.Navigator>
	);
}

function HomeTab() {
	const { isDarkMode } = useTheme();

	const theme = isDarkMode ? darkTheme : lightTheme;
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarStyle: { backgroundColor: theme.container.backgroundColor },
				tabBarActiveTintColor: "#c226f1",
				tabBarInactiveTintColor: theme.text.color,
				tabBarIcon: ({ color, size }) => {
					let iconName;

					if (route.name === "Home") {
						iconName = "house";
					} else if (route.name === "Genre") {
						iconName = "book-open";
					} else if (route.name === "Profile") {
						iconName = "user";
					}

					return <FontAwesome6 name={iconName} size={size} color={color} />;
				},
			})}
		>
			<Tab.Screen name="Home" component={HomeScreen} />
			<Tab.Screen
				options={{
					title: "Favorite",
					tabBarIcon: ({ color, size }) => {
						return <FontAwesome6 name="heart" size={size} color={color} />;
					},
				}}
				name={ScreenName.FAVORITE}
				component={FavoriteScreen}
			/>
			<Tab.Screen name="Genre" component={GenreScreen} />
			<Tab.Screen name="Profile" component={ProfileScreen} />
		</Tab.Navigator>
	);
}
export default function AppNavigation() {
	return (
		<NavigationContainer>
			<GlobalNavigation>
				<HomeStack />
			</GlobalNavigation>
		</NavigationContainer>
	);
}
