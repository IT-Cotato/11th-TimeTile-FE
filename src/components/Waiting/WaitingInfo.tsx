"use client";

import { useRouter } from "next/navigation";
import { theme } from "@/styles/theme";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { Tooltip } from "@/components/atoms/Tooltip";
import { EditButtonIcon } from "@/assets/icons/EditButtonIcon";
import { EyeButtonIcon } from "@/assets/icons/EyeButtonIcon";

export const WaitingInfo = () => {
  const router = useRouter();

  const artistId =
    typeof window !== "undefined" ? localStorage.getItem("lastArtistId") : null;

  const handleModeMove = (mode: "edit" | "view") => {
    if (!artistId) {
      alert("이전 아티스트 정보를 찾을 수 없습니다.");
      return;
    }
    localStorage.setItem("lastMode", mode);
    router.push(`/timetile/${artistId}`);
  };

  return (
    <Container>
      <Wrapper>
        <TopSection>
          <Left>
            <Text typo="H1" color="gray_1000">
              업로드 대기 중인 타일
            </Text>
          </Left>

          <Right>
            <Tooltip
              variant="default"
              icon={
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleModeMove("edit")}
                >
                  <EditButtonIcon color={theme.palette.sub_600} />
                </div>
              }
            >
              편집 모드로 전환하기
            </Tooltip>
            <Tooltip
              variant="default"
              icon={
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => handleModeMove("view")}
                >
                  <EyeButtonIcon color={theme.palette.sub_600} />
                </div>
              }
            >
              보기 모드로 전환하기
            </Tooltip>
          </Right>
        </TopSection>
        <Description>
          <Desc>
            <p>
              이곳은 새로 등록되거나 수정된 타일이 다른 사용자들의 검토를
              기다리는 공간이에요.
            </p>
            <p>
              타일은 등록된 시간 기준으로 6시간 동안 ‘부적절해요’ 신고가 10회
              미만이면 자동으로 타임라인에 반영돼요.
            </p>
            <p>
              내용이 부정확하거나 적절하지 않다고 느껴진다면, ‘부적절해요’
              버튼으로 알려주세요.
            </p>
            <p>여러분의 참여가 타일의 신뢰도를 높이는 데 큰 도움이 됩니다.</p>
          </Desc>
          <Text typo="Caption_2" color="gray_600">
            ※ '부적절해요' 버튼은 한 사용자마다 하루 최대 5회까지 사용할 수
            있어요.
          </Text>
        </Description>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 952px;
  border: 1px solid ${theme.palette.gray_200};
  border-radius: 20px;
  background: ${theme.palette.gray_0};
  padding: 32px;
  display: flex;
  justify-content: center;
  margin-top: 26px;
`;

const Wrapper = styled.div`
  position: relative;
  width: 854px;
  display: flex;
  flex-direction: column;
`;

const TopSection = styled.div`
  display: flex;
  align-items: flex-start;
  height: 66px;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 32px;
`;

const Description = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const Desc = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-family: "Pretendard-Regular";
  font-weight: 400;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0%;
`;
