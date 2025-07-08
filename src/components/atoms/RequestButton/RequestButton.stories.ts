import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { RequestButton } from ".";

const meta = {
  title: "Atom/Button/RequestButton",
  component: RequestButton,
  tags: ["autodocs"],
} satisfies Meta<typeof RequestButton>;

export default meta;
type Story = StoryObj<typeof RequestButton>;

export const Request: Story = {};
