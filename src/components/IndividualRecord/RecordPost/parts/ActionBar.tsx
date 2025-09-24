import React from "react";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { HeartIcon } from "@/assets/icons/HeartIcon";
import { HeartFillIcon } from "@/assets/icons/HeartFillIcon";
import { ChatIcon } from "@/assets/icons/ChatIcon";
import { ScrapIcon1 } from "@/assets/icons/ScrapIcon1";
import { ScrapIconFill } from "@/assets/icons/ScrapIconFill";

export type ActionBarProps = {
  likeCount: number;
  liked: boolean;
  likeLoading?: boolean;
  commentCount: number;
  scrapCount: number;
  dateText: string;
  onToggleLike: () => void;
  onOpenScrap: () => void;
};

export default function ActionBar({
  likeCount,
  liked,
  likeLoading,
  commentCount,
  scrapCount,
  dateText,
  onToggleLike,
  onOpenScrap,
}: ActionBarProps) {
  return (
    <MetaBar>
      <IconRow>
        <IconButton
          onClick={onToggleLike}
          disabled={!!likeLoading}
          aria-pressed={liked}
        >
          {liked ? <HeartFillIcon /> : <HeartIcon />}
        </IconButton>
        <Text typo="Body_3" color="Heart">
          {likeCount}
        </Text>
      </IconRow>

      <IconRow>
        <ChatIcon />
        <Text typo="Body_3" color="primary_500">
          {commentCount}
        </Text>
      </IconRow>

      <IconRow>
        <IconButton onClick={onOpenScrap} aria-label="스크랩">
          {scrapCount > 0 ? <ScrapIconFill /> : <ScrapIcon1 />}
        </IconButton>
        <Text typo="Body_3" color="gray_700">
          {scrapCount}
        </Text>
      </IconRow>

      <BarSpacer />
      <DateText typo="Caption_2">{dateText}</DateText>
    </MetaBar>
  );
}

const MetaBar = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const IconRow = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
const BarSpacer = styled.div`
  flex: 1;
`;
const DateText = styled(Text)`
  color: #6b7280;
`;
const IconButton = styled.button`
  all: unset;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  line-height: 0;
  padding: 4px;
  border-radius: 6px;
  &:focus-visible {
    outline: 2px solid rgba(0, 0, 0, 0.2);
    outline-offset: 2px;
  }
  &[disabled] {
    opacity: 0.6;
    cursor: default;
    pointer-events: none;
  }
`;
