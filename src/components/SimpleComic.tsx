import ThemedText from "@/components/themed/ThemedText";
import ThemedView from "@/components/themed/ThemedView";
import React from "react";
import { Image, View } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ThemedMaterialsIcon from "@/components/themed/ThemedMaterialsIcon";
import { TouchableOpacity } from "react-native-gesture-handler";

export type SimpleComicProps = {
	imageUri: string;
	name: string;
	updatedAt: string;
};

function SimpleComic({ imageUri, name, updatedAt }: SimpleComicProps) {
	return (
		<ThemedView
			style={{
				width: "46%",
			}}
			className="flex-col flex mb-8 shadow-lg"
		>
			<Image
				source={{
					uri: imageUri,
				}}
				className="w-full h-52 rounded-2xl border-4 mb-3"
				resizeMode="cover"
			/>
			<ThemedText ellipsizeMode="tail" numberOfLines={1}>
				{name}
			</ThemedText>
			<ThemedView className="flex-row items-center">
				<ThemedMaterialsIcon
					primary
					name="date-range"
					size={16}
					className="mr-2"
				/>
				<ThemedText subtitle className="text-sm">
					{updatedAt}
				</ThemedText>
			</ThemedView>
		</ThemedView>
	);
}

export default SimpleComic;
