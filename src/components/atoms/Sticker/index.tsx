import styled from "styled-components";
import { theme } from "@/styles/theme";
import { Text } from "@/components/atoms/Text";

interface StickerProps {
  variant: "new" | "edited";
}

export const Sticker = ({ variant = "new" }: StickerProps) => {
  return (
    <Container>
      <Wrapper $variant={variant}>
        <Text typo="Body_1" color={variant === "new" ? "sub_800" : "sub_50"}>
          {variant === "new" ? "New!" : "Edited"}
        </Text>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  width: 72px;
  height: 41px;
  padding-top: 15px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
`;

const Wrapper = styled.div<{ $variant: "new" | "edited" }>`
  display: flex;
  width: 72px;
  padding: 5px 9px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
  border-radius: 10px 0 0 10px;

  background: ${({ $variant }) =>
    $variant === "new" ? theme.palette.sub_400 : theme.palette.sub_600};
`;
