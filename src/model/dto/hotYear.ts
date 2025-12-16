import { PostDTO } from "./post";

export interface HotYearResponse {
  isSuccess: boolean;
  code: string;
  message: string;
  data: {
    posts: Record<number, PostDTO[]>;
  };
}
