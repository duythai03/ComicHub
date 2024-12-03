import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ComicScreen from "../screens/ComicScreen/ComicScreen";
import ReadingScreen from "../screens/ReadingScreen/ReadingScreen";
import { useTheme } from "../utils/Context";

const Stack = createNativeStackNavigator();

export default function ComicStack({ route }) {
  const { isDarkMode } = useTheme();
  const headerBackgroundColor = isDarkMode ? "#232531" : "#fff";

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
      <Stack.Screen
        name="Reading"
        component={ReadingScreen}
        options={({ route }) => ({
          headerShown: true,
          headerTitle: route.params?.chapter?.chapter || "Reading",
          headerStyle: {
            backgroundColor: headerBackgroundColor,
          },
        })}
      />
    </Stack.Navigator>
  );
}
