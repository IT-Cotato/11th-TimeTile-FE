import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import MediaThumbnail from './index';

const meta: Meta<typeof MediaThumbnail> = {
  title: 'Components/MediaThumbnail',
  component: MediaThumbnail,
  tags: ['autodocs'],
  argTypes: {
    type: {
      control: 'radio',
      options: ['image', 'video'],
    },
    isSelected: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof MediaThumbnail>;

export const Default: Story = {
  args: {
    url: '/cat.png',
    type: 'image',
    isSelected: false,
    onClick: () => alert('대표이미지 설정'),
    onDelete: () => alert('삭제됨'),
  },
};

export const SelectedImage: Story = {
  args: {
    url: '/cat.png',
    type: 'image',
    isSelected: true,
    onClick: () => alert('대표이미지 설정'),
    onDelete: () => alert('삭제됨'),
  },
};

export const Video: Story = {
  args: {
    url: '/sample-video.mp4',
    type: 'video',
    isSelected: false,
    onClick: () => alert('대표이미지 설정'),
    onDelete: () => alert('삭제됨'),
  },
};
