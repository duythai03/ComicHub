import { View, Text, ScrollView } from "react-native";
import React from "react";
import { ThemedView } from "@/components/themed/ThemedView";
import SearchInput from "@/components/SearchInput";
import ThemeButton from "@/components/ThemeButton";
import GenreList from "./GenreList";

export default function ExploreScreen() {
  return (
    <ThemedView className="flex-1">
      <ScrollView className="px-3">
        <View className="flex-row justify-between items-center">
          <SearchInput />
          <View className="-translate-y-2">
            <ThemeButton />
          </View>
        </View>
        <GenreList />
      </ScrollView>
    </ThemedView>
  );
}
