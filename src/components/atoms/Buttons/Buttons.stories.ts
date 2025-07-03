import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { Buttons } from ".";

const meta = {
  title: "Atom/Button/Buttons",
  component: Buttons,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["addTile", "editTile", "edit", "report"],
      description: "버튼 variant 종류",
    },
    children: {
      control: "text",
      description: "버튼 텍스트",
    },
  },
} satisfies Meta<typeof Buttons>;

export default meta;
type Story = StoryObj<typeof meta>;

export const AddTileButton: Story = {
  args: {
    variant: "addTile",
    children: "버튼 이름",
  },
};

export const EditButton: Story = {
  args: {
    variant: "edit",
    children: "버튼 이름",
    leftChildren: "",
  },
};

export const EditTileButton: Story = {
  args: {
    variant: "editTile",
    children: "버튼 이름",
  },
};

export const ReportButton: Story = {
  args: {
    variant: "report",
    children: "버튼 이름",
    leftChildren: "",
  },
};
