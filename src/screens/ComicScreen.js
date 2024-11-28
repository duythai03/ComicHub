import { View, Text, Dimensions, Image } from "react-native";
import React, { useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import GradientOverlay from "../components/GradientOverlay";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useQuery } from "@tanstack/react-query";
import { fetchComicDetail } from "@/utils/ComicApi";
import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";

export default function ComicScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const comic = route?.params?.comic;
  const { width, height } = Dimensions.get("window");
  const widthImg = width;
  const heightImg = height * 0.35;
  const [comicDetail, setComicDetail] = useState(null);

  useQuery({
    queryKey: ["comicDetail"],
    queryFn: () => fetchComicDetail(comic.id),
    onSuccess: (data) => {
      setComicDetail(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [showFullSummary, setShowFullSummary] = useState(false);

  const handleSummaryToggle = () => {
    setShowFullSummary(!showFullSummary);
  };

  const cleanedSummary = comicDetail?.summary
    ? comicDetail.summary.replace(/<p>|<\/p>|&nbsp;/g, "")
    : "Đang cập nhập";

  return (
    <ThemedView className="flex-1">
      <View className="relative">
        {/* Back Button */}
        <TouchableOpacity
          className="absolute top-8 left-3 z-10 bg-black p-2 rounded-full opacity-50"
          onPress={() => navigation.goBack()}
        >
          <AntDesign name="arrowleft" size={24} color="white" />
        </TouchableOpacity>

        {/* Favourite Button */}
        <TouchableOpacity
          className="absolute top-8 right-3 z-10 bg-black p-2 rounded-full opacity-50"
          onPress={() => console.log("Favourite")}
        >
          <AntDesign name="heart" size={24} color="white" />
        </TouchableOpacity>

        {/* Comic Image */}
        <View
          style={{
            width: widthImg,
            height: heightImg,
            position: "relative",
          }}
        >
          <Image
            source={{
              uri: comic.thumbnailUrl,
            }}
            className="w-full h-full"
          />
          <GradientOverlay>
            <Text className="text-white text-lg font-bold">{comic.name}</Text>
            <Text className="text-gray-200 text-sm">
              Tác giả:{" "}
              {comic.authors && comic.authors[0]
                ? comic.authors[0]
                : "Đang cập nhập"}
            </Text>
            <View className="flex flex-row space-x-3">
              {comic.categories.slice(0, 4).map((genre, index) => (
                <View key={index} className="my-2">
                  <Text className="text-gray-200 text-sm p-1 border-[1px] border-white rounded-sm text-center">
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
          </GradientOverlay>
        </View>

        <View className="flex flex-row justify-between items-center p-3">
          <ThemedText className="text-base font-bold">Đánh giá</ThemedText>
          <View className="flex flex-row items-center">
            <FontAwesome name="star" size={21} color="#f1b207" />
            <FontAwesome name="star" size={21} color="#f1b207" />
            <FontAwesome name="star" size={21} color="#f1b207" />
            <FontAwesome name="star" size={21} color="#f1b207" />
            <FontAwesome name="star" size={21} color="#f1b207" />
            <ThemedText className="ml-2">4.9/5</ThemedText>
          </View>
        </View>
        <View className="px-3">
          <ThemedText className="text-base font-bold">Mô tả</ThemedText>
          <ThemedText className="ThemedText-sm">
            {cleanedSummary.length > 200 && !showFullSummary
              ? `${cleanedSummary.substring(0, 200)}...`
              : cleanedSummary}
            {cleanedSummary.length > 200 && (
              <TouchableOpacity
                className="translate-y-1"
                onPress={handleSummaryToggle}
              >
                <Text className="text-[#c226f1]">
                  {showFullSummary ? "Thu gọn" : "Xem thêm"}
                </Text>
              </TouchableOpacity>
            )}
          </ThemedText>
        </View>
      </View>

      {/* <TouchableOpacity
        onPress={() => navigation.navigate("Reading", { comic })}
      >
        <ThemedText>{comic.name}</ThemedText>
      </TouchableOpacity> */}
    </ThemedView>
  );
}
