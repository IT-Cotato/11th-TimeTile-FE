"use client";

import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { searchApi } from "@/apis/searchApi";
import styled from "styled-components";

const SearchPage = () => {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  useEffect(() => {
    if (query) {
      searchApi.searchAll(query);
    }
  }, [query]);

  return (
    <Container>
      <Wrapper>검색 결과</Wrapper>
    </Container>
  );
};

export default SearchPage;

const Container = styled.div`
  width: 100%;
  overflow-x: auto;
  min-height: 100vh;
  padding: 0 119px;
`;

const Wrapper = styled.div`
  width: 962px;
  margin: 0 auto;
  margin-bottom: 150px;
`;
