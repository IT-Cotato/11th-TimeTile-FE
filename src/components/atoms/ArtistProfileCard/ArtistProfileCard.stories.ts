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

export const Default: Story = {
  args: {
    artistName: '투모로우바이투게더(txt)',
    followerCount: 21800,
    imageUrl: '/images/txt.jpg',
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019],
  },
}

export const Linker: Story = {
  args: {
    artistName: '투모로우바이투게더(txt)',
    followerCount: 21800,
    imageUrl: '/images/txt.jpg',
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019],
    role: 'linker', // 추가
  },
}

export const Editor: Story = {
  args: {
    artistName: '투모로우바이투게더(txt)',
    followerCount: 21800,
    imageUrl: '/images/txt.jpg',
    years: [2025, 2024, 2023, 2022, 2021, 2020, 2019],
    role: 'editor', // 추가
  },
}