import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { FollowButton } from ".";

const meta = {
  title: "Atom/Button/FollowButton",
  component: FollowButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["follow", "following", "unfollow"],
    },
  },
} satisfies Meta<typeof FollowButton>;

export default meta;
type Story = StoryObj<typeof FollowButton>;

export const Follow: Story = {
  args: {
    variant: "follow",
  },
};

export const Following: Story = {
  args: {
    variant: "following",
  },
};

export const UnfollowShown: Story = {
  args: {
    variant: "unfollow",
  },
};
