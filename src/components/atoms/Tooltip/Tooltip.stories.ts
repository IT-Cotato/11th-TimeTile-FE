import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip } from ".";

const meta = {
  title: "Atom/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "툴팁 컴포넌트",
    docs: {
      description: {
        component: `
- variant 값으로 "default" | "date"를 설정할 수 있습니다.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "date"],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const DefaultToolTip: Story = {
  args: {
    variant: "default",
    children: `사실과 다르거나 부적절한 내용은 ‘부적절해요' 버튼으로 신고해주세요. 
여러분의 신고가 타임라인 신뢰성 향상에 도움이 됩니다.`,
  },
};

export const DateToolTip: Story = {
  args: {
    variant: "date",
  },
};
