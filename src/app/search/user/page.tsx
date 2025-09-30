"use client";

import { searchApi } from "@/apis/searchApi";
import { TimeTileCard } from "@/components/atoms/TimeTileCard";
import { UserProfileCard } from "@/components/atoms/UserProfileCard";
import PaginationComponent from "@/components/mypage/PaginationComponent";
import { SearchDetailHeader } from "@/components/Search/SearchDetail/SearchDetailHeader";
import { UserResult } from "@/components/Search/SearchResult/UserResult";
import { SearchEvent } from "@/model/components/SearchType";
import { theme } from "@/styles/theme";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import styled from "styled-components";

interface User {
  nickname: string;
  imageUrl: string;
  introduction: string | null;
}

export default function SearchUserPage() {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  const [users, setUsers] = useState<User[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    if (!query) return;

    const fetchUsers = async () => {
      try {
        const res = await searchApi.searchUsers(query, page);
        if (res.isSuccess && res.data) {
          setUsers(res.data.users);
          setTotalCount(res.data.totalElements);
          setTotalPages(res.data.totalPages);
        } else {
          setUsers([]);
          setTotalCount(0);
          setTotalPages(1);
        }
      } catch (err) {
        console.error(err);
        setUsers([]);
        setTotalCount(0);
        setTotalPages(1);
      }
    };

    fetchUsers();
  }, [query, page]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  return (
    <Container>
      <Wrapper>
        <SearchDetailHeader children="유저" searchCount={totalCount} />
        <PostWrapper>
          {users.map((user, idx) => (
            <UserProfileCard
              key={idx}
              name={user.nickname}
              imageUrl={user.imageUrl}
              introduction={user.introduction}
            />
          ))}
        </PostWrapper>
        {totalPages > 0 && (
          <PaginationComponent
            page={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        )}
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 0 119px 83px;
`;

const Wrapper = styled.div`
  display: flex;
  margin: 0 auto;
  width: 1200px;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`;

const PostWrapper = styled.div`
  display: flex;
  padding: 32px;
  flex-direction: column;
  align-items: center;
  gap: 32px;
  align-self: stretch;
  border-radius: 20px;
  border: 1px solid ${theme.palette.primary_300};
  background: ${theme.palette.primary_20};
`;
const ProfileRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
`;
