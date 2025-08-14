import {
  CommentsResponse,
  GetDataParams,
  OtherPostsResponse,
  PostsResponse,
} from "@/model/api/usersApiTypes";
import { axiosApi } from "./axios";

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
    introduction?: string | null;
    imageKey?: string | null;
  }) => {
    const body = {
      ...(payload.nickname !== undefined && { nickname: payload.nickname }),
      ...(payload.introduction !== undefined && {
        introduction: payload.introduction,
      }),
      ...(payload.imageKey !== undefined && { imageKey: payload.imageKey }),
    };

    const res = await axiosApi.put("/users/me/profile", body);

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

  getUserProfilePost: async (targetId: number, lastPostId?: number) => {
    const params = lastPostId ? { lastPostId } : {};
    const res = await axiosApi.get(`/users/${targetId}/profile/posts`, {
      params,
    });
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

  getMyTimeLinePosts: async (
    params?: GetDataParams
  ): Promise<PostsResponse> => {
    const response = await axiosApi.get("/users/me/posts", {
      params,
    });
    return response.data;
  },

  getMyTimeLineComments: async (
    params?: GetDataParams
  ): Promise<CommentsResponse> => {
    const response = await axiosApi.get("users/me/comments", {
      params,
    });
    return response.data;
  },

  getMyLike: async (params: { page: number }): Promise<OtherPostsResponse> => {
    const response = await axiosApi.get("users/me/likes/posts", {
      params,
    });
    return response.data;
  },

  getMyScrap: async (params: { page: number }): Promise<OtherPostsResponse> => {
    const response = await axiosApi.get("users/me/scraps/posts", {
      params,
    });
    return response.data;
  },

  getMyGrade: async () => {
    const res = await axiosApi.get(`/users/me/grade`);
    return res.data;
  },

  followUser: async (followerId: number) => {
    const res = await axiosApi.post(`/users/${followerId}/follow`);
    return res.data;
  },

  unfollowUser: async (followerId: number) => {
    const res = await axiosApi.delete(`/users/${followerId}/follow`);
    return res.data;
  },

  getMyEventsArtists: async () => {
    const res = await axiosApi.get("/users/me/events/artists");
    return res.data;
  },

  getEventsByArtist: async (artistId: string, page: number = 1) => {
    const res = await axiosApi.get(`/users/me/events/artists/${artistId}`, {
      params: { page },
    });
    return res.data;
  },

  getMyScrapFolders: async () => {
    const res = await axiosApi.get("/scrap-folders");
    return res.data;
  },

  createScrapFolder: async (name: string) => {
    const res = await axiosApi.post("/scrap-folders", { name });
    return res.data;
  },

  getScrapFolderPosts: async (scrapFolderId: string, page: number = 1) => {
    const res = await axiosApi.get(`/users/me/scraps/${scrapFolderId}/posts`, {
      params: { page },
    });
    return res.data;
  },

  deleteFolder: async (scrapFolderId: number) => {
    const res = await axiosApi.delete(`/scrap-folders/${scrapFolderId}`);
    return res.data;
  },

  updateScrapFolder: async (scrapFolderId: number, name: string) => {
    const res = await axiosApi.put(`/scrap-folders/${scrapFolderId}`, { name });
    return res.data;
  },

  cancelScrapPost: async (postId: number, scrapFolderId: number) => {
    const res = await axiosApi.delete(
      `/posts/${postId}/scrap/${scrapFolderId}`
    );
    return res.data;
  },

  getScrapStatus: async (postId: number) => {
    const res = await axiosApi.get(`/posts/${postId}/scrap`);
    return res.data;
  },
};
