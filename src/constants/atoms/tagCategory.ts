import { TagCategoryName } from "@/model/common/tagcategory";

type TagStyle = {
  default: {
    color: string;
    background: string;
  };
  select: {
    color: string;
    background: string;
  };
};

export const TAG_CATEGORY_STYLE_MAP: Record<TagCategoryName, TagStyle> = {
  // 보라
  "팬사인회/기타": {
    default: { color: "#9D56BB", background: "#FAEFFF" },
    select: { color: "#9D56BB", background: "#F4D9FF" },
  },
  미니팬미팅: {
    default: { color: "#9D56BB", background: "#FAEFFF" },
    select: { color: "#9D56BB", background: "#F4D9FF" },
  },

  // 파랑
  "콘서트/팬미팅": {
    default: { color: "#565DBB", background: "#F0F1FF" },
    select: { color: "#565DBB", background: "#DDDFFF" },
  },
  "페스티벌/축제": {
    default: { color: "#565DBB", background: "#F0F1FF" },
    select: { color: "#565DBB", background: "#DDDFFF" },
  },
  시상식: {
    default: { color: "#565DBB", background: "#F0F1FF" },
    select: { color: "#565DBB", background: "#DDDFFF" },
  },

  // 빨강
  유튜브: {
    default: { color: "#E14D88", background: "#FFF2F7" },
    select: { color: "#E14D88", background: "#FFD9E8" },
  },
  드라마: {
    default: { color: "#E14D88", background: "#FFF2F7" },
    select: { color: "#E14D88", background: "#FFD9E8" },
  },
  라디오: {
    default: { color: "#E14D88", background: "#FFF2F7" },
    select: { color: "#E14D88", background: "#FFD9E8" },
  },
  TV예능: {
    default: { color: "#E14D88", background: "#FFF2F7" },
    select: { color: "#E14D88", background: "#FFD9E8" },
  },
  영화: {
    default: { color: "#E14D88", background: "#FFF2F7" },
    select: { color: "#E14D88", background: "#FFD9E8" },
  },

  // 주황
  "화보/인터뷰": {
    default: { color: "#EA8F35", background: "#FFF6EC" },
    select: { color: "#EA8F35", background: "#FFE5CC" },
  },
  "광고/모델": {
    default: { color: "#EA8F35", background: "#FFF6EC" },
    select: { color: "#EA8F35", background: "#FFE5CC" },
  },
  콜라보: {
    default: { color: "#EA8F35", background: "#FFF6EC" },
    select: { color: "#EA8F35", background: "#FFE5CC" },
  },
  "라이브 방송": {
    default: { color: "#EA8F35", background: "#FFF6EC" },
    select: { color: "#EA8F35", background: "#FFE5CC" },
  },
  기타: {
    default: { color: "#EA8F35", background: "#FFF6EC" },
    select: { color: "#EA8F35", background: "#FFE5CC" },
  },

  // 초록
  앨범발매: {
    default: { color: "#6ACA4D", background: "#F8FFF5" },
    select: { color: "#6ACA4D", background: "#E6FFDE" },
  },
  쇼케이스: {
    default: { color: "#6ACA4D", background: "#F8FFF5" },
    select: { color: "#6ACA4D", background: "#E6FFDE" },
  },
  음악방송: {
    default: { color: "#6ACA4D", background: "#F8FFF5" },
    select: { color: "#6ACA4D", background: "#E6FFDE" },
  },
};
