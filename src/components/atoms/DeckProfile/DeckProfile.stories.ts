import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeckProfile } from ".";

const meta = {
  title: "Atom/DeckProfile",
  component: DeckProfile,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "DeckProfile 컴포넌트",
    docs: {
      description: {
        component: `
- 아티스트(덱) 프로필 컴포넌트입니다.
- name은 아티스트 이름입니다.
- imageUrl은 아티스트 프로필이미지입니다.
`,
      },
    },
  },
} satisfies Meta<typeof DeckProfile>;

export default meta;
type Story = StoryObj<typeof DeckProfile>;

export const DefaultDeckProfile: Story = {
  args: {
    name: "레드벨벳",
    imageUrl: "/record-image.png",
  },
};
