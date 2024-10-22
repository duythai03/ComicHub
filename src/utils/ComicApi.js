import axios from "axios";

const apiBaseUrl = "https://otruyenapi.com/v1/api";
const truyenmoiEndpoint = `${apiBaseUrl}/danh-sach/truyen-moi`;

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
