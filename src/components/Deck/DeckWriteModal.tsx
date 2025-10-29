"use client";

import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "../atoms/Text";
import { CloseIcon } from "@/assets/icons/CloseIcon";
import { DeckInput } from "../atoms/DeckInput";
import { useEffect, useState } from "react";
import { GroupCategory } from "../atoms/GroupCategory";
import { CustomDatePicker } from "./CustomDatePicker";
import { RightBlue } from "@/assets/icons/RightBlue";
import { MaterialPreview, RelatedContentInput } from "./RelatedContentInput";
import { Buttons } from "../atoms/Buttons";
import { usePathname } from "next/navigation";
import { deckApi } from "@/apis/deckApi";
import { Tooltip } from "../atoms/Tooltip";
import { UserRole } from "@/model/common/user";

interface ModalProps {
  modalMode: "add" | "edit";
  eventId?: string;
  onClose: () => void;
  userRole: UserRole;
}

export const DeckWriteModal = ({
  modalMode,
  eventId,
  onClose,
  userRole,
}: ModalProps) => {
  const pathname = usePathname();
  const artistId = pathname.split("/").pop() || "";

  const todayISO = new Date().toISOString();

  const [title, setTitle] = useState("");
  const [info, setInfo] = useState("");
  const [source, setSource] = useState("");
  const [startedAt, setStartedAt] = useState(todayISO);
  const [endedAt, setEndedAt] = useState(todayISO);
  const [relatedDeck, setRelatedDeck] = useState("");
  const [relatedTile, setRelatedTile] = useState("");
  const [activityTypes, setActivityTypes] = useState<string[]>([]);
  const [materials, setMaterials] = useState<MaterialPreview[]>([]);

  const [showTitleError, setShowTitleError] = useState(false);
  const [showInfoError, setShowInfoError] = useState(false);
  const [showSourceError, setShowSourceError] = useState(false);
  const [showDateError, setShowDateError] = useState(false);
  const [showActivityError, setShowActivityError] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const isLinkerEdit = modalMode === "edit" && userRole === "LINKER";

  const fetchMetaData = async (urls: string[]) => {
    const results = await Promise.all(
      urls.map(async (url, idx) => {
        try {
          const res = await fetch(
            `/api/preview?url=${encodeURIComponent(url)}`
          );
          if (!res.ok) throw new Error(`Failed meta for ${url}`);
          const data = await res.json();
          return {
            id: String(idx),
            url,
            title: data.title || "제목 없음",
            thumbnailUrl: data.image || "",
          };
        } catch {
          return {
            id: String(idx),
            url,
            title: "제목 없음",
            thumbnailUrl: "",
          };
        }
      })
    );
    setMaterials(results);
  };

  useEffect(() => {
    const fetchEventDetail = async () => {
      if (!eventId) return;
      try {
        const data = await deckApi.getEventDetail(eventId);
        setTitle(data.name);
        setInfo(data.description);
        setSource(data.source);
        setStartedAt(data.startedAt);
        setEndedAt(data.endedAt ?? data.startedAt);
        setActivityTypes(data.activityTypes);
        setRelatedDeck(data.relatedArtists?.[0]?.name ?? "");
        setRelatedTile(data.relatedEvents?.[0]?.name ?? "");

        if (data.relatedMaterials.length > 0) {
          await fetchMetaData(data.relatedMaterials);
        } else {
          setMaterials([]);
        }
      } catch (err) {
        console.error("상세 데이터 조회 실패:", err);
      }
    };

    if (modalMode === "edit") {
      fetchEventDetail();
    } else {
      const today = new Date().toISOString();
      setStartedAt(today);
      setEndedAt(today);
    }
  }, [modalMode, eventId]);

  const handleSubmit = async () => {
    setShowTitleError(true);
    setShowInfoError(true);
    setShowSourceError(true);
    setShowDateError(true);
    setShowActivityError(true);

    if (
      !title.trim() ||
      title.length > 50 ||
      !info.trim() ||
      info.length > 200 ||
      !source.trim() ||
      !startedAt ||
      !endedAt ||
      activityTypes.length === 0
    ) {
      return;
    }

    const body = {
      name: title,
      description: info,
      source,
      relatedEvents: relatedTile ? [relatedTile] : [],
      relatedArtists: relatedDeck ? [relatedDeck] : [],
      relatedMaterials: materials.map((m) => m.url),
      activityTypes,
      startedAt,
      endedAt,
      artistId,
    };

    try {
      let res;
      if (modalMode === "edit" && eventId) {
        res = await deckApi.putEvent(eventId, body);
      } else {
        res = await deckApi.postEvent(body);
      }

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
          <Text typo="H3" color="gray_800">
            스크랩 추가
          </Text>
          <div onClick={onClose} style={{ cursor: "pointer" }}>
            <CloseIcon />
          </div>
        </TopWrapper>
        <ContentWrapper>
          <TileName>
            <InputInfo>
              <Text typo="H5">타일 이름</Text>
              <Required>*</Required>
            </InputInfo>
            <DeckInput
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              maxLength={50}
              placeholder="타일 이름을 입력해주세요."
              showError={showTitleError}
              errorMessage="타일 이름을 입력해주세요."
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5">날짜</Text>
              <Required>*</Required>
            </InputInfo>
            <DateWrapper $isError={showDateError && (!startedAt || !endedAt)}>
              <CustomDatePicker value={startedAt} onChange={setStartedAt} />
              <RightBlue />
              <CustomDatePicker value={endedAt} onChange={setEndedAt} />
            </DateWrapper>
          </TileName>
          {showDateError && (!startedAt || !endedAt) && (
            <ErrorText typo="Caption_4" color="warning">
              날짜를 선택해주세요.
            </ErrorText>
          )}
          <TileName>
            <InputInfo>
              <Text typo="H5">설명</Text>
              <Required>*</Required>
            </InputInfo>
            <DeckInput
              height={166}
              maxLength={200}
              value={info}
              onChange={(e) => setInfo(e.target.value)}
              placeholder="타일에 대한 간략한 설명을 입력해주세요."
              showError={showInfoError}
              errorMessage="설명을 입력해주세요."
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5">출처</Text>
              <Required>*</Required>
              <Tooltip variant="default">
                입력한 출처는 업로드 대기 페이지에서만 확인 가능합니다.
              </Tooltip>
            </InputInfo>
            <DeckInput
              variant="noCount"
              value={source}
              onChange={(e) => setSource(e.target.value)}
              placeholder="정보의 출처를 입력해주세요."
              showError={showSourceError}
              errorMessage="출처를 입력해주세요."
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5">관련 데크</Text>
              <Tooltip variant="default">
                이 타일과 연결하고 싶은 다른 타일의 이름을 입력해주세요. <br />
                입력한 타일은 ‘관련 타일’로 등록되며, 클릭 시 해당 타일로 이동할
                수 있어요.
              </Tooltip>
            </InputInfo>
            <DeckInput
              variant="noCount"
              height={72}
              value={relatedDeck}
              onChange={(e) => setRelatedDeck(e.target.value)}
              placeholder="관련 데크의 이름을 정확히 입력해주세요."
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5">관련 타일</Text>
              <Tooltip variant="default">
                이 타일과 연관된 데크의 이름을 입력해주세요. <br />
                연결된 데크는 클릭시 바로 이동할 수 있어요.
              </Tooltip>
            </InputInfo>
            <DeckInput
              variant="noCount"
              height={72}
              value={relatedTile}
              onChange={(e) => setRelatedTile(e.target.value)}
              placeholder="관련 타일의 이름을 정확히 입력해주세요."
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5">활동 종류</Text>
              <Required>*</Required>
            </InputInfo>
            <GroupCategory
              value={activityTypes}
              onChange={setActivityTypes}
              showError={showActivityError}
            />
          </TileName>
          <TileName>
            <InputInfo>
              <Text typo="H5">관련 컨텐츠</Text>
            </InputInfo>
            <RelatedContentInput
              value={materials}
              onChange={setMaterials}
              isEditMode={modalMode === "edit"}
            />
          </TileName>
        </ContentWrapper>
        <ButtonWrapper>
          <Buttons
            variant="addTile"
            children={modalMode === "edit" ? "타일 수정" : "타일 추가"}
            width={86}
            onClick={handleSubmit}
          />
        </ButtonWrapper>
        {isLinkerEdit && (
          <EditBlockOverlay>
            <AbsoluteText typo="Body_3">
              Editor 등급부터 타일 정보를 편집할 수 있어요.
            </AbsoluteText>
          </EditBlockOverlay>
        )}
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
              {modalMode === "edit"
                ? "수정된 타일이 업로드 대기 페이지에 등록되었습니다."
                : "작성하신 타일이 업로드 대기 페이지에 등록되었습니다."}
            </Text>
          </SuccessBox>
        </SuccessModal>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
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
  box-shadow: 0 4px 16px rgba(159, 198, 255, 0.25);

  &::-webkit-scrollbar {
    width: 0;
  }
`;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-self: stretch;
  position: relative;
`;

const TopWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const EditBlockOverlay = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  width: 792px;
  height: 710px;
  background: rgba(247, 250, 255, 0.5);
  backdrop-filter: blur(7px);
  overflow: hidden;
`;

const AbsoluteText = styled(Text)`
  position: absolute;
  left: 250px;
  top: 328px;
  color: ${theme.palette.gray_1000};
`;

const InputInfo = styled.div`
  display: flex;
  width: 136px;
  align-items: center;
  gap: 4px;
`;

const DateWrapper = styled.div<{ $isError?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  border: ${({ $isError }) =>
    $isError ? `1px solid ${theme.palette.warning}` : "none"};
  border-radius: 8px;
  padding: ${({ $isError }) => ($isError ? "4px" : "0")};
`;

const Required = styled.div`
  color: ${theme.palette.primary_600};
  font-family: "Pretendard-Regular";
  font-size: 20px;
`;

const TileName = styled.div`
  display: flex;
  align-items: flex-start;
  margin-left: 22px;
`;

const ErrorText = styled(Text)`
  margin-left: 136px;
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
  z-index: 300;
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
  box-shadow: 0 4px 16px rgba(159, 198, 255, 0.25);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  background: none;
  border: none;
  cursor: pointer;
`;
