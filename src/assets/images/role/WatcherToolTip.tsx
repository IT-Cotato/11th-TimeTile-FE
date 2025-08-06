interface WatcherToolTipProps {
  achievementRate: number;
}

export const WatcherToolTip = ({ achievementRate }: WatcherToolTipProps) => {
  return (
    <>
      <svg
        width="48"
        height="44"
        viewBox="0 0 48 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M23.0371 44L15.3584 32H8C3.58172 32 0 28.4183 0 24V8C0 3.58172 3.58172 1.28851e-07 8 0H40C44.4183 5.15405e-07 48 3.58172 48 8V24C48 28.4183 44.4183 32 40 32H30.7188L23.0371 44Z"
          fill="#E9E66A"
        />
        <text
          x="50%"
          y="39%"
          dominantBaseline="middle"
          textAnchor="middle"
          fontSize="14"
          fill="#fff"
          fontWeight="500"
          fontFamily="Pretendard-Medium"
        >
          {achievementRate}%
        </text>
      </svg>
    </>
  );
};
