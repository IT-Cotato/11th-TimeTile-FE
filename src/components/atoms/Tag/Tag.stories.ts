import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tag } from ".";

const meta: Meta<typeof Tag> = {
  title: "Atom/Tag/Tag",
  component: Tag,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "태그 컴포넌트",
    docs: {
      description: {
        component: `
- variant 값으로 "tile" | "deck" | "song" 중 하나를 선택할 수 있습니다.
- children으로 태그에 표시할 텍스트를 전달합니다.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["tile", "deck", "song"],
      description: "Tag 종류",
    },
    children: {
      control: "text",
      description: "태그에 표시할 텍스트",
    },
  },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const TileTag: Story = {
  args: {
    variant: "tile",
    children: "250913 뮤직뱅크",
  },
};

export const DeckTag: Story = {
  args: {
    variant: "deck",
    children: "NewJeans",
  },
};

export const SongTag: Story = {
  args: {
    variant: "song",
    children: "좋은 노래",
  },
};
