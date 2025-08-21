import { HTMLAttributes } from "react";

import { TextType } from "@/styles/theme";

export interface TextPropsType extends HTMLAttributes<HTMLSpanElement> {
  typo: TextType["typo"];
  color?: TextType["color"];
  children: any;
  whiteSpace?: string;
}
