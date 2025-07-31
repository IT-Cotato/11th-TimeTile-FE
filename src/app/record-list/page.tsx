'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import RecordCardMedium from '@/components/IndividualRecord/RecordCardMedium';
import { Text } from '@/components/atoms/Text';
import { AddRecordButton as RawAddRecordButton } from '@/components/atoms/AddRecordButton';

interface RecordItem {
  profileImage: string;
  profileName: string;
  date: string;
  title: string;
  description: string;
  imageSrc: string;
  likes: number;
  comments: number;
}

const IndividualRecordPage = () => {
  const [selected, setSelected] = useState<'latest' | 'popular'>('latest');

  const records: RecordItem[] = Array.from({ length: 4 }).map((_, i) => ({
    profileImage: '/profile-default.png',
    profileName: '유저닉네임',
    date: '2025.04.23',
    title: `게시글 제목 게시글 제목 게시글 제목 게시글 제목...`,
    description:
      'aespa(에스파)는 대한민국의 4인조 다국적 걸그룹이다. SMCU 프로젝트의 첫 주자이며, 프로젝트 내에서 독립적인 세계관으로 이야기를 펼치고 있다.',
    imageSrc: '/record-image.png',
    likes: 99,
    comments: 99,
  }));

  const hasRecords = records.length > 0;

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

      <FilterGroup>
        <ToggleWrapper>
          <ToggleButtonGroup>
            <ToggleButton
              selected={selected === 'latest'}
              onClick={() => setSelected('latest')}
            >
              최신순
            </ToggleButton>
            <ToggleButton
              selected={selected === 'popular'}
              onClick={() => setSelected('popular')}
            >
              인기순
            </ToggleButton>
          </ToggleButtonGroup>
        </ToggleWrapper>

        <AddRecordButton variant="able">기록 추가</AddRecordButton>
      </FilterGroup>

      {hasRecords ? (
        <CardGrid>
          {records.map((record: RecordItem, idx: number) => (
            <RecordCardMedium key={idx} {...record} />
          ))}
        </CardGrid>
      ) : (
        <EmptyContainer>
          <Text typo="Body_2">첫 번째 기록을 추가해보세요.</Text>
          <AddRecordButton variant="able">기록 추가</AddRecordButton>
        </EmptyContainer>
      )}
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
  align-self: stretch;
`;

const DateText = styled(Text)`
  color: var(--Primary-700, #3a5caa);
  margin-bottom: 12px;
`;

const TitleText = styled(Text)``;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--gray-500);
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
`;

const FilterGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 24px;
`;

const ToggleWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ToggleButtonGroup = styled.div`
  display: flex;
  padding: 7px 8px;
  border-radius: 24px;
  border: 1px solid var(--Primary-500, #80a9f2);
  background: var(--Gray-0, #fff);
  box-shadow: 0 4px 4px 0 rgba(159, 198, 255, 0.15);
`;

const ToggleButton = styled.button<{ selected: boolean }>`
  border: none;
  background-color: ${({ selected }) => (selected ? '#C3DBFF' : 'transparent')};
  color: ${({ selected }) => (selected ? '#0D2364' : '#000')};
  font-weight: 500;
  font-size: 14px;
  padding: 6px 12px;
  border-radius: 20px;
  cursor: pointer;
  transition:
    background-color 0.2s ease,
    color 0.2s ease;
`;

const AddRecordButton = styled(RawAddRecordButton)`
  display: flex;
  align-items: center;
`;

const CardGrid = styled.div`
  display: grid;
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  grid-template-columns: repeat(auto-fill, minmax(467px, 1fr));
  gap: 16px;
`;

const EmptyContainer = styled.div`
  display: flex;
  height: 400px;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid var(--Primary-300, #c3dbff);
  background: var(--Primary-20, #fbfdff);
`;

const EmptyText = styled(Text)`
  font-size: 16px;
`;
