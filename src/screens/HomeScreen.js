import { View, ScrollView, TextInput, Image } from "react-native";
import { useEffect, useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Slider from "../components/Slider";
import { useQuery } from "@tanstack/react-query";
import { fetchTruyenMoi, fetchGenreComic } from "../utils/ComicApi";
import ThemeButton from "../components/ThemeButton";
import { lightTheme, darkTheme } from "../utils/Theme";
import { useTheme } from "../utils/Context";
import LoadingCircle from "../components/LoadingCircle";
import { useNavigation } from "@react-navigation/native";
import ComicList from "@/components/ComicList";
import SearchInput from "@/components/SearchInput";
import advertising1 from "../../assets/advertising1.jpeg";

export default function HomeScreen() {
  const [truyenMoi, setTruyenMoi] = useState([]);
  const [truyenMau, setTruyenMau] = useState([]);
  const [truyenMauTotalPage, setTruyenMauTotalPage] = useState(0);
  const [romance, setRomance] = useState([]);
  const [romanceTotalPage, setRomanceTotalPage] = useState(0);
  const [manga, setManga] = useState([]);
  const [mangaTotalPage, setMangaTotalPage] = useState(0);
  const [chuyenSinh, setChuyenSinh] = useState([]);
  const [chuyenSinhTotalPage, setChuyenSinhTotalPage] = useState(0);
  const [Action, setAction] = useState([]);
  const [ActionTotalPage, setActionTotalPage] = useState(0);
  const { isDarkMode } = useTheme();
  const theme = isDarkMode ? darkTheme : lightTheme;
  const [advertising, setAdvertising] = useState(true);

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
    queryFn: () => fetchGenreComic("6724cc2718ed6853571a86a6", 0),
    onSuccess: (data) => {
      setTruyenMau(data);
      setTruyenMauTotalPage(data.totalPages);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { isLoading: isRomanceLoading } = useQuery({
    queryKey: ["romance"],
    queryFn: () => fetchGenreComic("6724cc2718ed6853571a8693", 0),
    onSuccess: (data) => {
      setRomance(data);
      setRomanceTotalPage(data.totalPages);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { isLoading: isMangaLoading } = useQuery({
    queryKey: ["manga"],
    queryFn: () => fetchGenreComic("6724cc2718ed6853571a8689", 0),
    onSuccess: (data) => {
      setManga(data);
      setMangaTotalPage(data.totalPages);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { isLoading: isChuyenSinhLoading } = useQuery({
    queryKey: ["chuyenSinh"],
    queryFn: () => fetchGenreComic("6724cc2718ed6853571a8679", 0),
    onSuccess: (data) => {
      setChuyenSinh(data);
      setChuyenSinhTotalPage(data.totalPages);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const { isLoading: isActionLoading } = useQuery({
    queryKey: ["Action"],
    queryFn: () => fetchGenreComic("6724cc2718ed6853571a8676", 0),
    onSuccess: (data) => {
      setAction(data);
      setActionTotalPage(data.totalPages);
    },
    onError: (error) => {
      console.log(error);
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
    <View className="flex-1 relative" style={theme.container}>
      <ScrollView className="mx-2" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-center">
          <SearchInput />
          <View className="-translate-y-2">
            <ThemeButton />
          </View>
        </View>
        {isLoading ? (
          <LoadingCircle />
        ) : (
          <>
            <Slider data={truyenMoi} />
            <ComicList
              title="Truyện màu"
              data={truyenMau}
              id="6724cc2718ed6853571a86a6"
            />
            <ComicList
              title="Lãng mạn"
              data={romance}
              id="6724cc2718ed6853571a8693"
            />
            <ComicList
              title="Manga"
              data={manga}
              id="6724cc2718ed6853571a8689"
            />
            <ComicList
              title="Chuyển sinh"
              data={chuyenSinh}
              id="6724cc2718ed6853571a8679"
            />
            <ComicList
              title="Hành động"
              data={Action}
              id="6724cc2718ed6853571a8676"
            />
          </>
        )}
      </ScrollView>
      {advertising && (
        <View
          className="h-[500] w-11/12 absolute m-auto"
          style={{
            borderRadius: 15,
            overflow: "hidden",
            top: "17%",
            left: "4%",
          }}
        >
          <Image
            source={advertising1}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute right-1 top-3">
            <Entypo
              name="cross"
              size={40}
              color="#fff"
              onPress={() => setAdvertising(false)}
            />
          </View>
        </View>
      )}
    </View>
  );
}
