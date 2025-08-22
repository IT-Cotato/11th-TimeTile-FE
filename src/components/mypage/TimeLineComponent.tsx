"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Text } from "../atoms/Text";
import { ChatIcon } from "@/assets/icons/ChatIcon";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { Post } from "@/model/components/Post";
import { BasicSymbolLogo } from "@/assets/images/BasicSymbolLogo";
import { ScrapIcon } from "@/assets/icons/ScrapIcon";
import { useRouter } from "next/navigation";
import { HeartFillIcon } from "@/assets/icons/HeartFillIcon";

interface TimeLineComponentProps {
  posts: Post[];
  titleText?: string;
  infoText?: string;
  showTitle?: boolean;
  showScrapIcon?: boolean;
  showViewMore?: boolean;
}

export const TimeLineComponent = ({
  posts,
  titleText = "마이타일 모아보기",
  infoText = "마이타일이 없습니다.",
  showTitle = true,
  showScrapIcon = false,
  showViewMore = true,
}: TimeLineComponentProps) => {
  const router = useRouter();

  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 10).replace(/-/g, ".");
  };

  const isEmpty = posts.length === 0;

  return (
    <Wrapper>
      {showTitle && (
        <Title>
          <Text typo="H3" children={titleText} />
          {showViewMore && (
            <CursorDiv onClick={() => router.push("/users/timeline")}>
              <MoveRightIcon />
            </CursorDiv>
          )}
        </Title>
      )}
      {isEmpty ? (
        <EmptyText>
          <BasicSymbolLogo />
          <Text typo="H3" color="gray_500">
            {infoText}
          </Text>
        </EmptyText>
      ) : (
        <TimeLineWrap>
          {posts.map((post) => {
            const hasImage = !!post.mainImageUrl;
            return (
              <TimeLineCard key={post.postId}>
                <CardContent>
                  <TextWrapper>
                    <Text typo="Caption_1" color="primary_800">
                      {post.artistName}
                    </Text>
                    <Text typo="Caption_1" color="primary_800" children="·" />
                    <Text typo="Caption_2" color="primary_700">
                      {post.name}
                    </Text>
                  </TextWrapper>
                  {showScrapIcon && post.isScrapped && (
                    <div style={{ cursor: "default" }}>
                      <ScrapIcon />
                    </div>
                  )}
                </CardContent>
                <PostContent>
                  <TitleWrap>
                    <Text typo="H4">{post.title}</Text>
                  </TitleWrap>
                  <PostDiv>
                    <Wrap $hasImage={hasImage}>
                      <Text typo="Body_3">{post.content}</Text>
                    </Wrap>
                    {post.mainImageUrl && (
                      <Image src={post.mainImageUrl} alt="게시물 이미지" />
                    )}
                  </PostDiv>
                  <DetailWrap>
                    <IconWrapper>
                      <IconDiv>
                        <HeartFillIcon />
                        <Text
                          typo="Body_3"
                          children={post.likeCount}
                          color="Heart"
                        />
                      </IconDiv>
                      <IconDiv>
                        <ChatIcon />
                        <Text
                          typo="Body_3"
                          children={post.commentCount}
                          color="primary_500"
                        />
                      </IconDiv>
                      <Text typo="Body_3" color="gray_700">
                        {formatDate(post.createdAt)}
                      </Text>
                    </IconWrapper>
                    <ViewButton
                      onClick={() =>
                        (window.location.href = `/record-post/${post.postId}`)
                      }
                    >
                      <Text
                        color="primary_700"
                        typo="Caption_2"
                        children="원글보기"
                      />
                      <MoveRightIcon size={20} />
                    </ViewButton>
                  </DetailWrap>
                </PostContent>
              </TimeLineCard>
            );
          })}
        </TimeLineWrap>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const CursorDiv = styled.div`
  cursor: pointer;
`;

const EmptyText = styled.div`
  width: 100%;
  height: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const TimeLineWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 467px);
  gap: 16px;
  margin-top: 24px;
  justify-content: start;
`;

const TimeLineCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 467px;
  height: 48px;
  padding: 12px 16px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_200};
  gap: 2px;
`;

const TextWrapper = styled.div`
  display: flex;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  gap: 4px;
`;

const Image = styled.img`
  object-fit: cover;
  width: 168px;
  height: 142px;
  border-radius: 16px;
  border: 1px solid ${theme.palette.primary_200};
  background: ${theme.palette.gray_0};
  box-shadow: 0 4px 12px rgba(159, 198, 255, 0.25);
`;

const TitleWrap = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const PostDiv = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  margin-top: 4px;
`;

const Wrap = styled.div<{ $hasImage: boolean }>`
  width: ${({ $hasImage }) => ($hasImage ? "235px" : "100%")};
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const DetailWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ViewButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${theme.palette.primary_700};
`;

const PostContent = styled.div`
  display: flex;
  width: 467px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;
