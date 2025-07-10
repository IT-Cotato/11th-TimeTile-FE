import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import ShortInput from '.';

const meta: Meta<typeof ShortInput> = {
  title: 'Atom/Input/ShortInput',
  component: ShortInput,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '관련 타일/덱 검색 등에서 사용하는 짧은 단일 인풋 필드',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'active', 'error', 'notified'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof ShortInput>;

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: '관련 타일 이름 입력',
    variant: 'default',
  },
};

export const Active: Story = {
  args: {
    value: '검색 중',
    onChange: () => {},
    placeholder: '검색 중',
    variant: 'active',
  },
};

export const Error: Story = {
  args: {
    value: '관련타일이름이너무김',
    onChange: () => {},
    placeholder: '관련 타일 이름',
    variant: 'error',
    errorMessage: '링크 형태의 출처만 입력할 수 있어요.',
  },
};

export const Notified: Story = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: '출처를 입력해주세요.',
    variant: 'notified',
    errorMessage: '출처를 입력해주세요.',
  },
};
