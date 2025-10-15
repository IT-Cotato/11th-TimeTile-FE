import { axiosApi } from "./axios";

export const deckApi = {
  getArtistInfo: async (artistId: string) => {
    const res = await axiosApi.get(`/artists/${artistId}`);
    return res.data.data;
  },

  getArtistActiveYears: async (artistId: string) => {
    const res = await axiosApi.get(`/events/${artistId}/active-years`);
    return res.data.data.activeYears;
  },
  getArtistFollowStatus: async (artistId: string) => {
    const res = await axiosApi.get(`/artists/${artistId}/follow`);
    return res.data.data.isFollowing as boolean;
  },

  followArtist: async (artistId: string) => {
    const res = await axiosApi.post(`/artists/${artistId}/follow`);
    return res.data;
  },

  unfollowArtist: async (artistId: string) => {
    const res = await axiosApi.delete(`/artists/${artistId}/follow`);
    return res.data;
  },

  getHotEvents: async (artistId: string, year: number) => {
    const res = await axiosApi.get(`/events/${artistId}/hot`, {
      params: { year: year.toString() },
    });
    return res.data.data;
  },

  getFollowStatus: async (artistId: string) => {
    const res = await axiosApi.get(`/artists/${artistId}/follow`);
    return res.data;
  },

  getMoreEvents: async (
    artistId: string,
    year: number,
    month: number,
    lastDay?: number,
    lastEventId?: number
  ) => {
    const res = await axiosApi.get(`/events/${artistId}/more`, {
      params: { year, month, lastDay, lastEventId },
    });
    return res.data.data;
  },
};
