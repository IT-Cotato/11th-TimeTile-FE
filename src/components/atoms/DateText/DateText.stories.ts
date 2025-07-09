import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DateText } from ".";

const meta = {
  title: "Atom/DateText",
  component: DateText,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "DateText 컴포넌트",
    docs: {
      description: {
        component: `
- variant 값으로 "default" | "tilde" | "waiting" | "waitingTilde"를 설정할 수 있습니다.
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "date"],
    },
  },
} satisfies Meta<typeof DateText>;

export default meta;
type Story = StoryObj<typeof DateText>;

export const DefaultDateText: Story = {
  args: {
    variant: "default",
  },
};

export const TildeDate: Story = {
  args: {
    variant: "tilde",
  },
};

export const WaitingDate: Story = {
  args: {
    variant: "waiting",
  },
};

export const WaitingTildeDate: Story = {
  args: {
    variant: "waitingTilde",
  },
};
