import { KeyOfTypo } from '@/styles/theme';
import { ButtonHTMLAttributes } from 'react';

export type ButtonsVariantType =
  | 'addTile'
  | 'editTile'
  | 'edit'
  | 'report'
  | 'addRecord';

export type ButtonsShapeType = {
  [key in ButtonsVariantType]: {
    typo: KeyOfTypo;
    height: number;
    padding: [number, number];
    boxShadow: string;
  };
};

export interface ButtonsPropsType<T extends ButtonsVariantType>
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ButtonsVariantType;
  typo?: KeyOfTypo;
  description?: T extends 'edit' | 'report' ? string | undefined : undefined;
  leftChildren?: T extends 'edit' | 'report'
    ? React.ReactNode | undefined
    : undefined;
  width?: number;
  height?: number;
  isLoading?: boolean;
  onClick?: () => void;
}

export type RoundButtonVariantType = 'edit' | 'viewmode' | 'waiting';

export interface RoundButtonPropsType<RoundButtonVariantType>
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: RoundButtonVariantType;
  width?: number;
  onClick?: () => void;
}

export type ReportTileButtonVariantType = 'default' | 'count';

export interface ReportTileButtonPropsType<
  T extends ReportTileButtonVariantType,
> extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: ReportTileButtonVariantType;
  width?: number;
  rightChildren?: T extends 'count' ? number : undefined;
  onClick?: () => void;
}
