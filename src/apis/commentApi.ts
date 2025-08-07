import { authAxios } from '@/apis/axios';

export const commentApi = {
  getComments: (postId: string | number) =>
    authAxios.get(`/posts/${postId}/comments`),

  writeComment: (
    postId: string | number,
    content: string,
    parentId: number | null,
  ) =>
    authAxios.post(`/posts/${postId}/comments`, {
      parentId,
      content,
    }),

  editComment: (postId: string | number, commentId: number, content: string) =>
    authAxios.put(`/posts/${postId}/comments/${commentId}`, { content }),

  deleteComment: (postId: string | number, commentId: number) =>
    authAxios.delete(`/posts/${postId}/comments/${commentId}`),

  likeComment: (postId: string | number, commentId: number) =>
    authAxios.post(`/posts/${postId}/comments/${commentId}/like`),

  unlikeComment: (postId: string | number, commentId: number) =>
    authAxios.delete(`/posts/${postId}/comments/${commentId}/like`),
};
