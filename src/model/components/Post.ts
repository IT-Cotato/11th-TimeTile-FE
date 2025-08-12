export interface Post {
  name: string;
  groupId: string;
  artistName: string;
  postId: number;
  title: string;
  content: string;
  mainImageUrl: string | null;
  createdAt: string;
  likeCount: number;
  commentCount: number;
}

export interface OtherPost {
  name: string;
  groupId: string;
  artistName: string;
  authorId: number;
  authorNickname: string;
  authorProfileImageUrl: string | null;
  postId: number;
  title: string;
  content: string;
  mainImageUrl: string | null;
  createdAt: string;
  likeCount: number;
  commentCount: number;

  isScrapped?: boolean; // 스크랩 여부
  scrapFolderId?: number; // 스크랩 폴더 ID
}
