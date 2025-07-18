import { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CheckBox } from "./index";

const meta: Meta<typeof CheckBox> = {
  title: "Atom/CheckBox",
  component: CheckBox,
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: "boolean",
      options: [true, false],
    },
    checked: {
      control: "boolean",
      options: [true, false],
    },
  },
};

export default meta;
type Story = StoryObj<typeof CheckBox>;

export const UnChecked: Story = {
  args: {
    title: "서비스 이용약관 동의",
    required: true,
    body: "서비스 이용약관 서비스 이용약관서비스 이용약관서비스 이용약관",
    checked: false,
  },
};

export const Checked: Story = {
  args: {
    title: "서비스 이용약관 동의",
    required: true,
    body: "서비스 이용약관 서비스 이용약관서비스 이용약관서비스 이용약관",
    checked: true,
  },
};

// export const AllChecked: Story = {
//   args: {
//     title: "위 약관에 모두 동의합니다.",
//     checked: false,
//   },
// };
