import styled from "styled-components";
import { useEffect, useState } from "react";
import { ScrapFolder } from "./ScrapFolder";
import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { MoveRightIcon } from "@/assets/icons/MoveRightIcon";
import { FolderIcon } from "@/assets/icons/FolderIcon";
import { theme } from "@/styles/theme";
import { FolderAddModal } from "./FolderAddModal";
import { FlexBox } from "../layouts/FlexBox";
import { Text } from "../atoms/Text";
import { OtherPost } from "@/model/components/Post";
import { usersApi } from "@/apis/usersApi";
import { OtherPostComponent } from "./OtherPostComponent";
import PaginationComponent from "./PaginationComponent";

const MOCK_FOLDERS = [
  { name: "에스파", count: 105 },
  { name: "뉴진스", count: 88 },
  { name: "세븐틴", count: 32 },
  { name: "르세라핌", count: 45 },
  { name: "BTS", count: 150 },
  { name: "아이브", count: 70 },
  { name: "레드벨벳", count: 91 },
  { name: "투모로우바이투게더", count: 110 },
  { name: "엔시티", count: 95 },
];

const MOCK_DATA = [
  {
    isSuccess: true,
    code: "COMMON001",
    message: "요청 성공",
    data: {
      posts: [
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          nickname: "choyeon",
          writerImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          artistName: "Bruno Mars",
          postId: 20,
          title: "Stroman - Sporer",
          content: "Decretum recusandae vesco cognatus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T152340Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=7770e7d8273233c8dacd269f62de040a03ee7b96e73d9ff1648148dae035e696",
          createdAt: "2025-07-23T20:55:35.036739",
          likeCount: 0,
          commentCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          nickname: "choyeon",
          writerImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          artistName: "Bruno Mars",
          postId: 26,
          title: "Stroman - Sporer",
          content: "Decretum recusandae vesco cognatus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T152340Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=7770e7d8273233c8dacd269f62de040a03ee7b96e73d9ff1648148dae035e696",
          createdAt: "2025-07-23T20:55:35.036739",
          likeCount: 0,
          commentCount: 0,
        },
      ],
      page: 1,
      size: 10,
      totalPages: 1,
      totalElements: 2,
      hasNext: false,
      hasPrevious: false,
      isLast: true,
    },
  },
];

const MAX_VISIBLE = 5;

export const MyScrapComponent = () => {
  const [posts, setPosts] = useState<OtherPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await usersApi.getMyScrap({ page });
      // const res = MOCK_DATA[0];
      if (res.isSuccess) {
        setPosts(res.data.posts);
        setPage(res.data.page);
        setTotalPages(res.data.totalPages);
      } else {
        setPosts([]);
      }
    } catch (err) {
      console.error("데이터 가져오기 실패", err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + MAX_VISIBLE < MOCK_FOLDERS.length;

  const handleScrollLeft = () => {
    if (canScrollLeft) setStartIndex((prev) => prev - 1);
  };

  const handleScrollRight = () => {
    if (canScrollRight) setStartIndex((prev) => prev + 1);
  };

  const visibleFolders = MOCK_FOLDERS.slice(
    startIndex,
    startIndex + MAX_VISIBLE
  );

  return (
    <>
      <FlexBox gap={8} direction="column">
        <Container>
          <FolderContainer>
            {visibleFolders.map((folder, index) => (
              <ScrapFolder
                key={index}
                name={folder.name}
                count={folder.count}
              />
            ))}
          </FolderContainer>
          <ArrowButton disabled={!canScrollLeft} onClick={handleScrollLeft}>
            <MoveLeftIcon />
          </ArrowButton>
          <ArrowButton disabled={!canScrollRight} onClick={handleScrollRight}>
            <MoveRightIcon />
          </ArrowButton>
          <IconButton onClick={() => setIsModalOpen(true)}>
            <FolderIcon />
          </IconButton>
        </Container>
        <TextDiv>
          <Text typo="H4" children="전체 보기" />
        </TextDiv>
        <OtherPostComponent
          showTitle={false}
          posts={posts}
          infoText="스크랩 기록이 없습니다."
        />
        {posts.length > 0 && (
          <PaginationComponent
            totalPages={totalPages}
            page={page}
            onPageChange={handlePageChange}
          />
        )}
      </FlexBox>
      {isModalOpen && <FolderAddModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

const Wrapper = styled.div``;

const Container = styled.div`
  margin-top: 24px;
  height: 130px;
  display: flex;
  align-items: center;
  gap: 24px;
`;

const FolderContainer = styled.div`
  display: flex;
  gap: 16px;
`;

const ArrowButton = styled.button<{ disabled: boolean }>`
  background: none;
  border: none;
  padding: 0;
  color: ${({ disabled }) =>
    disabled ? `${theme.palette.gray_300}` : `${theme.palette.gray_1000}`};
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  display: flex;
  align-items: center;
  justify-content: center;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const TextDiv = styled.div`
  display: "flex";
  width: 100%;
  justify-content: "flex-start";
  margin-top: 24px;
`;
