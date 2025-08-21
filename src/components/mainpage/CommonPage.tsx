import styled from "styled-components";
import { FlexBox } from "../layouts/FlexBox";
import { Text } from "../atoms/Text";
import { useEffect, useState } from "react";
import { mainApi } from "@/apis/mainApi";
import { theme } from "@/styles/theme";
import useRelativeTime from "@/hooks/useRelativeTime";

type Artist = {
  id: string;
  name: string;
  imageUrl: string;
};

type Event = {
  artistName: string;
  groupId: string;
  name: string;
  editedAt: string;
};

type Post = {
  artistName: string;
  id: number;
  title: string;
  editedAt: string;
};

export const CommonPage = () => {
  const [artists, setArtists] = useState<Artist[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedTTTab, setSelectedTTTab] = useState<"HOTTEST" | "LATEST">(
    "HOTTEST"
  );
  const [posts, setPosts] = useState<Post[]>([]);
  const [selectedMTTab, setSelectedMTTab] = useState<"HOTTEST" | "LATEST">(
    "HOTTEST"
  );

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await mainApi.getTopDeck();
        setArtists(res.data.artists);
      } catch (err) {
        console.error(err);
      }
    };

    fetchArtists();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await mainApi.getTimeTiles(selectedTTTab);
        setEvents(res.data.events);
      } catch (err) {
        console.error(err);
      }
    };
    fetchEvents();
  }, [selectedTTTab]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await mainApi.getMyTiles(selectedMTTab);
        setPosts(res.data.posts);
      } catch (err) {
        console.error(err);
      }
    };
    fetchPosts();
  }, [selectedMTTab]);

  return (
    <FlexBox gap={12}>
      <Container $variant="deck">
        <Text typo="H4" color="primary_700" children="인기데크" />
        <Wrapper $variant="deck">
          {artists.slice(0, 5).map((artist) => (
            <Deck key={artist.id}>
              <ArtistImage src={artist.imageUrl} alt={artist.name} />
              <DeckDiv>
                <Text typo="Body_3" color="gray_1000">
                  {artist.name}
                </Text>
              </DeckDiv>
              {/* <Text typo="Caption_4" color="gray_600">
              </Text> */}
            </Deck>
          ))}
        </Wrapper>
      </Container>
      <Container $variant="notDeck">
        <Tabs>
          <Tab
            $selected={selectedTTTab === "HOTTEST"}
            onClick={() => setSelectedTTTab("HOTTEST")}
          >
            <Text typo="H4" children="인기타임타일" />
          </Tab>
          <Tab
            $selected={selectedTTTab === "LATEST"}
            onClick={() => setSelectedTTTab("LATEST")}
          >
            <Text typo="H4" children="신규타임타일" />
          </Tab>
        </Tabs>
        <Wrapper $variant="notDeck">
          {events.slice(0, 6).map((event) => (
            <Tile key={event.groupId}>
              <TileDivider>
                <TileDiv>
                  <Text typo="Body_2" color="primary_700">
                    {event.artistName}
                  </Text>
                  <TextDiv>
                    <Text typo="Body_3" color="gray_1000">
                      {event.name}
                    </Text>
                  </TextDiv>
                  <Text typo="Caption_4" color="gray_700">
                    {useRelativeTime(event.editedAt)}
                  </Text>
                </TileDiv>
              </TileDivider>
            </Tile>
          ))}
        </Wrapper>
      </Container>
      <Container $variant="notDeck">
        <Tabs>
          <Tab
            $selected={selectedMTTab === "HOTTEST"}
            onClick={() => setSelectedMTTab("HOTTEST")}
          >
            <Text typo="H4" children="인기마이타일" />
          </Tab>
          <Tab
            $selected={selectedMTTab === "LATEST"}
            onClick={() => setSelectedMTTab("LATEST")}
          >
            <Text typo="H4" children="신규마이타일" />
          </Tab>
        </Tabs>
        <Wrapper $variant="notDeck">
          {posts.slice(0, 6).map((post) => (
            <Tile key={post.id}>
              <TileDivider>
                <TileDiv>
                  <Text typo="Body_2" color="primary_700">
                    {post.artistName}
                  </Text>
                  <TextDiv>
                    <Text typo="Body_3" color="gray_1000">
                      {post.title}
                    </Text>
                  </TextDiv>
                  <Text typo="Caption_4" color="gray_700">
                    {useRelativeTime(post.editedAt)}
                  </Text>
                </TileDiv>
              </TileDivider>
            </Tile>
          ))}
        </Wrapper>
      </Container>
    </FlexBox>
  );
};

const Container = styled.div<{ $variant?: "deck" | "notDeck" }>`
  display: flex;
  width: ${({ $variant }) => ($variant === "deck" ? "312px" : "412px")};
  height: 284px;
  padding: 24px 24px 16px 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ $variant }) => ($variant === "deck" ? "24px" : "20px")};
  border-radius: 16px;
  border: 1px solid var(--Primary-300, #c3dbff);
  background: var(--Primary-20, #fbfdff);
`;

const Wrapper = styled.div<{ $variant?: "deck" | "notDeck" }>`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ $variant }) => ($variant === "deck" ? "18px" : "12px")};
  align-self: stretch;
`;

const Deck = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 1 0 0;
`;

const ArtistImage = styled.img`
  width: 24px;
  height: 24px;
  aspect-ratio: 1/1;
  border-radius: 100%;
  object-fit: cover;
`;

const DeckDiv = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;
`;

const Tabs = styled.div`
  display: flex;
  gap: 16px;
`;

const Tab = styled.div<{ $selected: boolean }>`
  cursor: pointer;
  color: ${({ $selected }) =>
    $selected
      ? `${theme.palette.primary_700}`
      : `${theme.palette.primary_400}`};
`;

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;

const TileDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
`;

const TextDiv = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  flex: 1 0 0;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const TileDivider = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;
