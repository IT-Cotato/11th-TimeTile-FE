import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { TileCard } from './index'

const meta: Meta<typeof TileCard> = {
  title: 'Components/TileCard',
  component: TileCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof TileCard>

const mockSchedules = [
  {
    title: '싱글 <Spicy> 발매',
    date: '2025.08.23',
    tags: ['tile', 'deck'] as ('tile' | 'deck' | 'song')[],
    description: '어쩌구저쩌구 스케쥴 설명어쩌구저쩌구 스케쥴 설명 어쩌구저쩌구 스케쥴 설명 어쩌구저쩌구 스케쥴 설명 어쩌구저쩌구 어쩌구저쩌구 스케쥴 설명 어쩌구저쩌구 스케쥴 설명 어쩌구저쩌구 스케쥴 설명 어쩌구저쩌구 스케쥴 설명 .',
    thumbnails: ['/images/thumb1.jpg', '/images/thumb2.jpg'],
    thumbnailLabels: ['썸네일 텍스트 썸네일 텍스트 썸네일 텍스트 썸네일 텍스트 '],
    participants: 123,
  },
  {
    title: '팬미팅 개최',
    date: '2025.08.23',
    tags: ['deck'] as ('tile' | 'deck' | 'song')[],
    description: '서울 올림픽홀에서 팬들과 만나는 자리입니다.',
    thumbnails: ['/images/thumb3.jpg'],
    thumbnailLabels: ['뮤직비디오 촬영', '자켓 사진 촬영'],
    participants: 456,
  },
  {
    title: '뮤직비디오 공개',
    date: '2025.08.23',
    tags: ['song'] as ('tile' | 'deck' | 'song')[],
    description: '타이틀곡 뮤직비디오가 공식 유튜브 채널에 공개됩니다.',
    thumbnails: ['/images/thumb4.jpg', '/images/thumb5.jpg'],
    thumbnailLabels: ['뮤직비디오 촬영', '자켓 사진 촬영'],
    participants: 789,
  },
  {
    title: '음악 방송 첫 무대',
    date: '2025.08.23',
    tags: ['song', 'deck'] as ('tile' | 'deck' | 'song')[],
    description: '뮤직뱅크에서 첫 컴백 무대를 가집니다.',
    thumbnails: ['/images/thumb6.jpg'],
    thumbnailLabels: ['뮤직비디오 촬영', '자켓 사진 촬영'],
    participants: 321,
  },
  {
    title: '해외 투어 일정 발표',
    date: '2025.08.23',
    tags: ['tile'] as ('tile' | 'deck' | 'song')[],
    description: '일본, 미국, 유럽 등지의 투어 일정이 발표됩니다.',
    thumbnails: ['/images/thumb7.jpg'],
    thumbnailLabels: ['뮤직비디오 촬영', '자켓 사진 촬영'],
    participants: 890,
  },
];

export const Default: Story = {
  args: {
    selected: false,
    schedules: mockSchedules,
  },
}

export const Selected: Story = {
  args: {
    selected: true,
    schedules: mockSchedules,
  },
}