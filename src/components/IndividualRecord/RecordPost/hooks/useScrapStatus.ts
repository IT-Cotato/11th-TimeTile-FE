import { useCallback, useEffect, useState } from "react";
import { scrapApi } from "@/apis/scrapApi";

export function useScrapStatus({
  postId,
  initialScrapCount,
  onServerSync,
}: {
  postId: number;
  initialScrapCount: number;
  onServerSync?: (scrapped: boolean, scrapCnt: number) => void;
}) {
  const [scrapped, setScrapped] = useState(false);
  const [scrapCnt, setScrapCnt] = useState(initialScrapCount);
  const [scrapOpen, setScrapOpen] = useState(false);

  // 최초 스크랩 상태 조회
  useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        const st = await scrapApi.getScrapStatus(postId);
        const body = st?.data?.data ?? st?.data ?? {};
        const preset: number[] =
          body?.scrapFolderIds ??
          body?.folderIds ??
          (Array.isArray(body?.scrapFolders)
            ? body.scrapFolders.map((f: any) => Number(f?.id))
            : []) ??
          [];
        setScrapped(Array.isArray(preset) && preset.length > 0);
      } catch {
        setScrapped(false);
      }
    })();
  }, [postId]);

  const handleScrapSuccess = useCallback(() => {
    if (!scrapped) {
      setScrapped(true);
      setScrapCnt((c) => c + 1);
      onServerSync?.(true, scrapCnt + 1);
    }
    setScrapOpen(false);
  }, [onServerSync, scrapCnt, scrapped]);

  // 외부에서 동기화(상세 훅과 값 맞추기)
  const setScrapFromOutside = useCallback((s: boolean, cnt: number) => {
    setScrapped(s);
    setScrapCnt(cnt);
  }, []);

  return {
    scrapped,
    scrapCnt,
    scrapOpen,
    setScrapOpen,
    handleScrapSuccess,
    setScrapFromOutside,
  } as const;
}
