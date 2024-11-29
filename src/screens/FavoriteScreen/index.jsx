import { ThemedText } from "@/components/themed/ThemedText";
import { ThemedView } from "@/components/themed/ThemedView";
import React, { useState } from "react";
import { FlatList } from "react-native";
import FavoriteComic from "@/components/FavoriteComic";
import { ThemedLoadingCircle } from "@/components/themed";
import ErrorComponent from "./ErrorComponent";
import { useNavigation } from "@react-navigation/native";
import { useFavorite } from "@/contexts/FavoriteContext";
import { formatTimeAgo } from "@/utils/dateago";

function FavoriteScreen() {
	const navigation = useNavigation();
	const {
		error,
		favoriteComics,

		initialFetching,
		nextPageFetching,

		fetchNextPage,
		atomicFetchNextPage,

		addFavoriteComic,
		removeFavoriteComic,
	} = useFavorite();

	return (
		<ThemedView className="flex-1 px-6">
			<ThemedView className="flex-row py-4 mb-2">
				<ThemedText className="flex-1 text-xl font-bold">Favorite</ThemedText>
			</ThemedView>
			{(initialFetching && (
				<ThemedView className="flex-1 justify-center items-center">
					<ThemedLoadingCircle size={80} loading={initialFetching} />
				</ThemedView>
			)) ||
				(error && (
					<ErrorComponent
						className="flex-1 justify-center items-center"
						error={error}
					/>
				)) || (
					<>
						<FlatList
							className="h-full"
							data={favoriteComics}
							numColumns={2}
							columnWrapperStyle={{ justifyContent: "space-between" }}
							onEndReachedThreshold={0.8}
							onEndReached={atomicFetchNextPage}
							renderItem={({ item, index }) => {
								return (
									<FavoriteComic
										key={index}
										onCardPress={() => {
											navigation.navigate("ComicStack", {
												from: "Favorite",
												comic: item,
											});
										}}
										onUnFavorite={async (closeModal) => {
											await removeFavoriteComic(item.id);
										}}
										name={item.name}
										imageUri={item.thumbnailUrl}
										updatedAt={formatTimeAgo(item?.newChapterUpdatedAt)}
									/>
								);
							}}
						/>
						{nextPageFetching && (
							<ThemedView className="w-full flex flex-row justify-center items-center">
								<ThemedLoadingCircle size="small" loading={nextPageFetching} />
							</ThemedView>
						)}
					</>
				)}
		</ThemedView>
	);
}
export default FavoriteScreen;
