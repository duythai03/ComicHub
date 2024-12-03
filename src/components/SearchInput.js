import { View, TextInput } from "react-native";
import React from "react";
import Entypo from "react-native-vector-icons/Entypo";

export default function SearchInput() {
  return (
    <View className="relative w-[80%] mb-4">
      <TextInput
        placeholder="Tìm kiếm truyện..."
        className="w-full rounded-3xl p-2 pl-10 bg-white"
        style={{
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          elevation: 2,
        }}
      />
      <Entypo
        name="magnifying-glass"
        size={24}
        style={{
          position: "absolute",
          left: 10,
          top: "25%",
          transform: [{ translateY: -2 }],
        }}
        onPress={() => navigation.navigate("Search")}
      />
    </View>
  );
}
