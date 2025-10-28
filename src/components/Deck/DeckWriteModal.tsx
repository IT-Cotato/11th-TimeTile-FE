"use client";

import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../atoms/Text";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import { DeckInput } from "../atoms/DeckInput";
import { useState } from "react";
import { GroupCategory } from "../atoms/GroupCategory";
import { CustomDatePicker } from "./CustomDatePicker";
import { RightBlue } from "@/assets/icons/RightBlue";
import { MaterialPreview, RelatedContentInput } from "./RelatedContentInput";
import { Buttons } from "../atoms/Buttons";
import { usePathname } from "next/navigation";
import { deckApi } from "@/apis/deckApi";

interface ModalProps {
  modalMode: "add" | "edit";
  eventId?: number;
  onClose: () => void;
}

export const DeckWriteModal = ({ modalMode, eventId, onClose }: ModalProps) => {
  const isEdit = modalMode === "edit";
  const pathname = usePathname();
  const artistId = pathname.split("/").pop() || "";

  const [title, setTitle] = useState<string>("");
  const [startedAt, setStartedAt] = useState<string>("");
  const [endedAt, setEndedAt] = useState<string>("");
  const [info, setInfo] = useState<string>("");
  const [source, setSource] = useState<string>("");
  const [relatedDeck, setRelatedDeck] = useState<string>("");
  const [relatedTile, setRelatedTile] = useState<string>("");
  const [activityTypes, setActivityTypes] = useState<string[]>([]);
  const [materials, setMaterials] = useState<MaterialPreview[]>([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // const handleSubmit = async () => {
  //   try {
  //     const body = {
  //       name: title,
  //       description: info,
  //       source,
  //       relatedEvents: relatedDeck ? [relatedDeck] : [],
  //       relatedArtists: [],
  //       relatedMaterials: materials.map((m) => m.url),
  //       activityTypes,
  //       startedAt,
  //       endedAt,
  //       artistId,
  //     };

  //     await deckApi.postEvent(body);
  //   } catch (err) {
  //     console.error(err);
  //   } finally {
  //     setShowSuccessModal(true);
  //   }
  // };

  const handleSubmit = async () => {
    if (
      !title ||
      !info ||
      !source ||
      !startedAt ||
      !endedAt ||
      activityTypes.length === 0
    ) {
      alert("필수 항목을 모두 입력해주세요.");
      return;
    }

    try {
      const body = {
        name: title,
        description: info,
        source,
        relatedEvents: relatedDeck ? [relatedDeck] : [],
        relatedArtists: [],
        relatedMaterials: materials.map((m) => m.url),
        activityTypes,
        startedAt,
        endedAt,
        artistId,
      };

      const res = await deckApi.postEvent(body);

      if (res.isSuccess) {
        setShowSuccessModal(true);
      } else {
        alert(res.message || "등록에 실패했습니다.");
      }
    } catch (err) {
      alert("에러가 발생했습니다. 잠시 후 다시 시도해주세요.");
      console.error(err);
    }
  };

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
            <InputInfo>
              <Text typo="H5" children="타일 이름" />
              <Required>*</Required>
            </InputInfo>
            <DeckInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5" children="날짜" />
              <Required>*</Required>
            </InputInfo>
            <DateWrapper>
              <CustomDatePicker
                value={startedAt}
                onChange={(date) => setStartedAt(date)}
                placeholder="시작일 선택"
              />
              <RightBlue />
              <CustomDatePicker
                value={endedAt}
                onChange={(date) => setEndedAt(date)}
                placeholder="종료일 선택"
              />
            </DateWrapper>
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5" children="설명" />
              <Required>*</Required>
            </InputInfo>
            <DeckInput
              height={166}
              maxLength={200}
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="타일에 대한 간략한 설명을 입력해주세요."
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5" children="출처" />
              <Required>*</Required>
            </InputInfo>
            <DeckInput
              variant="noCount"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="정보의 출처를 입력해주세요."
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5" children="관련 데크" />
            </InputInfo>
            <DeckInput
              height={72}
              variant="noCount"
              value={relatedDeck}
              onChange={(e) => setRelatedDeck(e.target.value)}
              placeholder="관련 데크의 이름을 정확히 입력해주세요."
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5" children="관련 타일" />
            </InputInfo>
            <DeckInput
              height={72}
              variant="noCount"
              value={relatedTile}
              onChange={(e) => setRelatedTile(e.target.value)}
              placeholder="관련 타일의 이름을 정확히 입력해주세요."
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5" children="활동 종류" />
              <Required>*</Required>
            </InputInfo>
            <GroupCategory
              onChange={(selected) => setActivityTypes(selected)}
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5" children="관련 컨텐츠" />
            </InputInfo>
            <RelatedContentInput onChange={(list) => setMaterials(list)} />
          </TileName>
        </ContentWrapper>
        <ButtonWrapper>
          <Buttons
            variant="addTile"
            children="타일 추가"
            width={86}
            onClick={handleSubmit}
          />
        </ButtonWrapper>
      </Wrapper>
      {showSuccessModal && (
        <SuccessModal>
          <SuccessBox>
            <CloseBtn
              onClick={() => {
                setShowSuccessModal(false);
                onClose();
              }}
            >
              <CloseIcon />
            </CloseBtn>
            <Text typo="Body_3">
              작성하신 타일이 업로드 대기 페이지에 등록되었습니다.
            </Text>
            <Text typo="Body_3">
              해당 타일은 내용의 적절성 검토를 거쳐 6시간 후, 데크에 반영됩니다.
            </Text>
          </SuccessBox>
        </SuccessModal>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 856px;
  height: 660px;
  overflow-y: scroll;
  padding: 32px;
  flex-direction: column;
  align-items: flex-end;
  gap: 32px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_50};
  box-shadow: 0 4px 16px 0 rgba(159, 198, 255, 0.25);

  &::-webkit-scrollbar {
    width: 0px;
    background: transparent;
  }
  scrollbar-width: none;
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

const InputInfo = styled.div`
  display: flex;
  width: 136px;
  height: 40px;
  align-items: center;
  gap: 4px;
`;

const DateWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Required = styled.div`
  color: ${theme.palette.primary_600};
  font-family: "Pretendard-Regular";
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: 100%;
`;

const TileName = styled.div`
  display: flex;
  align-items: flex-start;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const SuccessModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const SuccessBox = styled.div`
  position: relative;
  width: 656px;
  height: 237px;
  display: flex;
  gap: 12px;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_50};
  box-shadow: 0 4px 16px 0 rgba(159, 198, 255, 0.25);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;
