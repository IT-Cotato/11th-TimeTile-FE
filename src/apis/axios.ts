import axios from "axios";
import { authInterceptor } from "./authInterceptor";

export const BASE_URL = "https://timetile-api.click/api";

export const axiosApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

export const authAxios = axios.create({
  // Bearer `token`이 필요한 api 호출 시
  baseURL: BASE_URL,
});

authInterceptor(authAxios, axiosApi);
