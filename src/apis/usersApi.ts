import { axiosApi } from "./axios";

export const usersApi = {
  getUserProfile: async (targetId: number) => {
    const res = await axiosApi.get(`/users/${targetId}/profile`);
    return res.data;
  },

  getMyProfile: async () => {
    const res = await axiosApi.get(`users/me/profile`);
    return res.data;
  },
};
