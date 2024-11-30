import {
	favoriteComic,
	getFavoriteComicsV1,
	unfavoriteComic,
} from "@/apiServices/favoriteService";
import { EventName } from "@/constants/EventName";
import { addEventListener } from "@/utils/event";
import { HttpStatusCode } from "axios";
import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react";
import Toast from "react-native-toast-message";

const FavoriteContext = createContext();

export function FavoriteProvider({ children }) {
	const [error, setError] = useState(null);
	const [favoriteComics, setFavoriteComics] = useState([]);

	const [currentPage, setCurrentPage] = useState(-1);
	const [totalComics, setTotalComics] = useState(0);

	const [initialFetching, setInitialFetching] = useState(false);
	const [nextPageFetching, setNextPageFetching] = useState(false);

	const hasNextPage = () => {
		return currentPage == -1 || totalComics > favoriteComics.length;
	};

	const fetchComics = useCallback(async (page, size = 8, sort) => {
		console.log("Fetching favorite comics page " + page);
		const data = await getFavoriteComicsV1(
			{
				page: page,
				size: size,
				sort: sort,
			},
			(_, error) => setError(error),
			() => setError(null),
		);
		console.log("End fetching favorite comics page " + page);

		if (!data) return;

		const { content, totalElements } = data;

		if (currentPage < 0) {
			console.log("Total favorite comics: " + totalElements);
			setTotalComics(totalElements);
		}

		return content;
	}, []);

	const fetchNextPage = useCallback(async () => {
		setNextPageFetching(true);

		if (!hasNextPage()) {
			setNextPageFetching(false);
			return;
		}

		const nextPage = currentPage + 1;

		const comics = await fetchComics(nextPage);

		if (comics) {
			setFavoriteComics((prev) => {
				const uniqueMap = new Map(prev.map((item) => [item.id, item]));
				comics.forEach((item) => {
					if (!uniqueMap.has(item.id)) {
						uniqueMap.set(item.id, item);
						prev.push(item);
					}
				});
				return prev;
			});
		}

		setNextPageFetching(false);
		setCurrentPage(nextPage);
	}, [currentPage]);

	const atomicFetchNextPage = useCallback(() => {
		if (nextPageFetching) {
			return;
		}

		fetchNextPage();
	}, [nextPageFetching, fetchNextPage]);

	const removeFavoriteComic = async (comicId) => {
		console.log(
			"Removing favorite comic with id " + comicId + " from favorites ...",
		);
		await unfavoriteComic(
			comicId,
			(errorCode) => {
				switch (errorCode) {
					case HttpStatusCode.NotFound:
						setFavoriteComics((prev) => prev.filter((c) => c.id !== comicId));
						Toast.show({
							type: "info",
							text1: "Comic not in favorites or already removed",
						});
						break;
					default:
						Toast.show({
							type: "error",
							text1: "Failed to remove comic from favorites",
						});
				}
			},
			(statusCode) => {
				switch (statusCode) {
					case HttpStatusCode.NoContent:
						setFavoriteComics((prev) => prev.filter((c) => c.id !== comicId));
						setTotalComics((prev) => prev - 1);
						break;
					default:
				}
			},
		);
	};

	const addFavoriteComic = async (comic) => {
		const comicId = comic.id;
		if (favoriteComics.some((c) => c.id === comicId)) {
			Toast.show({
				type: "info",
				text1: "Comic already in favorites",
			});
		}

		console.log("Add favorite comic with id " + comicId);
		await favoriteComic(
			comicId,
			(errorCode) => {
				switch (errorCode) {
					case HttpStatusCode.Conflict:
						Toast.show({ type: "info", text1: "Comic already in favorites" });
						break;
					default:
						break;
				}
			},
			(statusCode) => {
				if (statusCode == HttpStatusCode.NoContent) {
					setFavoriteComics((prev) => [...prev, comic]);
					setTotalComics((prev) => prev + 1);
				}
			},
		);
	};

	const resetContext = useCallback(() => {
		setFavoriteComics([]);
		setCurrentPage(-1);
		setTotalComics(0);
		setInitialFetching(false);
		setNextPageFetching(false);
		setError(null);
	}, []);

	useEffect(() => {
		async function initialFetchPage() {
			console.log("Initial fetching favorite comics ...");
			setInitialFetching(true);
			await fetchNextPage();
			setInitialFetching(false);
		}

		initialFetchPage();

		const loginHandler = addEventListener(EventName.LOGIN, async () => {
			if (currentPage < 0) {
				await fetchNextPage();
			}
		});

		const logoutHandler = addEventListener(EventName.LOGOUT, () => {
			resetContext();
		});

		return () => {
			loginHandler.remove();
			logoutHandler.remove();
		};
	}, []);

	return (
		<FavoriteContext.Provider
			value={{
				error,
				currentPage,
				favoriteComics,
				totalComics,

				initialFetching,
				nextPageFetching,

				fetchComics,
				fetchNextPage,
				atomicFetchNextPage,

				removeFavoriteComic,
				addFavoriteComic,
			}}
		>
			{children}
		</FavoriteContext.Provider>
	);
}

export function useFavorite() {
	const context = useContext(FavoriteContext);
	if (!context) {
		throw new Error("useFavorite must be used within a Favorite Provider");
	}

	const {
		error,
		currentPage,
		favoriteComics,
		totalComics,

		initialFetching,
		nextPageFetching,

		fetchComics,
		fetchNextPage,
		atomicFetchNextPage,

		removeFavoriteComic,
		addFavoriteComic,
	} = context;

	return {
		error,
		currentPage,
		favoriteComics,
		totalComics,

		initialFetching,
		nextPageFetching,

		fetchComics,
		fetchNextPage,
		atomicFetchNextPage,

		removeFavoriteComic,
		addFavoriteComic,
	};
}
