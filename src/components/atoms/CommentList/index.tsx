import React from 'react';
import styled from 'styled-components';
import { CommentItem, CommentItemProps } from '../CommentItem';

interface CommentListProps {
  comments: CommentItemProps[];
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <Wrapper>
      {comments.map((comment, index) => (
        <CommentItem key={index} {...comment} />
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 24px;
`;
