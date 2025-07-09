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
- 시작일과 종료일이 같으면 tilde, waitingTilde이고 업로드 대기 상태의 경우 waiting, waitingTilde입니다.
- isWaiting은 업로드 대기 상태를 나타냅니다. true일 경우, 업로드 대기 상태입니다.
`,
      },
    },
  },
  argTypes: {
    isWaiting: {
      control: "boolean",
    },
  },
} satisfies Meta<typeof DateText>;

export default meta;
type Story = StoryObj<typeof DateText>;

export const DefaultDateText: Story = {
  args: {
    startDate: "2025-07-05",
    endDate: "2025-07-10",
    isWaiting: false,
  },
};

export const TildeDate: Story = {
  args: {
    startDate: "2025-07-05",
    endDate: "2025-07-05",
    isWaiting: false,
  },
};

export const WaitingDate: Story = {
  args: {
    startDate: "2025-07-05",
    endDate: "2025-07-10",
    isWaiting: true,
  },
};

export const WaitingTildeDate: Story = {
  args: {
    startDate: "2025-07-05",
    endDate: "2025-07-05",
    isWaiting: true,
  },
};
