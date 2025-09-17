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
    const res = await authAxios.delete(
      `/search/recent/${encodeURIComponent(keyword)}`
    );
    return res.data;
  },

  searchAll: async (query: string) => {
    const res = await authAxios.get("/search", {
      params: { query },
    });
    return res.data;
  },
};
