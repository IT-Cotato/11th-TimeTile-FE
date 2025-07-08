import React, { useState } from "react";
import styled from "styled-components";
import {
  TagVariantType,
  TagCategoryPropsType,
} from "@/model/components/TagCategory";
import { TAG_CATEGORY_STYLE_MAP } from "@/constants/atoms/tagCategory";
import { Text } from "../Text";
import { FlexBox } from "@/components/layouts/FlexBox";
import { TagCategoryName } from "@/model/common/tagcategory";

export const TagCategory = ({
  category,
  variant: variantProp,
  ...props
}: TagCategoryPropsType) => {
  const [variant, setVariant] = useState<TagVariantType>(
    variantProp ?? "default"
  );

  // 클릭 시
  const handleClick = () => {
    setVariant((prev) => (prev === "default" ? "select" : "default"));
  };

  return (
    <FlexBox>
      <StyledTag
        onClick={handleClick}
        category={category}
        variant={variant}
        {...props}
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
  display: inline-flex;
  padding: 4px 12px;
  border-radius: 13px;
  color: ${({ category, variant }) =>
    TAG_CATEGORY_STYLE_MAP[category][variant].color};
  border: ${({ category, variant }) =>
    variant === "select"
      ? `2px solid ${TAG_CATEGORY_STYLE_MAP[category][variant].color}`
      : `1px solid ${TAG_CATEGORY_STYLE_MAP[category][variant].color}`};
  background-color: ${({ category, variant }) =>
    TAG_CATEGORY_STYLE_MAP[category][variant].background};
  cursor: pointer;
`;
