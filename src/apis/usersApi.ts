import { axiosApi, basicAxiosApi } from "./axios";

export const usersApi = {
  getUserProfile: async (targetId: number) => {
    const res = await axiosApi.get(`/users/${targetId}/profile`);
    return res.data;
  },

  getMyProfile: async () => {
    const res = await axiosApi.get(`/users/me/profile`);
    return res.data;
  },

  getMyProfilePost: async () => {
    const res = await axiosApi.get("/users/me/profile/posts");
    return res.data;
  },

  updateProfile: async (payload: {
    nickname?: string;
    introduction?: string;
    profileImage?: File | null;
  }) => {
    const formData = new FormData();
    if (payload.nickname) formData.append("nickname", payload.nickname);
    if (payload.introduction)
      formData.append("introduction", payload.introduction);
    if (payload.profileImage)
      formData.append("profileImage", payload.profileImage);

    const res = await basicAxiosApi.put("/users/profile", formData);
    return res.data;
  },

  getFollowingArtists: (lastFollowId?: number) => {
    const params = lastFollowId ? { lastFollowId } : {};
    return axiosApi.get("/users/me/following-artists", { params });
  },

  getFollowingUsers: (lastFollowId?: number) => {
    const params = lastFollowId ? { lastFollowId } : {};
    return axiosApi.get("/users/me/following-users", { params });
  },

  getFollowerUsers: (lastFollowId?: number) => {
    const params = lastFollowId ? { lastFollowId } : {};
    return axiosApi.get("/users/me/follower-users", { params });
  },

  getUserProfileById: async (targetId: number) => {
    const res = await axiosApi.get(`/users/${targetId}/profile`);
    return res.data.data;
  },

  getUserProfilePost: async (targetId: number) => {
    const res = await axiosApi.get(`/users/${targetId}/profile/posts`);
    return res.data;
  },

  //타유저
  getUserFollowingUsers: (targetId: number, lastFollowId?: number) => {
    const params = lastFollowId ? { lastFollowId } : {};
    return axiosApi.get(`/users/${targetId}/following-users`, { params });
  },

  getUserFollowingArtists: (targetId: number, lastFollowId?: number) => {
    const params = lastFollowId ? { lastFollowId } : {};
    return axiosApi.get(`/users/${targetId}/following-artists`, { params });
  },

  getUserFollowerUsers: (targetId: number, lastFollowId?: number) => {
    const params = lastFollowId ? { lastFollowId } : {};
    return axiosApi.get(`/users/${targetId}/follower-users`, { params });
  },
};
