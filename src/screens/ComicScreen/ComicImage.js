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
        <Text className="text-white text-lg font-bold">{comic.name}</Text>
        <Text className="text-gray-200 text-sm">
          Tác giả: {comic.authors?.[0] || "Đang cập nhập"}
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
  );
}
