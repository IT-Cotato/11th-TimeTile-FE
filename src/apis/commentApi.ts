import { axiosApi, authAxios } from '@/apis/axios';

export type CommentPayload = { parentId: number | null; content: string };

export const commentsApi = {
  // 조회 (비로그인도 가능이라 가정 → axiosApi)
  get: (postId: number | string) => axiosApi.get(`/posts/${postId}/comments`),

  // 생성/수정/삭제/좋아요는 인증 필요 → authAxios
  create: (postId: number | string, body: CommentPayload) =>
    authAxios.post(`/posts/${postId}/comments`, body),

  update: (postId: number | string, commentId: number, content: string) =>
    authAxios.put(`/posts/${postId}/comments/${commentId}`, { content }),

  remove: (postId: number | string, commentId: number) =>
    authAxios.delete(`/posts/${postId}/comments/${commentId}`),

  like: (postId: number | string, commentId: number) =>
    authAxios.post(`/posts/${postId}/comments/${commentId}/like`),

  unlike: (postId: number | string, commentId: number) =>
    authAxios.delete(`/posts/${postId}/comments/${commentId}/like`),
};
