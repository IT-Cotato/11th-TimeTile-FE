'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecordCardMedium from '@/components/IndividualRecord/RecordCardMedium';
import { Text } from '@/components/atoms/Text';
import { AddRecordButton as RawAddRecordButton } from '@/components/atoms/AddRecordButton';
import { postApi } from '@/apis/postApi';

interface RecordItem {
  postId: number;
  profileImage: string;
  profileName: string;
  date: string;
  title: string;
  description: string;
  imageSrc: string;
  likes: number;
  comments: number;
}

const recordsPerPage = 16;

const IndividualRecordPage = () => {
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [selected, setSelected] = useState<'LATEST' | 'HOTTEST'>('LATEST');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const groupId = '42776184-f31d-4f6b-949e-6fc77e144864';

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const safePage = Math.max(currentPage - 1, 0);
        const safeSort = selected.toUpperCase() as 'LATEST' | 'HOTTEST';

        const res = await postApi.getAllPosts({
          groupId,
          page: safePage,
          sortBy: safeSort,
        });

        const { posts, totalPages } = res.data.data;

        const mapped: RecordItem[] = posts.map((post: any) => ({
          postId: post.postId,
          profileImage: post.authorProfileImageUrl,
          profileName: post.authorNickname,
          date: post.createdAt.split('T')[0],
          title: post.title,
          description: post.content,
          imageSrc: post.mainImageUrl,
          likes: post.likeCount,
          comments: post.commentCount,
        }));

        setRecords(mapped);
        setTotalPages(totalPages);
      } catch (error: any) {
        alert('게시글을 불러오지 못했습니다.');
      }
    };

    fetchRecords();
  }, [groupId, currentPage, selected]);

  const Pagination = () => {
    const visibleCount = 5;
    const half = Math.floor(visibleCount / 2);
    let start = Math.max(currentPage - half, 1);
    let end = start + visibleCount - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - visibleCount + 1, 1);
    }

    const pageNumbers = Array.from(
      { length: end - start + 1 },
      (_, i) => start + i,
    );

    return (
      <PaginationWrapper>
        <PageButton
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(prev => prev - 1)}
        >
          ‹
        </PageButton>
        {pageNumbers.map(page => (
          <PageNumber
            key={page}
            active={page === currentPage}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </PageNumber>
        ))}
        <PageButton
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(prev => prev + 1)}
        >
          ›
        </PageButton>
      </PaginationWrapper>
    );
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

      <FilterGroup>
        <ToggleWrapper>
          <ToggleButtonGroup>
            <ToggleButton
              selected={selected === 'LATEST'}
              onClick={() => {
                setSelected('LATEST');
                setCurrentPage(1);
              }}
            >
              최신순
            </ToggleButton>
            <ToggleButton
              selected={selected === 'HOTTEST'}
              onClick={() => {
                setSelected('HOTTEST');
                setCurrentPage(1);
              }}
            >
              인기순
            </ToggleButton>
          </ToggleButtonGroup>
        </ToggleWrapper>

        <AddRecordButton variant="able">기록 추가</AddRecordButton>
      </FilterGroup>

      {records.length > 0 ? (
        <>
          <CardGrid>
            {records.map(record => (
              <RecordCardMedium key={record.postId} {...record} />
            ))}
          </CardGrid>
          <Pagination />
        </>
      ) : (
        <EmptyContainer>
          <Text typo="Body_2">로그인 후 기록을 확인할 수 있습니다.</Text>
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

const PaginationWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  gap: 8px;
`;

const PageButton = styled.button`
  background: none;
  border: none;
  font-size: 20px;
  color: #666;
  cursor: pointer;
  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`;

const PageNumber = styled.button<{ active: boolean }>`
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: ${({ active }) => (active ? '#C3DBFF' : 'transparent')};
  color: ${({ active }) => (active ? '#0D2364' : '#666')};
  font-weight: ${({ active }) => (active ? 'bold' : 'normal')};
  cursor: pointer;
  font-size: 14px;
`;
