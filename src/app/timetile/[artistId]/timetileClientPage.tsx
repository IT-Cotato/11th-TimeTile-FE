"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArtistProfileCard } from "@/components/atoms/ArtistProfileCard";
import styled from "styled-components";
import { deckApi } from "@/apis/deckApi";
import { TimetileDeck } from "@/components/Deck/TimetileDeck";
import { DeckTab } from "@/components/Deck/DeckTab";
import { MyTileDeck } from "@/components/Deck/MyTileDeck";
import { useAtom } from "jotai";
import { userProfileAtom } from "@/store/UserProfileAtom";

interface ArtistData {
  artistName: string;
  imageUrl: string;
  followerCount: number;
}

//목데이터 몇개 넣어둠!
const mockYears = [2030, 2029, 2028, 2027, 2026, 2025, 2024, 2023, 2022, 2021];

const mockYearSchedules: Record<number, string[]> = {
  2030: ["Senior Product Strategist", "Chief Innovation Officer"],
  2029: ["Global Marketing Analyst", "Lead UX Designer", "Solutions Architect"],
  2028: ["Data Science Manager", "Front-End Lead", "Back-End Engineer"],
  2027: [
    "Operations Coordinator",
    "Integration Specialist",
    "Quality Assurance Analyst",
  ],
  2026: [
    "Principal Optimization Coordinator",
    "Lead Interactions Analyst",
    "Business Development Manager",
  ],
  2025: [
    "Legacy Brand Analyst",
    "Central Integration Developer",
    "Central Applications Orchestrator",
  ],
  2024: ["Junior Developer", "UI Designer", "Customer Success Associate"],
  2023: ["Marketing Intern", "Sales Support Specialist", "HR Coordinator"],
  2022: ["Project Manager", "Technical Writer", "Database Administrator"],
  2021: ["Software Engineer", "System Analyst", "Creative Designer"],
};

export default function ArtistPage() {
  const params = useParams();
  const artistId = Array.isArray(params?.artistId)
    ? params.artistId[0]
    : params?.artistId;

  const [artistData, setArtistData] = useState<ArtistData | null>(null);
  const [years, setYears] = useState<number[]>([]);
  const [yearSchedules, setYearSchedules] = useState<Record<number, string[]>>(
    {}
  );
  const [isFollowing, setIsFollowing] = useState<boolean>(false);
  const [followLoading, setFollowLoading] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"timeTile" | "myTile">("timeTile");

  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const [followVariant, setFollowVariant] = useState<
    "follow" | "following" | "unfollow"
  >("follow");
  const [mode, setMode] = useState<"view" | "edit" | "waiting">("view");

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

        setYears(mockYears);
        setYearSchedules(mockYearSchedules);
        {
          /* 지금은 목데이터로 확인중이라 위에 두줄 쓰고 실제 데이터는 아래
                const activeYears = await deckApi.getArtistActiveYears(
                  artistId
                );
                const sortedYears = Object.keys(activeYears)
                  .map((y) => parseInt(y))
                  .sort((a, b) => a - b);
                setYears(sortedYears);
                setYearSchedules(
                  Object.fromEntries(
                    Object.entries(activeYears).map(([year, schedules]) => [
                      parseInt(year),
                      schedules as string[],
                    ])
                  )
                );
                     */
        }
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
          // role={userProfile?.role}
          role="EDITOR"
          mode={mode}
          currentTab={activeTab}
          setMode={setMode}
          yearSchedules={yearSchedules}
          isFollowing={followVariant}
          followLoading={followLoading}
          onFollowClick={handleFollowClick}
          onUnfollowClick={handleUnfollowClick}
          onYearSelect={setSelectedYear}
        />
        {selectedYear && artistId && (
          <div>
            <DeckTab
              activeTab={activeTab}
              onTabChange={setActiveTab}
              mode={mode}
            />
            {activeTab === "timeTile" && (
              <TimetileDeck
                year={selectedYear}
                artistId={artistId}
                mode={mode}
              />
            )}
            {activeTab === "myTile" && <MyTileDeck />}
          </div>
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
