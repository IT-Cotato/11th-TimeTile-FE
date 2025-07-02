import { KeyOfTypo } from "@/styles/theme";
import { ButtonHTMLAttributes } from "react";

export type DefaultButtonVariantType =
  | "addTile"
  | "editTile"
  | "edit"
  | "report";

export type DefaultButtonShapeType = {
  [key in DefaultButtonVariantType]: {
    typo: KeyOfTypo;
    height: number;
    padding: [number, number];
    boxShadow: string;
  };
};

export interface DefaultButtonPropsType<T extends DefaultButtonVariantType>
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: DefaultButtonVariantType;
  typo?: KeyOfTypo;
  description?: T extends "edit" | "report" ? string | undefined : undefined;
  leftChildren?: T extends "edit" | "report"
    ? React.ReactNode | undefined
    : undefined;
  width?: number;
  height?: number;
  isLoading?: boolean;
  onClick?: () => void;
}
