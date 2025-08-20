"use client";

import { useRef, useState } from "react";
import styled from "styled-components";
import { authApi } from "@/apis/authApi";

interface ProfileEditUploaderProps {
  imageFile: File | null;
  previewUrl: string | null;
  onChange: (file: File | null) => void;
  onUploadComplete: (key: string) => void;
}

export const ProfileEditUploader = ({
  imageFile,
  previewUrl,
  onChange,
  onUploadComplete,
}: ProfileEditUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const MAX_IMAGE_SIZE = 3 * 1024 * 1024;
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (file: File) => {
    if (file.size > MAX_IMAGE_SIZE) {
      alert("이미지 파일은 3MB 이하만 업로드 가능합니다.");
      return;
    }
    onChange(file);

    const mimeToExtMap: Record<string, "jpg" | "jpeg" | "png"> = {
      "image/jpeg": "jpeg",
      "image/jpg": "jpg",
      "image/png": "png",
    };

    const ext = mimeToExtMap[file.type];
    if (!ext) {
      alert("jpg, jpeg, png 파일만 업로드할 수 있습니다.");
      return;
    }
    setUploading(true);
    try {
      const res = await authApi.getPresignedUrl(ext);

      const { key, url } = res.data.data;

      await fetch(url, {
        method: "PUT",
        body: file,
        headers: { "Content-Type": file.type },
      });
      onUploadComplete(key);
    } catch (error) {
      console.error("파일 업로드 실패", error);
      alert("이미지 업로드에 실패했습니다.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <>
      <Container onClick={handleClick}>
        {uploading ? (
          <Placeholder>업로드 중...</Placeholder>
        ) : previewUrl ? (
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
          const file = e.target.files?.[0];
          if (file) {
            handleFileChange(file);
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
