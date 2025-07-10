import type { Meta, StoryObj } from '@storybook/nextjs-vite'
import { ArtistProfileCard } from './index'

const meta: Meta<typeof ArtistProfileCard> = {
  title: 'Components/ArtistProfileCard',
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
    artistName: '투모로우바이투게더',
    followerCount: 21800,
    imageUrl: '/images/txt.jpg',
    years: [2020, 2021, 2022, 2023],
  },
}