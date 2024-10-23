import { View, Text, ScrollView, TextInput } from "react-native";
import { useState, useEffect } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Slider from "../components/Slider";
import { useQuery } from "@tanstack/react-query";
import { fetchTruyenMoi } from "../utils/ComicApi";
import ThemeButton from "../components/ThemeButton";
import { lightTheme, darkTheme } from "../utils/Theme";
import { useTheme } from "../utils/Context";

export default function HomeScreen() {
  const [truyenMoi, setTruyenMoi] = useState([]);
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const { isLoading: isTruyenMoiLoading } = useQuery({
    queryKey: ["truyenMoi"],
    queryFn: fetchTruyenMoi,
    onSuccess: (data) => {
      setTruyenMoi(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <View className="flex-1" style={theme.container}>
      <ScrollView className="mt-14 mx-4">
        <View className="flex-row justify-between items-center">
          <View className="relative w-[80%] mb-4">
            <TextInput
              placeholder="Tìm kiếm truyện..."
              className="w-full rounded-3xl p-2 pl-10 bg-white"
              style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                elevation: 2,
              }}
            />
            <Entypo
              name="magnifying-glass"
              size={24}
              style={{
                position: "absolute",
                left: 10,
                top: "50%",
                transform: [{ translateY: -12 }],
              }}
            />
          </View>
          <View className="-translate-y-2">
            <ThemeButton />
          </View>
        </View>
        <Slider data={truyenMoi} />
      </ScrollView>
    </View>
  );
}
