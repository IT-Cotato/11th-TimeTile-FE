import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../atoms/Text";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import { FolderInput } from "./FolderInput";
import { useState, useEffect } from "react";
import { usersApi } from "@/apis/usersApi";

interface FolderEditModalProps {
  onClose: () => void;
  onSuccess?: (updatedName: string) => void;
  initialName: string;
  folderId: number | string;
}

export const FolderEditModal = ({
  onClose,
  onSuccess,
  initialName,
  folderId,
}: FolderEditModalProps) => {
  const [folderName, setFolderName] = useState(initialName);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFolderName(initialName);
  }, [initialName]);

  const handleEdit = async () => {
    if (!folderName.trim()) return;
    setLoading(true);
    try {
      const res = await usersApi.updateScrapFolder(
        Number(folderId),
        folderName
      );
      if (res.isSuccess) {
        console.log("폴더 수정 성공:", folderName);
        if (onSuccess) onSuccess(folderName);
        onClose();
        window.location.reload();
      } else {
        console.error("폴더 수정 실패:", res.message);
      }
    } catch (err) {
      console.error("폴더 수정 API 에러", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ModalOverlay>
      <ModalBox>
        <Content>
          <HeadDiv>
            <Text typo="H3" color="gray_800">
              폴더 이름 수정
            </Text>
            <div onClick={onClose} style={{ cursor: "pointer" }}>
              <CloseIcon />
            </div>
          </HeadDiv>
          <FolderInput
            value={folderName}
            onChange={setFolderName}
            placeholder="폴더명을 입력하세요"
            buttonText="수정하기"
            onSubmit={handleEdit}
            buttonDisabled={folderName.trim().length === 0 || loading}
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
  border: 1px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_50};
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
