import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Tooltip } from ".";

const meta = {
  title: "Atom/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "툴팁 컴포넌트",
    docs: {
      description: {
        component: `
- variant 값으로 "default" | "date"를 설정할 수 있습니다.
- 아이콘에 마우스를 호버 시 툴팁이 노출됩니다.
- 실제 개발 시 아이콘은 원하는 아이콘으로 직접 지정이 가능합니다.
- 스토리북 테스트 시 화면비율 때문에 툴팁부분이 잘려보이는 현상이 발생해서 상위 컨테이너에 margin-top: 80px를 설정해둔 상태입니다. 
실제 개발에 사용 시에는 이 마진을 제거하고 사용해주세요!`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "date"],
    },
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const DefaultToolTip: Story = {
  args: {
    variant: "default",
    children: `사실과 다르거나 부적절한 내용은 ‘부적절해요' 버튼으로 신고해주세요. 
여러분의 신고가 타임라인 신뢰성 향상에 도움이 됩니다.`,
  },
};

export const DateToolTip: Story = {
  args: {
    variant: "date",
  },
};

export const TooltipEx1: Story = {
  args: {
    variant: "default",
    children: "Linker 등급부터 문서를 편집할 수 있어요.",
  },
};

export const TooltipEx2: Story = {
  args: {
    variant: "default",
    children: "편집모드로 전환하기",
  },
};
