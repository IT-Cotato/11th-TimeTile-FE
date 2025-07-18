import { axiosApi } from "./axios";

export const AuthApi = {
  KAKAO_TOKEN: async (code: string) => {
    const response = await axiosApi.get(`/`);
  },
  KAKAO_LINK: async () => {
    const response = await axiosApi.get("/oauth2/authorization/kakao");
    return response;
  },
};
