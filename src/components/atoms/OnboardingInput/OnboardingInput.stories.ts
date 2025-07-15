import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { OnboardingInput } from ".";

const meta: Meta<typeof OnboardingInput> = {
  title: "Atom/Input/OnboardingInput",
  component: OnboardingInput,
  tags: ["autodocs"],
  parameters: {
    componentSubtitle: "온보딩에 사용하는 input",
  },
  argTypes: {
    variant: {
      control: "select",
      options: ["email", "password", "checkcode", "count", "nickname"],
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
