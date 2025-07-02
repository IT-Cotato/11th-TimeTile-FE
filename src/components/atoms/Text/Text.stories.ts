import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Text } from ".";

const meta = {
  title: "Atom/Text",
  component: Text,
  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextComponent: Story = {
  args: {
    children: "TimeTile",
    typo: "H1",
    as: "h1",
    color: "gray_1000",
  },
};
