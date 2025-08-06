import styled from "styled-components";
import { KeyOfTypo, theme } from "@/styles/theme";
import { Text } from "../atoms/Text";
import { AddTileButton } from "../atoms/AddTileButton";
import { Buttons } from "../atoms/Buttons";
import { FlexBox } from "../layouts/FlexBox";

interface FolderInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  maxLength?: number;
}

export const FolderInput = ({
  value,
  onChange,
  placeholder = "폴더 이름을 입력해주세요",
  maxLength = 20,
}: FolderInputProps) => {
  const handleSubmit = () => {
    if (!value.trim()) return;
    // 추후 api 생기면 연결 예정
    console.log("폴더 이름:", value);
    onChange("");
  };
  return (
    <Wrapper>
      <div>
        <StyledInput
          id="folderName"
          name="folderName"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          autoComplete="off"
          spellCheck={false}
          autoCorrect="off"
        />
        <CharCount>
          <Text typo="Caption_2" color="gray_800">
            {value.length}
          </Text>
          <Text typo="Caption_2" color="gray_600">
            / {maxLength}
          </Text>
        </CharCount>
      </div>
      <FlexBox>
        <Buttons
          variant="addTile"
          width={82}
          disabled={value.trim().length === 0}
          children="추가하기"
          onClick={handleSubmit}
        />
      </FlexBox>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const StyledInput = styled.input`
  width: 100%;
  border: none;
  margin-top: 16px;
  margin-bottom: 8px;
  padding: 8px 0;
  border-bottom: 1px solid ${theme.palette.gray_800};
  color: ${theme.palette.gray_1000};

  font-family: "Pretendard-Regular";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  &::placeholder {
    color: ${theme.palette.gray_600};
  }

  &:focus {
    outline: none;
  }
`;

const CharCount = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 2px;
`;
