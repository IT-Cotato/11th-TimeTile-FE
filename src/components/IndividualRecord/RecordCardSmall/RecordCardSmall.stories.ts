import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RecordCardSmall from './index';

const meta: Meta<typeof RecordCardSmall> = {
  title: 'Components/RecordCardSmall',
  component: RecordCardSmall,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RecordCardSmall>;

export const Default: Story = {
  args: {
    imageSrc: '/record-image.png',
    title: '에스파가 드디어 컴백을 했다',
    description:
      'aespa(에스파)는 대한민국의 4인조 다국적 걸그룹이다. SMCU 프로젝트의 첫 주자이며, 프로젝트 내에서 독립적인 세계관으로 이야기를 펼치고 있다.',
    likes: 99,
    comments: 99,
  },
};
