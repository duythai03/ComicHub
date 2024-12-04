import { View, Text } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { fetchGenreComic } from "@/utils/ComicApi";
import LoadingCircle from "@/components/LoadingCircle";
import ThemedView from "@/components/themed/ThemedView";
import ComicList2 from "@/components/ComicList2";

export default function GenreScreen() {
	const categoryId = useRoute().params.categoryId;
	const [comics, setcomics] = useState([]);
	const [currentPage, setCurrentPage] = useState(0);
	const [totalPage, setTotalPage] = useState(0);

	const { isLoading: iscomicsLoading } = useQuery({
		queryKey: ["genre", categoryId, currentPage],
		queryFn: () => fetchGenreComic(categoryId, currentPage),
		onSuccess: (data) => {
			setcomics(data.content);
			setTotalPage(data.totalPages);
		},
		onError: (error) => {
			console.log(error);
		},
	});

  return (
    <>
      {iscomicsLoading ? (
        <LoadingCircle />
      ) : (
        <ThemedView className="px-3 flex-1">
          <ComicList2 data={comics} totalPage={totalPage} />
        </ThemedView>
      )}
    </>
  );
}
