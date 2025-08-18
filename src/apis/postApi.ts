import { authAxios } from '@/apis/axios';

export const postApi = {
  // 전체 목록 조회
  getAllPosts: async ({
    groupId,
    page,
    sortBy,
  }: {
    groupId: string;
    page: number;
    sortBy: 'LATEST' | 'HOTTEST';
  }) => {
    const res = await authAxios.get(`/posts/${groupId}/all`, {
      params: { page, sortBy },
    });
    return res.data;
  },

  // 연도별 대표 기록 조회
  getHotPostsByYear: async (artistId: string, year: string) => {
    const res = await authAxios.get(`/posts/${artistId}/hot`, {
      params: { year },
    });
    return res.data;
  },

  // 월별 추가 조회
  getMorePosts: async ({
    groupId,
    year,
    month,
    lastPostId,
  }: {
    groupId: string;
    year: number;
    month: number;
    lastPostId: number;
  }) => {
    const res = await authAxios.get(`/posts/${groupId}/more`, {
      params: { year, month, lastPostId },
    });
    return res.data;
  },

  // 게시글 상세
  getPostDetail: async (postId: string | number) => {
    const res = await authAxios.get(`/posts/${postId}`);
    return res.data;
  },

  // 게시글 작성
  createPost: async (payload: {
    groupId: string;
    title: string;
    content: string;
    visibility: 'PUBLIC' | 'PRIVATE';
    mediaKeys: string[];
    mainImageIndex: number | null;
  }) => {
    const res = await authAxios.post('/posts', payload);
    return res.data;
  },

  // 게시글 수정
  updatePost: async (
    postId: number,
    data: {
      groupId: string;
      title: string;
      content: string;
      visibility: 'PUBLIC' | 'PRIVATE';
      mediaKeys: string[];
      mainImageIndex: number | null;
    },
  ) => {
    const res = await authAxios.put(`/posts/${postId}`, data);
    return res.data;
  },

  // 삭제
  deletePost: async (postId: number) => {
    const res = await authAxios.delete(`/posts/${postId}`);
    return res.data;
  },

  // 좋아요/취소
  likePost: async (postId: number) =>
    (await authAxios.post(`/posts/${postId}/like`)).data,
  unlikePost: async (postId: number) =>
    (await authAxios.delete(`/posts/${postId}/like`)).data,

  // 업로드 URL 요청
  getUploadUrls: async (extensions: string[]) => {
    const res = await authAxios.get('/posts/files', {
      params: { extensions },
    });
    return res.data;
  },

  getEvent: async (groupId: string) => {
    const res = await authAxios.get(`/events/${groupId}`);
    return res.data;
  },
};
