import React from "react";
import styled from "styled-components";
import { Text } from "../Text";
import { TagCategoryName } from "@/model/common/tagcategory";
import { TAG_CATEGORY_STYLE_MAP } from "@/constants/atoms/tagCategory";
import {
  TagVariantType,
  TagCategoryPropsType,
} from "@/model/components/TagCategory";
import { FlexBox } from "@/components/layouts/FlexBox";

export const TagCategory = ({
  category,
  variant = "default",
  onClick,
}: TagCategoryPropsType) => {
  return (
    <FlexBox justify="center" align="center">
      <StyledTag
        onClick={onClick}
        category={category}
        variant={variant}
        role="button"
        tabIndex={0}
      >
        <Text typo="Caption_1">{category}</Text>
      </StyledTag>
    </FlexBox>
  );
};

const StyledTag = styled.span<{
  category: TagCategoryName;
  variant: TagVariantType;
}>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 26px;
  border-radius: 13px;
  box-sizing: border-box;
  color: ${({ category, variant }) =>
    TAG_CATEGORY_STYLE_MAP[category][variant].color};
  background-color: ${({ category, variant }) =>
    TAG_CATEGORY_STYLE_MAP[category][variant].background};
  border: ${({ category, variant }) =>
    variant === "select"
      ? `2px solid ${TAG_CATEGORY_STYLE_MAP[category][variant].color}`
      : `1px solid ${TAG_CATEGORY_STYLE_MAP[category][variant].color}`};
  padding: ${({ variant }) => (variant === "select" ? "3px 11px" : "4px 12px")};
  cursor: pointer;
`;
