import styled from "styled-components";
import { ImageSearchPost } from "@/model/components/SearchType";
import { theme } from "@/styles/theme";

interface MyTileImageGridProps {
  posts: ImageSearchPost[];
}

export const MyTileImageGrid = ({ posts }: MyTileImageGridProps) => {
  if (posts.length === 0) return <EmptyText>검색 결과가 없습니다.</EmptyText>;

  return (
    <MasonryWrapper>
      <MasonryGrid>
        {posts.map((post) => (
          <ImageItem key={post.id}>
            <img src={post.imageUrl} alt={post.title} loading="lazy" />
            <InfoBox>
              <Title>{post.title}</Title>
            </InfoBox>
          </ImageItem>
        ))}
      </MasonryGrid>
    </MasonryWrapper>
  );
};

const MasonryWrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`;

const MasonryGrid = styled.div`
  column-count: 3;
  column-gap: 16px;

  @media (max-width: 1024px) {
    column-count: 2;
  }

  @media (max-width: 600px) {
    column-count: 1;
  }
`;

const ImageItem = styled.div`
  display: block;
  break-inside: avoid;
  margin-bottom: 16px;
  border-radius: 20px;
  overflow: hidden;
  background: ${theme.palette.gray_0};
  width: 100%;

  img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: 20px;
  }
`;

const InfoBox = styled.div`
  display: flex;
  padding: 16px 16px 8px 16px;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const Title = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;
  overflow: hidden;
  color: #000;

  text-overflow: ellipsis;
  font-family: "Pretendard-Regular";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const EmptyText = styled.div`
  display: flex;
  width: 1136px;
  height: 88px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  border-radius: 20px;
  background: ${theme.palette.primary_20};
`;
