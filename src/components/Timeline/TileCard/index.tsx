import styled from 'styled-components'
import { theme } from '@/styles/theme'
import { Text } from '@/components/atoms/Text'
import { Tag } from '@/components/atoms/Tag'
interface TileCardProps {
  selected?: boolean;
  schedules: Schedule[];
}
interface Schedule {
  title: string;
  date: string;
  tags: ("tile" | "deck" | "song")[];
  description: string;
  thumbnails: string[];
  thumbnailLabels: string[];
  participants?: number;
}

const getDayFromDate = (date: string) => {
  const day = date.split('.')[2];
  return `${parseInt(day, 10)}일`;
};

export const TileCard = ({ selected = false, schedules }: TileCardProps) => {
  return (
    <CardWrapper selected={selected}>
      {selected ? (
        <ExpandedContent schedules={schedules} />
      ) : (
        <CollapsedContent schedules={schedules} />
      )}
    </CardWrapper>
  )
}

const CollapsedContent = ({ schedules }: { schedules: Schedule[] }) => {
  const titles = schedules.slice(0, 2).map((s) => s.title).join(', ');

  return (
    <>
      <HeaderRow>
        <Text typo="H4" color="gray_1000">대표 스케줄</Text>
        <TileOpenWrapper>
          <Text typo="Caption_2" color="gray_1000">
            {schedules.length}개의 타일 더 보기
          </Text>
        </TileOpenWrapper>
      </HeaderRow>

      <MainSchedulesRow>
        <Text typo="Body_3" color="gray_1000">{titles}</Text>
      </MainSchedulesRow>
    </>
  );
};

const ExpandedContent = ({ schedules }: { schedules: Schedule[] }) => {
  const schedule = schedules[0]; // 첫 번째 스케줄만 사용

  if (!schedule) return null;

  return (
    <ExpandedSchedule>
      <Header>
        <Text typo="Body_1" color="gray_700">{getDayFromDate(schedule.date)}</Text>
        <Text typo="H4" color="gray_1000">{schedule.title}</Text>
      </Header>

      <TagWrapper>
        {schedule.tags.map((tag, i) => (
          <Tag key={i} variant={tag} />
        ))}
      </TagWrapper>

      <TextWrapper>
        <Text typo="Body_3" color="gray_1000">{schedule.description}</Text>
      </TextWrapper>

      <PhotoWrapper>
  {schedule.thumbnails.map((src, i) => (
    <ThumbnailImage key={i} src={src} />
  ))}
</PhotoWrapper>


      {schedule.participants && (
        <ParticipantWrapper>
          <Text typo="Caption_2" color="gray_1000">
            +{schedule.participants}명 참여했어요
          </Text>
        </ParticipantWrapper>
      )}
    </ExpandedSchedule>
  );
};

const CardWrapper = styled.div<{ selected: boolean }>`
  display: flex;
  width: 818px;
  padding: ${({ selected }) => (selected ? '24px 24px 16px 24px' : '24px')};
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 16px;
  border: 1px solid ${theme.palette.primary_200};
  background: ${theme.palette.gray_0};
  box-shadow: 0px 4px 12px 0px rgba(159, 198, 255, 0.25);
`;

const HeaderRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const TileOpenWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const MainSchedulesRow = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
`;

const Header = styled.div`
display: flex;
align-items: flex-start;
gap: 8px;
align-self: stretch;
`
const TagWrapper = styled.div`
display: flex;
width: 769px;
align-items: center;
gap: 8px;
`
const TextWrapper = styled.div`
height: 48px;
align-self: stretch;
`
const PhotoWrapper = styled.div`
display: flex;              
  gap: 8px;                 
  align-items: flex-start;    
`
const ThumbnailImage = styled.div<{ src: string }>`
  width: 168px;
  height: 142px;
  border-radius: 10px;
  border: 1px solid ${theme.palette.gray_400};
  background: ${({ src }) =>
    `url(${src}) lightgray 50% / cover no-repeat`};
`;

const ExpandedSchedule = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-self: stretch;
  margin-bottom: 32px;
`

const ParticipantWrapper = styled.div`
  display: flex;
justify-content: flex-end;
align-items: center;
gap: 7px;
`