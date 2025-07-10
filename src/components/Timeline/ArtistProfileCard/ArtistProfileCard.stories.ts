import { ArtistProfileCard } from './index'
import type { Meta, StoryObj } from '@storybook/nextjs-vite'

const meta: Meta<typeof ArtistProfileCard> = {
  title: 'Components/ArtistProfileCard',
  component: ArtistProfileCard,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof ArtistProfileCard>

export const Default: Story = {
  args: {
    artistName: '투모로우바이투게더',
    followerCount: 21980,
    imageUrl: '/images/txt.jpg',
    years: [2020, 2021, 2022],
  },
}