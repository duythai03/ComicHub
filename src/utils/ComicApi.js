import { ENDPOINT } from "@/constants/Endpoint";
import axios from "axios";

// const apiBaseUrl = "https://comic-production.up.railway.app/api/v1";
const apiBaseUrl = `${ENDPOINT.BASE_URL}/v1`;
const truyenmoiEndpoint = `${apiBaseUrl}/comics?page=0&size=24`;
const genresEndpoint = `${apiBaseUrl}/comics`;

const comicApiCall = async (endpoints, params = {}) => {
	const option = {
		method: "GET",
		url: endpoints,
		params: params,
	};
	try {
		const response = await axios.request(option);
		return response.data.content;
	} catch (error) {
		console.error("Error fetching data:", error);
		return { error: error.message };
	}
};

export const fetchTruyenMoi = async () => {
	return await comicApiCall(truyenmoiEndpoint);
};

export const fetchTruyenMau = async () => {
	return await comicApiCall(
		genresEndpoint,
		{ filterCategoryIds: "6724cc2718ed6853571a86a6" },
		{ page: 0 },
		{ size: 24 },
	);
};

export const fetchRomance = async () => {
	return await comicApiCall(
		genresEndpoint,
		{ filterCategoryIds: "6724cc2718ed6853571a8693" },
		{ page: 0 },
		{ size: 24 },
	);
};

export const fetchManga = async () => {
	return await comicApiCall(
		genresEndpoint,
		{ filterCategoryIds: "6724cc2718ed6853571a8689" },
		{ page: 0 },
		{ size: 24 },
	);
};

export const fetchChuyenSinh = async () => {
	return await comicApiCall(
		genresEndpoint,
		{ filterCategoryIds: "6724cc2718ed6853571a8679" },
		{ page: 0 },
		{ size: 24 },
	);
};

export const fetchAction = async () => {
	return await comicApiCall(
		genresEndpoint,
		{ filterCategoryIds: "6724cc2718ed6853571a8676" },
		{ page: 0 },
		{ size: 24 },
	);
};
