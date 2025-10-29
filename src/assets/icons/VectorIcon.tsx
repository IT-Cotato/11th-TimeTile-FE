interface VectorProps {
  width?: string;
  height?: string;
}

export const VectorIcon = ({ width = "2", height = "160" }: VectorProps) => {
  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 2 160"
        fill="none"
      >
        <path d="M1 0V160" stroke="#D1D3D4" />
      </svg>
    </>
  );
};
