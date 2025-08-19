import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import RecordCardMedium from './index';

const meta: Meta<typeof RecordCardMedium> = {
  title: 'Components/RecordCardMedium',
  component: RecordCardMedium,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof RecordCardMedium>;

export const Default: Story = {
  args: {
    profileImage: '/profile-default.png',
    profileName: '유저닉네임',
    date: '2025.04.23',
    title: '게시글 제목 게시글 제목 게시글 제목 게시글 제목...',
    description:
      'aespa(에스파)는 대한민국의 4인조 다국적 걸그룹이다. SMCU 프로젝트의 첫 주자이며, 프로젝트 내에서 독립적인 세계관으로 이야기를 펼치고 있다. 그룹 이름인 ‘aespa’는 “Avatar X Experience”를 표현한 ‘æ’와 ‘양면’을 뜻하는 ‘aspect’를 합친 조어이며 ‘자신의 또 다른 자아인 아바타 ae를 만나며 새로운 세계를 경험하게 된다’라는 세계관을 기반으로 활동한다.',
    imageSrc: '/record-image.png',
    likes: 99,
    comments: 99,
  },
};
