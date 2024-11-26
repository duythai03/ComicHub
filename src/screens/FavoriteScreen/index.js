import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import FontAwesome6 from "react-native-vector-icons/FontAwesome6";
import { useState } from "react";
import React from "react";
import { StyleSheet, ScrollView, FlatList, Image, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ThemedMaterialsIcon from "@/components/themed/ThemedMaterialsIcon";
import { TouchableOpacity } from "react-native-gesture-handler";
import FavoriteComic from "@/components/FavoriteComic";

function FavoriteScreen() {
	const [comics, setComics] = useState([
		{
			image:
				"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
			title: "Comic 1 dfdf dfdf df df d",
			author: "Author 1",
			isNew: true, // Thêm thuộc tính để đánh dấu comics mới
			chapters: 12, // Số lượng chương
		},
		{
			image:
				"https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
			title: "Comic 2 - Another Great Story",
			author: "Author 2",
			isNew: false,
			chapters: 20,
		},
	]);

	return (
		<ThemedView className="flex-1 px-6">
			<ThemedView className="flex-row py-4 mb-2">
				<ThemedText className="flex-1 text-xl font-bold">Favorite</ThemedText>
			</ThemedView>
			<FlatList
				className="h-full"
				data={comics}
				numColumns={2}
				columnWrapperStyle={{ justifyContent: "space-between" }}
				renderItem={({ item }) => {
					return (
						<FavoriteComic
							name={item.title}
							imageUri={item.image}
							updatedAt="2 days ago"
						/>
					);
				}}
			/>
		</ThemedView>
	);
}
export default FavoriteScreen;
