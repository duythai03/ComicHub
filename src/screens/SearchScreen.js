import { View, Text } from "react-native";
import { useState } from "react";
import { useRoute } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { fetchSearchComic } from "@/utils/ComicApi";
import LoadingCircle from "@/components/LoadingCircle";
import { ThemedView } from "@/components/themed/ThemedView";
import ComicList2 from "@/components/ComicList2";

export default function SearchScreen() {
  const searchText = useRoute().params.searchText;
  const [comics, setComics] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPage, setTotalPage] = useState(0);

  const { isLoading: isComicsLoading } = useQuery({
    queryKey: ["search", searchText, currentPage],
    queryFn: () => fetchSearchComic(searchText, currentPage),
    onSuccess: (data) => {
      setComics(data.content);
      setTotalPage(data.totalPages);
    },
    onError: (error) => {
      console.log(error);
    },
  });
  return (
    <ThemedView className="flex-1">
      {isComicsLoading ? (
        <LoadingCircle />
      ) : (
        <ThemedView className="px-3">
          <ComicList2 data={comics} totalPage={totalPage} />
        </ThemedView>
      )}
    </ThemedView>
  );
}
