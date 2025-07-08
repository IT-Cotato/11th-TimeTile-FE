import { TagCategoryName } from "../common/tagcategory";

export type ColorIndexVariantType = 0 | 1 | 2 | 3;
export type TagVariantType = "default" | "select";

export interface TagCategoryPropsType {
  category: TagCategoryName;
  variant?: TagVariantType;
  onClick?: () => void;
}
