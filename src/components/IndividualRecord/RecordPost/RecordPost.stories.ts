import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import RecordPost from "./index";

const meta: Meta<typeof RecordPost> = {
  title: "Components/RecordPost",
  component: RecordPost,
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof RecordPost>;

export const Default: Story = {
  args: {
    profileImage: "/record-image.png",
    username: "레드벨벳짱",
    visibility: "전체공개",
    title: "테스트 제목",
    content: "테스트 내용",
    images: ["/record-image.png", "/record-image.png"],
    likes: 99,
    comments: 12,
    scrapCount: 5,
    onDeleteSuccess: () => console.log("삭제 성공!"),
  },
};
