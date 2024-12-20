import React from "react";
import { Image, View, Text } from "react-native";
import GradientOverlay from "../../components/GradientOverlay";

export default function ComicImage({ comic, widthImg, heightImg }) {
  return (
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
        <Text
          style={{ color: "#fff" }}
          className="text-white text-lg font-bold"
        >
          {comic.name}
        </Text>
        <Text
          style={{ color: "#e5e7eb" }}
          className="text-gray-200 text-sm text-white"
        >
          Tác giả: {comic.authors?.[0].name || "Đang cập nhập"}
        </Text>
        <View className="flex flex-row space-x-3">
          {comic.categories.slice(0, 4).map((genre, index) => (
            <View key={index} className="my-2">
              <Text className="text-[#D1D5DB] text-sm p-1 border-[1px] border-[#D1D5DB] rounded-sm text-center">
                {genre.name}
              </Text>
            </View>
          ))}
        </View>
      </GradientOverlay>
    </View>
  );
}
