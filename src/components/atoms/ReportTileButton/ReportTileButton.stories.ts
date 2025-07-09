import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ReportTileButton } from ".";

const meta = {
  title: "Atom/Button/ReportTileButton",
  component: ReportTileButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "count"],
    },
  },
} satisfies Meta<typeof ReportTileButton>;

export default meta;
type Story = StoryObj<typeof ReportTileButton>;

export const Default: Story = {
  args: {
    variant: "default",
  },
};

export const Count: Story = {
  args: {
    variant: "count",
  },
};
