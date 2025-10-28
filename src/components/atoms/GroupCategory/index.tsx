import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { TagCategory } from "../TagCategory";
import { TagCategoryName } from "@/model/common/tagcategory";
import { Text } from "../Text";

interface GroupCategoryProps {
  onChange?: (selected: string[]) => void;
}

const FIRST_LINE: TagCategoryName[] = [
  "콘서트/팬미팅",
  "페스티벌/축제",
  "시상식",
  "앨범발매",
  "쇼케이스",
  "음악방송",
];
const SECOND_LINE: TagCategoryName[] = [
  "유튜브",
  "라디오",
  "TV예능",
  "드라마",
  "영화",
  "팬사인회/기타",
  "미니팬미팅",
];
const THIRD_LINE: TagCategoryName[] = [
  "화보/인터뷰",
  "광고/모델",
  "/콜라보",
  "라이브 방송",
  "기타",
];

export const GroupCategory = ({ onChange }: GroupCategoryProps) => {
  const [selectedCategories, setSelectedCategories] = useState<
    Set<TagCategoryName>
  >(new Set());

  const toggleCategory = (category: TagCategoryName) => {
    setSelectedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(category)) newSet.delete(category);
      else newSet.add(category);
      return newSet;
    });
  };

  useEffect(() => {
    if (onChange) {
      onChange(Array.from(selectedCategories));
    }
  }, [selectedCategories]);

  const renderTag = (category: TagCategoryName) => (
    <TagCategory
      key={category}
      category={category}
      variant={selectedCategories.has(category) ? "select" : "default"}
      onClick={() => toggleCategory(category)}
    />
  );

  return (
    <Container>
      <LineContainer>
        <Line>{FIRST_LINE.map(renderTag)}</Line>
        <Line>{SECOND_LINE.map(renderTag)}</Line>
        <Line>{THIRD_LINE.map(renderTag)}</Line>
      </LineContainer>
      {selectedCategories.size === 0 && (
        <Text typo="Caption_4" color="warning">
          활동 종류를 선택해주세요.
        </Text>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 553px;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
`;

const LineContainer = styled.div`
  display: flex;
  height: 94px;
  align-items: flex-start;
  align-content: flex-start;
  gap: 8px;
  align-self: stretch;
  flex-wrap: wrap;
`;

const Line = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;
