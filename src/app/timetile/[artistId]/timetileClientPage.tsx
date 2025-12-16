"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArtistProfileCard } from "@/components/atoms/ArtistProfileCard";
import styled from "styled-components";
import { deckApi } from "@/apis/deckApi";
import { TimetileDeck } from "@/components/Deck/TimetileDeck";
import { DeckTab } from "@/components/Deck/DeckTab";
import { MyTileDeck } from "@/components/Deck/MyTileDeck";
import { useAtom } from "jotai";
import { userProfileAtom } from "@/store/UserProfileAtom";
import { EmptyDeck } from "@/components/Deck/EmptyDeck";
import { DeckWriteModal } from "@/components/Deck/DeckWriteModal";

interface ArtistData {
  artistName: string;
  imageUrl: string;
  followerCount: number;
}

export default function ArtistPage() {
  const router = useRouter();
  const params = useParams();
  const artistId = Array.isArray(params?.artistId)
    ? params.artistId[0]
    : params?.artistId;

  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [yearSchedules, setYearSchedules] = useState<Record<number, string[]>>(
    {}
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"timeTile" | "myTile">("timeTile");
  const [userProfile] = useAtom(userProfileAtom);
  const [followVariant, setFollowVariant] = useState<
    "follow" | "following" | "unfollow"
  >("follow");
  const [mode, setMode] = useState<"view" | "edit" | "waiting">("view");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedMode = localStorage.getItem("lastMode") as
      | "view"
      | "edit"
      | "waiting"
      | null;
    if (storedMode) {
      setMode(storedMode);
      localStorage.removeItem("lastMode");
    }
  }, []);

  useEffect(() => {
    if (artistId) localStorage.setItem("lastArtistId", artistId);
  }, [artistId]);

  useEffect(() => {
    if (!artistId) return;
    const fetchFollowStatus = async () => {
      try {
        const res = await deckApi.getFollowStatus(artistId);
        setFollowVariant(res.data.isFollowing ? "following" : "follow");
      } catch (e) {
        console.error(e);
      }
    };
    fetchFollowStatus();
  }, [artistId]);

  useEffect(() => {
    if (!artistId) return;
    const fetchData = async () => {
      setLoading(true);
      try {
        const artistInfo = await deckApi.getArtistInfo(artistId);
        setArtistData({
          artistName: artistInfo.name,
          imageUrl: artistInfo.imageUrl,
          followerCount: artistInfo.followCount,
        });

        const activeYears = await deckApi.getArtistActiveYears(artistId);
        const sortedYears = Object.keys(activeYears)
          .map((y) => parseInt(y))
          .sort((a, b) => b - a);
        setYears(sortedYears);

        setYearSchedules(
          Object.fromEntries(
            Object.entries(activeYears).map(([year, schedules]) => [
              parseInt(year),
              schedules as string[],
            ])
          )
        );

        if (sortedYears.length > 0) setSelectedYear(sortedYears[0]);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [artistId]);

  const handleFollowClick = async () => {
    if (!artistId) return;
    if (followVariant === "follow") {
      try {
        await deckApi.followArtist(artistId);
        setFollowVariant("following");
        setArtistData((prev) =>
          prev ? { ...prev, followerCount: prev.followerCount + 1 } : prev
        );
      } catch (e) {
        console.error(e);
      }
    } else if (followVariant === "following") {
      setFollowVariant("unfollow");
    }
  };

  const handleUnfollowClick = async () => {
    if (!artistId) return;
    try {
      await deckApi.unfollowArtist(artistId);
      setFollowVariant("follow");
      setArtistData((prev) =>
        prev ? { ...prev, followerCount: prev.followerCount - 1 } : prev
      );
    } catch (e) {
      console.error(e);
    }
  };

  if (loading || !artistData) return <div>Loading...</div>;

  return (
    <Container>
      <Wrapper>
        <ArtistProfileCard
          artistName={artistData.artistName}
          followerCount={artistData.followerCount}
          imageUrl={artistData.imageUrl}
          years={years}
          yearSchedules={yearSchedules}
          role="EDITOR"
          mode={mode}
          currentTab={activeTab}
          setMode={setMode}
          selectedYear={selectedYear}
          onYearSelect={setSelectedYear}
          isFollowing={followVariant}
          followLoading={false}
          onFollowClick={handleFollowClick}
          onUnfollowClick={handleUnfollowClick}
          onClockClick={() => {
            if (!artistId) return;
            localStorage.setItem("lastArtistId", artistId);
            router.push("/waiting");
          }}
        />

        {years.length === 0 ? (
          <>
            <EmptyDeck onAddTileClick={() => setShowModal(true)} />
            {showModal && (
              <ModalOverlay>
                <DeckWriteModal
                  modalMode="add"
                  onClose={() => setShowModal(false)}
                  userRole="EDITOR"
                />
              </ModalOverlay>
            )}
          </>
        ) : (
          selectedYear && (
            <div>
              <DeckTab
                activeTab={activeTab}
                role="EDITOR"
                artistName={artistData.artistName}
                onTabChange={setActiveTab}
                mode={mode}
              />
              {activeTab === "timeTile" && (
                <TimetileDeck
                  role="EDITOR"
                  year={selectedYear}
                  artistId={artistId!}
                  mode={mode}
                />
              )}
              {activeTab === "myTile" && (
                <MyTileDeck
                  year={selectedYear}
                  artistId={artistId!}
                  mode={mode}
                  role="EDITOR"
                />
              )}
            </div>
          )
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
  padding: 0 119px;
  padding-bottom: 83px;
`;

const Wrapper = styled.div`
  display: flex;
  width: 950px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;
