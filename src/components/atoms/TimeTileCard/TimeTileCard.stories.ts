import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TimeTileCard } from ".";

const meta = {
  title: "Atom/TimeTileCard",
  component: TimeTileCard,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "TimeTileCard 컴포넌트",
    docs: {
      description: {
        component: `
- 타임타일 카드 컴포넌트입니다.
`,
      },
    },
  },
} satisfies Meta<typeof TimeTileCard>;

export default meta;
type Story = StoryObj<typeof TimeTileCard>;

export const DefaultTimeTileCard: Story = {
  args: {
    event: {
      groupId: "1",
      name: "Prem Customer Division Associate",
      activityTypes: ["콘서트/팬미팅"],
      artistImageUrl:
        "https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9",
      artistName: "NewJeans",
      description:
        "Provident delinquo tener curiositas volva caecus tracto denego.",
      startedAt: "2025-04-11",
    },
  },
};
