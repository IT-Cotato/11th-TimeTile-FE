'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Text } from '@/components/atoms/Text';
import { ImageIcon } from '@/assets/icons/ImageIcon';
import { GlobeIcon } from '@/assets/icons/GlobeIcon';
import { LockIcon } from '@/assets/icons/LockIcon';
import MediaThumbnail from '@/components/atoms/MediaThumbnail';
import { LeftArrowIcon } from '@/assets/icons/LeftArrowIcon';
import { RightArrowIcon } from '@/assets/icons/RightArrowIcon';
import { AddRecordButton as RawAddRecordButton } from '@/components/atoms/AddRecordButton';
import { postApi } from '@/apis/postApi';
import type { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { theme } from '@/styles/theme';

const MAX_FILE_COUNT = 10;
const MAX_BODY_LENGTH = 500;

interface FileItem {
  url: string;
  type: 'image' | 'video';
  file: File;
}

/* ─ helpers ─ */
const getErrorMessage = (err: unknown) => {
  if ((err as any)?.isAxiosError) {
    const ax = err as AxiosError<any>;
    const status = ax.response?.status;
    const code = ax.response?.data?.code ?? ax.code;
    const msg = ax.response?.data?.message || ax.message || '요청 실패';
    const details: string[] = Array.isArray(ax.response?.data?.errors)
      ? ax.response!.data!.errors.map((e: any) => e?.message || e).slice(0, 3)
      : [];
    const head = `[${status ?? 'NETWORK'}${code ? `/${code}` : ''}] ${msg}`;
    return details.length ? `${head}\n- ${details.join('\n- ')}` : head;
  }
  if (err instanceof Error) return err.message;
  try {
    return JSON.stringify(err);
  } catch {
    return String(err);
  }
};

const getExt = (f: File) => {
  const byName = f.name.split('.').pop()?.toLowerCase();
  if (byName) return byName;
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'video/mp4': 'mp4',
    'video/quicktime': 'mov',
    'video/webm': 'webm',
  };
  return map[f.type] ?? 'bin';
};
/* ─────────── */

const IndividualRecordPage = () => {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const mediaListRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!title || !body || body.length > MAX_BODY_LENGTH) {
      alert('제목과 본문을 확인해주세요.');
      return;
    }
    setIsSubmitting(true);

    try {
      let mediaKeys: string[] = [];

      // 1) 파일이 있으면 presigned 발급 → PUT 업로드
      if (files.length > 0) {
        const extensions = files.map(f => getExt(f.file));

        // presigned 발급: 서버 스펙에 맞춰 uploadInfo 사용
        type UploadInfo = {
          key: string;
          url: string;
          headers?: Record<string, string>;
          contentType?: string;
        };
        let uploadInfo: UploadInfo[] = [];
        try {
          const res = await postApi.getUploadUrls(extensions);
          uploadInfo = Array.isArray(res?.uploadInfo) ? res.uploadInfo : [];
        } catch (err) {
          alert(`[업로드 URL 발급 실패]\n${getErrorMessage(err)}`);
          setIsSubmitting(false);
          return;
        }
        if (!uploadInfo.length) {
          alert('[업로드 URL 발급 실패]\n응답에 uploadInfo가 없습니다.');
          setIsSubmitting(false);
          return;
        }

        try {
          await Promise.all(
            uploadInfo.map(async (p, i) => {
              const headers: HeadersInit = new Headers();
              if (p.contentType) headers.set('Content-Type', p.contentType);
              if (p.headers)
                Object.entries(p.headers).forEach(([k, v]) =>
                  headers.set(k, String(v)),
                );
              const res = await fetch(p.url, {
                method: 'PUT',
                body: files[i].file,
                headers,
              });
              if (!res.ok) {
                const text = await res.text().catch(() => '');
                throw new Error(
                  `PUT ${res.status} ${res.statusText}${
                    text ? `\n${text}` : ''
                  }`,
                );
              }
            }),
          );
        } catch (err) {
          alert(`[파일 업로드 실패]\n${getErrorMessage(err)}`);
          setIsSubmitting(false);
          return;
        }

        mediaKeys = uploadInfo.map(p => p.key);
      }

      // 2) 게시글 생성
      try {
        await postApi.createPost({
          groupId: 'df596e5b-f827-49e7-8555-101e26267d9f',
          title,
          content: body,
          visibility: isPublic ? 'PUBLIC' : 'PRIVATE',
          mediaKeys,
          mainImageIndex: files.length > 0 ? selectedIndex : null,
        });
      } catch (err) {
        alert(`[게시글 생성 실패]\n${getErrorMessage(err)}`);
        setIsSubmitting(false);
        return;
      }

      alert('기록이 등록되었습니다.');
      files.forEach(f => URL.revokeObjectURL(f.url));
      router.push('/record-list');

      setTitle('');
      setBody('');
      setFiles([]);
      setSelectedIndex(0);
      setIsPublic(true);
    } catch (err) {
      alert(`[등록 실패]\n${getErrorMessage(err)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleScroll = (dir: 'left' | 'right') =>
    mediaListRef.current?.scrollBy({
      left: dir === 'left' ? -200 : 200,
      behavior: 'smooth',
    });

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files;
    if (!selectedFiles) return;
    const newFileArray = Array.from(selectedFiles).slice(
      0,
      MAX_FILE_COUNT - files.length,
    );
    const newItems: FileItem[] = newFileArray.map(file => ({
      url: URL.createObjectURL(file),
      type: file.type.startsWith('video') ? 'video' : 'image',
      file,
    }));
    setFiles(prev => [...prev, ...newItems]);
  };

  const handleDelete = (index: number) => {
    setFiles(prev => {
      const updated = [...prev.slice(0, index), ...prev.slice(index + 1)];
      if (selectedIndex >= updated.length) setSelectedIndex(0);
      return updated;
    });
  };

  return (
    <PageWrapper>
      <Header>
        <TopSection>
          <DateText typo="H4">2022년 9월 24일</DateText>
          <BackButton>IVE 대표로 돌아가기</BackButton>
        </TopSection>
        <TitleText typo="H1">연세대학교 AKARAKA 축제 무대</TitleText>
      </Header>

      <MainForm>
        <TitleInput
          placeholder="제목을 입력해주세요"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <BodyContainer>
          <BodyTextarea
            placeholder="본문을 입력해주세요"
            value={body}
            onChange={e => setBody(e.target.value)}
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
            <ArrowBtn onClick={() => handleScroll('left')}>
              <LeftArrowIcon />
            </ArrowBtn>
            <ArrowBtn onClick={() => handleScroll('right')}>
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
            <VisibilityToggle onClick={() => setIsPublic(p => !p)}>
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
          {isSubmitting ? '등록 중…' : '마이타일 추가'}
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
  shouldForwardProp: p => p !== 'exceeded',
})<{ exceeded: boolean }>`
  color: ${({ exceeded }) => (exceeded ? 'red' : '#999')};
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
