interface LeftIconProps {
  size?: number;
  disabled?: boolean;
}

export const LeftIcon: React.FC<LeftIconProps> = ({
  size = 32,
  disabled = false,
}) => {
  const strokeColor = disabled ? "var(--gray_300, #B0B0B0)" : "black";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20 24L12 16L20 8"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
