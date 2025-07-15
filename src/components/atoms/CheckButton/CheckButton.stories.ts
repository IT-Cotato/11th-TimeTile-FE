import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckButton } from ".";

const meta = {
  title: "Atom/Button/CheckButton",
  component: CheckButton,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "체크 버튼 컴포넌트",
  },
} satisfies Meta<typeof CheckButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const EmailCheckButton: Story = {
  args: {
    children: "이메일 인증",
  },
};
