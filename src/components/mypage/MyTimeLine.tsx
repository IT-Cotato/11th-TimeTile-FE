import { theme } from "@/styles/theme";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { Post } from "@/model/components/Post";
import { usersApi } from "@/apis/usersApi";
import { TimeLineComponent } from "@/components/mypage/TimeLineComponent";
import PaginationComponent from "./PaginationComponent";
import { Comment } from "@/model/components/Comment";
import { MyCommentComponent } from "./MyCommentComponent";

export const MyTimeLine = () => {
  const [selected, setSelected] = useState<"post" | "comment">("post");
  const [selectedVisibility, setSelectedVisibility] = useState<
    "public" | "private"
  >("public");
  const [posts, setPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const fetchData = async (page: number) => {
    setLoading(true);
    try {
      const visibilityParam =
        selectedVisibility === "private" ? "PRIVATE" : "PUBLIC";
      if (selected === "post") {
        const res = await usersApi.getMyTimeLinePosts({
          page,
          size: 10,
          visibility: visibilityParam,
        });
        if (res.isSuccess) {
          setPosts(res.data.posts);
          setPage(res.data.page);
          setTotalPages(res.data.totalPages);
          setComments([]);
        } else {
          setPosts([]);
        }
      } else if (selected === "comment") {
        const res = await usersApi.getMyTimeLineComments({
          page,
          size: 18,
          visibility: "PUBLIC",
        });
        if (res.isSuccess) {
          setComments(res.data.comments);
          setPage(res.data.page);
          setTotalPages(res.data.totalPages);
          setPosts([]);
        } else {
          setComments([]);
        }
      }
    } catch (err) {
      console.error("데이터 가져오기 실패", err);
      setPosts([]);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page, selectedVisibility, selected]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <Container>
      <SelectHeader>
        <ContentSelect $isPost={selected === "post"}>
          <SelectText
            onClick={() => {
              setSelected("post");
              setPage(1);
            }}
            $selected={selected === "post"}
          >
            <Text typo="H4" children="게시글" />
            <Underline $visible={selected === "post"} />
          </SelectText>
          <SelectText
            onClick={() => {
              setSelected("comment");
              setPage(1);
            }}
            $selected={selected === "comment"}
          >
            <Text typo="H4" children="댓글" />
            <Underline $visible={selected === "comment"} />
          </SelectText>
        </ContentSelect>
        {selected === "post" && (
          <VisibilitySelect>
            <VisibilityText
              $selected={selectedVisibility === "public"}
              onClick={() => {
                setSelectedVisibility("public");
                setPage(1);
              }}
            >
              <Text typo="Caption_1" children="전체 공개" />
            </VisibilityText>
            <VisibilityText
              $selected={selectedVisibility === "private"}
              onClick={() => {
                setSelectedVisibility("private");
                setPage(1);
              }}
            >
              <Text typo="Caption_1" children="비공개" />
            </VisibilityText>
          </VisibilitySelect>
        )}
      </SelectHeader>
      {selected === "post" ? (
        <TimeLineComponent
          posts={posts}
          titleText=""
          showTitle={false}
          infoText="게시글이 없습니다."
          showScrapIcon={true}
        />
      ) : (
        <MyCommentComponent comments={comments} infoText="댓글이 없습니다." />
      )}
      {(selected === "post" ? posts.length : comments.length) > 0 && (
        <PaginationComponent
          totalPages={totalPages}
          page={page}
          onPageChange={handlePageChange}
        />
      )}
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SelectHeader = styled.div`
  display: flex;
  width: 950px;
  align-items: flex-end;
  gap: 24px;
`;

const ContentSelect = styled.div<{ $isPost: boolean }>`
  display: flex;
  width: ${({ $isPost }) => ($isPost ? "772px" : "100%")};
  height: 46px;
  align-items: flex-end;
  gap: 56px;
  align-self: stretch;
  border-bottom: 1px solid ${theme.palette.gray_200};
`;
const SelectText = styled.div<{ $selected: boolean }>`
  cursor: pointer;
`;

const Underline = styled.div<{ $visible: boolean }>`
  width: 100%;
  margin-top: 12px;
  height: 5px;
  background-color: ${({ $visible }) =>
    $visible ? theme.palette.primary_400 : "transparent"};
  border-radius: 5px 5px 0 0;
`;

const VisibilitySelect = styled.div`
  display: flex;
  padding: 7px 8px;
  justify-content: flex-end;
  align-items: center;
  border-radius: 24px;
  border: 1px solid ${theme.palette.primary_500};
  box-shadow: 0 4px 4px 0 rgba(159, 198, 255, 0.15);
`;

const VisibilityText = styled.div<{ $selected: boolean }>`
  display: flex;
  height: 32px;
  padding: 9px 12px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 20px;
  background: ${({ $selected }) =>
    $selected ? theme.palette.primary_300 : theme.palette.gray_0};
  cursor: pointer;
`;
const Pagination = styled.div`
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-top: 20px;
`;

const PageButton = styled.button`
  padding: 6px 16px;
  background-color: ${theme.palette.primary_300};
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
  &:disabled {
    background-color: ${theme.palette.gray_300};
    cursor: not-allowed;
  }
`;

const PageInfo = styled.div`
  display: flex;
  align-items: center;
  font-weight: 600;
`;
