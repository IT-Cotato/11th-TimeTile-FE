import { SearchEvent } from "@/model/components/SearchType";
import { Tag } from "@/components/atoms/Tag";
import styled from "styled-components";
import { Text } from "../Text";
import { TagCategory } from "../TagCategory";
import { TagCategoryName } from "@/model/common/tagcategory";
import { theme } from "@/styles/theme";

interface TimeTileCardProps {
  event: SearchEvent;
  highlightWord?: string;
}

export const TimeTileCard = ({ event, highlightWord }: TimeTileCardProps) => {
  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${year.slice(2)}/${month}/${day}`;
  };

  const highlightText = (text: string, word?: string) => {
    if (!word) return text;
    const regex = new RegExp(`(${word})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, idx) =>
      part.toLowerCase() === word.toLowerCase() ? (
        <Highlight key={idx}>{part}</Highlight>
      ) : (
        part
      )
    );
  };

  return (
    <Container>
      <ArtistWrapper>
        <ArtistDiv>
          <ArtistProfile src={event.artistImageUrl} alt="아티스트 프로필사진" />
          <TextWrapper>
            <TextDiv>
              <Text typo="H4_3" color="primary_800">
                {event.artistName}
              </Text>
            </TextDiv>
          </TextWrapper>
        </ArtistDiv>
      </ArtistWrapper>
      <TileWrapper>
        <TileDiv>
          <TopWrapper>
            <Text
              typo="Body_1"
              color="gray_700"
              children={formatDate(event.startedAt)}
            />
            <Text typo="H4">{highlightText(event.name, highlightWord)}</Text>
          </TopWrapper>
          <TagWrapper>
            {event.activityTypes.map((category, idx) => (
              <TagCategory
                key={`cat-${idx}`}
                category={category as TagCategoryName}
              />
            ))}
            {event.relatedArtists?.map((artist, idx) => (
              <Tag key={`artist-${idx}`} variant="deck">
                {artist.name}
              </Tag>
            ))}
            {event.relatedEvents?.map((ev, idx) => (
              <Tag key={`event-${idx}`} variant="tile">
                {ev.name}
              </Tag>
            ))}
          </TagWrapper>
          <DescWrapper>
            <Text typo="Body_3">
              {highlightText(event.description, highlightWord)}
            </Text>
          </DescWrapper>
        </TileDiv>
      </TileWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 1136px;
  align-items: center;
  gap: -1px;
`;

const ArtistWrapper = styled.div`
  display: flex;
  width: 136px;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 20px;
  border: 1.5px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_100};
`;

const ArtistDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const TextWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 88px;
  height: 52px;
`;

const TextDiv = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
`;

const ArtistProfile = styled.img`
  width: 80px;
  height: 80px;
  aspect-ratio: 1/1;
  border-radius: 100px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
`;

const TileWrapper = styled.div`
  display: flex;
  width: 1000px;
  height: 176px;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.gray_0};

  &:hover {
    border-radius: 16px;
    border: 1px solid ${theme.palette.primary_300};
    background: ${theme.palette.primary_100};
  }
`;

const TileDiv = styled.div`
  display: flex;
  width: 952px;
  flex-direction: column;
  align-items: flex-start;
  gap: 18px;
`;

const TopWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  align-self: stretch;
`;

const TagWrapper = styled.div`
  display: flex;
  gap: 8px;
  overflow-x: auto;
  white-space: nowrap;
  -webkit-overflow-scrolling: touch;
  & > * {
    flex-shrink: 0;
  }

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const DescWrapper = styled.div`
  height: 48px;
  align-self: stretch;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Highlight = styled.span`
  color: ${theme.palette.primary_600};
`;
