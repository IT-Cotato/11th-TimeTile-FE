import styled from 'styled-components'
import { FollowButton } from '@/components/atoms/FollowButton'
import { theme } from '@/styles/theme'
import { Text } from '@/components/atoms/Text'
import { MoveLeftIcon } from '@/assets/icons/MoveLeftIcon'
import { MoveRightIcon } from '@/assets/icons/MoveRightIcon'
import { Tooltip } from '@/components/atoms/Tooltip'
import { useState } from "react";

interface ArtistProfileCardProps {
  artistName: string;
  followerCount: number;
  imageUrl: string;
  years?: number[];
}

export const ArtistProfileCard = ({
  artistName,
  followerCount,
  imageUrl,
  years = [],
}: ArtistProfileCardProps) => {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  return (
    <CardWrapper>
        <ImageWrapper imageUrl={imageUrl} />
        <ArtistInfoWrapper>
          <TopContentWrapper>
          <TopWrapper>
        <TopSection>
          <TopRow>
            <Text typo="H1" color="gray_1000">{artistName}</Text>
            <FollowButton variant="follow" />
          </TopRow>
          <Text typo="Caption_1" color="gray_1000">
            팔로워 {followerCount.toLocaleString()}명
          </Text>
        </TopSection>
        </TopWrapper>
      <Tooltip variant="default">
        아티스트에 대한 간단한 설명 텍스트
      </Tooltip>
        </TopContentWrapper>
        <BottomSection>
          <YearLinks>
            <IconButton>
      <MoveLeftIcon />
    </IconButton>
            <YearSection>
            {years.map((year) => {
  const isSelected = selectedYear === year;
  return (
    <YearButton
      key={year}
      selected={isSelected}
      onClick={() => setSelectedYear(year)}
    >
      <Text typo={isSelected ? "Body_1" : "Body_3"} color="gray_1000">
        {year}
      </Text>
    </YearButton>
  );
})}
      </YearSection>
      <IconButton>
      <MoveRightIcon />
    </IconButton>
          </YearLinks>
        </BottomSection>
      </ArtistInfoWrapper>
    </CardWrapper>
  )
}

const CardWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 950px;
  padding: 32px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.gray_200};
  background-color: ${theme.palette.gray_0};
`

const ImageWrapper = styled.div<{ imageUrl: string }>`
  width: 200px;
  height: 200px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 10px;
  background: ${({ imageUrl }) =>
    `url(${imageUrl}) lightgray 50% / cover no-repeat`};
  box-shadow: 0px 4px 12px 0px rgba(0, 0, 0, 0.25);
`
const ArtistInfoWrapper = styled.div`
  display: flex;
  width: 654px;
  height: 200px;
  flex-direction: column;
  align-items: flex-start;
  gap: 64px;
  flex-shrink: 0;
`
const TopWrapper = styled.div`
display: flex;
width: 622px;
justify-content: space-between;
align-items: flex-start;
`
const TopContentWrapper = styled.div`
  display: flex;
  height: 112px;
  align-items: flex-start;
  flex-shrink: 0;
  align-self: stretch;
`
const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`
const TooltipWrapper = styled.div`
  display: flex;
height: 32px;
padding: 6px;
justify-content: center;
align-items: center;
align-self: stretch;
aspect-ratio: 1/1;
border-radius: 16px;
border: 1.5px solid var(--Gray-300, #D1D3D4);
background: var(--Gray-0, #FFF);
`
const TopRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 16px;
`

const BottomSection = styled.div`
  display: flex;
  height: 24px;
  align-items: center;
  gap: 34px;
  flex-shrink: 0;
  align-self: stretch;
`

const YearLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`
const IconButton = styled.button`
  width: 24px;
  height: 24px;
  padding: 0;
  background: none;
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  color: ${theme.palette.gray_300}; /* currentColor용 */
`

const YearSection = styled.div`
  display: flex;
  width: 536px;
  align-items: center;
  gap: 32px;
`

const YearButton = styled.button<{ selected?: boolean }>`
  display: flex;
width: 47.5px;
height: 20px;
justify-content: center;
align-items: center;
flex-shrink: 0;
aspect-ratio: 47.50/20.00;

background: none;
  border: none;
  cursor: pointer;
`