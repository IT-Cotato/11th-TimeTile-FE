"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useAtom } from "jotai";
import { agreementIdsAtom } from "@/store/auth";
import { authApi } from "@/apis/authApi";

import RegisterHeader from "./RegisterHeader";
import { FlexBox } from "@/components/layouts/FlexBox";
import { Buttons } from "../atoms/Buttons";
import { CheckBox } from "../atoms/CheckBox";

type Term = {
  id: number;
  title: string;
  content: string;
  required: boolean;
};

export default function Terms({
  onNext,
}: {
  onNext: (agreementIds: number[]) => void;
}) {
  const router = useRouter();
  const [, setAgreementIds] = useAtom(agreementIdsAtom);

  const [terms, setTerms] = useState<Term[]>([]);
  const [checkedIds, setCheckedIds] = useState<number[]>([]);

  useEffect(() => {
    const fetchTerms = async () => {
      try {
        const { data } = await authApi.getTerms();
        if (data.isSuccess) {
          setTerms(data.data.terms);
        }
      } catch (err) {
        console.error("약관 로딩 실패:", err);
      }
    };
    fetchTerms();
  }, []);

  const toggleCheck = (id: number) => {
    setCheckedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allChecked =
    terms.length > 0 && terms.every((term) => checkedIds.includes(term.id));

  const handleAllAgree = () => {
    if (allChecked) {
      setCheckedIds([]);
    } else {
      setCheckedIds(terms.map((term) => term.id));
    }
  };

  const requiredChecked = terms
    .filter((term) => term.required)
    .every((term) => checkedIds.includes(term.id));

  const handleNext = () => {
    setAgreementIds(checkedIds);
    sessionStorage.setItem("agreementIds", JSON.stringify(checkedIds));
    onNext(checkedIds);
  };

  return (
    <Wrapper>
      <ContentWrapper>
        <FlexBox direction="column" gap={24}>
          <RegisterHeader
            currentStep={1}
            onPrev={() => router.push("/login")}
          />
          <RegisterArea>
            {terms.map((term) => (
              <CheckBox
                key={term.id}
                title={term.title}
                required={term.required}
                body={term.content}
                checked={checkedIds.includes(term.id)}
                onClick={() => toggleCheck(term.id)}
              />
            ))}
            <AllCheckWrapper>
              <CheckBox
                title="위 약관에 모두 동의합니다."
                allAgree={true}
                checked={allChecked}
                onClick={handleAllAgree}
              />
            </AllCheckWrapper>
            <ButtonWrapper>
              <Buttons
                children="다음"
                variant="addTile"
                onClick={handleNext}
                disabled={!requiredChecked}
              />
            </ButtonWrapper>
          </RegisterArea>
        </FlexBox>
      </ContentWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 424px;
  padding: 46px 0;
`;

const RegisterArea = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  margin-top: 54px;
`;

const ButtonWrapper = styled.div`
  align-self: flex-end;
  margin-top: -12px;
`;

const AllCheckWrapper = styled.div`
  align-self: flex-start;
`;
