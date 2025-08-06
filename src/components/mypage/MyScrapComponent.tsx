import styled from "styled-components";
import { useState } from "react";
import { ScrapFolder } from "./ScrapFolder";
import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { FolderIcon } from "@/assets/icons/FolderIcon";
import { theme } from "@/styles/theme";

const MOCK_FOLDERS = [
  { name: "에스파", count: 105 },
  { name: "뉴진스", count: 88 },
  { name: "세븐틴", count: 32 },
  { name: "르세라핌", count: 45 },
  { name: "BTS", count: 150 },
  { name: "아이브", count: 70 },
  { name: "레드벨벳", count: 91 },
  { name: "투모로우바이투게더", count: 110 },
  { name: "엔시티", count: 95 },
];

const MAX_VISIBLE = 5;

export const MyScrapComponent = () => {
  const [startIndex, setStartIndex] = useState(0);

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + MAX_VISIBLE < MOCK_FOLDERS.length;

  const handleScrollLeft = () => {
    if (canScrollLeft) setStartIndex((prev) => prev - 1);
  };

  const handleScrollRight = () => {
    if (canScrollRight) setStartIndex((prev) => prev + 1);
  };

  const visibleFolders = MOCK_FOLDERS.slice(
    startIndex,
    startIndex + MAX_VISIBLE
  );

  return (
    <Container>
      <FolderContainer>
        {visibleFolders.map((folder, index) => (
          <ScrapFolder key={index} name={folder.name} count={folder.count} />
        ))}
      </FolderContainer>
      <ArrowButton disabled={!canScrollLeft} onClick={handleScrollLeft}>
        <MoveLeftIcon />
      </ArrowButton>
      <ArrowButton disabled={!canScrollRight} onClick={handleScrollRight}>
        <MoveRightIcon />
      </ArrowButton>
      <FolderIcon />
    </Container>
  );
};

const Container = styled.div`
  margin-top: 24px;
  height: 130px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const FolderContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const ArrowButton = styled.button<{ disabled: boolean }>`
  background: none;
  border: none;
  padding: 0;
  color: ${({ disabled }) =>
    disabled ? `${theme.palette.gray_300}` : `${theme.palette.gray_1000}`};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
`;
