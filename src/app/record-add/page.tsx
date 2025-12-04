"use client";

import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { ImageIcon } from "@/assets/icons/ImageIcon";
import { GlobeIcon } from "@/assets/icons/GlobeIcon";
import { LockIcon } from "@/assets/icons/LockIcon";
import MediaThumbnail from "@/components/atoms/MediaThumbnail";
import { LeftArrowIcon } from "@/assets/icons/LeftArrowIcon";
import { RightArrowIcon } from "@/assets/icons/RightArrowIcon";
import { AddRecordButton as RawAddRecordButton } from "@/components/atoms/AddRecordButton";
import { postApi } from "@/apis/postApi";
import type { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { theme } from "@/styles/theme";

const MAX_FILE_COUNT = 10;
const MAX_BODY_LENGTH = 500;

interface FileItem {
  url: string;
  type: "image" | "video";
  file: File;
}

const getErrorMessage = (err: unknown) => {
  if ((err as any)?.isAxiosError) {
    const ax = err as AxiosError<any>;
    const status = ax.response?.status;
    const msg = ax.response?.data?.message || ax.message || "요청 실패";
    return `[${status ?? "NETWORK"}] ${msg}`;
  }
  if (err instanceof Error) return err.message;
  return String(err);
};

const getExt = (f: File) => {
  const byName = f.name.split(".").pop()?.toLowerCase();
  if (byName) return byName;
  const map: Record<string, string> = {
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
    "image/gif": "gif",
    "video/mp4": "mp4",
    "video/quicktime": "mov",
    "video/webm": "webm",
  };
  return map[f.type] ?? "bin";
};

const IndividualRecordPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const groupId = searchParams.get("groupId");

  // 스케줄 데이터 상태
  const [scheduleInfo, setScheduleInfo] = useState<{
    title: string;
    date: string;
  } | null>(null);
  const [loading, setLoading] = useState(false);

  // groupId 기반 API 호출
  useEffect(() => {
    const fetchSchedule = async () => {
      if (!groupId) return;
      setLoading(true);
      try {
        const res = await postApi.getEvent(groupId);
        console.log("📦 event detail:", res);

        // ✅ res 구조 분석 후 안전하게 접근
        const event = res.data?.data ?? res.data ?? res;

        setScheduleInfo({
          title: event.name || event.title || "제목 없음",
          date: event.startedAt
            ? event.startedAt.slice(0, 10)
            : "날짜 정보 없음",
        });
      } catch (err) {
        console.error(err);
        alert(`[스케줄 불러오기 실패]\n${getErrorMessage(err)}`);
      } finally {
        setLoading(false);
      }
    };
    fetchSchedule();
  }, [groupId]);

  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mediaListRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!title || !body || body.length > MAX_BODY_LENGTH) {
      alert("제목과 본문을 확인해주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      let mediaKeys: string[] = [];

      if (files.length > 0) {
        const extensions = files.map((f) => getExt(f.file));
        const res = await postApi.getUploadUrls(extensions);
        const uploadInfo = Array.isArray(res?.uploadInfo) ? res.uploadInfo : [];

        await Promise.all(
          uploadInfo.map(async (p, i) => {
            const headers: HeadersInit = new Headers();
            if (p.contentType) headers.set("Content-Type", p.contentType);
            if (p.headers)
              Object.entries(p.headers).forEach(([k, v]) =>
                headers.set(k, String(v))
              );
            const response = await fetch(p.url, {
              method: "PUT",
              body: files[i].file,
              headers,
            });
            if (!response.ok) throw new Error("파일 업로드 실패");
          })
        );

        mediaKeys = uploadInfo.map((p) => p.key);
      }

      await postApi.createPost({
        groupId: groupId || "",
        title,
        content: body,
        visibility: isPublic ? "PUBLIC" : "PRIVATE",
        mediaKeys,
        mainImageIndex: files.length > 0 ? selectedIndex : null,
      });

      alert("기록이 등록되었습니다.");
      router.push("/record-list");
    } catch (err) {
      alert(`[등록 실패]\n${getErrorMessage(err)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScroll = (dir: "left" | "right") =>
    mediaListRef.current?.scrollBy({
      left: dir === "left" ? -200 : 200,
      behavior: "smooth",
    });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    const newFileArray = Array.from(selectedFiles).slice(
      0,
      MAX_FILE_COUNT - files.length
    );
    const newItems: FileItem[] = newFileArray.map((file) => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith("video") ? "video" : "image",
      file,
    }));
    setFiles((prev) => [...prev, ...newItems]);
  };

  const handleDelete = (index: number) => {
    setFiles((prev) => {
      const updated = [...prev.slice(0, index), ...prev.slice(index + 1)];
      if (selectedIndex >= updated.length) setSelectedIndex(0);
      return updated;
    });
  };

  return (
    <PageWrapper>
      <Header>
        <TopSection>
          <DateText typo="H4">
            {loading
              ? "불러오는 중..."
              : scheduleInfo?.date || "날짜 정보 없음"}
          </DateText>
          <BackButton onClick={() => router.back()}>
            대표 스케줄로 돌아가기
          </BackButton>
        </TopSection>
        <TitleText typo="H1">
          {loading
            ? "불러오는 중..."
            : scheduleInfo?.title || "제목 정보를 불러올 수 없습니다."}
        </TitleText>
      </Header>

      <MainForm>
        <TitleInput
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <BodyContainer>
          <BodyTextarea
            placeholder="본문을 입력해주세요"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            maxLength={MAX_BODY_LENGTH + 50}
          />
        </BodyContainer>

        <MediaScrollWrapper>
          <MediaList ref={mediaListRef}>
            {files.map((file, idx) => (
              <MediaThumbnail
                key={idx}
                url={file.url}
                type={file.type}
                isSelected={selectedIndex === idx}
                onClick={() => setSelectedIndex(idx)}
                onDelete={() => handleDelete(idx)}
              />
            ))}
          </MediaList>

          <ArrowGroup>
            <ArrowBtn onClick={() => handleScroll("left")}>
              <LeftArrowIcon />
            </ArrowBtn>
            <ArrowBtn onClick={() => handleScroll("right")}>
              <RightArrowIcon />
            </ArrowBtn>
          </ArrowGroup>
        </MediaScrollWrapper>

        <BottomBar>
          <BottomLeft>
            <UploadLabel htmlFor="upload">
              <ImageIcon />
            </UploadLabel>
            <input
              id="upload"
              type="file"
              accept="image/*,video/*"
              multiple
              hidden
              onChange={handleFileSelect}
            />
            <VisibilityToggle onClick={() => setIsPublic((p) => !p)}>
              {isPublic ? (
                <>
                  <GlobeIcon />
                  전체공개
                </>
              ) : (
                <>
                  <LockIcon />
                  나만보기
                </>
              )}
            </VisibilityToggle>
          </BottomLeft>
          <CharCount exceeded={body.length > MAX_BODY_LENGTH}>
            {body.length} / {MAX_BODY_LENGTH}자
          </CharCount>
        </BottomBar>
      </MainForm>

      <AddRecordButtonWrapper>
        <AddRecordButton variant="able" onClick={handleSubmit}>
          {isSubmitting ? "등록 중…" : "마이타일 추가"}
        </AddRecordButton>
      </AddRecordButtonWrapper>
    </PageWrapper>
  );
};

export default IndividualRecordPage;

/* ============ styles ============ */
const PageWrapper = styled.div`
  margin: 0 auto;
  width: 950px;
  padding: 40px;
`;
const Header = styled.div`
  display: flex;
  padding: 32px;
  margin-bottom: 24px;
  flex-direction: column;
  border-radius: 20px;
  border: 1.5px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_20};
  box-shadow: 0 4px 8px 0 rgba(128, 169, 242, 0.15);
`;
const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const DateText = styled(Text)`
  color: ${theme.palette.primary_700};
`;
const TitleText = styled(Text)`
  margin-top: 16px;
`;
const BackButton = styled.button`
  background: none;
  border: none;
  color: ${theme.palette.gray_500};
  font-size: 14px;
  cursor: pointer;
`;
const MainForm = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid ${theme.palette.gray_300};
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.08);
  padding: 24px;
  margin-bottom: 24px;
`;
const TitleInput = styled.input`
  font-size: 20px;
  width: 100%;
  padding: 8px;
  border: none;
  outline: none;
  margin-bottom: 16px;
`;
const BodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-top: 1px solid #ddd;
  padding-top: 16px;
`;
const BodyTextarea = styled.textarea`
  width: 100%;
  font-size: 16px;
  height: 256px;
  resize: none;
  padding: 8px;
  border: none;
  outline: none;
`;
const CharCount = styled.div.withConfig({
  shouldForwardProp: (p) => p !== "exceeded",
})<{ exceeded: boolean }>`
  color: ${({ exceeded }) => (exceeded ? "red" : "#999")};
  font-size: 14px;
  text-align: right;
`;
const MediaScrollWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
`;
const MediaList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 12px;
  margin-bottom: 24px;
`;
const ArrowGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  position: absolute;
  right: 0;
  margin-bottom: 52px;
`;
const ArrowBtn = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 6px;
`;
const BottomBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const BottomLeft = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
`;
const UploadLabel = styled.label`
  cursor: pointer;
`;
const VisibilityToggle = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  border-radius: 14px;
  padding: 5px 10px;
  font-size: 14px;
  background: #fff;
  cursor: pointer;

  svg {
    width: 16px;
    height: 16px;
  }
`;
const AddRecordButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 24px;
`;
const AddRecordButton = styled(RawAddRecordButton)`
  margin-top: 24px;
`;
