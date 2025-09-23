import { theme } from "@/styles/theme";
import styled from "styled-components";

interface DeckProfileProps {
  name: string;
  imageUrl: string;
}

export const DeckProfile = ({ name, imageUrl }: DeckProfileProps) => {
  return (
    <Container>
      <Wrapper>
        <ArtistImage src={imageUrl} alt="profile" />
        <ArtistName>
          <NameText>{name}</NameText>
        </ArtistName>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: inline-flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  border: 1.5px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_100};
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const ArtistImage = styled.img`
  width: 80px;
  height: 80px;
  aspect-ratio: 1/1;
  border-radius: 100px;
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.2);
`;

const ArtistName = styled.div`
  display: flex;
  width: 120px;
  height: 52px;
  justify-content: center;
  align-items: center;
  gap: 10px;
`;

const NameText = styled.div`
  display: -webkit-box;
  width: 120px;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  flex-shrink: 0;
  overflow: hidden;
  text-align: center;
  text-overflow: ellipsis;
  overflow: hidden;
  color: ${theme.palette.primary_800};
  text-align: center;
  text-overflow: ellipsis;

  /* H4-3 */
  font-family: Pretendard-Medium;
  font-size: 20px;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
`;
