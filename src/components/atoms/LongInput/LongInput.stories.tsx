import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import LongInput from '.';

const meta: Meta<typeof LongInput> = {
  title: 'Atom/Input/LongInput',
  component: LongInput,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '타일 설명을 입력하는 멀티라인 필드',
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'active', 'notified'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof LongInput>;

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: '타일에 대한 간략한 설명을 입력해주세요.',
    variant: 'default',
  },
};

export const Active: Story = {
  args: {
    value: '설명을 입력 중입니다.',
    onChange: () => {},
    placeholder: '설명을 입력해주세요.',
    variant: 'active',
  },
};

export const Error: Story = {
  args: {
    value:
      '이 설명은 매우 길어서 200자를 넘을 수도 있는 상태를 테스트 중입니다. '.repeat(
        10,
      ),
    onChange: () => {},
    placeholder: '설명을 입력해주세요.',
    variant: 'default',
  },
};

export const Notified: Story = {
  args: {
    value: '',
    onChange: () => {},
    placeholder: '설명을 입력해주세요.',
    variant: 'notified',
    errorMessage: '설명을 입력해주세요.',
  },
};
