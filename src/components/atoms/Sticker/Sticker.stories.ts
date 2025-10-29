import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Sticker } from ".";

const meta = {
  title: "Atom/Sticker",
  component: Sticker,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["new", "edited"],
      description: "Sticker의 상태",
    },
  },
} satisfies Meta<typeof Sticker>;

export default meta;
type Story = StoryObj<typeof Sticker>;

export const New: Story = {
  args: {
    variant: "new",
  },
};

export const Edited: Story = {
  args: {
    variant: "edited",
  },
};
