import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DeckInput } from ".";

const meta: Meta<typeof DeckInput> = {
  title: "Atom/Input/DeckInput",
  component: DeckInput,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "데크에 사용하는 input",
    docs: {
      description: {
        component: `DeckInput 컴포넌트는 타일 이름 입력용 Input입니다.
- 입력 글자수 표시
- 글자수 초과 시 빨간색 경고
- 빈 값 POST 시 경고 표시`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof DeckInput>;

export const DeckDefaultInput: Story = {
  args: {
    onChange: () => {},
    value: "",
    maxLength: 50,
  },
};

export const OverLimitInput: Story = {
  args: {
    onChange: () => {},
    value:
      "이 글자는 50자를 넘는다고 가정하고 길게 작성한 예시입니다. 테스트용입니다. 테스트테스트테스트",
    maxLength: 50,
  },
};

export const EmptyWithError: Story = {
  args: {
    onChange: () => {},
    value: "",
    maxLength: 50,
    showError: true,
  },
};

export const FilledInput: Story = {
  args: {
    onChange: () => {},
    value: "정상 입력 값",
    maxLength: 50,
  },
};

export const IntroInput: Story = {
  args: {
    onChange: () => {},
    value: "",
    placeholder: "타일에 대한 간략한 설명을 입력해주세요.",
    maxLength: 200,
    height: 166,
  },
};
