"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Text } from "../atoms/Text";
import { ChatIcon } from "@/assets/icons/ChatIcon";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { OtherPost } from "@/model/components/Post";
import { BasicSymbolLogo } from "@/assets/images/BasicSymbolLogo";
import { usersApi } from "@/apis/usersApi";
import { ScrapIcon } from "@/assets/icons/ScrapIcon";
import { CheckTrueIcon } from "@/assets/icons/CheckTrueIcon";
import { CheckFalseIcon } from "@/assets/icons/CheckFalseIcon";

interface OtherPostComponentProps {
  posts: OtherPost[];
  titleText?: string;
  infoText?: string;
  showTitle?: boolean;
  showScrapIcon?: boolean;
  isSelectionMode?: boolean;
  selectedPosts?: Set<number>;
  onToggleSelect?: (postId: number) => void;
  isSelectionForFolderDetail?: boolean;
}

export const OtherPostComponent = ({
  posts,
  titleText = "내 타임라인",
  infoText = "타임라인이 없습니다.",
  showTitle = true,
  showScrapIcon = false,
  isSelectionMode = false,
  selectedPosts = new Set<number>(),
  onToggleSelect,
  isSelectionForFolderDetail = false,
}: OtherPostComponentProps) => {
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    return date.toISOString().slice(0, 10).replace(/-/g, ".");
  };

  const isEmpty = posts.length === 0;

  const handleCancel = async (postId: number) => {
    try {
      // 스크랩 상태 조회
      const statusRes = await usersApi.getScrapStatus(postId);
      if (!statusRes.isSuccess) {
        console.log("스크랩 상태를 불러올 수 없습니다.");
        return;
      }

      const scrappedFolders = statusRes.data.scrapStatus.filter(
        (folder: any) => folder.isScrapped
      );

      if (scrappedFolders.length === 0) {
        console.log("이미 스크랩이 취소된 상태입니다.");
        return;
      }

      // 모든 폴더에서 취소
      await Promise.all(
        scrappedFolders.map((folder: any) =>
          usersApi.cancelScrapPost(postId, folder.scrapFolderId)
        )
      );
      console.log("스크랩이 모두 취소되었습니다.");
      window.location.reload();
    } catch (err) {
      console.error("스크랩 취소 실패", err);
    }
  };

  return (
    <Wrapper>
      {showTitle && (
        <Title>
          <Text typo="H3" children={titleText} />
          {!isEmpty && (
            <CursorDiv>
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
                  {showScrapIcon && post.isScrapped && !isSelectionMode && (
                    <button
                      onClick={() => handleCancel(post.postId)}
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      aria-label="스크랩 취소"
                    >
                      <ScrapIcon />
                    </button>
                  )}
                  {isSelectionMode && (
                    <button
                      onClick={() =>
                        onToggleSelect && onToggleSelect(post.postId)
                      }
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                      }}
                      aria-label={
                        selectedPosts.has(post.postId) ? "선택 해제" : "선택"
                      }
                    >
                      {selectedPosts.has(post.postId) ? (
                        <CheckTrueIcon />
                      ) : (
                        <CheckFalseIcon />
                      )}
                    </button>
                  )}
                </CardContent>
                <PostContent
                  $isSelected={
                    isSelectionMode && selectedPosts.has(post.postId)
                  }
                  $isSelectionMode={isSelectionMode}
                  $isSelectionForFolderDetail={isSelectionForFolderDetail}
                >
                  <UserInfoHeader>
                    {post.authorProfileImageUrl && (
                      <WriterImage
                        src={post.authorProfileImageUrl}
                        alt="게시물 작성자 프로필 이미지"
                      />
                    )}
                    <UserTextWrapper>
                      <Text typo="Body_3">{post.authorNickname}</Text>
                    </UserTextWrapper>
                    <Text typo="Body_3" color="gray_700">
                      {formatDate(post.createdAt)}
                    </Text>
                  </UserInfoHeader>
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
                        <HeartIcon />
                        <Text
                          typo="Body_3"
                          children={post.likeCount}
                          color="heart"
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

const UserInfoHeader = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 8px;
`;

const UserTextWrapper = styled.div`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;
`;

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
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
  justify-content: center;
`;

const TimeLineCard = styled.div`
  display: flex;
  width: 467px;
  flex-direction: column;
  align-items: flex-start;
  gap: -1px;
  grid-row: 1 / span 1;
  grid-column: 2 / span 1;
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
  display: flex;
  width: 168px;
  height: 142px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 16px;
  border: 1px solid ${theme.palette.primary_200};
  background: ${theme.palette.gray_0};
  box-shadow: 0 4px 12px 0 rgba(159, 198, 255, 0.25);
`;

const WriterImage = styled.img`
  width: 32px;
  height: 32px;
  aspect-ratio: 1/1;
  border-radius: 16px;
  background: ${theme.palette.gray_200};
  object-fit: cover;
  display: flex;
  align-items: center;
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
  align-self: stretch;
  margin-top: 4px;
  gap: 16px;
`;

const Wrap = styled.div<{ $hasImage: boolean }>`
  width: ${({ $hasImage }) => ($hasImage ? "235px" : "100%")};
  align-self: stretch;
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
  align-self: stretch;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const IconDiv = styled.div`
  display: flex;
  width: 100%;
  height: 26px;
  align-items: center;
  gap: 4px;
`;

const ViewButton = styled.button`
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${theme.palette.primary_700};
`;

const PostContent = styled.div<{
  $isSelected?: boolean;
  $isSelectionMode?: boolean;
  $isSelectionForFolderDetail?: boolean;
}>`
  display: flex;
  width: 467px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${({ $isSelected, $isSelectionForFolderDetail }) =>
    $isSelectionForFolderDetail && $isSelected
      ? theme.palette.primary_100
      : theme.palette.primary_20};

  ${({ $isSelectionMode, $isSelected }) =>
    $isSelectionMode &&
    `
    cursor: pointer;

    &:hover {
      background: ${theme.palette.primary_200};
      border-color: ${theme.palette.primary_400};
      border-width: 1.5px;
    }

    ${
      $isSelected
        ? `
      background: ${theme.palette.primary_200};
      border-color: ${theme.palette.primary_400};
      border-width: 1.5px;
    `
        : ""
    }
  `}
`;
