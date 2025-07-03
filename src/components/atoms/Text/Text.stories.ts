import type { Meta, StoryObj } from "@storybook/nextjs-vite";

import { Text } from ".";

const meta = {
  title: "Atom/Text",
  component: Text,
  tags: ["autodocs"],
  argTypes: {
    typo: {
      control: "select",
      options: [
        "H1",
        "H2",
        "H3",
        "H4",
        "H5",
        "Body_1",
        "Body_2",
        "Body_3",
        "Caption_1",
        "Caption_2",
        "Caption_3",
        "Caption_4",
      ],
      description: "typo 타입",
    },
    children: {
      control: "text",
      description: "텍스트",
    },
    color: {
      control: "select",
      options: [
        "primary_300",
        "primary_600",
        "sub_400",
        "sub_600",
        "gray_300",
        "gray_1000",
        "warning",
      ],
      description: "typo 타입",
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TextComponent: Story = {
  args: {
    children: "TimeTile",
    typo: "H1",
    color: "gray_1000",
  },
};
