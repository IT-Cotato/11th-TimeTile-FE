import { ChatIcon } from "@/assets/icons/ChatIcon";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { Text } from "@/components/atoms/Text";
import { FlexBox } from "@/components/layouts/FlexBox";
import { SearchPost } from "@/model/components/SearchType";
import { theme } from "@/styles/theme";
import styled from "styled-components";

interface MyTilePostProps {
  posts: SearchPost[];
  highlightWord?: string;
}

export const MyTilePost = ({ posts, highlightWord }: MyTilePostProps) => {
  const formatDate = (isoDate: string) => {
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    return `${year}.${month.toString().padStart(2, "0")}.${day
      .toString()
      .padStart(2, "0")}`;
  };

  const highlightText = (text: string, word?: string) => {
    if (!word) return text;
    const regex = new RegExp(`(${word})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, idx) =>
      part.toLowerCase() === word.toLowerCase() ? (
        <Highlight key={idx}>{part}</Highlight>
      ) : (
        part
      )
    );
  };

  return (
    <Wrapper>
      <TimeLineWrap>
        {posts.map((post) => {
          const hasimage = !!post.mainImageUrl;
          return (
            <TimeLineCard key={post.postId}>
              <CardContent>
                <FlexBox gap={10}>
                  {post.authorProfileImageUrl && (
                    <ProfileImage
                      src={post.authorProfileImageUrl}
                      alt="게시물 작성자 프로필 이미지"
                    />
                  )}
                  <TitleWrap>
                    <Text typo="Body_3">{post.authorNickname}</Text>
                  </TitleWrap>
                </FlexBox>
                <Text
                  typo="Body_3"
                  color="gray_700"
                  children={formatDate(post.createdAt)}
                />
              </CardContent>
              <TitleWrap>
                <Text typo="H4">
                  {highlightText(post.title, highlightWord)}
                </Text>
              </TitleWrap>
              <PostContent>
                <Wrap $hasImage={hasimage}>
                  <Text typo="Body_3">
                    {highlightText(post.content, highlightWord)}
                  </Text>
                </Wrap>
                {post.mainImageUrl && (
                  <Image src={post.mainImageUrl} alt="게시물 이미지" />
                )}
              </PostContent>
              <DetailWrap>
                <IconWrapper>
                  <IconDiv>
                    <HeartIcon />
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
            </TimeLineCard>
          );
        })}
      </TimeLineWrap>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  aspect-ratio: 1/1;
  border-radius: 16px;
`;

const TimeLineWrap = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 16px;
`;

const TimeLineCard = styled.div`
  display: flex;
  width: 467px;
  height: 320px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.gray_0};
`;

const CardContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-bottom: 8px;
`;

const PostContent = styled.div`
  display: flex;
  height: 146px;
  gap: 16px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const Image = styled.img`
  display: flex;
  width: 168px;
  height: 142px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 16px;
  border: 1px solid var(--Primary-200, #e6f0ff);
  background: var(--Gray-0, #fff);
  box-shadow: 0 4px 12px 0 rgba(159, 198, 255, 0.25);
  object-fit: cover;
`;

const TitleWrap = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
  color: var(--Gray-1000, #000);
  text-overflow: ellipsis;

  /* Body 3 */
  font-family: Pretendard;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;
`;

const Wrap = styled.div<{ $hasImage: boolean }>`
  height: ${({ $hasImage }) => ($hasImage ? "72px" : "312px")};
  width: 100%;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${({ $hasImage }) => ($hasImage ? 3 : 13)};
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const DetailWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  margin-top: -4px;
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

const Highlight = styled.span`
  color: ${theme.palette.primary_600};
`;
