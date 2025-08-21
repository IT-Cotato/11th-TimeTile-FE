import { Text } from "@/components/atoms/Text";
import { CheckBlueIcon } from "@/assets/icons/CheckBlueIcon";
import { VectorIcon } from "@/assets/icons/VectorIcon";
import { FlexBox } from "@/components/layouts/FlexBox";
import styled from "styled-components";
import { theme } from "@/styles/theme";

export const RoleIntroSection = () => {
  return (
    <RoleIntroContainer>
      <GapDiv>
        <Text typo="H2" color="gray_1000" children="등급 안내" />
        <RoleInfoDiv>
          <ForWatcher>
            <Text typo="H1" color="sub_900">
              Watcher
            </Text>
            <Text typo="Body_2" color="sub_900">
              데크를 열람하는 관찰자
            </Text>
            <ul>
              <li>데크 열람만 가능</li>
              <li>마이타일 작성 가능</li>
            </ul>
          </ForWatcher>
          <ForLinker>
            <Text typo="H1" color="primary_900">
              Linker
            </Text>
            <Text typo="Body_2" color="primary_900">
              자료를 연결하고 <br />
              정보를 보완하는 서포터
            </Text>
            <div style={{ marginTop: "44px" }}>
              <ul>
                <li>타임타일 컨텐츠 링크 등록</li>
                <li>
                  업로드 대기 모드 접근 및<br />
                  부적절해요
                </li>
                <li>마이타일 작성 가능</li>
              </ul>
            </div>
          </ForLinker>
          <ForEditor>
            <Text typo="H1" color="sub_900">
              Editor
            </Text>
            <Text typo="Body_2" color="sub_900">
              콘텐츠 정리와 타임타일 등록을 <br />
              맡는 핵심 편집자
            </Text>
            <div style={{ marginTop: "104px" }}>
              <ul>
                <li>타임타일 등록</li>
                <li>타임타일 컨텐츠 링크 등록</li>
                <li>
                  업로드 대기 모드 접근 및<br />
                  부적절해요
                </li>
                <li>마이타일 작성 가능</li>
              </ul>
            </div>
          </ForEditor>
        </RoleInfoDiv>
        <RoleCondition>
          <RoleBox>
            <Text typo="H5" children="Editor 유지 조건" />
            <Condition>
              <FlexBox gap={8}>
                <CheckBlueIcon />
                <Text typo="Body_3" children="누적 방문 일수 14일" />
              </FlexBox>
              <FlexBox gap={8} align="flex-start">
                <CheckBlueIcon />
                <Text typo="Body_3">
                  마이타일 반응 남기기
                  <br />
                  (좋아요, 댓글 각 10개 이상)
                </Text>
              </FlexBox>
              <FlexBox gap={8}>
                <CheckBlueIcon />
                <Text typo="Body_3" children="마이타일 10개 이상 작성" />
              </FlexBox>
            </Condition>
          </RoleBox>
          <VectorIcon />
          <RoleBox>
            <Text typo="H5" children="등업 강등 조건" />
            <Condition>
              <FlexBox gap={8} align="flex-start">
                <CheckBlueIcon />
                <Text typo="Body_3">
                  내가 등록한 타일이 ‘부적절해요' 신고로
                  <br />
                  5회 이상 업로드 거부될 경우
                </Text>
              </FlexBox>
              <FlexBox gap={8}>
                <CheckBlueIcon />
                <Text
                  typo="Body_3"
                  children="한달 이상 미접속시, Watcher로 강등"
                />
              </FlexBox>
            </Condition>
          </RoleBox>
        </RoleCondition>
      </GapDiv>
    </RoleIntroContainer>
  );
};

const RoleIntroContainer = styled.div`
  display: flex;
  width: 950px;
  padding: 48px;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  border-radius: 30px;
  border: 1.5px solid ${theme.palette.gray_200};
  background: ${theme.palette.gray_0};
  box-shadow: 0 4px 12px 0 rgba(0, 0, 0, 0.1);
`;

const GapDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 56px;
`;

const RoleInfoDiv = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 24px;
`;

const ForWatcher = styled.div`
  display: flex;
  width: 264px;
  padding: 32px;
  align-items: flex-start;
  flex-direction: column;
  gap: 16px;
  border-radius: 20px;
  border: 1.5px solid ${theme.palette.sub_400};
  background: ${theme.palette.sub_50};

  ul {
    padding-left: 18px;
    margin: 0;
    list-style: disc;
    color: ${theme.palette.sub_900};
    font-size: 14px;
    line-height: 21px;
  }

  li {
    margin-bottom: 1px;
  }
`;

const ForLinker = styled(ForWatcher)`
  border: 1.5px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_50};

  ul {
    color: ${theme.palette.primary_900};
  }
`;

const ForEditor = styled(ForWatcher)`
  border: 1.5px solid #a0ab44;
  background: linear-gradient(180deg, #e9e66a 0%, #a6c6fa 100%);

  ul {
    color: ${theme.palette.primary_900};
  }
`;

const RoleCondition = styled.div`
  margin-top: 8px;
  display: flex;
  width: 840px;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 20px;
  border: 1.5px solid ${theme.palette.gray_300};
  background: ${theme.palette.gray_20};
`;

const RoleBox = styled.div`
  display: flex;
  padding: 40px;
  flex-direction: column;
  align-items: center;
  gap: 40px;
`;

const Condition = styled.div`
  display: flex;
  width: 300px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;
