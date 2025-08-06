import { UserRole } from "@/model/common/user";

interface RoleProps {
  data: {
    nickname: string;
    role: UserRole;
    visitCount: number;
    postCount: number;
    likeCount: number;
    commentCount: number;
    achievementRate: number;
  };
}

export const WatcherComponent = ({ data }: RoleProps) => {
  return (
    <div>
      <h2>{data.nickname} 님은 👀 WATCHER 입니다!</h2>
      <p>방문 횟수: {data.visitCount}</p>
      <p>기록 수: {data.postCount}</p>
      <p>좋아요 수: {data.likeCount}</p>
      <p>댓글 수: {data.commentCount}</p>
      <p>달성률: {data.achievementRate}%</p>
    </div>
  );
};
