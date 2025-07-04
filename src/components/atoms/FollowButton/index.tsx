import styled from "styled-components";
import { FlexBox } from "@/components/layouts/FlexBox";
import { Text } from "@/components/atoms/Text";
import { theme } from "@/styles/theme";
import {
  FollowButtonPropsType,
  FollowButtonVariantType,
} from "@/model/components/FollowButton";
import {
  FOLLOW_BUTTON_COLOR_TYPE,
  FOLLOW_BUTTON_TEXT_COLOR_TYPE,
  FOLLOW_BUTTON_SHAPE_TYPE,
} from "@/constants/atoms/FollowButton";
/**
 * @param variant 팔로우 상태별 버튼의 종류: 'follow' | 'following' | 'unfollow'
 * @param width 가로 길이를 명시적으로 작성 (단위 px) (optional)
 * @param isLoading 버튼이 로딩 중인지에 대한 state 설정: true | false (optional)
 * @param onClick 버튼을 클릭할 때 발생하는 event 명시 (optional)
 * @param onUnfollowClick 언팔로우하기 버튼을 클릭하면 발생하는 event
 **/

type FollowButtonProps = Partial<FollowButtonPropsType>;

export const FollowButton = ({
  width,
  height,
  variant = "follow",
  isLoading,
  onClick,
  onUnfollowClick,
  ...props
}: FollowButtonProps) => {
  return (
    <>
      <StyledFollowButton
        variant={variant}
        width={width}
        height={height}
        onClick={onClick}
        {...props}
      >
        {isLoading ? (
          <Text typo="Body_1" children="로딩 중..." />
        ) : (
          <FlexBox>
            <Text typo={FOLLOW_BUTTON_SHAPE_TYPE[variant].typo}>
              {variant === "following" || variant === "unfollow"
                ? "팔로잉"
                : "팔로우"}
            </Text>
          </FlexBox>
        )}
      </StyledFollowButton>
      {/* variant가 'unfollow'일 때만 언팔로우 버튼 노출 */}
      {variant === "unfollow" && (
        <UnfollowButton onClick={onUnfollowClick}>
          <Text typo="Body_2" color="warning">
            언팔로우하기
          </Text>
        </UnfollowButton>
      )}
    </>
  );
};

const StyledFollowButton = styled.button<{
  variant: FollowButtonVariantType;
  selected?: boolean;
  width?: number;
  height?: number;
  isLoading?: boolean;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 13px;
  width: ${({ width }) => (width ? `${width}px` : "auto")};
  height: ${({ height }) => `${height}px`};
  border: none;
  border-radius: 10px;
  cursor: pointer;
  box-shadow: ${({ variant }) => FOLLOW_BUTTON_SHAPE_TYPE[variant].boxShadow};
  background-color: ${({ variant }) =>
    FOLLOW_BUTTON_COLOR_TYPE.default[variant]};
  color: ${({ variant }) => FOLLOW_BUTTON_TEXT_COLOR_TYPE.default[variant]};
`;

const UnfollowButton = styled.button`
  padding: 10px 13px;
  border: none;
  background: ${theme.palette.gray_50};
  box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  cursor: pointer;
`;
