import { useState } from "react";
import styled from "styled-components";
import { CheckFalseIcon } from "@/assets/icons/CheckFalseIcon";
import { Text } from "../Text";
import { theme } from "@/styles/theme";
import { CheckTrueIcon } from "@/assets/icons/CheckTrueIcon";
import { FlexBox } from "@/components/layouts/FlexBox";

interface CheckBoxProps {
  title: string;
  body?: string;
  required?: boolean;
  checked: boolean;
  onClick?: () => void;
}

export const CheckBox = ({
  title,
  body,
  required,
  checked,
  onClick,
}: CheckBoxProps) => {
  return (
    <FlexBox direction="column" align="flex-start" gap={8}>
      <CheckArea>
        <CheckBoxIcon checked={checked} onClick={onClick}>
          {checked ? <CheckTrueIcon /> : <CheckFalseIcon />}
        </CheckBoxIcon>
        <div>
          <Text typo="Body_3" color="gray_1000" children={title} />
          {required ? (
            <Text typo="Body_3" color="warning" children="(필수)" />
          ) : (
            <Text typo="Body_3" color="gray_500" children="(선택)" />
          )}
        </div>
      </CheckArea>
      {body ? (
        <Body>
          <Text typo="Caption_2" color="gray_1000" children={body} />
        </Body>
      ) : null}
    </FlexBox>
  );
};

const CheckArea = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const CheckBoxIcon = styled.div<{ checked: boolean }>`
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const Body = styled.div`
  width: 560px;
  height: 80px;
  background: rgba(255, 255, 255, 1);
  border: 1px solid ${theme.palette.gray_300};
  border-radius: 10px;
  padding: 12px;
  margin-left: 26px;
`;
