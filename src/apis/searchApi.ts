import { authAxios } from "@/apis/axios";

export const searchApi = {
  getSuggestions: async (prefix: string) => {
    const res = await authAxios.get("/search/suggestions", {
      params: { prefix },
    });
    return res.data;
  },
  getRecent: async () => {
    const res = await authAxios.get("/search/recent");
    return res.data;
  },
  deleteRecent: async (keyword: string) => {
    const response = await authAxios.delete(
      `/search/recent/${encodeURIComponent(keyword)}`
    );
    return response.data;
  },
};
