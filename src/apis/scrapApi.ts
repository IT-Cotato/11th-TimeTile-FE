import { authAxios } from '@/apis/axios';

export type ScrapFolder = { id: string; name: string };

export const scrapApi = {
  // 스크랩 폴더 생성
  createFolder: (name: string) => authAxios.post('/scrap-folders', { name }),

  // 스크랩 폴더 수정
  updateFolder: (scrapFolderId: number, name: string) =>
    authAxios.put(`/scrap-folders/${scrapFolderId}`, { name }),

  // 스크랩 폴더 삭제
  deleteFolder: (scrapFolderId: number) =>
    authAxios.delete(`/scrap-folders/${scrapFolderId}`),

  // 스크랩 폴더 전체 조회
  getFolders: () => authAxios.get('/scrap-folders'),

  // 특정 게시글 스크랩
  scrapPost: (postId: number | string, scrapFolderIds: number[]) =>
    authAxios.post(`/posts/${postId}/scrap`, { scrapFolderIds }),

  // 특정 게시글의 스크랩 상태 조회
  getScrapStatus: (postId: number | string) =>
    authAxios.get(`/posts/${postId}/scrap`),
};
