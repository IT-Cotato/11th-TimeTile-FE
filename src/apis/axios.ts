import axios from "axios";

export const BASE_URL = "https://timetile-api.click/api";
export const axiosApi = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});
