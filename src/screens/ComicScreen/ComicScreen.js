import {
  View,
  Text,
  Dimensions,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import AntDesign from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchComicDetail } from "@/utils/ComicApi";
import { ThemedView } from "@/components/themed/ThemedView";
import { ThemedText } from "@/components/themed/ThemedText";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import LoadingCircle from "@/components/LoadingCircle";
import { LinearGradient } from "expo-linear-gradient";
import ComicImage from "./ComicImage";
import { useFavorite } from "@/contexts/FavoriteContext";
import { addEventListener } from "@/utils/event";
import { EventName } from "@/constants/EventName";

export default function ComicScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const comic = route?.params?.comic;
  const { width, height } = Dimensions.get("window");
  const widthImg = width;
  const heightImg = height * 0.35;
  const [comicDetail, setComicDetail] = useState(null);
  const [sortUp, setSortUp] = useState(true);
  const { addFavoriteComic, removeFavoriteComic } = useFavorite();
  const [isLiked, setIsLiked] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ["comicDetail"],
    queryFn: () => fetchComicDetail(comic.id),
    onSuccess: (data) => {
      setComicDetail(data);
      setIsLiked(data.followed === true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const toggleFavorite = () => {
    if (isLiked) {
      removeFavoriteComic(comic.id); // Xóa khỏi danh sách yêu thích
    } else {
      addFavoriteComic(comic); // Thêm vào danh sách yêu thích
    }
    setIsLiked(!isLiked);
  };

  const [showFullSummary, setShowFullSummary] = useState(false);

  const handleSummaryToggle = () => {
    setShowFullSummary(!showFullSummary);
  };

  const cleanedSummary = comicDetail?.summary
    ? comicDetail.summary.replace(/<p>|<\/p>|&nbsp;/g, "")
    : "Đang cập nhập";

  const renderChapterItem = ({ item, index }) => (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("Reading", {
          comic: comicDetail,
          chapter: item,
          index,
        })
      }
      className="flex flex-row justify-between items-center mb-4"
    >
      <Image source={{ uri: comic.thumbnailUrl }} className="w-2/12 h-16" />
      <View className="w-8/12">
        <ThemedText>{item.chapter}</ThemedText>
        <ThemedText>{comic.name}</ThemedText>
      </View>
      <AntDesign name="download" size={24} color="#c226f1" />
    </TouchableOpacity>
  );

  return (
    <ThemedView className="flex-1 relative">
      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-8 left-3 z-10 bg-black p-2 rounded-full opacity-50"
        onPress={() => navigation.goBack()}
      >
        <AntDesign name="arrowleft" size={24} color="white" />
      </TouchableOpacity>

      {/* Comment Button */}
      <TouchableOpacity
        className="absolute top-8 right-3 z-10 bg-black p-2 rounded-full opacity-70"
        onPress={() => console.log("Comment")}
      >
        <AntDesign name="message1" size={24} color="white" />
      </TouchableOpacity>

      {/* Favourite Button */}
      <TouchableOpacity
        className="absolute top-8 right-14 z-10 bg-black p-2 rounded-full opacity-70"
        onPress={toggleFavorite}
      >
        <AntDesign
          name="heart"
          size={24}
          color={isLiked ? "#c226f1" : "white"}
        />
      </TouchableOpacity>

      {/* Read Fisrt Chapter Button */}
      <ThemedView
        className="absolute bottom-0 left-0 z-10 p-2 flex justify-center items-center w-full h-20"
        style={{
          elevation: 5,
        }}
      >
        <LinearGradient
          colors={["#c226f1", "#9e30ec"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="h-12 rounded-xl flex justify-center items-center w-10/12"
        >
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Reading", {
                comic,
                chapter: comicDetail?.chapters.content[0],
              })
            }
            className="flex justify-center items-center"
          >
            <ThemedText className="text-white font-bold text-xl">
              Đọc tập đầu
            </ThemedText>
          </TouchableOpacity>
        </LinearGradient>
      </ThemedView>

      {/* Comic Image */}
      <ComicImage comic={comic} widthImg={widthImg} heightImg={heightImg} />

      {isLoading ? (
        <LoadingCircle />
      ) : (
        <>
          {/* Đánh giá */}
          <View className="flex flex-row justify-between items-center p-3">
            <ThemedText className="text-lg font-bold">Đánh giá</ThemedText>
            <View className="flex flex-row items-center space-x-1">
              <FontAwesome name="star" size={21} color="#f1b207" />
              <FontAwesome name="star" size={21} color="#f1b207" />
              <FontAwesome name="star" size={21} color="#f1b207" />
              <FontAwesome name="star" size={21} color="#f1b207" />
              <FontAwesome name="star" size={21} color="#f1b207" />
              <ThemedText className="ml-2">4.9/5</ThemedText>
            </View>
          </View>

          {/* Giới thiệu */}
          <View className="px-3">
            <ThemedText className="text-lg font-bold">Giới thiệu</ThemedText>
            <ThemedText className="text-sm">
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

          {/* line */}
          <View className="border-t-[1px] border-gray-200 m-3" />

          {/* Chapter List */}
          <View className="px-3">
            <View className="flex flex-row justify-between items-center">
              <ThemedText className="text-lg font-bold">
                Danh sách tập
              </ThemedText>
              <TouchableOpacity onPress={() => setSortUp(!sortUp)}>
                <MaterialCommunityIcons
                  name={sortUp ? "sort-ascending" : "sort-descending"}
                  size={24}
                  color="#c226f1"
                />
              </TouchableOpacity>
            </View>
            <FlatList
              data={comicDetail?.chapters?.content || []}
              renderItem={renderChapterItem}
              keyExtractor={(item) => item.id}
              inverted={!sortUp}
              className="mt-2 h-[300px]"
            />
          </View>
        </>
      )}
    </ThemedView>
  );
}
