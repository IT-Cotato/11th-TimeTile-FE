import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../atoms/Text";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import { DeckInput } from "../atoms/DeckInput";
import { useState } from "react";

interface ModalProps {
  modalMode: "add" | "edit";
  eventId?: number;
  onClose: () => void;
}

export const DeckWriteModal = ({ modalMode, eventId, onClose }: ModalProps) => {
  const isEdit = modalMode === "edit";
  const [title, setTitle] = useState<string>("");

  return (
    <Container>
      <Wrapper>
        <TopWrapper>
          <Text typo="H3" color="gray_800" children="스크랩 추가" />
          <div onClick={onClose} style={{ cursor: "pointer" }}>
            <CloseIcon />
          </div>
        </TopWrapper>
        <ContentWrapper>
          <TileName>
            <DeckInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </TileName>
        </ContentWrapper>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 856px;
  padding: 32px;
  flex-direction: column;
  align-items: flex-end;
  gap: 32px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_50};
  box-shadow: 0 4px 16px 0 rgba(159, 198, 255, 0.25);
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-self: stretch;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  align-self: stretch;
`;

const TileName = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
`;
