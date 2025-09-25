import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlankSearchTile } from ".";

const meta: Meta<typeof BlankSearchTile> = {
  title: "Atom/BlankSearchTile",
  component: BlankSearchTile,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof BlankSearchTile>;

export const BlankSearchTileStory: Story = {};
