import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ArtistProfileCard } from './index'

const meta: Meta<typeof ArtistProfileCard> = {
  title: 'Atom/TimeLine/ArtistProfileCard',
  component: ArtistProfileCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
}

export default meta
type Story = StoryObj<typeof ArtistProfileCard>

export const Watcher: Story = {
  args: {
    artistName: '투모로우바이투게더(txt)',
    followerCount: 21800,
    imageUrl: '/images/txt.jpg',
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019],
    yearSchedules: {
      2025: ['뮤직뱅크 출연', '서울 콘서트'],
  2024: ['컴백 쇼케이스', '유럽 투어'],
  2023: ['뮤직 페스티벌', '신곡 발표'],
  2022: ['아시아 팬미팅', '연말 시상식'],
  2021: ['앨범 발매', '첫 단독 콘서트'],
  2020: ['데뷔 무대', '예능 출연'],
  2019: ['연습생 공개', '소속사 계약'],
    },
    role: 'watcher',
  },
}

export const Linker: Story = {
  args: {
    artistName: '투모로우바이투게더(txt)',
    followerCount: 21800,
    imageUrl: '/images/txt.jpg',
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019],
    yearSchedules: {
      2025: ['뮤직뱅크 출연', '서울 콘서트'],
  2024: ['컴백 쇼케이스', '유럽 투어'],
  2023: ['뮤직 페스티벌', '신곡 발표'],
  2022: ['아시아 팬미팅', '연말 시상식'],
  2021: ['앨범 발매', '첫 단독 콘서트'],
  2020: ['데뷔 무대', '예능 출연'],
  2019: ['연습생 공개', '소속사 계약'],
    },
    role: 'linker', // 추가
  },
}

export const Editor: Story = {
  args: {
    artistName: '투모로우바이투게더(txt)',
    followerCount: 21800,
    imageUrl: '/images/txt.jpg',
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019],
    yearSchedules: {
      2025: ['뮤직뱅크 출연', '서울 콘서트'],
  2024: ['컴백 쇼케이스', '유럽 투어'],
  2023: ['뮤직 페스티벌', '신곡 발표'],
  2022: ['아시아 팬미팅', '연말 시상식'],
  2021: ['앨범 발매', '첫 단독 콘서트'],
  2020: ['데뷔 무대', '예능 출연'],
  2019: ['연습생 공개', '소속사 계약'],
    },
    role: 'editor', // 추가
  },
}