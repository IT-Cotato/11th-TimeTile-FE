"use client";

import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { TagCategory } from "@/components/atoms/TagCategory";
import { TagCategoryName } from "@/model/common/tagcategory";
import { theme } from "@/styles/theme";
import { FlexBox } from "../layouts/FlexBox";
import { useRouter } from "next/navigation";

export interface Artist {
  id: string;
  name: string;
  profileImageUrl: string;
}

export interface BottomData {
  title: string;
  description: string;
  activityTypes: string[];
  date: string;
  relatedMaterials: number;
}

interface TimeTileProps {
  artistId?: string;
  bottomData: BottomData;
}

export const TimeTileComponent = ({ artistId, bottomData }: TimeTileProps) => {
  const router = useRouter();

  const formatDate = (dateString: string) => {
    const [year, month, day] = dateString.split("-");
    return `${year.slice(2)}/${month}/${day}`;
  };

  const handleClick = () => {
    if (!artistId) return;
    router.push(`/timetile/${artistId}`);
  };

  return (
    // <Container onClick={handleClick}>
    <Container>
      <BottomWrapper>
        <FlexBox gap={8} direction="column" align="flex-start">
          <Date>
            <Text
              typo="Body_1"
              color="gray_700"
              children={formatDate(bottomData.date)}
            />
          </Date>
          <Title>
            <Text typo="H4" color="gray_1000" children={bottomData.title} />
          </Title>
        </FlexBox>
        <ActivityWrapper>
          {bottomData.activityTypes.map((type, idx) => (
            <TagWrapper key={idx}>
              <TagCategory
                category={type as TagCategoryName}
                variant="default"
              />
            </TagWrapper>
          ))}
        </ActivityWrapper>
        <Description>
          <Text typo="Body_3" children={bottomData.description} />
        </Description>
        <RelatedMaterials>
          <Text typo="Body_3" color="gray_700" children="관련컨텐츠" />
          <Text typo="Body_3" color="gray_700">
            +{bottomData.relatedMaterials}개
          </Text>
        </RelatedMaterials>
      </BottomWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 216px;
  height: 346px;
  padding: 12px;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 16px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;

const BottomWrapper = styled.div`
  display: flex;
  padding: 16px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
  border-radius: 10px;
  background: ${theme.palette.primary_100};
`;

const Title = styled.div`
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
`;

const Description = styled.div`
  align-self: stretch;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const ActivityWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 4px;
  overflow-x: auto;
  overflow-y: hidden;
  flex-wrap: nowrap;
  white-space: nowrap;

  &::-webkit-scrollbar {
    height: 0px;
  }
  -ms-overflow-style: none;
  scrollbar-width: none;

  box-sizing: content-box;
`;

const Date = styled.div``;

const TagWrapper = styled.div`
  flex: 0 0 auto;
`;

const RelatedMaterials = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;
