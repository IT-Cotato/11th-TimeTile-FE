import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { AddTileButton } from ".";

const meta = {
  title: "Atom/Button/AddTileButton",
  component: AddTileButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["able", "disable"],
    },
    children: {
      control: "text",
    },
  },
} satisfies Meta<typeof AddTileButton>;

export default meta;
type Story = StoryObj<typeof AddTileButton>;

export const Addable: Story = {
  args: {
    variant: "able",
  },
};

export const UnAddable: Story = {
  args: {
    variant: "disable",
  },
};
