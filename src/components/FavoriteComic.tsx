import { DimensionValue, Image, TouchableOpacity, View } from "react-native";
import { SimpleComicProps } from "./SimpleComic";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ThemedMaterialsIcon from "./themed/ThemedMaterialsIcon";
import { ThemedView } from "./themed/ThemedView";
import { ThemedText } from "./themed/ThemedText";

type FavoriteComicProps = SimpleComicProps & {
	width?: DimensionValue;
	onUnFavorite: () => void;
};

export default function FavoriteComic({
	width,
	imageUri,
	updatedAt,
	name,
	onUnFavorite,
}: FavoriteComicProps) {
	return (
		<ThemedView
			style={{
				width: width || "46%",
			}}
			className="flex-col flex mb-8 shadow-lg"
		>
			<ThemedView className="relative">
				<Image
					source={{
						uri: imageUri,
					}}
					className="w-full h-52 rounded-2xl border-4 mb-3"
					resizeMode="cover"
				/>
				<View className="absolute top-1 right-1 p-1 rounded-full bg-teal-50">
					<TouchableOpacity onPress={onUnFavorite}>
						<MaterialIcons name="favorite" size={30} color="#a03527" />
					</TouchableOpacity>
				</View>
			</ThemedView>
			<ThemedText ellipsizeMode="tail" numberOfLines={1} className="">
				{name}
			</ThemedText>
			<ThemedView className="flex-row items-center">
				<ThemedMaterialsIcon name="date-range" size={16} className="mr-2" />
				<ThemedText subtitle className="text-sm">
					{updatedAt}
				</ThemedText>
			</ThemedView>
		</ThemedView>
	);
}
