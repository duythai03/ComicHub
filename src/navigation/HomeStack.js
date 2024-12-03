import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SearchScreen from "../screens/SearchScreen";
import LoginScreen from "@/screens/authentication/LoginScreen";
import WelcomeScreen from "@/screens/WelcomeScreen";
import { RegisterScreen } from "@/screens/authentication";
import HomeTab from "./HomeTab";
import ComicStack from "./ComicStack";
import GenreScreen from "@/screens/GenreScreen";
import { useTheme } from "../utils/Context";

const Stack = createNativeStackNavigator();

export default function HomeStack() {
  const { isDarkMode } = useTheme();
  const headerBackgroundColor = isDarkMode ? "#232531" : "#fff";

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Welcome"
    >
      <Stack.Screen name="HomeTab" component={HomeTab} />
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: headerBackgroundColor,
          },
        }}
      />
      <Stack.Screen
        name="Genre"
        component={GenreScreen}
        options={({ route }) => ({
          title: route.params?.categoryName,
          headerShown: true,
          headerStyle: {
            backgroundColor: headerBackgroundColor,
          },
        })}
      />
      <Stack.Screen name="ComicStack" component={ComicStack} />
    </Stack.Navigator>
  );
}
