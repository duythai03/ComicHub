import axios from "axios";

const apiBaseUrl = "https://otruyenapi.com/v1/api";
const truyenmoiEndpoint = `${apiBaseUrl}/danh-sach/truyen-moi`;
const dangphathanhEndpoint = `${apiBaseUrl}/danh-sach/dang-phat-hanh`;
const hoanthanhEndpoint = `${apiBaseUrl}/danh-sach/hoan-thanh`;
const sapramatEndpoint = `${apiBaseUrl}/danh-sach/sap-ra-mat`;

const comicApiCall = async (endpoints, params = {}) => {
  const option = {
    method: "GET",
    url: endpoints,
    params: params,
  };
  try {
    const response = await axios.request(option);
    return response.data.data.items;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error.message };
  }
};

export const fetchTruyenMoi = async () => {
  return await comicApiCall(truyenmoiEndpoint, { page: 1 });
};

export const fetchDangPhatHanh = async () => {
  return await comicApiCall(dangphathanhEndpoint, { page: 1 });
};

export const fetchHoanThanh = async () => {
  return await comicApiCall(hoanthanhEndpoint, { page: 1 });
};

export const fetchSapRaMat = async () => {
  return await comicApiCall(sapramatEndpoint, { page: 1 });
};
