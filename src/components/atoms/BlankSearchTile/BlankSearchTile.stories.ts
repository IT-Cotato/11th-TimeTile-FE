import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { BlankSearchTile } from ".";

const meta = {
  title: "Atom/BlankSearchTile",
  component: BlankSearchTile,
  tags: ["autodocs"],
} satisfies Meta<typeof BlankSearchTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlankSearchTileStory: Story = {};
