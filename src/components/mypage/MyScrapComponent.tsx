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
import { useRouter } from "next/navigation";

export const MyScrapComponent = () => {
  const [posts, setPosts] = useState<OtherPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const [folders, setFolders] = useState<
    { id: number; name: string; count: number }[]
  >([]);
  const [startIndex, setStartIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const MAX_VISIBLE = 5;

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const res = await usersApi.getMyScrap({ page });
      //const res = MOCK_DATA[0];
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

  const fetchFolders = async () => {
    try {
      const res = await usersApi.getMyScrapFolders();
      if (res.isSuccess) {
        const mappedFolders = res.data.scrapFolders.map((folder: any) => ({
          id: folder.id,
          name: folder.name,
          count: folder.count ?? 0,
        }));
        setFolders(mappedFolders);
      } else {
        setFolders([]);
      }
    } catch (err) {
      console.error("스크랩 폴더 가져오기 실패", err);
      setFolders([]);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, []);

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const canScrollLeft = startIndex > 0;
  const canScrollRight = startIndex + MAX_VISIBLE < folders.length;

  const handleScrollLeft = () => {
    if (canScrollLeft) setStartIndex((prev) => prev - 1);
  };

  const handleScrollRight = () => {
    if (canScrollRight) setStartIndex((prev) => prev + 1);
  };

  const visibleFolders = folders.slice(startIndex, startIndex + MAX_VISIBLE);

  return (
    <>
      <FlexBox gap={8} direction="column">
        <Container>
          <FolderContainer>
            {visibleFolders.map((folder) => (
              <ScrapFolder
                key={folder.id}
                name={folder.name}
                count={folder.count}
                onClick={() =>
                  router.push(
                    `/users/mypage/scrap/${folder.id}?name=${encodeURIComponent(
                      folder.name
                    )}`
                  )
                }
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
          showScrapIcon={true}
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
