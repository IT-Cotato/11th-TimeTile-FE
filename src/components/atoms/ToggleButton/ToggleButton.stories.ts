import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { ToggleButton } from ".";

const meta: Meta<typeof ToggleButton> = {
  title: "Atom/ToggleButton",
  component: ToggleButton,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "토글 버튼 컴포넌트",
    docs: {
      description: {
        component: `
- variant 값으로 토글 값 중 하나를 선택할 수 있습니다.
- children으로 태그에 표시할 텍스트를 전달합니다.`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "images"],
      description: "토글 종류",
    },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleButton>;

export const DefaultToggleButton: Story = {
  args: {
    variant: "default",
  },
};

export const ImagesToggleButton: Story = {
  args: {
    variant: "images",
  },
};
