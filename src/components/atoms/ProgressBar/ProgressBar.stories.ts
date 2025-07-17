import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ProgressBar } from ".";

const meta = {
  title: "Atom/ProgressBar",
  component: ProgressBar,
  tags: ["autodocs"],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof ProgressBar>;

export const Step_1: Story = {
  args: {
    currentStep: 1,
    totalStep: 3,
  },
};

export const Step_2: Story = {
  args: {
    currentStep: 2,
    totalStep: 3,
  },
};

export const Step_3: Story = {
  args: {
    currentStep: 3,
    totalStep: 3,
  },
};
