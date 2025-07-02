import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { DefaultButton } from ".";

const meta = {
  title: "Atom/Button/DefaultButton",
  component: DefaultButton,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {
        type: "select",
        options: ["addTile", "editTile", "edit", "report"],
      },
      description: "버튼 variant 종류",
    },
  },
} satisfies Meta<typeof DefaultButton>;

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
