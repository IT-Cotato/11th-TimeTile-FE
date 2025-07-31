import React from 'react';
import styled from 'styled-components';
import { Text } from '@/components/atoms/Text';
import { HeartIcon } from '@/assets/icons/HeartIcon';
import { ChatIcon } from '@/assets/icons/ChatIcon';
import { RightIcon } from '@/assets/icons/RightIcon';

interface RecordCardMediumProps {
  profileImage: string;
  profileName: string;
  date: string;
  title: string;
  description: string;
  imageSrc: string;
  likes: number;
  comments: number;
}

const RecordCardMedium = ({
  profileImage,
  profileName,
  date,
  title,
  description,
  imageSrc,
  likes,
  comments,
}: RecordCardMediumProps) => {
  return (
    <Wrapper>
      <TopRow>
        <UserInfo>
          <ProfileImage src={profileImage} alt="profile" />
          <Text typo="Body_3">{profileName}</Text>
        </UserInfo>
        <Text typo="Body_3" color="gray_700">
          {date}
        </Text>
      </TopRow>

      <Title typo="H4">{title}</Title>

      <ContentRow>
        <Description typo="Body_3">{description}</Description>
        <Image src={imageSrc} alt="preview" />
      </ContentRow>

      <BottomRow>
        <Reaction>
          <HeartIcon />
          <Text typo="Body_3" color="heart">
            {likes}
          </Text>
        </Reaction>
        <Reaction>
          <ChatIcon />
          <Text typo="Body_3" color="primary_500">
            {comments}
          </Text>
        </Reaction>
        <ViewMore>
          <Text typo="Caption_2" color="primary_700">
            원글보기
          </Text>
          <RightIcon />
        </ViewMore>
      </BottomRow>
    </Wrapper>
  );
};

export default RecordCardMedium;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 467px;
  height: 320px;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #c3dbff;
  background: #fbfdff;
`;

const TopRow = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ProfileImage = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

const Title = styled(Text)`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  align-self: stretch;
  overflow: hidden;
  color: #000;
  margin-bottom: 16px;
`;

const ContentRow = styled.div`
  display: flex;
  height: 146px;
  justify-content: space-between;
  align-items: flex-start;
  align-self: stretch;
`;

const Description = styled(Text)`
  width: 235px;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
  color: #000;
`;

const Image = styled.img`
  width: 168px;
  height: 142px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(159, 198, 255, 0.25);
  align-items: center;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
`;

const Reaction = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

const ViewMore = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`;
