import { View, Text, FlatList, Image } from "react-native";
import React, { useState } from "react";
import { ThemedView } from "@/components/themed/ThemedView";
import { useRoute } from "@react-navigation/native";
import ControlTab from "./ControlTab";
import { useQuery } from "@tanstack/react-query";
import { fetchChapter, fetchImagePagesApi } from "@/utils/ComicApi";
import LoadingCircle from "@/components/LoadingCircle";
import { useNavigation } from "@react-navigation/native";

export default function ReadingScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const comic = route?.params?.comic;
  const chapter = route?.params?.chapter;
  const chapterIndex = route?.params?.index;
  const [chapterData, setChapterData] = useState(null);
  const [baseUrlImg, setBaseUrlImg] = useState(null);
  const [imagePages, setImagePages] = useState([]);

  const { isLoading: isChapterLoading } = useQuery({
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

  const { isLoading: isImagePagesLoading } = useQuery({
    queryKey: ["imagePages", comic.id, chapter.id],
    queryFn: () => fetchImagePagesApi(comic.id, chapter.id),
    onSuccess: (data) => {
      setImagePages(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const handelPreChapter = () => {
    if (chapterIndex > 0) {
      const preChapter = comic.chapters.content[chapterIndex - 1];
      navigation.push("Reading", {
        comic: comic,
        chapter: preChapter,
        index: chapterIndex - 1,
      });
    }
  };

  const handelNextChapter = () => {
    if (chapterIndex < comic.chapters.content.length - 1) {
      const nextChapter = comic.chapters.content[chapterIndex + 1];
      navigation.push("Reading", {
        comic: comic,
        chapter: nextChapter,
        index: chapterIndex + 1,
      });
    }
  };

  const isLoading = isChapterLoading || isImagePagesLoading;

  const renderItem = ({ item }) => (
    <View>
      <Image
        source={{ uri: `${baseUrlImg}/${item.path}` }}
        style={{ width: "100%", height: 550 }}
        resizeMode="contain"
      />
    </View>
  );

  return (
    <ThemedView className="flex-1 w-full h-full">
      {isLoading ? (
        <LoadingCircle />
      ) : (
        <FlatList
          data={imagePages}
          keyExtractor={(item) => item?.number?.toString()}
          renderItem={renderItem}
        />
      )}
      <ControlTab onPreChap={handelPreChapter} onNextChap={handelNextChapter} />
    </ThemedView>
  );
}
