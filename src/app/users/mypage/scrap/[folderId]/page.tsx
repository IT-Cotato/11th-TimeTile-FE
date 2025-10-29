"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { OtherPost } from "@/model/components/Post";
import PaginationComponent from "@/components/mypage/PaginationComponent";
import { OtherPostComponent } from "@/components/mypage/OtherPostComponent";
import styled from "styled-components";
import { usersApi } from "@/apis/usersApi";
import { MoveLeftIcon } from "@/assets/icons/MoveLeftIcon";
import { Text } from "@/components/atoms/Text";
import { KebabIcon } from "@/assets/icons/KebabIcon";
import { FolderEditModal } from "@/components/mypage/FolderEditModal";
import { TrashIcon } from "@/assets/icons/TrashIcon";
import { theme } from "@/styles/theme";

export default function ScrapFolderDetail() {
  const router = useRouter();
  const params = useParams();
  const folderId = Array.isArray(params.folderId)
    ? params.folderId[0]
    : params.folderId;

  const searchParams = useSearchParams();
  const folderNameParam = searchParams.get("name");
  const folderName = Array.isArray(folderNameParam)
    ? folderNameParam[0]
    : folderNameParam || "";

  const [posts, setPosts] = useState<OtherPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteSelectedModalOpen, setDeleteSelectedModalOpen] = useState(false);
  const [folderEditModalOpen, setFolderEditModalOpen] = useState(false);
  const [onSelectMode, setOnSelectMode] = useState(false);
  const [selectedPosts, setSelectedPosts] = useState<Set<number>>(new Set());
  const [currentFolderName, setCurrentFolderName] = useState(folderName);

  const kebabRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (kebabRef.current && !kebabRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };

    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);
  const fetchData = async (page: number) => {
    if (!folderId) return;
    setLoading(true);
    try {
      const res = await usersApi.getScrapFolderPosts(folderId, page);
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
  }, [page, folderId]);

  const handlePageChange = (newPage: number) => setPage(newPage);

  const handleDeleteConfirm = async () => {
    if (!folderId) return;
    try {
      const res = await usersApi.deleteFolder(Number(folderId));
      if (res.isSuccess) {
        setDeleteModalOpen(false);
        router.back();
      } else {
        alert("폴더 삭제 실패: " + res.message);
      }
    } catch (err) {
      console.error(err);
      alert("폴더 삭제 실패");
    }
  };

  const handleEditClick = () => {
    setFolderEditModalOpen(true);
    setMenuOpen(false);
  };

  const handleSelectToggle = (postId: number) => {
    setSelectedPosts((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) newSet.delete(postId);
      else newSet.add(postId);
      return newSet;
    });
  };

  const handleDeleteSelected = async () => {
    if (selectedPosts.size === 0) {
      alert("선택된 게시글이 없습니다.");
      return;
    }
    if (!folderId) return;

    try {
      await Promise.all(
        Array.from(selectedPosts).map((postId) =>
          usersApi.cancelScrapPost(postId, Number(folderId))
        )
      );
      alert("선택한 게시글이 삭제되었습니다.");
      await fetchData(page);
      setSelectedPosts(new Set());
      setOnSelectMode(false);
    } catch (err) {
      console.error(err);
      alert("선택 삭제 실패");
    }
  };

  if (loading) return <p>로딩중...</p>;

  return (
    <Container>
      <Wrapper>
        <DetailHeader>
          <FlexDiv>
            <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
              <MoveLeftIcon />
            </div>
            <NoWrapText typo="H2" color="primary_800">
              {folderName}
            </NoWrapText>
          </FlexDiv>
          <RightActions ref={kebabRef}>
            {onSelectMode && (
              <UnderlinedText typo="Caption_2" color="primary_600">
                선택삭제
              </UnderlinedText>
            )}
            <ClickableWrapper
              onClick={() => {
                if (onSelectMode) setDeleteSelectedModalOpen(true);
                else setMenuOpen((prev) => !prev);
              }}
            >
              {onSelectMode ? <TrashIcon /> : <KebabIcon />}
            </ClickableWrapper>
            {menuOpen && !onSelectMode && (
              <MenuContainer>
                <MenuItem
                  onClick={() => {
                    setDeleteModalOpen(true);
                    setMenuOpen(false);
                  }}
                >
                  <Text typo="H5" color="gray_800">
                    폴더 삭제
                  </Text>
                </MenuItem>
                <MenuItem onClick={handleEditClick}>
                  <Text typo="H5" color="gray_800">
                    폴더 이름 수정
                  </Text>
                </MenuItem>
                <MenuItem
                  disabled={posts.length === 0}
                  onClick={() => {
                    if (posts.length > 0) {
                      setOnSelectMode(true);
                      setMenuOpen(false);
                    }
                  }}
                >
                  <Text
                    typo="H5"
                    color={posts.length === 0 ? "gray_400" : "gray_800"}
                  >
                    마이타일 선택 삭제
                  </Text>
                </MenuItem>
              </MenuContainer>
            )}
          </RightActions>
        </DetailHeader>
        <OtherPostComponent
          showTitle={false}
          posts={posts.map((post) => ({
            ...post,
            scrapFolderId: folderId ? Number(folderId) : undefined,
          }))}
          infoText="폴더에 추가된 마이타일이 없습니다."
          showScrapIcon
          isSelectionMode={onSelectMode}
          selectedPosts={selectedPosts}
          onToggleSelect={handleSelectToggle}
          isSelectionForFolderDetail
        />
        {posts.length > 0 && (
          <PaginationComponent
            totalPages={totalPages}
            page={page}
            onPageChange={handlePageChange}
          />
        )}
        {deleteModalOpen && (
          <DeleteModalBackground onClick={() => setDeleteModalOpen(false)}>
            <DeleteModalContainer onClick={(e) => e.stopPropagation()}>
              <GapDiv>
                <Text typo="Body_3" color="gray_800">
                  폴더를 삭제할까요?
                </Text>
                <ButtonRow>
                  <CancelButton onClick={() => setDeleteModalOpen(false)}>
                    <Text typo="Body_1" color="gray_0">
                      취소
                    </Text>
                  </CancelButton>
                  <ConfirmDeleteButton onClick={handleDeleteConfirm}>
                    <Text typo="Body_1" color="gray_0">
                      삭제
                    </Text>
                  </ConfirmDeleteButton>
                </ButtonRow>
              </GapDiv>
            </DeleteModalContainer>
          </DeleteModalBackground>
        )}
        {deleteSelectedModalOpen && (
          <DeleteModalBackground
            onClick={() => setDeleteSelectedModalOpen(false)}
          >
            <DeleteModalContainer onClick={(e) => e.stopPropagation()}>
              <GapDiv>
                <Text typo="Body_3" color="gray_800">
                  선택된 타일들을 삭제할까요?
                </Text>
                <ButtonRow>
                  <CancelButton
                    onClick={() => {
                      setDeleteSelectedModalOpen(false);
                      setOnSelectMode(false);
                      setSelectedPosts(new Set());
                    }}
                  >
                    <Text typo="Body_1" color="gray_0">
                      취소
                    </Text>
                  </CancelButton>
                  <ConfirmDeleteButton
                    onClick={() => {
                      setDeleteSelectedModalOpen(false);
                      handleDeleteSelected();
                    }}
                  >
                    <Text typo="Body_1" color="gray_0">
                      삭제
                    </Text>
                  </ConfirmDeleteButton>
                </ButtonRow>
              </GapDiv>
            </DeleteModalContainer>
          </DeleteModalBackground>
        )}
        {folderEditModalOpen && (
          <FolderEditModal
            initialName={currentFolderName}
            folderId={folderId ? Number(folderId) : 0}
            onClose={() => setFolderEditModalOpen(false)}
            onSuccess={(updatedName: string) => {
              setFolderEditModalOpen(false);
              setCurrentFolderName(updatedName);
              const searchParams = new URLSearchParams(window.location.search);
              searchParams.set("name", updatedName);
              window.history.replaceState(
                null,
                "",
                window.location.pathname + "?" + searchParams.toString()
              );
            }}
          />
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  min-height: 100vh;
  padding: 0 119px;
  margin-top: 26px;
`;

const Wrapper = styled.div`
  width: 962px;
  margin: 0 auto;
  margin-bottom: 150px;
`;

const DetailHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(209, 211, 212, 0.5);
`;

const FlexDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const RightActions = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  position: relative;
`;

const MenuContainer = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  display: inline-flex;
  padding: 24px 40px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_50};
  box-shadow: 0 4px 16px 0 rgba(159, 198, 255, 0.25);
  z-index: 10;
`;

const ClickableWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  cursor: pointer;
  white-space: nowrap;
`;

const MenuItem = styled.div<{ disabled?: boolean }>`
  display: flex;
  width: 168px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  color: ${({ disabled }) =>
    disabled ? theme.palette.gray_400 : theme.palette.gray_800};
  pointer-events: ${({ disabled }) => (disabled ? "none" : "auto")};

  &:hover {
    background: ${({ disabled }) =>
      disabled ? "none" : theme.palette.primary_200};
  }
`;

const DeleteModalBackground = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
`;

const DeleteModalContainer = styled.div`
  display: inline-flex;
  padding: 32px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_400};
  background: ${theme.palette.primary_50};
  box-shadow: 0 4px 16px 0 rgba(159, 198, 255, 0.25);
`;

const GapDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
`;

const ButtonRow = styled.div`
  display: flex;
  height: 40px;
  justify-content: center;
  align-items: center;
  gap: 12px;
  align-self: stretch;
`;

const CancelButton = styled.button`
  all: unset;
  display: flex;
  padding: 12px 13px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${theme.palette.gray_300};
  cursor: pointer;
`;

const ConfirmDeleteButton = styled.button`
  all: unset;
  display: flex;
  padding: 12px 13px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background: ${theme.palette.primary_500};
  cursor: pointer;
`;

const NoWrapText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const UnderlinedText = styled(Text)`
  text-decoration-line: underline;
  white-space: nowrap;
`;
