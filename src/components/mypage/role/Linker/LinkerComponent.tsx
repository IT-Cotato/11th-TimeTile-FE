import { RoleIntroSection } from "./RoleIntroSelection";
import { MyRoleSection } from "./MyRoleSelection";
import styled from "styled-components";

interface RoleProps {
  data: {
    nickname: string;
    role: string;
    visitCount: number;
    postCount: number;
    likeCount: number;
    commentCount: number;
    achievementRate: number;
  };
}

export const LinkerComponent = ({ data }: RoleProps) => {
  return (
    <Container>
      <MyRoleSection data={data} />
      <RoleIntroSection />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 950px;
  padding: 24px 0;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;
