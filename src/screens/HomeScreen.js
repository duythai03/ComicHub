import { View, ScrollView, TextInput } from "react-native";
import { useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Slider from "../components/Slider";
import { useQuery } from "@tanstack/react-query";
import {
  fetchTruyenMoi,
  fetchTruyenMau,
  fetchRomance,
  fetchManga,
  fetchChuyenSinh,
  fetchAction,
} from "../utils/ComicApi";
import ThemeButton from "../components/ThemeButton";
import { lightTheme, darkTheme } from "../utils/Theme";
import { useTheme } from "../utils/Context";
import LoadingCircle from "../components/LoadingCircle";
import { useNavigation } from "@react-navigation/native";
import ComicList from "@/components/ComicList";

export default function HomeScreen() {
  const [truyenMoi, setTruyenMoi] = useState([]);
  const [truyenMau, setTruyenMau] = useState([]);
  const [romance, setRomance] = useState([]);
  const [manga, setManga] = useState([]);
  const [chuyenSinh, setChuyenSinh] = useState([]);
  const [Action, setAction] = useState([]);
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;

  const navigation = useNavigation();

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

  const { isLoading: isTruyenMauLoading } = useQuery({
    queryKey: ["truyenMau"],
    queryFn: fetchTruyenMau,
    onSuccess: (data) => {
      setTruyenMau(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { isLoading: isRomanceLoading } = useQuery({
    queryKey: ["romance"],
    queryFn: fetchRomance,
    onSuccess: (data) => {
      setRomance(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { isLoading: isMangaLoading } = useQuery({
    queryKey: ["manga"],
    queryFn: fetchManga,
    onSuccess: (data) => {
      setManga(data);
    },
  });

  const { isLoading: isChuyenSinhLoading } = useQuery({
    queryKey: ["chuyenSinh"],
    queryFn: fetchChuyenSinh,
    onSuccess: (data) => {
      setChuyenSinh(data);
    },
  });

  const { isLoading: isActionLoading } = useQuery({
    queryKey: ["Action"],
    queryFn: fetchAction,
    onSuccess: (data) => {
      setAction(data);
    },
  });

  const isLoading =
    isTruyenMoiLoading ||
    isTruyenMauLoading ||
    isRomanceLoading ||
    isMangaLoading ||
    isChuyenSinhLoading ||
    isActionLoading;

  return (
    <View className="flex-1" style={theme.container}>
      <ScrollView className="mx-2" showsVerticalScrollIndicator={false}>
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
                transform: [{ translateY: -17 }],
              }}
              onPress={() => navigation.navigate("Search")}
            />
          </View>
          <View className="-translate-y-2">
            <ThemeButton />
          </View>
        </View>
        {isLoading ? (
          <LoadingCircle />
        ) : (
          <>
            <Slider data={truyenMoi} />
            <ComicList title="Truyện màu" data={truyenMau} />
            <ComicList title="Lãng mạn" data={romance} />
            <ComicList title="Manga" data={manga} />
            <ComicList title="Chuyển sinh" data={chuyenSinh} />
            <ComicList title="Hành động" data={Action} />
          </>
        )}
      </ScrollView>
    </View>
  );
}
