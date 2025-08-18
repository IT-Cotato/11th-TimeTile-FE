'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import RecordCardMedium from '@/components/IndividualRecord/RecordCardMedium';
import { Text } from '@/components/atoms/Text';
import { AddRecordButton as RawAddRecordButton } from '@/components/atoms/AddRecordButton';
import { postApi } from '@/apis/postApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface EventData {
  name: string;
  description: string;
  source: string;
  activityTypes: string[];
  relatedArtists: { id: string; name: string; imageUrl: string }[];
  relatedEvents: { groupId: string; name: string }[];
  relatedMaterials: string[];
  startedAt: string;
  endedAt: string;
}

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

// 👇 여기만 추가: 목데이터
const MOCK_EVENT: EventData = {
  name: 'Legacy Directives Orchestrator', // 스케줄 이름
  description:
    'Provident delinquo tener curiositas volva caecus tracto denego.',
  source: 'https://jagged-subexpression.us/',
  activityTypes: ['콘서트/팬미팅'],
  relatedEvents: [
    {
      groupId: '781a8ce4-3897-409b-8500-5a9c084f68ec',
      name: 'Prem Customer Division Associate',
    },
    { groupId: '8ba5b9bf-e82c-4bac-bdbe-ec0e53fc02d2', name: 'Faker 1112' },
  ],
  relatedArtists: [
    {
      id: '6HvZYsbFfjnjFrWF950C9d',
      name: 'NewJeans',
      imageUrl:
        'https://i.scdn.co/image/ab6761610000e5eb80668ba2b15094d083780ea9',
    },
    {
      id: '6YVMFz59CuY7ngCxTxjpxE',
      name: 'aespa',
      imageUrl:
        'https://i.scdn.co/image/ab6761610000e5eb927f1260251e32135287e032',
    },
  ],
  relatedMaterials: ['https://miserly-gallery.info'],
  startedAt: '2025-04-11', // 날짜는 이 값으로 표시
  endedAt: '2025-04-07',
};

const IndividualRecordPage = () => {
  const router = useRouter();

  const [records, setRecords] = useState<RecordItem[]>([]);
  const [selected, setSelected] = useState<'LATEST' | 'HOTTEST'>('LATEST');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const groupId = '0da701ad-79e3-4309-9167-16172dfc0b04';

  const [event, setEvent] = useState<EventData | null>(null);
  const [eventLoading, setEventLoading] = useState(true);

  // '2025-04-11' -> '2025년 4월 11일'
  const formatKoreanDate = (isoDate?: string) => {
    if (!isoDate) return '';
    const [y, m, d] = isoDate.split('-').map(Number);
    if (!y || !m || !d) return isoDate;
    return `${y}년 ${m}월 ${d}일`;
  };

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        const safePage = Math.max(currentPage, 1);
        const safeSort = (
          selected?.toUpperCase() === 'HOTTEST' ? 'HOTTEST' : 'LATEST'
        ) as 'LATEST' | 'HOTTEST';

        const res = await postApi.getAllPosts({
          groupId,
          page: safePage,
          sortBy: safeSort,
        });

        const { posts, totalPages } = res.data;

        if (!posts?.length && safePage > 0) {
          setCurrentPage(1);
          return;
        }

        const mapped = posts.map((post: any) => ({
          postId: post.postId,
          profileImage: post.authorProfileImageUrl ?? '/default-profile.png',
          profileName: post.authorNickname,
          date: (post.createdAt || '').split('T')[0],
          title: post.title,
          description: post.content,
          imageSrc: post.mainImageUrl,
          likes: post.likeCount,
          comments: post.commentCount,
        }));

        setRecords(mapped);
        setTotalPages(totalPages);
      } catch (err: any) {
        console.error(
          '[getAllPosts error]',
          err.response?.status,
          err.response?.data || err.message,
        );
        alert(err.response?.data?.message || '게시글을 불러오지 못했습니다.');
      }
    };

    fetchRecords();
  }, [groupId, currentPage, selected]);

  // 👇 여기만 변경: 네트워크 요청 대신 목데이터 세팅
  useEffect(() => {
    setEventLoading(true);
    setEvent(MOCK_EVENT);
    setEventLoading(false);
  }, []);

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

  // 안전하게 값 뽑기
  const artistName = event?.relatedArtists?.[0]?.name; // 예: 'NewJeans'
  const startedAtLabel = formatKoreanDate(event?.startedAt); // 2025년 4월 11일
  const scheduleName = event?.name; // 스케줄 이름

  return (
    <PageWrapper>
      <Header>
        <TopSection>
          <DateText typo="H4">
            {eventLoading ? '로딩 중...' : startedAtLabel || '-'}
          </DateText>
          <BackButton>
            {artistName ? `${artistName} 대표로 돌아가기` : '뒤로가기'}
          </BackButton>
        </TopSection>
        <TitleText typo="H1">
          {eventLoading ? '불러오는 중...' : scheduleName || ''}
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

        <AddRecordButton
          variant="able"
          onClick={() => router.push('/record-add')}
        >
          기록 추가
        </AddRecordButton>
      </FilterGroup>

      {records.length > 0 ? (
        <>
          <CardGrid>
            {records.map(record => (
              <Link
                key={record.postId}
                href={`/record-post/${record.postId}`}
                style={{ textDecoration: 'none' }}
              >
                <RecordCardMedium {...record} />
              </Link>
            ))}
          </CardGrid>
          <Pagination />
        </>
      ) : (
        <EmptyContainer>
          <Text typo="Body_2">첫 번째 기록을 추가해보세요.</Text>
          <AddRecordButton
            variant="able"
            onClick={() => router.push('/record-add')}
          >
            기록 추가
          </AddRecordButton>
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

const AddRecordButton = styled(RawAddRecordButton)<{ $variant?: string }>`
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
