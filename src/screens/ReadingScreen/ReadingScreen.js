import { View, Text, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/themed/ThemedView";
import { useRoute } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import ControlTab from "./ControlTab";
import { useQuery } from "@tanstack/react-query";
import { fetchChapter } from "@/utils/ComicApi";
import LoadingCircle from "@/components/LoadingCircle";

export default function ReadingScreen() {
  const route = useRoute();
  const comic = route?.params?.comic;
  const chapter = route?.params?.chapter;
  const chapterIndex = route?.params?.index;
  const [chapterData, setChapterData] = useState(null);
  const [baseUrlImg, setBaseUrlImg] = useState(null);

  const { isLoading } = useQuery({
    queryKey: ["chapter", comic.id, chapter.id],
    queryFn: () => fetchChapter(comic.id, chapter.id),
    onSuccess: (data) => {
      setChapterData(data);
      setBaseUrlImg(data.sourceInfo.baseUrl);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  if (chapterData.imagePages && chapterData.imagePages.length > 0) {
    // Duyệt qua danh sách các trang
    chapterData.imagePages.forEach((page) => {
      console.log(`Trang ${page.number}: ${page.path}`);
    });
  } else {
    console.error("Không có imagePages nào được trả về!");
  }

  const renderItem = ({ item }) => {
    return (
      <View className="flex items-center justify-center">
        <Image
          source={{ uri: baseUrlImg + "/" + item.path }}
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
        />
      </View>
    );
  };

  return (
    <ThemedView className="relative h-full">
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <FlatList
          data={chapterData.imagePages || []}
          renderItem={renderItem}
          keyExtractor={(item) => item.number}
        />
      )}

      <ControlTab />
    </ThemedView>
  );
}
