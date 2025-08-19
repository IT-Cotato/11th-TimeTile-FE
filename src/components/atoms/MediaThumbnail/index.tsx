import React from 'react';
import styled from 'styled-components';
import { MinusIcon } from '@/assets/icons/MinusIcon';
import { PlayIcon } from '@/assets/icons/PlayIcon';

interface MediaThumbnailProps {
  url: string;
  type: 'image' | 'video';
  isSelected: boolean;
  onClick: () => void;
  onDelete: () => void;
}

const MediaThumbnail = ({
  url,
  type,
  isSelected,
  onClick,
  onDelete,
}: MediaThumbnailProps) => {
  return (
    <ThumbnailWrapper $isSelected={isSelected}>
      {type === 'video' ? <Video src={url} muted loop /> : <Image src={url} />}

      {isSelected && <Badge>대표이미지</Badge>}

      <Overlay>
        <OverlayTop onClick={onClick}>대표이미지 설정</OverlayTop>
        <OverlayBottom onClick={onDelete}>
          <MinusIcon /> 삭제
        </OverlayBottom>
      </Overlay>

      {type === 'video' && (
        <PlayIconWrapper>
          <PlayIcon />
        </PlayIconWrapper>
      )}
    </ThumbnailWrapper>
  );
};

export default MediaThumbnail;

// ----- Styled Components -----

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  transition: opacity 0.3s ease;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const ThumbnailWrapper = styled.div.withConfig({
  shouldForwardProp: prop => prop !== '$isSelected',
})<{ $isSelected: boolean }>`
  position: relative;
  width: 189px;
  height: 160px;
  border-radius: 10px;
  overflow: hidden;
  background: ${({ $isSelected }) =>
    $isSelected ? 'rgba(128, 169, 242, 0.2)' : 'transparent'};
  border: ${({ $isSelected }) =>
    $isSelected ? '1.5px solid #80A9F2' : 'none'};

  &:hover ${Overlay} {
    opacity: 1;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Video = styled.video`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const Badge = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  background: #80a9f2;
  color: white;
  padding: 2px 8px;
  font-size: 12px;
  border-bottom-left-radius: 8px;
`;

const OverlayTop = styled.button`
  flex: 1;
  background-color: rgba(88, 125, 201, 0.7);
  color: white;
  font-size: 14px;
  font-weight: 500;
  border: none;
  cursor: pointer;
`;

const OverlayBottom = styled.button`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  font-size: 14px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
`;

const PlayIconWrapper = styled.div`
  position: absolute;
  bottom: 8px;
  right: 8px;
  color: white;
  font-size: 20px;
  z-index: 3;
`;
