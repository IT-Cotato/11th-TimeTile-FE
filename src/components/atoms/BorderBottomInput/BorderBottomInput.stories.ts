import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import BorderBottomInput from '.';

const meta: Meta<typeof BorderBottomInput> = {
  title: 'Atom/Input/BorderBottomInput',
  component: BorderBottomInput,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: '타일 제목 입력 필드 컴포넌트',
    docs: {
      description: {
        component: `
- 타일 제목을 입력받는 인풋 필드입니다.
- 최대 글자 수 제한 및 에러 메시지 출력이 가능합니다.
- 밑줄 색은 Primary 400, 에러 시 Warning 컬러입니다.
- 에러 메시지는 항상 "50자 이내로 입력해주세요."로 고정됩니다.`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof BorderBottomInput>;

export const Default: Story = {
  args: {
    value: '',
    onChange: () => {},
  },
};

export const WithError: Story = {
  args: {
    value:
      '타일 제목이 매우 길게 입력되어 50자를 초과한 경우 타일 제목이 매우 길게 입력되어 50자를 초과한 경우',
    onChange: () => {},
  },
};
