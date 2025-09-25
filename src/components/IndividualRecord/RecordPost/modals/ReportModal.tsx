import React from "react";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";

export type ReportModalProps = {
  open: boolean;
  value: string;
  maxLen: number;
  onChange: (v: string) => void;
  onCancel: () => void;
  onSubmit: () => void;
};

export default function ReportModal({
  open,
  value,
  maxLen,
  onChange,
  onCancel,
  onSubmit,
}: ReportModalProps) {
  if (!open) return null;
  return (
    <ReportBackdrop onClick={onCancel}>
      <ReportCard onClick={(e) => e.stopPropagation()}>
        <Text typo="H3">신고 사유를 작성해주세요.</Text>
        <ReportTextarea
          value={value}
          maxLength={maxLen}
          onChange={(e) => onChange(e.target.value)}
          placeholder="신고 사유를 입력해주세요."
        />
        <ReportFooter>
          <Text typo="Caption_2">
            {value.length} / {maxLen}
          </Text>
          <ReportBtnRow>
            <CancelBtn onClick={onCancel}>취소</CancelBtn>
            <PrimaryBtn onClick={onSubmit}>신고하기</PrimaryBtn>
          </ReportBtnRow>
        </ReportFooter>
      </ReportCard>
    </ReportBackdrop>
  );
}

const ReportBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1100;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 16px;
`;
const ReportCard = styled.div`
  width: 560px;
  max-width: 90vw;
  border-radius: 20px;
  background: #fff;
  padding: 24px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.12);
  display: flex;
  flex-direction: column;
  gap: 12px;
`;
const ReportTextarea = styled.textarea`
  width: 100%;
  min-height: 160px;
  border-radius: 12px;
  border: 1px solid #c3dbff;
  padding: 12px;
  resize: vertical;
`;
const ReportFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ReportBtnRow = styled.div`
  display: flex;
  gap: 8px;
`;
const CancelBtn = styled.button`
  border-radius: 10px;
  border: 1px solid #d1d5db;
  padding: 8px 12px;
  background: #fff;
  cursor: pointer;
`;
const PrimaryBtn = styled.button`
  border-radius: 10px;
  border: 1px solid #80a9f2;
  padding: 8px 12px;
  background: #e9f1ff;
  color: #1f3e9a;
  cursor: pointer;
`;
