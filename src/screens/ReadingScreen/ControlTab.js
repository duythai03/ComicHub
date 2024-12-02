import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";

export default function ControlTab() {
  return (
    <View className="absolute bottom-0 left-0 right-0 bg-[#ffffff9f] border-[1px] border-gray-300 rounded-t-xl h-[54px] flex flex-row">
      {/* Nút "Chap trước" */}
      <TouchableOpacity style={{ flex: 1 }}>
        <View className="flex items-center justify-center border-r-[1px] border-gray-300 h-full">
          <FontAwesome name="backward" size={21} color="#c226f1" />
        </View>
      </TouchableOpacity>

      {/* Nút "Chọn chap" */}
      <TouchableOpacity style={{ flex: 1 }}>
        <View className="flex items-center justify-center h-full">
          <Text className="text-lg font-medium">Chọn chap</Text>
        </View>
      </TouchableOpacity>

      {/* Nút "Chap sau" */}
      <TouchableOpacity style={{ flex: 1 }}>
        <View className="flex items-center justify-center border-l-[1px] border-gray-300 h-full">
          <FontAwesome name="forward" size={21} color="#c226f1" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
