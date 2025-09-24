import { useCallback, useEffect, useState } from "react";
import { UserRole } from "@/model/common/user";
import { postApi } from "@/apis/postApi";

export function usePostDetail({
  postId,
  fallbacks,
}: {
  postId: number;
  fallbacks: {
    likeCount: number;
    commentCount: number;
    scrapCount: number;
    username: string;
    profileImage: string;
    role?: UserRole;
    visibility: string;
    date: string;
    images: string[];
  };
}) {
  const [likeCount, setLikeCount] = useState<number>(fallbacks.likeCount);
  const [commentCount, setCommentCount] = useState<number>(
    fallbacks.commentCount
  );
  const [scrapCnt, setScrapCnt] = useState<number>(fallbacks.scrapCount);

  const [headerName, setHeaderName] = useState(fallbacks.username);
  const [headerProfile, setHeaderProfile] = useState(fallbacks.profileImage);
  const [headerRole, setHeaderRole] = useState<UserRole | undefined>(
    fallbacks.role
  );
  const [theDate, setTheDate] = useState(fallbacks.date);
  const [imgs, setImgs] = useState<string[]>(fallbacks.images);
  const [visibilityState, setVisibilityState] = useState(fallbacks.visibility);
  const [liked, setLiked] = useState(false);

  const formatDateYMD = useCallback((iso?: string) => {
    if (!iso) return "";
    const d = new Date(iso);
    const pad = (n: number) => String(n).padStart(2, "0");
    return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
  }, []);

  useEffect(() => {
    if (!postId) return;
    (async () => {
      try {
        const raw: any = await postApi.getPostDetail(postId);
        const d: any = raw?.data?.data ?? raw?.data ?? raw;

        setLikeCount(
          Number.isFinite(+d?.likeCount) ? +d.likeCount : fallbacks.likeCount
        );
        setCommentCount(
          Number.isFinite(+d?.commentCount)
            ? +d.commentCount
            : fallbacks.commentCount
        );
        setScrapCnt(
          Number.isFinite(+d?.scrapCount) ? +d.scrapCount : fallbacks.scrapCount
        );

        setHeaderName(d?.authorNickname ?? fallbacks.username);
        setHeaderProfile(d?.authorProfileImageUrl ?? fallbacks.profileImage);
        setHeaderRole(
          (d?.authorRole ?? d?.role ?? fallbacks.role) as UserRole | undefined
        );
        setTheDate(formatDateYMD(d?.createdAt ?? fallbacks.date));
        setImgs(Array.isArray(d?.mediaUrls) ? d.mediaUrls : fallbacks.images);
        setVisibilityState(d?.visibility ?? fallbacks.visibility);
        setLiked(!!d?.isLiked);
      } catch (e) {
        console.warn("[getPostDetail failed]", e);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [postId]);

  // 외부 동기화용 setter들 (낙관적 업데이트 후 값 맞추기)
  const setLikeFromOutside = useCallback(
    (likedVal: boolean, likeCnt: number) => {
      setLiked(likedVal);
      setLikeCount(likeCnt);
    },
    []
  );

  const setScrapFromOutside = useCallback(
    (scrapped: boolean, scrapCntVal: number) => {
      // scrapped 자체는 이 훅에서 별도 보관하지 않으므로 카운트만 동기화
      setScrapCnt(scrapCntVal);
    },
    []
  );

  // API 래퍼
  const deletePost = useCallback(async () => {
    await postApi.deletePost(postId);
  }, [postId]);

  const reportPost = useCallback(
    async (reason: string) => {
      if (typeof (postApi as any).reportPost === "function") {
        await (postApi as any).reportPost(postId, { reason });
      } else {
        // 서버에 신고 API가 없다면, 여기서 no-op 혹은 로깅
        return;
      }
    },
    [postId]
  );

  return {
    likeCount,
    commentCount,
    scrapCnt,
    headerName,
    headerProfile,
    headerRole,
    theDate,
    imgs,
    visibilityState,
    liked,
    setLikeFromOutside,
    setScrapFromOutside,
    deletePost,
    reportPost,
  } as const;
}
