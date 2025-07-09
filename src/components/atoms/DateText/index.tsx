import { FlexBox } from "@/components/layouts/FlexBox";
import { Text } from "../Text";
import { TildeIcon } from "@/assets/icons/TildeIcon";

interface PropsType {
  variant: "default" | "tilde" | "waiting" | "waitingTilde";
  startDate: string;
  endDate: string;
}
export const DateText = ({
  variant,
  startDate = "2025-07-09",
  endDate = "2025-07-10",
  ...props
}: PropsType) => {
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
