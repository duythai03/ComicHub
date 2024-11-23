import { View, ScrollView, TextInput } from "react-native";
import { useEffect, useState } from "react";
import Entypo from "react-native-vector-icons/Entypo";
import Slider from "../components/Slider";
import { useQuery } from "@tanstack/react-query";
import {
	fetchDangPhatHanh,
	fetchHoanThanh,
	fetchSapRaMat,
	fetchTruyenMoi,
} from "../utils/ComicApi";
import ThemeButton from "../components/ThemeButton";
import { lightTheme, darkTheme } from "../utils/Theme";
import { useTheme } from "../utils/Context";
import ComicList from "../components/ComicList";
import LoadingCircle from "../components/LoadingCircle";
import { useNavigation } from "@react-navigation/native";

export default function HomeScreen() {
	const [truyenMoi, setTruyenMoi] = useState([]);
	const [truyenDangPhatHanh, setTruyenDangPhatHanh] = useState([]);
	const [truyenHoanThanh, setTruyenHoanThanh] = useState([]);
	const [truyenSapRaMat, setTruyenSapRaMat] = useState([]);
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

	const { isLoading: isTruyenDangPhatHanhLoading } = useQuery({
		queryKey: ["truyenDangPhatHanh"],
		queryFn: fetchDangPhatHanh,
		onSuccess: (data) => {
			setTruyenDangPhatHanh(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const { isLoading: isTruyenHoanThanhLoading } = useQuery({
		queryKey: ["truyenHoanThanh"],
		queryFn: fetchHoanThanh,
		onSuccess: (data) => {
			setTruyenHoanThanh(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const { isLoading: isTruyenSapRaMatLoading } = useQuery({
		queryKey: ["truyenSapRaMat"],
		queryFn: fetchSapRaMat,
		onSuccess: (data) => {
			setTruyenSapRaMat(data);
		},
		onError: (error) => {
			console.log(error);
		},
	});

	const isLoading =
		isTruyenMoiLoading ||
		isTruyenDangPhatHanhLoading ||
		isTruyenHoanThanhLoading ||
		isTruyenSapRaMatLoading;

	return (
		<View className="flex-1" style={theme.container}>
			<ScrollView className="mt-14 mx-2" showsVerticalScrollIndicator={false}>
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
						<ComicList title="Đang phát hành" data={truyenDangPhatHanh} />
						<ComicList title="Đã hoàn thành" data={truyenHoanThanh} />
						<ComicList title="Sắp ra mắt" data={truyenSapRaMat} />
					</>
				)}
			</ScrollView>
		</View>
	);
}
