import { FlexBox } from "@/components/layouts/FlexBox";
import { Buttons } from "../Buttons";
import { Text } from "../Text";

interface PropsType {
  variant: "able" | "disable";
  children?: string;
}
export const AddTileButton = ({ variant, children = "에스파" }: PropsType) => {
  if (variant === "able") {
    return (
      <FlexBox align="center" justify="center" gap={24}>
        <Text typo="Caption_2">
          {children} 데크에 새로운 타일을 추가해보세요.
        </Text>
        <Buttons variant="addTile">타일 추가</Buttons>
      </FlexBox>
    );
  }
  return (
    <FlexBox align="center" justify="center" gap={24}>
      <Text typo="Caption_2">Editor 등급만 타일을 추가할 수 있어요.</Text>
      <Buttons variant="addTile" disabled>
        타일 추가
      </Buttons>
    </FlexBox>
  );
};
