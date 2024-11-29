import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/SearchScreen";
import LoginScreen from "@/screens/authentication/LoginScreen";
import WelcomeScreen from "@/screens/WelcomeScreen";
import { RegisterScreen } from "@/screens/authentication";
import HomeTab from "./HomeTab";
import ComicStack from "./ComicStack";

const Stack = createNativeStackNavigator();
export default function HomeStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
			initialRouteName="HomeTab"
		>
			<Stack.Screen name="HomeTab" component={HomeTab} />
			<Stack.Screen name="Welcome" component={WelcomeScreen} />
			<Stack.Screen name="LoginScreen" component={LoginScreen} />
			<Stack.Screen name="RegisterScreen" component={RegisterScreen} />
			<Stack.Screen
				name="Search"
				component={SearchScreen}
				options={{ headerShown: true }}
			/>
			<Stack.Screen name="ComicStack" component={ComicStack} />
		</Stack.Navigator>
	);
}
