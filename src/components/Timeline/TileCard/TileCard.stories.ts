import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { TileCard } from "./index";

const meta: Meta<typeof TileCard> = {
  title: "Components/TileCard",
  component: TileCard,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof TileCard>;

const mockSchedules = [
  {
    title: "싱글 <Spicy> 발매",
    date: "2025.08.23",
    tags: ["tile", "deck"] as ("tile" | "deck" | "song")[],
    relatedEvents: [{ name: "팬미팅 개최" }, { name: "쇼케이스" }],
    relatedArtists: [{ name: "NewJeans" }, { name: "aespa" }],
    description:
      "어쩌구저쩌구 스케쥴 설명어쩌구저쩌구 스케쥴 설명 어쩌구저쩌구 스케쥴 설명 어쩌구저쩌구 스케쥴 설명 .",
    thumbnails: ["/images/thumb1.jpg", "/images/thumb2.jpg"],
    thumbnailLabels: [
      "썸네일 텍스트 썸네일 텍스트 썸네일 텍스트 썸네일 텍스트 ",
    ],
    participants: 123,
  },
  {
    title: "뮤직비디오 공개",
    date: "2025.08.23",
    tags: ["song"] as ("tile" | "deck" | "song")[],
    relatedEvents: [{ name: "촬영 현장" }],
    relatedArtists: [{ name: "NewJeans" }],
    description: "타이틀곡 뮤직비디오가 공식 유튜브 채널에 공개됩니다.",
    thumbnails: ["/images/thumb4.jpg", "/images/thumb5.jpg"],
    thumbnailLabels: ["뮤직비디오 촬영", "자켓 사진 촬영"],
    participants: 789,
  },
  {
    title: "해외 투어 일정 발표",
    date: "2025.08.23",
    tags: ["tile", "deck"] as ("tile" | "deck" | "song")[],
    relatedEvents: [{ name: "일본 투어" }, { name: "미국 투어" }],
    relatedArtists: [{ name: "aespa" }],
    description: "일본, 미국, 유럽 등지의 투어 일정이 발표됩니다.",
    thumbnails: ["/images/thumb7.jpg"],
    thumbnailLabels: ["뮤직비디오 촬영", "자켓 사진 촬영"],
    participants: 890,
  },
];

export const Default: Story = {
  args: {
    selected: false,
    schedules: mockSchedules,
  },
};

export const Selected: Story = {
  args: {
    selected: true,
    schedules: mockSchedules,
  },
};
