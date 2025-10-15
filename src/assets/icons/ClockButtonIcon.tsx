interface ClockButtonIconProps {
  color?: string;
}

export const ClockButtonIcon = ({ color = "#000" }: ClockButtonIconProps) => {
  return (
    <>
      <svg
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ color }}
      >
        <rect
          x="0.75"
          y="0.75"
          width="30.5"
          height="30.5"
          rx="15.25"
          fill="white"
        />
        <rect
          x="0.75"
          y="0.75"
          width="30.5"
          height="30.5"
          rx="15.25"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <g clipPath="url(#clip0_3148_2481)">
          <path
            d="M15.9998 11.0001V16.0001L19.3332 17.6667M24.3332 16.0001C24.3332 20.6025 20.6022 24.3334 15.9998 24.3334C11.3975 24.3334 7.6665 20.6025 7.6665 16.0001C7.6665 11.3977 11.3975 7.66675 15.9998 7.66675C20.6022 7.66675 24.3332 11.3977 24.3332 16.0001Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_3148_2481">
            <rect
              width="20"
              height="20"
              fill="white"
              transform="translate(6 6)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
