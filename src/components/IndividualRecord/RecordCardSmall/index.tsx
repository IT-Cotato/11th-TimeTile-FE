import React from "react";
import styled from "styled-components";
import { Text } from "../../atoms/Text";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import { ChatIcon } from "@/assets/icons/ChatIcon";
import { theme } from "@/styles/theme";

interface RecordCardSmallProps {
  imageSrc: string;
  title: string;
  description: string;
  likes: number;
  comments: number;
  onClick?: () => void;
}

const RecordCardSmall = ({
  imageSrc,
  title,
  description,
  likes,
  comments,
  onClick,
}: RecordCardSmallProps) => {
  return (
    <Wrapper onClick={onClick}>
      <Image src={imageSrc} alt="record preview" />
      <Title typo="Body_1">{title}</Title>
      <Description typo="Caption_2">{description}</Description>
      <Bottom>
        <IconGroup>
          <HeartIcon />
          <Text typo="Body_3" color="Heart">
            {likes}
          </Text>
        </IconGroup>
        <IconGroup>
          <ChatIcon />
          <Text typo="Body_3" color="primary_500">
            {comments}
          </Text>
        </IconGroup>
      </Bottom>
    </Wrapper>
  );
};

export default RecordCardSmall;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 216px;
  height: 360px;
  padding: 24px;
  border-radius: 20px;
  border: 1px solid #c3dbff;
  background: ${theme.palette.gray_0};
`;

const Image = styled.img`
  width: 168px;
  height: 142px;
  border-radius: 16px;
  border: 1px solid #e6f0ff;
  background: #fff;
  box-shadow: 0 4px 12px rgba(159, 198, 255, 0.25);
  object-fit: cover;
  align-self: center;
  margin-bottom: 20px;
`;

const Title = styled(Text)`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  color: #000;
  margin-bottom: 12px;
`;

const Description = styled(Text)`
  display: -webkit-box;
  overflow: hidden;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  color: #000;
`;

const Bottom = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 12px;
`;

const IconGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;
