import { KeyOfTypo } from "@/styles/theme";
import { ButtonHTMLAttributes } from "react";

export type FollowButtonVariantType = "follow" | "following" | "unfollow";

export type FollowButtonShapeType = {
  [key in FollowButtonVariantType]: {
    typo: KeyOfTypo;
    boxShadow: string;
  };
};

export interface FollowButtonPropsType
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: FollowButtonVariantType;
  width?: number;
  height?: number;
  size?: "default" | "small";
  isLoading?: boolean;
  onClick?: () => void;
  onUnfollowClick: () => void;
}
