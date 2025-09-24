import React from "react";
import styled from "styled-components";

export type PostMenuProps = {
  open: boolean;
  owned: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onReport: () => void;
  onClose: () => void;
};

export default function PostMenu({
  open,
  owned,
  onEdit,
  onDelete,
  onReport,
}: PostMenuProps) {
  if (!open) return null;
  return (
    <MenuCard onClick={(e) => e.stopPropagation()}>
      {owned ? (
        <>
          <MenuItem onClick={onEdit}>수정하기</MenuItem>
          <MenuItem data-danger onClick={onDelete}>
            삭제하기
          </MenuItem>
        </>
      ) : (
        <MenuItem data-danger onClick={onReport}>
          신고하기
        </MenuItem>
      )}
    </MenuCard>
  );
}

const MenuCard = styled.div`
  position: absolute;
  right: 0;
  top: 28px;
  z-index: 20;
  min-width: 120px;
  border-radius: 12px;
  background: #fff;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.12);
  border: 1px solid #e5e7eb;
  overflow: hidden;
`;
const MenuItem = styled.button`
  width: 100%;
  text-align: left;
  padding: 10px 12px;
  background: #fff;
  border: none;
  cursor: pointer;
  color: #111827;
  &[data-danger] {
    color: #ef4444;
  }
  &:hover {
    background: #f9fafb;
  }
`;
