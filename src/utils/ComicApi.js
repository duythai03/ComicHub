import { ENDPOINT } from "@/constants/Endpoint";
import axios from "axios";
import privateRequest from "./request/privateRequest";
import publicRequest from "./request/publicRequest";

// const apiBaseUrl = "https://comic-production.up.railway.app/api/v1";
const apiBaseUrl = `${ENDPOINT.BASE_URL}/v1`;
const comicEndpoint = `${apiBaseUrl}/comics`;
const searchEndpoint = `${apiBaseUrl}/comics/searching`;

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

const genreComicApiCall = async (endpoints, params = {}) => {
  const option = {
    method: "GET",
    url: endpoints,
    params: params,
  };
  try {
    const response = await axios.request(option);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error.message };
  }
};

const comicDetailApiCall = async (endpoints, params = {}) => {
  try {
    const response = await privateRequest.get(endpoints, {
      params: params,
      _optional_jwt_auth: true,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error.message };
  }
};

const chapterApiCall = async (endpoints, params = {}) => {
  const option = {
    method: "GET",
    url: endpoints,
    params: params,
  };
  try {
    const response = await axios.request(option);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error.message };
  }
};

const imagePagesApiCall = async (endpoints, params = {}) => {
  const option = {
    method: "GET",
    url: endpoints,
    params: params,
  };
  try {
    const response = await axios.request(option);
    return response.data.imagePages;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error.message };
  }
};

export const fetchTruyenMoi = async () => {
  return await comicApiCall(comicEndpoint, { page: 0 }, { size: 24 });
};

export const fetchComicDetail = async (comicId) => {
  return await comicDetailApiCall(
    `${comicEndpoint}/${comicId}`,
    { sourceName: "OTRUYEN" },
    { page: 0 },
    { size: 24 }
  );
};

export const fetchChapter = async (comicId, chapterId) => {
  return await chapterApiCall(
    `${comicEndpoint}/${comicId}/chapters/${chapterId}`
  );
};

export const fetchImagePagesApi = async (comicId, chapterId) => {
  return await imagePagesApiCall(
    `${comicEndpoint}/${comicId}/chapters/${chapterId}`
  );
};

export const fetchGenreComic = async (categoryId, pageNumber) => {
  return await genreComicApiCall(
    comicEndpoint,
    { filterCategoryIds: categoryId },
    { page: pageNumber },
    { size: 24 }
  );
};

export const fetchSearchComic = async (searchKey, pageNumber) => {
  return await genreComicApiCall(
    searchEndpoint,
    { q: searchKey },
    { page: pageNumber },
    { size: 24 }
  );
};
