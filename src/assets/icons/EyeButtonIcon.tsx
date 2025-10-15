interface EyeButtonIconProps {
  color?: string;
}

export const EyeButtonIcon = ({ color = "#000" }: EyeButtonIconProps) => {
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
          d="M6.8335 15.9999C6.8335 15.9999 10.1668 9.33325 16.0002 9.33325C21.8335 9.33325 25.1668 15.9999 25.1668 15.9999C25.1668 15.9999 21.8335 22.6666 16.0002 22.6666C10.1668 22.6666 6.8335 15.9999 6.8335 15.9999Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.0002 18.4999C17.3809 18.4999 18.5002 17.3806 18.5002 15.9999C18.5002 14.6192 17.3809 13.4999 16.0002 13.4999C14.6195 13.4999 13.5002 14.6192 13.5002 15.9999C13.5002 17.3806 14.6195 18.4999 16.0002 18.4999Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
