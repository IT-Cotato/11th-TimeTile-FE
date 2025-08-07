import React from 'react';
import styled from 'styled-components';
import { Text } from '@/components/atoms/Text';

export interface CommentItemProps {
  author: string;
  content: string;
  createdAt: string;
}

export const CommentItem = ({ author, content, createdAt }: CommentItemProps) => {
  return (
    <Wrapper>
      <Top>
        <Text typo="Body_3">{author}</Text>
        <Text typo="Caption_2" color="gray_600">
          {createdAt}
        </Text>
      </Top>
      <Text typo="Body_2">{content}</Text>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Top = styled.div`
  display: flex;
  justify-content: space-between;
`;