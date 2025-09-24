import React from "react";
import styled from "styled-components";

export type ImageViewerModalProps = {
  open: boolean;
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
};

export default function ImageViewerModal({
  open,
  images,
  currentIndex,
  onClose,
  onPrev,
  onNext,
}: ImageViewerModalProps) {
  if (!open) return null;
  const src = images[currentIndex];
  return (
    <ImageViewerModalWrap onClick={onClose}>
      <CloseBtn onClick={onClose}>✕</CloseBtn>
      <NavBtn
        data-left
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
      >
        ‹
      </NavBtn>
      <NavBtn
        data-right
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
      >
        ›
      </NavBtn>
      <ViewerContent onClick={(e) => e.stopPropagation()}>
        <ViewerImage src={src} alt={`image-${currentIndex}`} />
      </ViewerContent>
    </ImageViewerModalWrap>
  );
}

const ImageViewerModalWrap = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const CloseBtn = styled.button`
  position: absolute;
  top: 32px;
  left: 32px;
  color: #fff;
  font-size: 28px;
  background: none;
  border: none;
  cursor: pointer;
`;
const NavBtn = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  font-size: 48px;
  background: none;
  color: #fff;
  border: none;
  cursor: pointer;
  &[data-left] {
    left: 32px;
  }
  &[data-right] {
    right: 32px;
  }
`;
const ViewerContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;
const ViewerImage = styled.img`
  width: 600px;
  height: auto;
  object-fit: contain;
  border-radius: 12px;
`;
