"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { TileToggle } from "@/components/Waiting/TileToggle";
import { WaitingInfo } from "@/components/Waiting/WaitingInfo";
import { WaitingTile } from "@/components/Waiting/WaitingTile";
import PaginationComponent from "@/components/mypage/PaginationComponent";
import { mockPendingEventsResponse } from "@/components/Waiting/mocks";

interface PendingEvent {
  eventId: number;
  changeType: "NEW" | "EDITED";
  name: { operation: string; text: string }[];
  description: { operation: string; text: string }[];
  addedRelatedMaterials: string[];
}

export default function WaitingClientPage() {
  const [tileView, setTileView] = useState<"all" | "new" | "edited">("all");
  const [pendingEvents, setPendingEvents] = useState<PendingEvent[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   const fetchPending = async (page: number) => {
  //     setLoading(true);
  //     try {
  //       const res = await deckApi.getPendingEvents(page);
  //       setPendingEvents(res.data.pendingEvents);
  //       setTotalPages(res.data.totalPages);
  //     } catch (err) {
  //       console.error(err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchPending(page);
  // }, [page]);

  useEffect(() => {
    const fetchPending = async (page: number) => {
      setLoading(true);
      try {
        const res = mockPendingEventsResponse.data
          .pendingEvents as PendingEvent[];
        setPendingEvents(res);
        setTotalPages(1);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPending(page);
  }, [page]);

  const filteredEvents =
    tileView === "all"
      ? pendingEvents
      : pendingEvents.filter((t) => t.changeType === tileView.toUpperCase());

  const handlePageChange = (newPage: number) => setPage(newPage);

  return (
    <Container>
      <Wrapper>
        <WaitingInfo />
        <TileToggle value={tileView} onChange={setTileView} />
        {loading ? (
          <LoadingArea>로딩 중...</LoadingArea>
        ) : filteredEvents.length === 0 ? (
          <EmptyText>업로드 대기 중인 타일이 없습니다.</EmptyText>
        ) : (
          <>
            <TileList>
              {filteredEvents.map((tile) => (
                <WaitingTile key={tile.eventId} data={tile} />
              ))}
            </TileList>
            <FlexWrap>
              <PaginationComponent
                totalPages={totalPages}
                page={page}
                onPageChange={handlePageChange}
                marginTop={16}
              />
            </FlexWrap>
          </>
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  min-height: 100vh;
  padding: 0 119px 83px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 952px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const TileList = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
  gap: 16px;
  align-self: stretch;
  background: ${theme.palette.sub_50};
  border-radius: 20px;
  border: 1px solid ${theme.palette.sub_300};
`;

const LoadingArea = styled.div`
  width: 100%;
  padding: 100px 0;
  text-align: center;
  color: ${theme.palette.gray_500};
`;

const EmptyText = styled.div`
  width: 100%;
  padding: 80px 0;
  text-align: center;
  color: ${theme.palette.gray_500};
  font-family: "Pretendard-Medium";
`;

const FlexWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
