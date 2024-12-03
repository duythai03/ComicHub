import { View, TouchableOpacity } from "react-native";
import React from "react";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import { CategoryWithIcon } from "@/constants/CategoryWithIcon";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useNavigation } from "@react-navigation/native";

export default function GenreList() {
  const navigation = useNavigation();
  return (
    <View className="w-full">
      <ThemedText className="text-xl mb-4 font-semibold">
        Khám phá truyện
      </ThemedText>
      <View className="flex-row flex-wrap justify-between">
        {CategoryWithIcon.map((category, index) => (
          <ThemedView
            key={index}
            className="w-[48%] mb-4 bg-white rounded-xl p-4"
            style={{
              shadowColor: "#000",
              shadowOffset: { width: 0, height: 1 },
              elevation: 2,
            }}
          >
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Genre", {
                  categoryId: category.id,
                  categoryName: category.name,
                })
              }
            >
              <View className="flex-row items-center justify-between">
                <ThemedText className="text-lg ml-2">
                  {category.name}
                </ThemedText>
                <AntDesign
                  name={category.icon}
                  size={24}
                  color="#c226f1"
                  className="text-lg"
                />
              </View>
            </TouchableOpacity>
          </ThemedView>
        ))}
      </View>
    </View>
  );
}
