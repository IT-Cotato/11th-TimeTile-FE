import { MyTilePost } from "./MyTilePost";
import { SearchPost } from "@/model/components/SearchType";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Text } from "@/components/atoms/Text";
import { FlexBox } from "@/components/layouts/FlexBox";
import { RightArrow } from "./../../../assets/icons/RightArrow";
import { BlankSearchTile } from "@/components/atoms/BlankSearchTile";
import { useRouter } from "next/navigation";

interface MyTileResultProps {
  posts: SearchPost[];
  postCount: number;
  highlightWord?: string;
  query: string;
}

export const MyTileResult = ({
  posts,
  postCount,
  highlightWord,
  query,
}: MyTileResultProps) => {
  const router = useRouter();
  const displayPosts = posts.slice(0, 3);
  const showOverlay = posts.length >= 3;

  const handleViewAll = () => {
    router.push(`/search/mytile?query=${encodeURIComponent(query)}`);
  };

  return (
    <Container>
      <InfoText>
        <Text typo="H3" color="primary_800">
          마이타일({postCount})
        </Text>
        <div style={{ cursor: "pointer" }} onClick={handleViewAll}>
          <FlexBox gap={4}>
            <Text typo="Body_3" color="primary_800" children="전체보기" />
            <RightArrow />
          </FlexBox>
        </div>
      </InfoText>
      {posts.length === 0 ? (
        <BlankSearchTile />
      ) : (
        <InnerWrapper>
          <ProfileRow>
            <MyTilePost posts={displayPosts} highlightWord={highlightWord} />
          </ProfileRow>
          {showOverlay && <MoreOverlay />}
        </InnerWrapper>
      )}
    </Container>
  );
};

const InfoText = styled.div`
  display: flex;
  height: 24px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const Container = styled.div`
  display: flex;
  width: 1200px;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
  position: relative;
`;

const InnerWrapper = styled.div`
  display: flex;
  overflow: hidden;
  width: 100%;
  position: relative;
`;

const ProfileRow = styled.div`
  display: flex;
  gap: 16px;
`;

const MoreOverlay = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 80px;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(251, 253, 255, 0) 0%,
    ${theme.palette.primary_20} 91.83%
  );
  pointer-events: none;
`;
