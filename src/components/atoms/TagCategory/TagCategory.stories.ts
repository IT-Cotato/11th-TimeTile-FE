import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TagCategory } from ".";
import { TagCategoryName } from "@/model/common/tagcategory";

const meta: Meta<typeof TagCategory> = {
  title: "Atom/Tag/Category",
  component: TagCategory,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "카테고리 태그 컴포넌트",
    docs: {
      description: {
        component: `
- variant 값으로 "default" | "select" 중 하나를 선택할 수 있습니다.
- category는 텍스트로 표시될 태그 이름입니다.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "select"],
      description: "Tag 상태",
    },
    category: {
      control: "select",
      options: [
        "팬사인회/기타",
        "미니팬미팅",
        "콘서트/팬미팅",
        "페스티벌/축제",
        "시상식",
        "유튜브",
        "드라마",
        "라디오",
        "TV예능",
        "영화",
        "화보/인터뷰",
        "광고/모델",
        "/콜라보",
        "라이브 방송",
        "기타",
        "앨범발매",
        "쇼케이스",
        "음악방송",
      ] as TagCategoryName[],
      description: "카테고리 종류",
    },
  },
};

export default meta;
type Story = StoryObj<typeof TagCategory>;

export const Default: Story = {
  args: {
    category: "팬사인회/기타",
    variant: "default",
  },
};

export const Selected: Story = {
  args: {
    category: "팬사인회/기타",
    variant: "select",
  },
};
