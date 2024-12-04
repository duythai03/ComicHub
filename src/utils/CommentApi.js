import { ENDPOINT } from "@/constants/Endpoint";
import privateRequest from "./request/privateRequest";
import axios from "axios";

const apiBaseUrl = `${ENDPOINT.BASE_URL}/v1`;
const commentEndpoint = `${apiBaseUrl}/comments`;

const commentApiCall = async (endpoints, params = {}) => {
  try {
    const response = await privateRequest.get(endpoints, {
      params: params,
      _optional_jwt_auth: true,
    });
    return response.data.content;
  } catch (error) {
    console.error("Error fetching data:", error);
    return { error: error.message };
  }
};

const postCommentApiCall = async (endpoints, content) => {
  console.log("API Call to:", endpoints, "with content:", content);
  try {
    const response = await privateRequest.post(endpoints, content, {
      _optional_jwt_auth: true,
    });
    console.log("API Response:", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "Error during API call:",
      error.response?.data || error.message
    );
    return { error: error.message };
  }
};

export const getCommentList = async (comicId) => {
  return await commentApiCall(`${commentEndpoint}/top-level`, { comicId });
};

export const postComment = async (content) => {
  return await postCommentApiCall(`${commentEndpoint}`, content);
};
