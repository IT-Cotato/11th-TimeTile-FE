import axios from "axios";
import { authInterceptor } from "./authInterceptor";

export const BASE_URL = "https://timetile-api.click/api";

// 일반 api 요청
export const axiosApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 헤더 유연한 요청 (ex. 파일 업로드)
export const basicAxiosApi = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// 인증이 필요한 요청 (accessToken 필요)
export const authAxios = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

authInterceptor(authAxios, axiosApi);
