'use client';

import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Text } from '@/components/atoms/Text';
import { ImageIcon } from '@/assets/icons/ImageIcon';
import MediaThumbnail from '@/components/atoms/MediaThumbnail';
import { LeftArrowIcon } from '@/assets/icons/LeftArrowIcon';
import { RightArrowIcon } from '@/assets/icons/RightArrowIcon';
import { AddRecordButton as RawAddRecordButton } from '@/components/atoms/AddRecordButton';
import { postApi } from '@/apis/postApi';

const MAX_FILE_COUNT = 10;
const MAX_BODY_LENGTH = 500;

interface FileItem {
  url: string;
  type: 'image' | 'video';
}

const IndividualRecordPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [files, setFiles] = useState<FileItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPublic, setIsPublic] = useState(true);
  const mediaListRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async () => {
    if (!title || !body || body.length > MAX_BODY_LENGTH) {
      alert('제목과 본문을 확인해주세요.');
      return;
    }

    try {
      await postApi.createPost({
        groupId: '0da701ad-79e3-4309-9167-16172dfc0b04',
        title,
        content: body,
        visibility: isPublic ? 'PUBLIC' : 'PRIVATE',
        mediaKeys: [],
        mainImageIndex: files.length > 0 ? selectedIndex : null,
      });

      alert('기록이 등록되었습니다.');
      setTitle('');
      setBody('');
      setFiles([]);
      setSelectedIndex(0);
    } catch (err) {
      console.error(err);
      alert('기록 등록에 실패했습니다.');
    }
  };

  const handleScroll = (dir: 'left' | 'right') => {
    mediaListRef.current?.scrollBy({
      left: dir === 'left' ? -200 : 200,
      behavior: 'smooth',
    });
  };

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
          <DateText typo="H4">2025년 2월 17일</DateText>
          <BackButton>에스파 대표로 돌아가기</BackButton>
        </TopSection>
        <TitleText typo="H1">
          멜론뮤직어워드(<strong>MMA</strong>) 참석
        </TitleText>
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
              {isPublic ? '전체공개' : '나만보기'}
            </VisibilityToggle>
          </BottomLeft>
          <CharCount exceeded={body.length > MAX_BODY_LENGTH}>
            {body.length} / {MAX_BODY_LENGTH}자
          </CharCount>
        </BottomBar>
      </MainForm>

      <AddRecordButtonWrapper>
        <AddRecordButton variant="able" onClick={handleSubmit}>
          기록 추가
        </AddRecordButton>
      </AddRecordButtonWrapper>
    </PageWrapper>
  );
};

export default IndividualRecordPage;

const PageWrapper = styled.div`
  margin: 0 auto;
  width: 950px;
`;

const Header = styled.div`
  display: flex;
  padding: 32px;
  margin-bottom: 24px;
  flex-direction: column;
  border-radius: 20px;
  border: 1.5px solid var(--Primary-400, #a6c6fa);
  background: var(--Primary-20, #fbfdff);
  box-shadow: 0 4px 8px 0 rgba(128, 169, 242, 0.15);
`;

const TopSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const DateText = styled(Text)`
  color: var(--Primary-700, #3a5caa);
`;

const TitleText = styled(Text)`
  margin-top: 16px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--gray-500);
  font-size: 14px;
  cursor: pointer;
`;

const MainForm = styled.div`
  display: flex;
  flex-direction: column;
  border-radius: 20px;
  border: 1px solid var(--Gray-300, #d1d3d4);
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
  margin-bottom: 16px; /* 아래쪽에 여백 추가 */

  &:focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
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

  &:focus {
    outline: none;
    box-shadow: none;
    border: none;
  }
`;

const CharCount = styled.div.withConfig({
  shouldForwardProp: prop => prop !== 'exceeded',
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
  border-radius: 14px;
  padding: 4px 8px;
  font-size: 14px;
`;

const AddRecordButtonWrapper = styled.div`
  position: absolute;
  right: 24px;
`;

const AddRecordButton = styled(RawAddRecordButton)`
  margin-top: 24px;
`;
