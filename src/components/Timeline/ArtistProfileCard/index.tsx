import styled from 'styled-components'
import { FollowButton } from '@/components/atoms/FollowButton'
import { theme } from '@/styles/theme'
import { Text } from '@/components/atoms/Text'
import { MoveLeftIcon } from '@/assets/icons/MoveLeftIcon'
import { MoveRightIcon } from '@/assets/icons/MoveRightIcon'

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
  return (
    <CardWrapper>
        <ImageWrapper imageUrl={imageUrl} />
        <ArtistInfoWrapper>
        <TopSection>
          <TopRow>
            <Text typo="H1" color="gray_1000">{artistName}</Text>
            <FollowButton variant="follow" />
          </TopRow>
          <Text typo="Caption_1" color="gray_1000">
            팔로워 {followerCount.toLocaleString()}명
          </Text>
        </TopSection>
        <BottomSection>
          <YearLinks>
            <IconButton>
      <MoveLeftIcon />
    </IconButton>
            <YearSection>
            {years.map((year) => (
              <YearButton key={year}>
                <Text typo="Body_3" color="gray_1000">
                  {year}
              </Text>
            </YearButton>
      ))}
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
const TopSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  width: 100%;
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

const YearButton = styled.button`
  display: flex;
  width: 47.5px;
  height: 20px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
`