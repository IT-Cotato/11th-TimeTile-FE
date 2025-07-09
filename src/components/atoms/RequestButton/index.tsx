import styled from "styled-components";
import Svg from "../Svg";
import { AlertIcon } from "@/assets/icons/AlertIcon";
import { theme } from "@/styles/theme";
import { Text } from "../Text";
import { FlexBox } from "@/components/layouts/FlexBox";

export const RequestButton = (onClick: () => void) => {
  return (
    <StyledDiv onClick={onClick}>
      <FlexBox direction="column" gap={10}>
        <Svg children={<AlertIcon />} />
        <Text typo="Caption_1" children="타임라인의 이름이 바뀌었나요?" />
      </FlexBox>
      <FlexBox direction="column">
        <Divider />
        <Padding>
          <Text
            typo="Caption_1"
            color="warning"
            children="관리자에게 이름 변경 요청하기"
          />
        </Padding>
      </FlexBox>
    </StyledDiv>
  );
};

const StyledDiv = styled.div`
  display: flex;
  width: 198px;
  height: 123px;
  padding: 10px 13px 5px 13px;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 12px;
  background-color: ${theme.palette.gray_50};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  cursor: pointer;
`;

const Divider = styled.div`
  width: 172px;
  height: 1px;
  margin-bottom: 4px;
  background-color: ${theme.palette.gray_200};
`;

const Padding = styled.div`
  padding: 11px 2px;
`;
