"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { theme } from "@/styles/theme";
import { AddLinkIcon } from "@/assets/icons/AddLinkIcon";
import { DeleteLinkIcon } from "@/assets/icons/DeleteLinkIcon";
import { LeftArrowIcon } from "@/assets/icons/LeftArrowIcon";
import { RightIcon } from "@/assets/icons/RightIcon";
import { LinkIcon } from "@/assets/icons/LinkIcon";

export interface MaterialPreview {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
}

interface RelatedContentInputProps {
  value?: MaterialPreview[];
  onChange: (materials: MaterialPreview[]) => void;
  isEditMode?: boolean;
}

export const RelatedContentInput = ({
  value = [],
  onChange,
  isEditMode = false,
}: RelatedContentInputProps) => {
  const [inputValue, setInputValue] = useState("");
  const [materials, setMaterials] = useState<MaterialPreview[]>(value);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(isEditMode);

  const listRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const isDifferent =
      value.length !== materials.length ||
      value.some((v, i) => v.url !== materials[i]?.url);

    if (isDifferent) {
      setMaterials(value);
      if (isEditMode) setInitialLoading(false);
    }
  }, [value]);

  const updateScrollState = () => {
    const el = listRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanLeft(scrollLeft > 0);
    setCanRight(scrollLeft + clientWidth < scrollWidth - 1);
  };

  useEffect(() => {
    updateScrollState();
    const el = listRef.current;
    if (!el) return;
    const onScroll = () => updateScrollState();
    el.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [materials.length]);

  const handleAdd = async () => {
    if (!inputValue.trim()) return;
    try {
      setLoading(true);
      const preview = await fetchPreview(inputValue);
      const newList = [
        ...materials,
        {
          id: crypto.randomUUID(),
          title: preview?.title || inputValue,
          thumbnailUrl:
            preview?.image && preview.image !== ""
              ? preview.image
              : "/default-thumbnail.png",
          url: inputValue,
        },
      ];
      setMaterials(newList);
      onChange(newList);
      setInputValue("");
      requestAnimationFrame(updateScrollState);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = (id: string) => {
    const newList = materials.filter((m) => m.id !== id);
    setMaterials(newList);
    onChange(newList);
    requestAnimationFrame(updateScrollState);
  };

  const scrollStep = 180;
  const scrollLeftOnce = () =>
    listRef.current?.scrollBy({ left: -scrollStep, behavior: "smooth" });
  const scrollRightOnce = () =>
    listRef.current?.scrollBy({ left: scrollStep, behavior: "smooth" });

  const showControls = useMemo(() => materials.length > 0, [materials.length]);

  return (
    <OuterColumn>
      <InputRow>
        <Input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="타일과 관련된 컨텐츠 링크를 첨부해주세요."
        />
        <AddBtn onClick={handleAdd} disabled={loading}>
          {loading ? <LoadingSpinner /> : <AddLinkIcon />}
        </AddBtn>
      </InputRow>
      {isEditMode && initialLoading ? (
        <LoadingArea>
          <LoadingSpinner />
        </LoadingArea>
      ) : (
        showControls && (
          <RowRight>
            <StripWrapper>
              <Strip ref={listRef}>
                {materials.map((m) => (
                  <Thumb key={m.id}>
                    <img src={m.thumbnailUrl} alt={m.title} />
                    <LinkButton
                      onClick={() =>
                        window.open(m.url, "_blank", "noopener noreferrer")
                      }
                    >
                      <LinkIcon />
                    </LinkButton>
                    <InfoBar>
                      <Title>{m.title}</Title>
                    </InfoBar>
                    <OverlayShade className="overlay">
                      <DeleteBtn onClick={() => handleRemove(m.id)}>
                        <DeleteLinkIcon />
                        <span>삭제</span>
                      </DeleteBtn>
                    </OverlayShade>
                  </Thumb>
                ))}
              </Strip>
              <RightGradient />
              <ArrowStack>
                <IconButton
                  type="button"
                  aria-label="scroll left"
                  onClick={scrollLeftOnce}
                  disabled={!canLeft}
                >
                  <LeftArrowIcon size={20} disabled={!canLeft} />
                </IconButton>
                <IconButton
                  type="button"
                  aria-label="scroll right"
                  onClick={scrollRightOnce}
                  disabled={!canRight}
                >
                  <RightIcon size={20} disabled={!canRight} />
                </IconButton>
              </ArrowStack>
            </StripWrapper>
          </RowRight>
        )
      )}
    </OuterColumn>
  );
};

const fetchPreview = async (url: string) => {
  try {
    const normalized =
      url.startsWith("http://") || url.startsWith("https://")
        ? url
        : `https://${url}`;
    const res = await fetch(
      `/api/preview?url=${encodeURIComponent(normalized)}`
    );
    if (!res.ok) throw new Error(String(res.status));
    return await res.json();
  } catch {
    return null;
  }
};

const OuterColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const InputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  width: 479px;
`;

const Input = styled.input`
  flex: 1;
  height: 40px;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${theme.palette.primary_400};
  color: ${theme.palette.gray_1000};
  background: ${theme.palette.gray_0};
  outline: none;
  font-family: "Pretendard-Regular";
  font-size: 16px;
  &::placeholder {
    color: ${theme.palette.gray_600};
  }
`;

const AddBtn = styled.button<{ disabled?: boolean }>`
  border: none;
  background: transparent;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  padding-top: 4px;
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
`;

const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid ${theme.palette.primary_200};
  border-top-color: ${theme.palette.primary_500};
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const RowRight = styled.div`
  display: flex;
  width: 300px;
  justify-content: flex-start;
`;

const StripWrapper = styled.div`
  position: relative;
  height: 142px;
  padding-right: 30px;
`;

const Strip = styled.div`
  display: flex;
  gap: 12px;
  width: 600px;
  overflow-x: auto;
  padding-bottom: 4px;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    height: 0;
  }
`;

const Thumb = styled.div`
  position: relative;
  width: 168px;
  height: 142px;
  flex-shrink: 0;
  border-radius: 10px;
  overflow: hidden;
  background: #eee;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  &:hover .overlay {
    opacity: 1;
  }
`;

const OverlayShade = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const InfoBar = styled.div`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 168px;
  height: 62px;
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  display: flex;
  align-items: flex-start;
  padding: 11px 14px;
`;

const Title = styled.div`
  width: 138px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  font-family: "Pretendard-Medium";
  font-size: 14px;
  font-weight: 500;
  line-height: 130%;
`;

const DeleteBtn = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  cursor: pointer;
  background: transparent;
  border: none;
  color: ${theme.palette.gray_0};
  font-family: "Pretendard-Medium";
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
`;

const LinkButton = styled.button`
  position: absolute;
  top: 8px;
  right: 8px;
  border: none;
  border-radius: 50%;
  padding: 6px;
  cursor: pointer;
  background: transparent;
`;

const LoadingArea = styled.div`
  width: 100%;
  height: 142px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const RightGradient = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 74px;
  height: 142px;
  background: linear-gradient(90deg, rgba(247, 250, 255, 0) 0%, #f7faff 61.54%);
  pointer-events: none;
`;

const ArrowStack = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  height: 142px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  justify-content: center;
  z-index: 2;
`;

const IconButton = styled.button<{ disabled?: boolean }>`
  background: transparent;
  border: none;
  padding: 4px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.8 : 1)};
`;
