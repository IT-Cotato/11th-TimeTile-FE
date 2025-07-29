"use client";

import { useRef, useState } from "react";
import styled from "styled-components";
import { BasicSymbolLogo } from "@/assets/images/BasicSymbolLogo";
import { ImageIcon } from "@/assets/icons/ImageIcon";
import { authApi } from "@/apis/authApi";

export const ProfileImageUploader = ({
  imageFile,
  onChange,
  onUploadComplete,
}: {
  imageFile: File | null;
  onChange: (file: File | null) => void;
  onUploadComplete: (key: string) => void;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const handleClick = () => fileInputRef.current?.click();

  const handleFileChange = async (file: File) => {
    onChange(file);
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !["jpg", "jpeg", "png"].includes(ext)) return;

    setUploading(true);
    try {
      const res = await authApi.getPresignedUrl(ext as any);
      const { key, url } = res.data;

      await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });

      onUploadComplete(key);
    } catch (error) {
      console.error("파일 업로드 실패", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Container onClick={handleClick}>
        {imageFile ? (
          <img src={URL.createObjectURL(imageFile)} alt="프로필 미리보기" />
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
            handleFileChange(e.target.files[0]);
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
