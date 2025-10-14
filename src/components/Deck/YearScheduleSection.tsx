import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { theme } from "@/styles/theme";

interface YearScheduleDeckSectionProps {
  year: number;
  schedules: string[];
}

export const YearScheduleDeckSection = ({
  year,
  schedules,
}: YearScheduleDeckSectionProps) => {
  if (!schedules || schedules.length === 0) return null;

  return (
    <SectionWrapper>
      <Text typo="H4" color="gray_1000">
        {year}년 활동
      </Text>
      <DeckGrid>
        {schedules.map((schedule, idx) => (
          <DeckCard key={idx}>
            <Text typo="Body_2" color="gray_900">
              {schedule}
            </Text>
          </DeckCard>
        ))}
      </DeckGrid>
    </SectionWrapper>
  );
};

const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  margin-top: 48px;
  width: 100%;
`;

const DeckGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
`;

const DeckCard = styled.div`
  border: 1px solid ${theme.palette.gray_200};
  background-color: ${theme.palette.gray_50};
  border-radius: 12px;
  padding: 16px;
`;
