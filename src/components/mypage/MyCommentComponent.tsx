import { Comment } from '@/model/components/Comment';
import styled from 'styled-components';
import { Text } from '../atoms/Text';
import { BasicSymbolLogo } from '@/assets/images/BasicSymbolLogo';
import { theme } from '@/styles/theme';
import { MoveRightIcon } from '@/assets/icons/MoveRightIcon';
import { HeartIcon } from '@/assets/icons/HeartIcon';

interface Props {
  comments: Comment[];
  infoText: string;
}

export const MyCommentComponent = ({ comments, infoText }: Props) => {
  const isEmpty = comments.length === 0;

  return (
    <Wrapper>
      {isEmpty ? (
        <EmptyText>
          <BasicSymbolLogo />
          <Text typo="H3" color="gray_500">
            {infoText}
          </Text>
        </EmptyText>
      ) : (
        <CommentWrap>
          {comments.map(comment => (
            <CommentList
              key={`${comment.postId}-${comment.artistName}-${comment.content}`}
            >
              <CommentItem>
                <HeadWrap>
                  <GapWrap
                    typo="Caption_1"
                    color="primary_800"
                    children={comment.artistName}
                  />
                  <GapWrap typo="Caption_1" color="primary_800" children="·" />
                  <Text
                    typo="Caption_2"
                    color="primary_700"
                    children={comment.name}
                  />
                </HeadWrap>
              </CommentItem>
              <CommentContent>
                <TitleWrap>
                  <Text typo="Body_1">{comment.postTitle}</Text>
                </TitleWrap>
                <ContentDiv>
                  <Wrap>
                    <Text typo="Body_3">{comment.content}</Text>
                  </Wrap>
                </ContentDiv>
                <DetailWrap>
                  <IconWrapper>
                    <IconDiv>
                      <HeartIcon />
                      <Text
                        typo="Body_3"
                        children={comment.likeCount}
                        color="heart"
                      />
                    </IconDiv>
                  </IconWrapper>
                  <ViewButton
                    onClick={() =>
                      (window.location.href = `/record-post/${comment.postId}`)
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
              </CommentContent>
            </CommentList>
          ))}
        </CommentWrap>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
`;

const EmptyText = styled.div`
  width: 100%;
  height: 460px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const CommentWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 24px;
`;

const HeadWrap = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const GapWrap = styled(Text)`
  margin-right: 4px;
`;

const CommentList = styled.div`
  display: flex;
  width: 306px;
  flex-direction: column;
  align-items: flex-start;
`;

const CommentItem = styled.div`
  display: flex;
  height: 48px;
  padding: 12px 16px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_200};
`;

const CommentContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 306px;
  height: 214px;
  padding: 20px 24px;
  gap: 16px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;

const TitleWrap = styled.div`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
`;

const ContentDiv = styled.div`
  display: flex;
  margin-top: -4px;
  width: 258px;
  height: 100px;
  padding: 14px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  border: 1px solid var(--Primary-300, #c3dbff);
  flex: 1 0 0;
  align-self: stretch;
`;

const Wrap = styled.div`
  width: 100%;
  align-self: stretch;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  white-space: nowrap;
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
