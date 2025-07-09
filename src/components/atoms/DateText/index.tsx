import { FlexBox } from "@/components/layouts/FlexBox";
import { Text } from "../Text";
import { TildeIcon } from "@/assets/icons/TildeIcon";

interface PropsType {
  startDate: string;
  endDate: string;
  isWaiting?: boolean; //업로드 대기 상태일 때 true
}
export const DateText = ({
  startDate = "2025-07-09",
  endDate = "2025-07-10",
  isWaiting = false,
  ...props
}: PropsType) => {
  //variant 설정
  // 시작일과 끝나는 일이 같으면 Tilde variant로, 업로드 대기 상태면 waiting variant로
  const variant: "default" | "tilde" | "waiting" | "waitingTilde" =
    isWaiting && startDate === endDate
      ? "waitingTilde"
      : isWaiting
      ? "waiting"
      : startDate === endDate
      ? "tilde"
      : "default";

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    if (variant === "default" || variant === "tilde") {
      return `${String(date.getDate()).padStart(2, "0")}일`;
    }
    if (variant === "waiting" || variant === "waitingTilde") {
      return `${date.getFullYear()}/${String(date.getMonth() + 1).padStart(
        2,
        "0"
      )}/${String(date.getDate()).padStart(2, "0")}`;
    }
    return "";
  };

  //tilde variant의 경우, 우측에 아이콘 노출
  const showTildeIcon = variant === "tilde" || variant === "waitingTilde";

  return (
    <div style={{ cursor: "pointer" }}>
      <FlexBox>
        <Text typo="Body_1" color="gray_700">
          {formatDate(startDate)}
        </Text>
        {showTildeIcon && <TildeIcon />}
      </FlexBox>
    </div>
  );
};
