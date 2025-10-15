interface EyeTrueIconProps {
  color?: string;
}

export const EyeTrueIcon = ({ color = "#000" }: EyeTrueIconProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        style={{ color }}
      >
        <path
          d="M0.833008 9.99998C0.833008 9.99998 4.16634 3.33331 9.99967 3.33331C15.833 3.33331 19.1663 9.99998 19.1663 9.99998C19.1663 9.99998 15.833 16.6666 9.99967 16.6666C4.16634 16.6666 0.833008 9.99998 0.833008 9.99998Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99967 12.5C11.3804 12.5 12.4997 11.3807 12.4997 9.99998C12.4997 8.61927 11.3804 7.49998 9.99967 7.49998C8.61896 7.49998 7.49967 8.61927 7.49967 9.99998C7.49967 11.3807 8.61896 12.5 9.99967 12.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};
