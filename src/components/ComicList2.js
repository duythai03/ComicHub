import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { LinearGradient } from "expo-linear-gradient";
import ThemedText from "./themed/ThemedText";

export default function ComicList2({ data, totalPage }) {
	const navigation = useNavigation();
	const renderItem = ({ item }) => {
		return (
			<View className="mt-6">
				<TouchableOpacity
					onPress={() => {
						navigation.navigate("ComicStack", { comic: item });
					}}
				>
					<View className="flex-row">
						<Image
							source={{ uri: item.thumbnailUrl }}
							className="w-20 h-32 rounded-lg"
							resizeMode="cover"
						/>
						<View className="ml-3 flex space-y-2">
							<ThemedText className="text-lg font-semibold">
								{item.name}
							</ThemedText>
							<ThemedText className="text-sm">
								Chap mới nhất: {item.newChapters[0].chapter}
							</ThemedText>
							<LinearGradient
								colors={["#c226f1", "#9e30ec"]}
								start={{ x: 0, y: 0 }}
								end={{ x: 1, y: 0 }}
								className="h-6 rounded-lg flex justify-center items-center w-20"
							>
								<Text
									style={{ color: "white" }}
									className="text-white font-bold text-sm"
								>
									On Going
								</Text>
							</LinearGradient>
							<View className="flex-row">
								{item.categories.slice(0, 3).map((category, index) => (
									<ThemedText
										key={index}
										className="text-sm border-[1px] rounded-full px-2 py-1 mr-2"
										style={{ borderColor: "#D1D5DB" }}
									>
										{category.name}
									</ThemedText>
								))}
							</View>
						</View>
					</View>
				</TouchableOpacity>
			</View>
		);
	};
	return (
		<View>
			<FlatList
				data={data}
				keyExtractor={(item) => item.id.toString()}
				renderItem={renderItem}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}
