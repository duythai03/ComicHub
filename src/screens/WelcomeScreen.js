import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 justify-center items-center">
      <TouchableOpacity
        className="border-2 rounded-lg p-2"
        onPress={() => navigation.navigate("HomeTab")}
      >
        <Text>Welcome to ComicHub</Text>
      </TouchableOpacity>
    </View>
  );
}
