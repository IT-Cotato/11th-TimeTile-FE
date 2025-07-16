import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { LargeButton } from ".";

const meta: Meta<typeof LargeButton> = {
  title: "Atom/Button/LargeButton",
  component: LargeButton,
  tags: ["autodocs"],
  argTypes: {
    disabled: {
      control: "boolean",
      options: [true, false],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LargeButton>;

export const Default: Story = {
  args: {
    disabled: false,
    children: "로그인",
    width: 424,
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    children: "로그인",
    width: 424,
  },
};
