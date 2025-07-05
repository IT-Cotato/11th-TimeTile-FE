import { FollowButtonShapeType } from "@/model/components/FollowButton";
import { theme } from "@/styles/theme";

export const FOLLOW_BUTTON_COLOR_TYPE = {
  default: {
    follow: `${theme.palette.primary_500}`,
    following: `${theme.palette.primary_100}`,
    unfollow: `${theme.palette.primary_200}`,
  },
};

export const FOLLOW_BUTTON_TEXT_COLOR_TYPE = {
  default: {
    follow: `${theme.palette.gray_0}`,
    following: `${theme.palette.primary_700}`,
    unfollow: `${theme.palette.primary_500}`,
  },
};

export const FOLLOW_BUTTON_SHAPE_TYPE: FollowButtonShapeType = {
  follow: {
    typo: "Body_1",
    boxShadow: "0px 4px 8px 0px rgba(128, 169, 242, 0.25)",
  },
  following: {
    typo: "Body_2",
    boxShadow: "none",
  },
  unfollow: {
    typo: "Body_2",
    boxShadow: "none",
  },
};
