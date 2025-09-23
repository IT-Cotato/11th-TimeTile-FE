import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { UserProfileCard } from ".";

const meta = {
  title: "Atom/UserProfileCard",
  component: UserProfileCard,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "UserProfileCard 컴포넌트",
    docs: {
      description: {
        component: `
- 유저 프로필 컴포넌트입니다.
- name은 유저 이름입니다.
- imageUrl은 유저 프로필이미지입니다.
- introduction은 유저 한줄소개입니다.
`,
      },
    },
  },
} satisfies Meta<typeof UserProfileCard>;

export default meta;
type Story = StoryObj<typeof UserProfileCard>;

export const DefaultUserProfileCard: Story = {
  args: {
    name: "닝닝닝닝닝닝",
    imageUrl: "/record-image.png",
    introduction:
      "닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝닝",
  },
};
