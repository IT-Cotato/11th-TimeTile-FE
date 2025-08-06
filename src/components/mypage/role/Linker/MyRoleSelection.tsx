import { LinkerToolTip } from "@/assets/images/role/LinkerToolTip";
import { Linker } from "@/assets/images/role/Linker";
import { Text } from "@/components/atoms/Text";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export const MyRoleSection = ({ data }: any) => {
  return (
    <MyRoleContainer>
      <RoleWrap>
        <RoleInfo>
          <RoleText>
            <Text typo="H2" color="gray_1000">{`${data.nickname}님은`}</Text>
            <SingleLineText>
              <Text typo="H2" color="gray_1000">
                이번 달
              </Text>
              <Text typo="H2" color="primary_600">
                {data.role}
              </Text>
              <Text typo="H2" color="gray_1000">
                등급입니다!
              </Text>
            </SingleLineText>
          </RoleText>
          <PredictRole>
            <Text typo="Caption_1" color="gray_600">
              다음달 예상
            </Text>
            <Text typo="Body_2" color="gray_600">
              {data.role}
            </Text>
          </PredictRole>
        </RoleInfo>
        <Linker width={184} />
      </RoleWrap>
      <CurrentWrap>
        <Text typo="H4" color="gray_1000">
          등급 조건 진행상황
        </Text>
        <CurrentContainer>
          <CurrentDetail>
            <DetailItem
              label="누적 방문 일수"
              value={data.visitCount}
              unit="일"
            />
            <DetailItem
              label="타임라인 등록"
              value={data.postCount}
              unit="개"
            />
            <DetailItem label="좋아요" value={data.likeCount} unit="개" />
            <DetailItem label="댓글" value={data.commentCount} unit="개" />
          </CurrentDetail>
          <AchieveDiv>
            <ProgressBarContainer>
              <FilledBar $rate={data.achievementRate} />
              <LinkerToolTipWrapper $rate={data.achievementRate}>
                <LinkerToolTip achievementRate={data.achievementRate} />
              </LinkerToolTipWrapper>
            </ProgressBarContainer>
            <Text typo="Caption_2" color="gray_1000">
              {`Linker 등급까지 ${data.achievementRate}% 달성했어요.`}
            </Text>
          </AchieveDiv>
        </CurrentContainer>
      </CurrentWrap>
    </MyRoleContainer>
  );
};

const DetailItem = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: number;
  unit: string;
}) => (
  <DetailWrap>
    <Text typo="Body_2" color="gray_1000">
      {label}
    </Text>
    <div style={{ marginLeft: "16px" }}>
      <Text typo="Body_2" color="primary_600">
        {value}
      </Text>
      <Text typo="Body_2" color="gray_1000">
        {unit}
      </Text>
    </div>
  </DetailWrap>
);

const MyRoleContainer = styled.div`
  display: flex;
  padding: 32px;
  justify-content: center;
  align-items: flex-start;
  gap: 24px;
  align-self: stretch;
  border-radius: 30px;
  border: 1.5px solid var(--Primary-300, #c3dbff);
  background: var(--Primary-20, #fbfdff);
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.05);
`;

const RoleWrap = styled.div`
  display: flex;
  width: 398px;
  height: 430px;
  padding: 48px 32px;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  border-radius: 20px;
  border: 1.5px solid var(--Primary-300, #c3dbff);
  background: var(--Gray-0, #fff);
`;

const CurrentWrap = styled.div`
  display: flex;
  width: 464px;
  height: 430px;
  padding: 48px 32px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  border-radius: 20px;
  border: 1.5px solid var(--Primary-300, #c3dbff);
  background: var(--Gray-0, #fff);
`;

const CurrentDetail = styled.div`
  display: flex;
  padding: 24px 32px;
  flex-direction: column;
  gap: 16px;
  border-radius: 10px;
  background: var(--Primary-50, #f7faff);
`;

const CurrentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 48px;
  align-self: stretch;
`;

const RoleInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`;

const RoleText = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 18px;
`;

const SingleLineText = styled.div`
  display: inline-flex;
  gap: 8px;
  align-items: center;
`;

const PredictRole = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
`;

const DetailWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const AchieveDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  align-self: stretch;
`;

const ProgressBarContainer = styled.div`
  position: relative;
  width: 400px;
  height: 24px;
  background: #eee;
  border-radius: 999px;
  overflow: visible;
`;

const LinkerToolTipWrapper = styled.div<{ $rate: number }>`
  position: absolute;
  top: -44px;
  left: ${({ $rate }) => `${$rate}%`};
  transform: translateX(-50%);
  pointer-events: none;
  width: 48px;
  height: 44px;
`;

const FilledBar = styled.div<{ $rate: number }>`
  width: ${({ $rate }) => $rate}%;
  height: 100%;
  border-radius: ${({ $rate }) => ($rate === 100 ? "50px" : "50px 0 0 50px")};
  background: ${theme.palette.primary_400};
  transition: width 0.4s ease;
`;
