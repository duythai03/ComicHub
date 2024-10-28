import {
  View,
  Text,
  Image,
  Dimensions,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import balloonIcon from "../../assets/image/balloonIcon.png";
import Carousel from "react-native-snap-carousel";
import AntDesign from "react-native-vector-icons/AntDesign";
import { useTheme } from "../utils/Context";
import { lightTheme, darkTheme } from "../utils/Theme";

const { width, height } = Dimensions.get("window");
const widthImg = width * 0.7;
const heightImg = height * 0.2;

export default function Slider({ data }) {
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const renderItem = ({ item, index }) => {
    const actualIndex = index % data.length;
    return (
      <TouchableWithoutFeedback>
        <View key={index} className="space-y-1 mr-4">
          <View
            style={{
              width: widthImg,
              height: heightImg,
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
            <View
              className="absolute bottom-0 w-full h-1/3 rounded-b-2xl"
              style={{ backgroundColor: "rgba(0, 0, 0, 0.6)" }}
            >
              <Text className="ml-4 mt-2 text-base font-bold text-white">
                {item.name.length > 24
                  ? item.name.slice(0, 24) + "..."
                  : item.name}
              </Text>
              <View className="px-4 flex-row justify-between items-center">
                <Text className="text-sm text-white font-bold">
                  Chapter: {item.chaptersLatest[0].chapter_name}
                </Text>
                <View className="flex-row items-center">
                  <AntDesign name="star" size={16} color="#f1b207" />
                  <Text className="text-sm text-white ml-1">4.5</Text>
                </View>
              </View>
            </View>
            <View className="rounded-full w-8 h-8 bg-[#9e2fec] absolute top-3 left-3 flex-row justify-center items-center">
              <Text className="text-white font-semibold">
                #{actualIndex + 1}
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View className="mb-2">
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Image source={balloonIcon} className="w-8 h-8" />
          <Text className="ml-2 font-semibold text-lg" style={theme.text}>
            Truyện mới cập nhập
          </Text>
        </View>
        <AntDesign name="arrowright" size={24} color="#c226f1" />
      </View>
      <Carousel
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item._id}-${index}`}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        sliderWidth={width}
        itemWidth={width * 0.7}
        loop={true}
        loopClonesPerSide={data.length}
        firstItem={0}
      />
    </View>
  );
}
