import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RoundButton } from ".";

const meta = {
  title: "Atom/Button/RoundButton",
  component: RoundButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["edit", "viewmode", "waiting"],
    },
    disabled: {
      control: "boolean",
      options: [true, false],
    },
  },
} satisfies Meta<typeof RoundButton>;

export default meta;
type Story = StoryObj<typeof RoundButton>;

export const Edit: Story = {
  args: {
    variant: "edit",
  },
};

export const ViewMode: Story = {
  args: {
    variant: "viewmode",
  },
};

export const Waiting: Story = {
  args: {
    variant: "waiting",
  },
};
