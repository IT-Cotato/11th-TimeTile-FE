"use client";
import styled from "styled-components";
import { useEffect, useState } from "react";
import { theme } from "@/styles/theme";
import { deckApi } from "@/apis/deckApi";
import { debounce } from "lodash";

interface SearchCustomInputProps {
  placeholder: string;
  type: "artist" | "event";
  onSelect: (value: any) => void;
}

export const SearchCustomInput = ({
  placeholder,
  type,
  onSelect,
}: SearchCustomInputProps) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [isFocused, setIsFocused] = useState(false);

  const fetchResults = debounce(async (q: string) => {
    if (!q.trim()) return setResults([]);
    try {
      const data =
        type === "artist"
          ? await deckApi.searchArtists(q)
          : await deckApi.searchEvents(q);
      setResults(data);
    } catch (e) {
      console.error(e);
    }
  }, 400);

  useEffect(() => {
    fetchResults(query);
    return () => fetchResults.cancel();
  }, [query]);

  return (
    <Wrapper>
      <Input
        value={query}
        placeholder={placeholder}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        onChange={(e) => setQuery(e.target.value)}
      />

      {isFocused && results.length > 0 && (
        <ResultBox>
          {type === "artist"
            ? results.map((artist) => (
                <ArtistItem key={artist.id} onClick={() => onSelect(artist)}>
                  <img src={artist.imageUrl} alt={artist.name} />
                  <span>{artist.name}</span>
                </ArtistItem>
              ))
            : results.map((event) => (
                <EventItem key={event.id} onClick={() => onSelect(event)}>
                  <div>
                    <span className="title">{event.name}</span>
                    <span className="artist">{event.artistName}</span>
                  </div>
                  <span className="date">{event.startedAt}</span>
                </EventItem>
              ))}
        </ResultBox>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Input = styled.input`
  width: 100%;
  height: 72px;
  padding: 12px 16px;
  border: 1px solid ${theme.palette.primary_300};
  border-radius: 10px;
  font-size: 16px;
  background: #fff;
  outline: none;
`;

const ResultBox = styled.div`
  position: absolute;
  top: calc(100% + 4px);
  left: 0;
  width: 100%;
  max-height: 240px;
  overflow-y: auto;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 4px 16px rgba(31, 61, 136, 0.2);
  z-index: 1000;
`;

const ArtistItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 10px 16px;
  cursor: pointer;
  &:hover {
    background: ${theme.palette.primary_50};
  }
  img {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    object-fit: cover;
  }
`;

const EventItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 16px;
  cursor: pointer;
  &:hover {
    background: ${theme.palette.primary_50};
  }
  .title {
    font-weight: 500;
    color: ${theme.palette.gray_1000};
  }
  .artist {
    font-size: 14px;
    color: ${theme.palette.gray_600};
  }
  .date {
    font-size: 14px;
    color: ${theme.palette.gray_500};
  }
`;
