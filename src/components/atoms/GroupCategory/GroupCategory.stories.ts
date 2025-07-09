import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { GroupCategory } from ".";

const meta: Meta<typeof GroupCategory> = {
  title: "Atom/Tag/GroupCategory",
  component: GroupCategory,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "카테고리 태그 컴포넌트",
    docs: {
      description: {
        component: `
- 태그 카테고리 컴포넌트를 이용해 그룹핑한 컴포넌트입니다.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof GroupCategory>;

export const Default: Story = {
  args: {},
};
