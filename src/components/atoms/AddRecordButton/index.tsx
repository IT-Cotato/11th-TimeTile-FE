import { Buttons } from '../Buttons';

interface PropsType {
  variant: 'able' | 'disable';
  children?: string;
  onClick?: () => void;
}
export const AddRecordButton = ({ variant, onClick, ...props }: PropsType) => {
  if (variant === 'able') {
    return (
      <Buttons variant="addRecord" onClick={onClick}>
        기록 추가
      </Buttons>
    );
  }
  return (
    <Buttons variant="addRecord" disabled>
      기록 추가
    </Buttons>
  );
};
