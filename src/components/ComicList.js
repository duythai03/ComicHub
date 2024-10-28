import { View, Text, FlatList, Image } from "react-native";
import React from "react";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTheme } from "../utils/Context";
import { lightTheme, darkTheme } from "../utils/Theme";

export default function ComicList({ title, data }) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const renderItem = ({ item }) => {
    return (
      <View className="mr-3">
        <View
          style={{
            width: 120,
            height: 180,
            borderRadius: 10,
            position: "relative",
          }}
        >
          <Image
            source={{
              uri: `https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`,
            }}
            className="w-full h-full rounded-2xl"
            resizeMode="cover"
          />
        </View>
        <Text
          className="mt-1 text-sm font-semibold text-center"
          style={theme.text}
        >
          {item.name.length > 24 ? item.name.slice(0, 10) + "..." : item.name}
        </Text>
      </View>
    );
  };
  return (
    <View className="my-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-semibold text-lg" style={theme.text}>
          {title}
        </Text>
        <AntDesign name="arrowright" size={24} color="#c226f1" />
      </View>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
}