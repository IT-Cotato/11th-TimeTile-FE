interface EditButtonIconProps {
  color?: string;
}

export const EditButtonIcon = ({ color = "#000" }: EditButtonIconProps) => {
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
        <path
          d="M16 22.6667H23.5M19.75 8.91666C20.0815 8.58514 20.5312 8.3989 21 8.3989C21.2321 8.3989 21.462 8.44462 21.6765 8.53346C21.891 8.6223 22.0858 8.75251 22.25 8.91666C22.4142 9.08081 22.5444 9.27569 22.6332 9.49017C22.722 9.70464 22.7678 9.93452 22.7678 10.1667C22.7678 10.3988 22.722 10.6287 22.6332 10.8432C22.5444 11.0576 22.4142 11.2525 22.25 11.4167L11.8333 21.8333L8.5 22.6667L9.33333 19.3333L19.75 8.91666Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
