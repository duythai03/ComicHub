import { DimensionValue, Image, TouchableOpacity, View } from "react-native";
import { SimpleComicProps } from "./SimpleComic";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ThemedMaterialsIcon from "./themed/ThemedMaterialsIcon";
import { ThemedView } from "./themed/ThemedView";
import { ThemedText } from "./themed/ThemedText";
import ConfirmModal, { ConfirmModalProps } from "./modal/ConfirmModal";
import { useState } from "react";

type FavoriteComicProps = SimpleComicProps & {
	width?: DimensionValue;
	isRemoving: boolean;
	onUnFavorite: (closeModal: () => void) => Promise<void>;
	onCardPress: () => void;
	modalProps: ConfirmModalProps;
};

export default function FavoriteComic({
	onCardPress,
	width,
	imageUri,
	updatedAt,
	name,
	modalProps,
	onUnFavorite,
}: FavoriteComicProps) {
	const [modalVisible, setModalVisible] = useState(false);

	async function handleUnFavorite() {
		await onUnFavorite(() => setModalVisible(false));
		setModalVisible(false);
	}


	return (
		<ThemedView
			style={{
				width: width || "46%",
			}}
			className="flex-col flex mb-8 shadow-lg"
		>
			<TouchableOpacity onPress={onCardPress}>
				<ThemedView className="relative">
					<Image
						source={{
							uri: imageUri,
						}}
						className="w-full h-52 rounded-2xl border-4 mb-3"
						resizeMode="cover"
					/>
					<View className="absolute top-1 right-1 p-1 rounded-full bg-teal-50">
						<TouchableOpacity onPress={() => setModalVisible(true)}>
							<MaterialIcons name="favorite" size={30} color="#a03527" />
						</TouchableOpacity>
					</View>
				</ThemedView>
				<ThemedText ellipsizeMode="tail" numberOfLines={1} className="">
					{name}
				</ThemedText>
				<ThemedView className="flex-row items-center">
					<ThemedMaterialsIcon name="date-range" size={16} className="mr-2" />
					<ThemedText
						numberOfLines={1}
						ellipsizeMode="tail"
						subtitle
						className="text-sm"
					>

						{updatedAt}
					</ThemedText>
				</ThemedView>
			</TouchableOpacity>
			<ConfirmModal
				{...modalProps}
				visible={modalVisible}
				message={
					"Are you sure you want to remove this comic from your favorites?"
				}
				onClose={() => setModalVisible(false)}
				onConfirm={handleUnFavorite}
	
			/>
		</ThemedView>
	);
}
