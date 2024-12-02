import { View, Text, Image } from "react-native";
import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import ComicHub_Wallpaper from "../../assets/ComicHub_Wallpaper.jpeg";

export default function WelcomeScreen() {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("HomeTab");
    }, 7000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View className="flex-1 justify-center items-center bg-black">
      <Image
        source={ComicHub_Wallpaper}
        style={{ width: "100%", height: "100%" }}
      />
    </View>
  );
}
