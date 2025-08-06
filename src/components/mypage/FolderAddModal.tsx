import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../atoms/Text";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import { FolderInput } from "./FolderInput";
import { useState } from "react";

interface FolderAddModalProps {
  onClose: () => void;
}

export const FolderAddModal = ({ onClose }: FolderAddModalProps) => {
  const [folderName, setFolderName] = useState("");

  const handleAdd = () => {
    if (!folderName.trim()) return; // 폴더명이 비어 있으면 무시
    console.log("추가할 폴더명:", folderName);
    onClose();
  };

  return (
    <ModalOverlay>
      <ModalBox>
        <Content>
          <HeadDiv>
            <Text typo="H3" color="gray_800">
              폴더 추가
            </Text>
            <div onClick={onClose}>
              <CloseIcon />
            </div>
          </HeadDiv>
          <FolderInput
            value={folderName}
            onChange={setFolderName}
            placeholder="폴더명을 입력하세요"
          />
        </Content>
      </ModalBox>
    </ModalOverlay>
  );
};

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999;
`;

const ModalBox = styled.div`
  display: inline-flex;
  padding: 32px;
  align-items: center;
  gap: 10px;
  z-index: 1000;
  border-radius: 20px;
  border: 1px solid var(--Primary-400, #a6c6fa);
  background: var(--Primary-50, #f7faff);
  box-shadow: 0 4px 16px 0 rgba(159, 198, 255, 0.25);
`;

const Content = styled.div`
  display: flex;
  width: 361px;
  flex-direction: column;
  gap: 24px;
`;

const HeadDiv = styled.div`
  display: flex;
  justify-content: space-between;
`;
