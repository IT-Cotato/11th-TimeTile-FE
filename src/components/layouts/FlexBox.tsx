// components/FlexBox.tsx
import React, { HTMLAttributes, ReactNode } from "react";

export interface FlexBoxProps extends HTMLAttributes<HTMLDivElement> {
  align?: React.CSSProperties["alignItems"];
  justify?: React.CSSProperties["justifyContent"];
  direction?: React.CSSProperties["flexDirection"];
  gap?: number;
  children: ReactNode;
}

export const FlexBox = ({
  align = "center",
  justify = "center",
  direction = "row",
  gap = 0,
  children,
  style,
  ...props
}: FlexBoxProps) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: align,
        justifyContent: justify,
        flexDirection: direction,
        gap: gap,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};
