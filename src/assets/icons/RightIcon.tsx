interface RightIconProps {
  size?: number;
  disabled?: boolean;
}

export const RightIcon: React.FC<RightIconProps> = ({
  size = 32,
  disabled = false,
}) => {
  const strokeColor = disabled ? "var(--gray_300, #B0B0B0)" : "black";
  return (
    <>
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 18L15 12L9 6"
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
