import React, { lazy } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import ExploreScreen from "../screens/Explore/ExploreScreen";
import ProfileScreen from "../screens/ProfileScreen";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useTheme } from "../utils/Context";
import { lightTheme, darkTheme } from "../utils/Theme";
import { ScreenName } from "@/constants/ScreenName";
import FavoriteScreen from "@/screens/FavoriteScreen";

const Tab = createBottomTabNavigator();

export default function HomeTab() {
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
            iconName = "home";
          } else if (route.name === "Favorite") {
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
      <Tab.Screen
        name={ScreenName.FAVORITE}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="heart" size={size} color={color} />
          ),
          title: "Favorite",
        }}
        component={FavoriteScreen}
      />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
