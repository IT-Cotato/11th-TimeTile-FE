export const NextIconHover = () => {
  return (
    <>
      <svg
        width="35"
        height="24"
        viewBox="0 0 35 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_1748_17416)">
          <g filter="url(#filter0_d_1748_17416)">
            <g clipPath="url(#clip1_1748_17416)">
              <rect x="11" width="24" height="24" rx="12" fill="white" />
              <path
                d="M20 18L26 12L20 6"
                stroke="#D1D3D4"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
          </g>
        </g>
        <defs>
          <filter
            id="filter0_d_1748_17416"
            x="7"
            y="-4"
            width="32"
            height="32"
            filterUnits="userSpaceOnUse"
            colorInterpolationFilters="sRGB"
          >
            <feFlood floodOpacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_1748_17416"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_1748_17416"
              result="shape"
            />
          </filter>
          <clipPath id="clip0_1748_17416">
            <rect
              width="24"
              height="35"
              fill="white"
              transform="matrix(0 -1 1 0 0 24)"
            />
          </clipPath>
          <clipPath id="clip1_1748_17416">
            <rect x="11" width="24" height="24" rx="12" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
