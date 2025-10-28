// src/apis/postApi.ts
import { authAxios } from '@/apis/axios';

/** 응답 랩퍼 통일 언랩: {isSuccess, code, message, data} → data */
const unwrap = <T = any>(res: any): T => {
  const body = res?.data;
  return (body?.data ?? body) as T;
};

/** 상세 응답 DTO (서버 스펙) */
export type PostDetailDTO = {
  authorId: number;
  authorNickname: string;
  authorProfileImageUrl: string;
  title: string;
  content: string;
  mediaUrls: string[];
  createdAt: string;
  visibility: 'PUBLIC' | 'PRIVATE';
  likeCount: number;
  commentCount: number;
  scrapCount: number;
};

/** 배열 쿼리를 repeat 포맷으로 직렬화: ?extensions=jpg&extensions=png */
const toRepeatQuery = (params: Record<string, any>): string => {
  const pairs: string[] = [];
  Object.entries(params).forEach(([k, v]) => {
    if (v == null) return;
    if (Array.isArray(v)) {
      v.forEach(x =>
        pairs.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(x))}`),
      );
    } else {
      pairs.push(`${encodeURIComponent(k)}=${encodeURIComponent(String(v))}`);
    }
  });
  return pairs.join('&');
};

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

  // ✅ 게시글 상세: 언랩 + 타입 지정
  getPostDetail: async (postId: string | number): Promise<PostDetailDTO> => {
    const res = await authAxios.get(`/posts/${postId}`);
    return unwrap<PostDetailDTO>(res);
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

  // ✅ 업로드 URL 요청 (직렬화/폴백/언랩 포함)
  getUploadUrls: async (extensions: string[]) => {
    const path = '/posts/files';
    try {
      // 최종 요청 대상/파라미터 확인
       
      console.log(
        '[files] baseURL=',
        (authAxios as any).defaults?.baseURL,
        'extensions=',
        extensions,
      );

      // 1차: GET + repeat 직렬화 (?extensions=jpg&extensions=png)
      const res = await authAxios.get(path, {
        params: { extensions },
        paramsSerializer: { serialize: toRepeatQuery },
        headers: { Accept: 'application/json' },
      });
      return unwrap(res);
    } catch (e1) {
       
      console.warn('[getUploadUrls] GET repeat 실패 → [] 포맷 재시도', e1);
      try {
        // 2차: GET + [] 포맷 (?extensions[]=jpg&extensions[]=png)
        const res2 = await authAxios.get(path, {
          params: { 'extensions[]': extensions },
          headers: { Accept: 'application/json' },
        });
        return unwrap(res2);
      } catch (e2) {
         
        console.warn('[getUploadUrls] GET [] 실패 → POST 바디 재시도', e2);
        try {
          // 3차: POST 바디
          const res3 = await authAxios.post(path, { extensions });
          return unwrap(res3);
        } catch (e3) {
           
          console.error('[getUploadUrls] 최종 실패', e3);
          throw e3;
        }
      }
    }
  },

  // 이벤트
  getEvent: async (groupId: string) => {
    const res = await authAxios.get(`/events/${groupId}`);
    return res.data;
  },
};
