import { authAxios } from '@/apis/axios';

export const postApi = {
  getAllPosts: ({
    groupId,
    page,
    sortBy = 'LATEST',
  }: {
    groupId: string;
    page: number;
    sortBy?: 'LATEST' | 'HOTTEST';
  }) =>
    authAxios.get(`/posts/${groupId}/all`, {
      params: { page, sortBy },
    }),

  getPostDetail: (postId: number | string) => authAxios.get(`/posts/${postId}`),
};
