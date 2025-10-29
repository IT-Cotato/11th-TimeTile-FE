import React from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { Text } from "../atoms/Text";

interface PaginationComponentProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  marginTop?: number;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  page,
  totalPages,
  onPageChange,
  marginTop = 100,
}) => {
  const maxButtons = 5;
  const pageGroup = Math.floor((page - 1) / maxButtons);

  const startPage = pageGroup * maxButtons + 1;
  const endPage = Math.min(startPage + maxButtons - 1, totalPages);

  const pages = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // 이전 그룹으로 이동
  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      const newPage = (pageGroup - 1) * maxButtons + 1;
      // 이전 그룹의 첫 페이지
      onPageChange(newPage);
    }
  };

  // 다음 그룹으로 이동
  const handleNextGroup = () => {
    if (endPage < totalPages) {
      const newPage = (pageGroup + 1) * maxButtons + 1;
      // 다음 그룹 첫 페이지
      onPageChange(newPage);
    }
  };

  return (
    <Container $marginTop={marginTop}>
      <ArrowButton
        onClick={handlePrevGroup}
        disabled={pageGroup === 0}
        aria-label="이전 페이지 그룹"
      >
        <MoveLeftIcon />
      </ArrowButton>
      <PageNumbersWrapper>
        {pages.map((p) => (
          <PageButton
            key={p}
            onClick={() => onPageChange(p)}
            $selected={p === page}
            aria-current={p === page ? "page" : undefined}
          >
            <Text typo="Body_3">{p}</Text>
          </PageButton>
        ))}
      </PageNumbersWrapper>
      <ArrowButton
        onClick={handleNextGroup}
        disabled={endPage === totalPages}
        aria-label="다음 페이지 그룹"
      >
        <MoveRightIcon />
      </ArrowButton>
    </Container>
  );
};

export default PaginationComponent;

const Container = styled.div<{ $marginTop: number }>`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: ${({ $marginTop }) => `${$marginTop}px`};
`;

const ArrowButton = styled.button`
  all: unset;
  cursor: pointer;
  color: ${({ disabled }) =>
    disabled ? `${theme.palette.gray_300}` : `${theme.palette.primary_500}`};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};
  user-select: none;
`;

const PageButton = styled.button<{ $selected: boolean }>`
  background-color: ${({ $selected }) =>
    $selected ? `${theme.palette.primary_300}` : `${theme.palette.gray_0}`};
  color: ${({ $selected }) =>
    $selected ? `${theme.palette.primary_700}` : `${theme.palette.gray_700}`};
  border: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  cursor: pointer;
`;

const PageNumbersWrapper = styled.div`
  display: flex;
  gap: 8px;
`;
