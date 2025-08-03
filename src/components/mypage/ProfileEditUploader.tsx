"use client";

import { useRef } from "react";
import styled from "styled-components";

interface ProfileEditUploaderProps {
  imageFile: File | null;
  previewUrl: string | null;
  onChange: (file: File | null) => void;
}

export const ProfileEditUploader = ({
  imageFile,
  previewUrl,
  onChange,
}: ProfileEditUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <>
      <Container onClick={handleClick}>
        {previewUrl ? (
          <img src={previewUrl} alt="프로필 미리보기" />
        ) : (
          <Placeholder>프로필 이미지 선택</Placeholder>
        )}
      </Container>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            onChange(e.target.files[0]);
          }
        }}
        style={{ display: "none" }}
      />
    </>
  );
};

const Container = styled.div`
  width: 212px;
  height: 212px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Placeholder = styled.div`
  color: #888;
  font-size: 14px;
  text-align: center;
`;
