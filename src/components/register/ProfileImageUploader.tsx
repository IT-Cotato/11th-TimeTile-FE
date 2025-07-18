"use client";
import { useRef } from "react";
import styled from "styled-components";
import { BasicSymbolLogo } from "@/assets/images/BasicSymbolLogo";
import { ImageIcon } from "@/assets/icons/ImageIcon";

export const ProfileImageUploader = ({
  imageFile,
  onChange,
}: {
  imageFile: File | null;
  onChange: (file: File | null) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const handleClick = () => fileInputRef.current?.click();

  const previewUrl = imageFile ? URL.createObjectURL(imageFile) : null;

  return (
    <>
      <Container onClick={handleClick}>
        {previewUrl ? (
          <img src={previewUrl} alt="프로필 미리보기" />
        ) : (
          <Wrapper>
            <BasicSymbolLogo />
            <Overlay />
            <IconWrapper>
              <ImageIcon />
            </IconWrapper>
          </Wrapper>
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
  width: 160px;
  height: 160px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  position: relative;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const Overlay = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.25);
  top: 0;
  left: 0;
`;

const IconWrapper = styled.div`
  position: absolute;
  width: 32px;
  height: 32px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;
