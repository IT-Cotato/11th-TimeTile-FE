interface LeftArrowIconProps {
  size?: number;
  disabled?: boolean;
}

export const LeftArrowIcon: React.FC<LeftArrowIconProps> = ({
  size = 24,
  disabled = true,
}) => {
  const strokeColor = disabled ? "#D1D3D4" : "black";
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M15 18L9 12L15 6"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
