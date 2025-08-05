import { Post } from "@/model/components/Post";
import { Comment } from "@/model/components/Comment";

export interface GetDataParams {
  visibility: string;
  page?: number;
  size?: number;
}

export interface PostsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    posts: Post[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
    hasPrevious: boolean;
    isLast: boolean;
  };
}

export interface CommentsResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    comments: Comment[];
    page: number;
    size: number;
    totalPages: number;
    totalElements: number;
    hasNext: boolean;
    hasPrevious: boolean;
    isLast: boolean;
  };
}
