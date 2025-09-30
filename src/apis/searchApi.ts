import { authAxios } from "@/apis/axios";
import { SearchPostResponse } from "@/model/components/SearchType";

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

  searchPosts: async (query: string, page: number = 1) => {
    const res = await authAxios.get("/search/posts", {
      params: { query, page },
    });
    return res.data;
  },

  searchEvents: async (query: string, page: number) => {
    const res = await authAxios.get("/search/events", {
      params: { query, page },
    });
    return res.data;
  },

  searchUsers: async (query: string, page: number) => {
    const res = await authAxios.get("/search/users", {
      params: { query, page },
    });
    return res.data;
  },
};
