import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import React, { useState } from 'react';
import DateInput, { DateInputProps } from '.';

const meta: Meta<typeof DateInput> = {
  title: 'Atom/Input/DateInput',
  component: DateInput,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '단일 날짜 입력 필드',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'active'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof DateInput>;

const Template = (args: Omit<DateInputProps, 'value' | 'onChange'>) => {
  const [dateValue, setDateValue] = useState('2025-07-25');
  return <DateInput {...args} value={dateValue} onChange={setDateValue} />;
};

export const Default: Story = {
  render: Template,
  args: {
    variant: 'default',
  },
};

export const Active: Story = {
  render: Template,
  args: {
    variant: 'active',
  },
};
