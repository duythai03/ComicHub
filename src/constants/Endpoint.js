export const ENDPOINT = {
  // BASE_URL_V1: "http://10.0.2.2:8080/api",
  // BASE_URL_V1: "https://comic-production.up.railway.app/api",
  BASE_URL: "https://29be-14-169-94-70.ngrok-free.app/api",

  REFRESH_TOKEN_V1: "/v1/auth/refresh-token",

  // AUTHENTICATION
  LOGIN_V1: "/v1/auth/login",
  REGISTER_V1: "/v1/auth/register",
  LOGOUT_V1: "/v1/auth/logout",

  // USER
  GET_USER_PROFILE_V1: "/v1/users/profile",
  UPDATE_USER_PROFILE_V1: "/v1/users/profile",

  // FAVORITE
  GET_FAVORITE_V1: "/v1/comics/followed",
  GET_FAVORITE_COMIC_STATUS_V1: (comicId) =>
    `/v1/comics/${comicId}/follow-status`,
  ADD_FAVORITE_V1: (comicId) => `/v1/comics/followed/${comicId}`,
  REMOVE_FAVORITE_V1: (comicId) => `/v1/comics/followed/${comicId}`,
};
