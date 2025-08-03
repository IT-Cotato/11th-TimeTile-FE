import { UserRole } from "@/model/common/user";
import { atom } from "jotai";

export interface UserProfile {
  id: number;
  nickname: string;
  profileImageUrl: string;
  role: UserRole;
  visibility: string;
  followingCount: number;
  followerCount: number;
  postCount: number;
  introduction: string;
}

export const userProfileAtom = atom<UserProfile | null>(null);
