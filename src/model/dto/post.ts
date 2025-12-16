export interface PostDTO {
  postId: number;
  groupId: string;

  title: string;
  content: string;
  mainImageUrl: string;

  startedAt: string;
  createdAt: string;

  likeCount: number;
  commentCount: number;

  authorId: number;
  authorNickname: string;
  authorProfileImageUrl: string;
}
