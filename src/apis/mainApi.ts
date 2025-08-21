import { axiosApi } from "./axios";

export const mainApi = {
  getTopDeck: async () => {
    const res = await axiosApi.get("/home/artists");
    return res.data;
  },

  getTimeTiles: async (sortBy: "HOTTEST" | "LATEST") => {
    const res = await axiosApi.get("/home/events", {
      params: { sortBy },
    });
    return res.data;
  },

  getMyTiles: async (sortBy: "HOTTEST" | "LATEST") => {
    const res = await axiosApi.get("/home/posts", {
      params: { sortBy },
    });
    return res.data;
  },
};
