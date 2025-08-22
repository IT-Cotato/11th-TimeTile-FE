import { axiosApi, authAxios } from '@/apis/axios';

export type CommentPayload = { parentId: number | null; content: string };

export const commentsApi = {
  // 조회 (비로그인도 가능이라 가정 → axiosApi)
  get: (postId: number | string) => axiosApi.get(`/posts/${postId}/comments`),

  // 생성/수정/삭제/좋아요는 인증 필요 → authAxios
  create: (
    postId: number | string,
    payload: { parentId: number | null; content: string },
  ) => {
    const { parentId, content } = payload;

    // 1) 안전 바디 구성: 최상위는 parentId 키를 아예 생략
    const body: any = { content };
    if (parentId !== null) {
      const n = typeof parentId === 'number' ? parentId : Number(parentId);
      if (!Number.isFinite(n)) {
        // 개발 단계에서 바로 눈에 띄게
        throw new Error(`[commentsApi.create] invalid parentId: ${parentId}`);
      }
      body.parentId = n; // ✅ 대댓글일 때만 포함
    }

    // 2) JSON으로 확실히 전송
    return authAxios.post(`/posts/${postId}/comments`, body, {
      headers: { 'Content-Type': 'application/json' },
    });
  },

  update: (postId: number | string, commentId: number, content: string) =>
    authAxios.put(`/posts/${postId}/comments/${commentId}`, { content }),

  remove: (postId: number | string, commentId: number) =>
    authAxios.delete(`/posts/${postId}/comments/${commentId}`),

  like: (postId: number | string, commentId: number) =>
    authAxios.post(`/posts/${postId}/comments/${commentId}/like`),

  unlike: (postId: number | string, commentId: number) =>
    authAxios.delete(`/posts/${postId}/comments/${commentId}/like`),
};

export const unwrap = <T = any>(res: any): T =>
  res?.data?.data ?? res?.data ?? res;
