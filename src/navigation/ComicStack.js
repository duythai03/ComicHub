import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ComicScreen from "../screens/ComicScreen";
import ReadingScreen from "../screens/ReadingScreen";

const Stack = createNativeStackNavigator();

export default function ComicStack({ route }) {
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
