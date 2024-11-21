import { View, Text, Dimensions, Image } from "react-native";
import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { useTheme } from "../utils/Context";
import { lightTheme, darkTheme } from "../utils/Theme";
import AntDesign from "react-native-vector-icons/AntDesign";
import GradientOverlay from "../components/GradientOverlay";

export default function ComicScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const comic = route?.params?.comic;
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const { width, height } = Dimensions.get("window");
  const widthImg = width;
  const heightImg = height * 0.35;

  if (!comic) {
    return (
      <View>
        <Text>Comic data is missing!</Text>
      </View>
    );
  }

  return (
    <View className="flex-1" style={theme.container}>
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
              uri: `https://img.otruyenapi.com/uploads/comics/${comic.thumb_url}`,
            }}
            className="w-full h-full"
          />
          <GradientOverlay>
            <Text className="text-white text-lg font-bold">{comic.name}</Text>
            <Text className="text-gray-200 text-sm">
              Tác giả:{" "}
              {comic.author && comic.author[0]
                ? comic.author[0]
                : "Đang cập nhập"}
            </Text>
            <View className="flex flex-row space-x-3">
              {comic.category.slice(0, 4).map((genre, index) => (
                <View key={index} className="my-2">
                  <Text className="text-gray-200 text-sm p-1 border-[1px] border-white rounded-sm text-center">
                    {genre.name}
                  </Text>
                </View>
              ))}
            </View>
          </GradientOverlay>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Reading", { comic })}
        >
          <Text>{comic.name}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
