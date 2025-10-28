"use client";

import styled from "styled-components";
import { theme } from "@/styles/theme";
import { LeftArrowIcon } from "@/assets/icons/LeftArrowIcon";
import { RightIcon } from "@/assets/icons/RightIcon";
import { LinkIcon } from "@/assets/icons/LinkIcon";
import { useEffect, useMemo, useRef, useState } from "react";

interface MaterialPreview {
  id: string;
  title: string;
  thumbnailUrl: string;
  url: string;
}

interface RelatedMaterialPreviewProps {
  materials: string[];
}

const previewCache: Record<string, MaterialPreview> = {};

export const RelatedMaterialPreview = ({
  materials,
}: RelatedMaterialPreviewProps) => {
  const [previews, setPreviews] = useState<MaterialPreview[]>([]);
  const [loading, setLoading] = useState(true);

  const listRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    const fetchPreviews = async () => {
      if (!materials?.length) {
        setPreviews([]);
        setLoading(false);
        return;
      }

      const results: MaterialPreview[] = [];

      for (let i = 0; i < materials.length; i++) {
        let rawUrl = materials[i];

        const normalizedUrl =
          rawUrl.startsWith("http://") || rawUrl.startsWith("https://")
            ? rawUrl
            : `https://${rawUrl}`;

        if (previewCache[normalizedUrl]) {
          results.push(previewCache[normalizedUrl]);
          continue;
        }

        try {
          const res = await fetch(
            `/api/preview?url=${encodeURIComponent(normalizedUrl)}`,
            { cache: "no-store" }
          );

          const data = await res.json();

          if (normalizedUrl.includes("youtube.com/watch?v=")) {
            const videoId = new URL(normalizedUrl).searchParams.get("v");
            data.image = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
          }

          const preview: MaterialPreview = {
            id: String(i),
            title: data.title || new URL(normalizedUrl).hostname,
            thumbnailUrl:
              data.image && data.image !== "" ? data.image : "/Symbol-Logo.png",
            url: normalizedUrl,
          };

          previewCache[normalizedUrl] = preview;
          results.push(preview);
        } catch (err) {
          const fallback: MaterialPreview = {
            id: String(i),
            title: new URL(normalizedUrl).hostname,
            thumbnailUrl: "/Symbol-Logo.png",
            url: normalizedUrl,
          };
          previewCache[normalizedUrl] = fallback;
          results.push(fallback);
        }
      }

      setPreviews(results);
      setLoading(false);
    };

    fetchPreviews();
  }, [materials]);

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
  }, [previews.length]);

  const scrollStep = 180;
  const scrollLeftOnce = () =>
    listRef.current?.scrollBy({ left: -scrollStep, behavior: "smooth" });
  const scrollRightOnce = () =>
    listRef.current?.scrollBy({ left: scrollStep, behavior: "smooth" });

  const showControls = useMemo(() => previews.length > 0, [previews.length]);

  if (loading) {
    return (
      <LoadingArea>
        <LoadingSpinner />
      </LoadingArea>
    );
  }

  if (!showControls) return null;

  return (
    <RowRight>
      <StripWrapper>
        <Strip ref={listRef}>
          {previews.map((m) => (
            <Thumb key={m.id}>
              <img src={m.thumbnailUrl} alt={m.title} />
              <LinkButton
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(m.url, "_blank", "noopener noreferrer");
                }}
              >
                <LinkIcon />
              </LinkButton>
              <InfoBar>
                <Title>{m.title}</Title>
              </InfoBar>
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
  );
};

const RowRight = styled.div`
  display: flex;
  width: 100%;
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
  width: 735px;
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

const LoadingArea = styled.div`
  width: 100%;
  height: 142px;
  display: flex;
  justify-content: center;
  align-items: center;
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
