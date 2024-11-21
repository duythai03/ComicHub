import { View, Text } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";

export default function ComicScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const comic = route?.params?.comic;

  if (!comic) {
    return (
      <View>
        <Text>Comic data is missing!</Text>
      </View>
    );
  }

  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate("Reading", { comic })}
      >
        <Text>{comic.name}</Text>
      </TouchableOpacity>
    </View>
  );
}
