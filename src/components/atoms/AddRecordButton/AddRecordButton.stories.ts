import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { AddRecordButton } from '.';

const meta = {
  title: 'Atom/Button/AddRecordButton',
  component: AddRecordButton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['able', 'disable'],
    },
    children: {
      control: 'text',
    },
  },
} satisfies Meta<typeof AddRecordButton>;

export default meta;
type Story = StoryObj<typeof AddRecordButton>;

export const Addable: Story = {
  args: {
    variant: 'able',
  },
};

export const UnAddable: Story = {
  args: {
    variant: 'disable',
  },
};
