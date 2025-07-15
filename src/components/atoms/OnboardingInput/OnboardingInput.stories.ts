import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OnboardingInput } from ".";

const meta: Meta<typeof OnboardingInput> = {
  title: "Atom/Input/OnboardingInput",
  component: OnboardingInput,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "온보딩에 사용하는 input",
    docs: {
      description: {
        component: `
- variant 값으로 "default" | "password" | "checkcode" | "count" 중 하나를 선택할 수 있습니다.
  - variant가 password면 눈 아이콘을 클릭해 비밀번호를 표시, 숨기기 설정이 가능합니다.
  - variant가 checkcode면 인증코드를 위한 타이머를 작동시킬 수 있습니다. 
  - variant가 count면 입력된 글자수를 확인할 수 있고, 글자수가 30자로 제한됩니다.
- label은 input 상단에 표시될 input명입니다.
- width를 통해 input 크기를 결정할 수 있고 기본값은 424px 입니다.
- timerSeconds는 인증코드 타이머 시간을 설정하는 값입니다. 기본값은 3분입니다. (180s)
        - 스토리북 상에서는 테스트 불가능하지만, 실제 개발 시에는 onChange를 통한 타이머 작동이 가능합니다.
- isError는 하단에 에러메세지를 띄울지를 결정하는 boolean 값입니다.
- isError가 true일 때, errormsg가 input 하단에 표시됩니다.
- isCheck가 true면 input 우측에 체크모양 아이콘을 띄웁니다.
- required는 필수입력필드임을 나타내는 값입니다. true면 label 옆에 *가 표시됩니다.
`,
      },
    },
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "password", "checkcode", "count"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof OnboardingInput>;

export const EmailInput: Story = {
  args: {
    onChange: () => {},
    variant: "default",
    value: "",
    label: "이메일",
  },
};

export const PasswordInput: Story = {
  args: {
    onChange: () => {},
    variant: "password",
    value: "",
    label: "비밀번호",
  },
};

export const CheckcodeInput: Story = {
  args: {
    onChange: () => {},
    variant: "checkcode",
    value: "",
    timerSeconds: 180,
    label: "인증번호",
  },
};

export const CountInput: Story = {
  args: {
    onChange: () => {},
    variant: "count",
    value: "",
    label: "한 줄 소개",
  },
};

export const NicknameInput: Story = {
  args: {
    onChange: () => {},
    variant: "default",
    value: "",
    label: "닉네임",
    required: true,
  },
};
