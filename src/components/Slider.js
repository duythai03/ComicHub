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

const { width, height } = Dimensions.get("window");

export default function Slider({ data }) {
  const renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback>
        <View key={index} className="space-y-1 mr-4">
          <Image
            source={{
              uri: `https://img.otruyenapi.com/uploads/comics/${item.thumb_url}`,
            }}
            style={{
              width: width * 0.7,
              height: height * 0.2,
              borderRadius: 10,
            }}
            resizeMode="cover"
          />
          <Text className="text-neutral-300 ml-1 text-lg font-bold">
            {item.name.length > 16 ? item.name.slice(0, 16) + "..." : item.name}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <View>
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center">
          <Image source={balloonIcon} className="w-8 h-8" />
          <Text className="ml-2 font-semibold text-lg ">
            Truyện mới cập nhập
          </Text>
        </View>
        <AntDesign name="arrowright" size={24} color="#c226f1" />
      </View>
      <Carousel
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item._id.toString()}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
        sliderWidth={width}
        itemWidth={width * 0.7}
      />
    </View>
  );
}
