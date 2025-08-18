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
          artistName: "Bruno Mars",
          postId: 12,
          title: "Dickinson, Mayert and Metz",
          content:
            "Cohibeo aedificium aequitas ratione vis nam vulariter versus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T093403Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=97f872e2ccd67c2b20fd96f434012cbdbffcf5edb3b2a0a3726078eb21d3fc60",
          createdAt: "2025-07-23T20:49:13.737354",
          likeCount: 0,
          commentCount: 0,
          isScrapped: true,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 11,
          title: "Howell LLC",
          content:
            "Soluta odit voco vulnus compono timor ascisco chirographum.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T093403Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=97f872e2ccd67c2b20fd96f434012cbdbffcf5edb3b2a0a3726078eb21d3fc60",
          createdAt: "2025-07-23T20:49:11.629089",
          likeCount: 0,
          commentCount: 0,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 10,
          title: "Dooley LLC",
          content:
            "Aufero accusator sunt cohibeo sono necessitatibus accusator volva.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T093403Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=97f872e2ccd67c2b20fd96f434012cbdbffcf5edb3b2a0a3726078eb21d3fc60",
          createdAt: "2025-07-23T20:49:09.281998",
          likeCount: 0,
          commentCount: 0,
          isScrapped: true,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 9,
          title: "Koch - Spencer",
          content: "Civitas inflammatio animi advoco aeneus tricesimus dens.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T093403Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=97f872e2ccd67c2b20fd96f434012cbdbffcf5edb3b2a0a3726078eb21d3fc60",
          createdAt: "2025-07-23T20:49:07.023323",
          likeCount: 0,
          commentCount: 0,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 8,
          title: "Roberts - Carroll",
          content:
            "Tamen utpote subiungo sub ante patruus dens carpo celebrer.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T093403Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=97f872e2ccd67c2b20fd96f434012cbdbffcf5edb3b2a0a3726078eb21d3fc60",
          createdAt: "2025-07-23T20:49:04.563124",
          likeCount: 0,
          commentCount: 0,
          isScrapped: true,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 7,
          title: "Bergnaum Inc",
          content: "Vigilo amita acies.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T093403Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=97f872e2ccd67c2b20fd96f434012cbdbffcf5edb3b2a0a3726078eb21d3fc60",
          createdAt: "2025-07-23T20:48:57.010337",
          likeCount: 0,
          commentCount: 0,
          isScrapped: true,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 6,
          title: "Dare and Sons",
          content: "Temporibus cibo cito.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T093403Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=97f872e2ccd67c2b20fd96f434012cbdbffcf5edb3b2a0a3726078eb21d3fc60",
          createdAt: "2025-07-23T20:48:54.814594",
          likeCount: 0,
          commentCount: 0,
          isScrapped: true,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 5,
          title: "O'Kon - McKenzie",
          content:
            "Aegrus conculco patior recusandae animi deficio apparatus antiquus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T093403Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=97f872e2ccd67c2b20fd96f434012cbdbffcf5edb3b2a0a3726078eb21d3fc60",
          createdAt: "2025-07-23T20:48:52.668386",
          likeCount: 0,
          commentCount: 0,
          isScrapped: false,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 4,
          title: "Zboncak, Raynor and Christiansen",
          content: "Apud inflammatio sto nemo et peccatus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T093403Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=97f872e2ccd67c2b20fd96f434012cbdbffcf5edb3b2a0a3726078eb21d3fc60",
          createdAt: "2025-07-23T20:48:50.494542",
          likeCount: 0,
          commentCount: 0,
          isScrapped: true,
        },
        {
          name: "Corporate Branding Manager",
          groupId: "3be20cc2-7f5b-44fa-9272-0b38725c3480",
          artistName: "Bruno Mars",
          postId: 3,
          title: "Von Inc",
          content: "Dapifer asper ubi accedo versus cohibeo a quis tabernus.",
          mainImageUrl:
            "https://timetile-bucket.s3.ap-northeast-2.amazonaws.com/logo/simple-logo.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Date=20250731T093403Z&X-Amz-SignedHeaders=host&X-Amz-Credential=AKIAST6S6Z5CPPUI2VF4%2F20250731%2Fap-northeast-2%2Fs3%2Faws4_request&X-Amz-Expires=3600&X-Amz-Signature=97f872e2ccd67c2b20fd96f434012cbdbffcf5edb3b2a0a3726078eb21d3fc60",
          createdAt: "2025-07-23T20:48:48.091059",
          likeCount: 0,
          commentCount: 0,
          isScrapped: true,
        },
      ],
      page: 1,
      size: 10,
      totalPages: 2,
      totalElements: 12,
      hasNext: true,
      hasPrevious: false,
      isLast: false,
    },
  },
];
const MOCK_COMMENT = [
  {
    isSuccess: true,
    code: "COMMON001",
    message: "요청 성공",
    data: {
      comments: [
        {
          name: "Corporate Brandingddddddd Manager",
          artistName: "Bruno Mars",
          postId: 20,
          postTitle: "Kilback, Bogan and Sasssssssssssssswayn",
          content:
            "Lady GaGaLady GaGaLady GaGaLady GaGaLady GaGaLady GaGaLady GaGaLady GaGaLady GaGaLady GaGaLady GaGaLady GaGaLady GaGaLady GaGaLady GaGa",
          likeCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 20,
          postTitle: "Kilback, Bogan and Sawayn",
          content: "Sting",
          likeCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 22,
          postTitle: "Kilback, Bogan and Sawayn",
          content: "Sting",
          likeCount: 0,
        },
        {
          name: "Corporate Branding Manager",
          artistName: "Bruno Mars",
          postId: 23,
          postTitle: "Kilback, Bogan and Sawayn",
          content: "Sting",
          likeCount: 0,
        },
      ],
      page: 1,
      size: 18,
      totalPages: 1,
      totalElements: 2,
      hasNext: false,
      hasPrevious: false,
      isLast: true,
    },
  },
];

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
        //const res = MOCK_DATA[0];
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
          visibility: visibilityParam,
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
  //     } else if (selected === "comment") {
  //       const res = await usersApi.getMyTimeLineComments({
  //         page,
  //         size: 18,
  //         visibility: visibilityParam,
  //       });
  //       if (res.isSuccess) {
  //         if (res.data.comments.length === 0) {
  //           setComments(MOCK_COMMENT[0].data.comments);
  //           setTotalPages(1);
  //           setPage(1);
  //         } else {
  //           setComments(res.data.comments);
  //           setPage(res.data.page);
  //           setTotalPages(res.data.totalPages);
  //           setPosts([]);
  //         }
  //         setPosts([]);
  //       } else {
  //         setComments([]);
  //       }
  //     }
  //   } catch (err) {
  //     console.error("데이터 가져오기 실패", err);
  //     setPosts([]);
  //     setComments([]);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  useEffect(() => {
    fetchData(page);
  }, [page, selectedVisibility, selected]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };
  return (
    <Container>
      <SelectHeader>
        <ContentSelect>
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

const ContentSelect = styled.div`
  display: flex;
  width: 772px;
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
