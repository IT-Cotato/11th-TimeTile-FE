import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../atoms/Text";
import { FlexBox } from "@/components/layouts/FlexBox";
import { MyPost } from "./LoggedInPage";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import { ChatIcon } from "@/assets/icons/ChatIcon";
import { HeartFillIcon } from "@/assets/icons/HeartFillIcon";
import { useRouter } from "next/navigation";

interface UserTileProps {
  post: MyPost;
}

export const UserTileComponent = ({ post }: UserTileProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/record-post/${post.postId}`);
  };
  return (
    <Container onClick={handleClick}>
      <TopWrapper>
        <FlexBox gap={10}>
          <UserImage
            src={post.authorProfileImageUrl}
            alt={post.authorNickname}
          />
          <UserName>
            <Text typo="Body_3" color="gray_1000">
              {post.authorNickname}
            </Text>
          </UserName>
        </FlexBox>
      </TopWrapper>
      <BottomWrapper>
        {post.mainImageUrl && (
          <PostImage src={post.mainImageUrl} alt={post.title} />
        )}
        <Title>
          <Text typo="Body_1" color="gray_1000">
            {post.title}
          </Text>
        </Title>
        <Description>
          <Text typo="Caption_2">{post.content}</Text>
        </Description>
        <IconWrapper>
          <IconDiv>
            <HeartFillIcon />
            <Text typo="Body_3" children={post.likeCount} color="Heart" />
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
      </BottomWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 216px;
  padding: 16px 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid var(--Primary-300, #c3dbff);
  background: var(--Primary-20, #fbfdff);
  cursor: pointer;
`;

const TopWrapper = styled.div``;

const BottomWrapper = styled.div`
  display: flex;
  height: 274px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex-shrink: 0;
`;

const UserImage = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
`;

const UserName = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostImage = styled.img`
  display: flex;
  width: 168px;
  height: 142px;
  justify-content: flex-end;
  align-items: center;
  flex-shrink: 0;
  object-fit: cover;
  border-radius: 16px;
  border: 1px solid var(--Primary-200, #e6f0ff);
  background: var(--Gray-0, #fff);
  box-shadow: 0 4px 12px 0 rgba(159, 198, 255, 0.25);
`;

const Title = styled.div`
  width: 100%;
  margin-top: 8px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const Description = styled.div`
  width: 100%;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1 0 0;
  align-self: stretch;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const IconDiv = styled.div`
  display: flex;
  width: 100%;
  height: 24px;
  align-items: center;
  gap: 4px;
`;
