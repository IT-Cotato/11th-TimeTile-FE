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

const MOCK_RESPONSE = [
  {
    isSuccess: true,
    code: "COMMON001",
    message: "요청 성공",
    data: {
      posts: [
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 21,
          title: "Franecki - Franecki",
          content:
            "Auctor laboriosam speciosus tamdiu tergeo utor advenio blanditiis vesper.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:55:54.12418",
          likeCount: 1,
          commentCount: 0,
          authorId: 3,
          authorNickname: "닉네임2",
          authorProfileImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 18,
          title: "Gislason, Ratke and Reinger",
          content: "Antea video aeneus dolor bardus decet umbra.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
          createdAt: "2025-07-23T20:55:47.184279",
          likeCount: 1,
          commentCount: 0,
          authorId: 3,
          authorNickname: "닉네임2",
          authorProfileImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png",
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

export default function ScrapFolderDetail() {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const folderName = searchParams.get("name") || "";
  const folderId = params.folderId;
  const [posts, setPosts] = useState<OtherPost[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const kebabRef = useRef<HTMLDivElement>(null);
  const [folderAddModalOpen, setFolderAddModalOpen] = useState(false);
  const [currentFolderName, setCurrentFolderName] = useState(folderName);
  const [folderEditModalOpen, setFolderEditModalOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (kebabRef.current && !kebabRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuOpen]);

  const fetchData = async (page: number) => {
    if (!folderId) return;
    setLoading(true);
    try {
      const res = await usersApi.getScrapFolderPosts(folderId as string, page);
      //   const res = MOCK_RESPONSE[0];
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

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleDeleteConfirm = async () => {
    if (!folderId) return;
    try {
      const res = await usersApi.deleteFolder(Number(folderId));

      if (res.isSuccess) {
        setDeleteModalOpen(false);
        router.back();
      } else {
        alert("폴더 삭제에 실패했습니다: " + res.message);
      }
    } catch (error) {
      console.error("폴더 삭제 실패", error);
      alert("폴더 삭제에 실패했습니다.");
    }
  };

  const handleEditClick = () => {
    setFolderEditModalOpen(true);
    setMenuOpen(false);
  };

  //   const handleFolderAddModalClose = (updatedName?: string) => {
  //     setFolderAddModalOpen(false);
  //     if (updatedName) {
  //       setCurrentFolderName(updatedName);
  //       const searchParams = new URLSearchParams(window.location.search);
  //       searchParams.set("name", updatedName);
  //       const newUrl = window.location.pathname + "?" + searchParams.toString();
  //       window.history.replaceState(null, "", newUrl);
  //     }
  //   };

  if (loading) return <p>로딩중...</p>;

  return (
    <Container>
      <DetailHeader>
        <FlexDiv>
          <div onClick={() => router.back()} style={{ cursor: "pointer" }}>
            <MoveLeftIcon />
          </div>
          <NoWrapText typo="H2" color="primary_800" children={folderName} />
        </FlexDiv>
        <div ref={kebabRef} style={{ position: "relative" }}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <KebabIcon />
          </div>
          {menuOpen && (
            <MenuContainer>
              <MenuItem
                onClick={() => {
                  setDeleteModalOpen(true);
                  setMenuOpen(false);
                }}
              >
                <Text typo="H5" color="gray_800" children="폴더 삭제" />
              </MenuItem>
              <MenuItem onClick={handleEditClick}>
                <Text typo="H5" color="gray_800" children="폴더 이름 수정" />
              </MenuItem>
              <MenuItem>
                <Text typo="H5" color="gray_800" children="게시글 선택 삭제" />
              </MenuItem>
            </MenuContainer>
          )}
        </div>
      </DetailHeader>
      <OtherPostComponent
        showTitle={false}
        posts={posts}
        infoText="기록이 없습니다."
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
            <Text
              typo="Body_3"
              color="gray_800"
              children="폴더를 삭제할까요?"
            />
            <ButtonRow>
              <CancelButton onClick={() => setDeleteModalOpen(false)}>
                <Text typo="Body_1" color="gray_0" children="취소" />
              </CancelButton>
              <ConfirmDeleteButton onClick={handleDeleteConfirm}>
                <Text typo="Body_1" color="gray_0" children="삭제" />
              </ConfirmDeleteButton>
            </ButtonRow>
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
            const newUrl =
              window.location.pathname + "?" + searchParams.toString();
            window.history.replaceState(null, "", newUrl);
          }}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  width: 962px;
  margin: 0 auto;
  margin-bottom: 100px;
  margin-top: 26px;
`;

const DetailHeader = styled.div`
  display: flex;
  height: 24px;
  justify-content: center;
  align-items: flex-start;
  gap: 833px;
  padding-bottom: 48px;
  border-bottom: 1px solid rgba(209, 211, 212, 0.5);
  position: relative;
  justify-content: space-between;
`;

const FlexDiv = styled.div`
  display: flex;
  justify-content: center;
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
  border: 1px solid var(--Primary-400, #a6c6fa);
  background: var(--Primary-50, #f7faff);
  box-shadow: 0 4px 16px 0 rgba(159, 198, 255, 0.25);
  z-index: 10;
`;

const MenuItem = styled.div`
  display: flex;
  width: 168px;
  height: 40px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background: var(--Primary-200, #e6f0ff);
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
  display: flex;
  width: 224px;
  padding: 32px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
  border-radius: 20px;
  border: 1px solid var(--Primary-400, #a6c6fa);
  background: var(--Primary-50, #f7faff);
  box-shadow: 0 4px 16px 0 rgba(159, 198, 255, 0.25);
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
  padding: 10px 13px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: var(--Gray-300, #d1d3d4);
  cursor: pointer;
`;

const ConfirmDeleteButton = styled.button`
  all: unset;
  display: flex;
  padding: 10px 13px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: var(--Primary-500, #80a9f2);
  cursor: pointer;
`;

const NoWrapText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
