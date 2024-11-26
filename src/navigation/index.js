import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import ExploreScreen from "@/screens/Explore/ExploreScreen";
import FavouriteScreen from "@/screens/FavouriteScreen";
import ComicScreen from "../screens/ComicScreen";
import ReadingScreen from "../screens/ReadingScreen";
import { useTheme } from "../utils/Context";
import { lightTheme, darkTheme } from "../utils/Theme";
import LoginScreen from "@/screens/authentication/LoginScreen";
import WelcomeScreen from "@/screens/WelcomeScreen";
import { RegisterScreen } from "@/screens/authentication";
import { navigationRef } from "./utils";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  const { isDarkMode } = useTheme();

  const theme = isDarkMode ? darkTheme : lightTheme;

  function HomeStack() {
    return (
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="LoginScreen"
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

  function ComicStack({ route }) {
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
              iconName = "home";
            } else if (route.name === "Favourite") {
              iconName = "heart";
            } else if (route.name === "Explore") {
              iconName = "compass";
            } else if (route.name === "Profile") {
              iconName = "user";
            }

            return <FontAwesome name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Favourite" component={FavouriteScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer ref={navigationRef}>
      <HomeStack />
    </NavigationContainer>
  );
}
