type BasicSymbolLogoProps = {
  width?: number;
  height?: number;
};

export const BasicSymbolLogo = ({
  width = 300,
  height = 300,
}: BasicSymbolLogoProps) => {
  return (
    <>
      <svg
        width={width}
        height={height}
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="300" height="300" fill="white" />
        <g clipPath="url(#clip0_727_32339)">
          <path d="M134.985 80H104.992V109.437H134.985V80Z" fill="#C3DBFF" />
          <path
            d="M134.985 144.936H104.992V220H134.985V144.936Z"
            fill="#C3DBFF"
          />
          <path
            d="M104.992 109.437H75V144.935H104.992V109.437Z"
            fill="#C3DBFF"
          />
          <path
            d="M134.985 109.437H104.992V144.935H134.985V109.437Z"
            fill="#F6F4BC"
          />
          <path
            d="M194.988 155.064H164.996V190.563H194.988V155.064Z"
            fill="#C3DBFF"
          />
          <path
            d="M164.996 109.437H135.004V144.935H164.996V109.437Z"
            fill="#C3DBFF"
          />
          <path
            d="M224.981 109.437H194.989V144.935H224.981V109.437Z"
            fill="#C3DBFF"
          />
          <path
            d="M194.988 190.563H164.996V220H194.988V190.563Z"
            fill="#F6F4BC"
          />
          <path d="M194.988 80H164.996V155.064H194.988V80Z" fill="#F6F4BC" />
          <path
            d="M224.981 155.064H194.989V190.563H224.981V155.064Z"
            fill="#F6F4BC"
          />
          <path
            d="M165.015 155.064H135.004V190.563H165.015V155.064Z"
            fill="#F6F4BC"
          />
        </g>
        <defs>
          <clipPath id="clip0_727_32339">
            <rect
              width="150"
              height="140"
              fill="white"
              transform="translate(75 80)"
            />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};
