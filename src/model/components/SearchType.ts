export interface RelatedArtist {
  id: string;
  name: string;
  imageUrl: string;
}

export interface RelatedEvent {
  groupId: string;
  name: string;
}

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
  relatedArtists?: RelatedArtist[];
  relatedEvents?: RelatedEvent[];
}

export interface SearchResponse {
  artistCount: number;
  artists: SearchArtist[];
  userCount: number;
  users: SearchUser[];
  postCount: number;
  posts: SearchPost[];
  eventCount: number;
  events: SearchEvent[];
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

export interface SearchPostResponse {
  posts: SearchPost[];
  page: number;
  size: number;
  totalPages: number;
  totalElements: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isLast: boolean;
}
