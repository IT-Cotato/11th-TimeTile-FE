import { useCallback, useState } from "react";
import { postApi } from "@/apis/postApi";

export function useLike({
  postId,
  initialLiked,
  initialLikeCount,
  onServerSync,
}: {
  postId: number;
  initialLiked: boolean;
  initialLikeCount: number;
  onServerSync?: (liked: boolean, likeCount: number) => void;
}) {
  const [liked, setLiked] = useState<boolean>(!!initialLiked);
  const [likeCount, setLikeCount] = useState<number>(initialLikeCount);
  const [likeLoading, setLikeLoading] = useState<boolean>(false);

  const toggleLike = useCallback(async () => {
    if (likeLoading) return;
    setLikeLoading(true);

    const was = liked;
    const id = Number(postId);

    // optimistic
    setLiked(!was);
    setLikeCount((c) => (was ? Math.max(0, c - 1) : c + 1));

    try {
      if (was) await postApi.unlikePost(id);
      else await postApi.likePost(id);

      // 서버 동기화 콜백 (상세 훅과 값 맞추기)
      onServerSync?.(!was, was ? Math.max(0, likeCount - 1) : likeCount + 1);
    } catch (e: any) {
      const msg = e?.response?.data?.message || "";
      const stat = e?.response?.status;
      const alreadyProcessed = msg.includes("이미 처리됨") || stat === 409;

      if (!alreadyProcessed) {
        // rollback
        setLiked(was);
        setLikeCount((c) => (was ? c + 1 : Math.max(0, c - 1)));
        alert(msg || e?.message || "좋아요 처리에 실패했습니다.");
      }
    } finally {
      setLikeLoading(false);
    }
  }, [likeLoading, liked, likeCount, onServerSync, postId]);

  return { liked, likeCount, likeLoading, toggleLike } as const;
}