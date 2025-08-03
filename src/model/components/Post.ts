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
