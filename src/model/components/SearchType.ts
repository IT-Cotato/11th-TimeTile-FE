export interface SearchPost {
  postId: number;
  groupId: string;
  title: string;
  content: string;
  mainImageUrl: string;
  createdAt: string;
  likeCount: number;
  commentCount: number;
  authorId: number;
  authorNickname: string;
  authorProfileImageUrl: string;
}

export interface SearchEvent {
  groupId: string;
  name: string;
  activityTypes: string[];
  artistImageUrl: string;
  artistName: string;
  description: string;
  startedAt: string;
}

export interface SearchResponse {
  artistCount: number;
  artists: string[];
  userCount: number;
  users: string[];
  postCount: number;
  posts: SearchPost[];
  eventCount: number;
  events: Event[];
}

export interface SearchArtist {
  id: string;
  name: string;
  imageUrl: string;
}

export interface SearchUser {
  nickname: string;
  introduction: string | null;
  imageUrl: string;
}
