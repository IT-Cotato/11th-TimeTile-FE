import axios from "axios";
import { authInterceptor } from "./authInterceptor";

export const BASE_URL = "https://timetile-api.click/api";

// 인증 필요 없는 요청 (ex: 로그인, 회원가입, 토큰 재발급)
export const axiosApi = axios.create({
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// 인증이 필요한 요청 (accessToken 필요)
export const authAxios = axios.create({
  baseURL: "/api",
  withCredentials: true,
});

authInterceptor(authAxios, axiosApi);
