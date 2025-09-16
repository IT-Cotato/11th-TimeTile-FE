import { SearchIcon } from "@/assets/icons/SearchIcon";
import { SearchIconFill } from "@/assets/icons/SearchIconFill";
import { theme } from "@/styles/theme";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import { useState, useEffect, useRef } from "react";
import { searchApi } from "@/apis/searchApi";
import { RecentSearchDropdown } from "./RecentSearchDropDown";
import { SuggestDropdown } from "./SuggestDropdown";

export const Search = () => {
  const router = useRouter();
  const [value, setValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentKeywords, setRecentKeywords] = useState<string[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // 최근 검색어 조회
  const fetchRecentKeywords = async () => {
    try {
      const res = await searchApi.getRecent();
      if (res.isSuccess && res.data.results.length) {
        setRecentKeywords(res.data.results);
      }
    } catch (error) {
      console.error("최근 검색어 조회 실패:", error);
    }
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(e.target as Node)
      ) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    if (!value.trim()) {
      fetchRecentKeywords();
    }
  };

  // 추천 검색어 조회
  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const res = await searchApi.getSuggestions(value.trim());
        if (res.isSuccess) setSuggestions(res.data.suggestions);
        else setSuggestions([]);
      } catch (error) {
        console.error("자동완성 조회 실패:", error);
        setSuggestions([]);
      }
    };

    fetchSuggestions();
  }, [value]);

  const handleSearch = (keyword: string) => {
    if (!keyword) return;

    const newKeywords = [
      keyword,
      ...recentKeywords.filter((k) => k !== keyword),
    ].slice(0, 5);
    setRecentKeywords(newKeywords);

    router.push(`/search?query=${encodeURIComponent(keyword)}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch(value.trim());
  };

  const handleTagClick = (keyword: string) => {
    setValue(keyword);
    handleSearch(keyword);
  };

  const handleDeleteRecent = async (keywordToDelete: string) => {
    try {
      const res = await searchApi.deleteRecent(keywordToDelete);
      if (res.isSuccess) {
        setRecentKeywords((prev) => prev.filter((k) => k !== keywordToDelete));
      }
    } catch (error) {
      console.error("최근 검색어 삭제 실패:", error);
    }
  };

  return (
    <SearchInputWrapper ref={wrapperRef}>
      <SearchIconStyled>
        {value.trim() ? <SearchIconFill /> : <SearchIcon />}
      </SearchIconStyled>
      <SearchInput
        type="text"
        placeholder="문서를 검색해보세요."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={handleFocus}
        onKeyDown={handleKeyDown}
        $isDropdownOpen={isFocused}
      />
      {isFocused && !value.trim() && (
        <RecentSearchDropdown
          keywords={recentKeywords}
          onTagClick={handleTagClick}
          onDelete={handleDeleteRecent}
        />
      )}
      {isFocused && value.trim() && (
        <SuggestDropdown keyword={value} suggestions={suggestions} />
      )}
    </SearchInputWrapper>
  );
};

const SearchInputWrapper = styled.div`
  position: relative;
  width: 35vw;
  max-width: 448px;
  min-width: 260px;
`;

const SearchIconStyled = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SearchInput = styled.input<{ $isDropdownOpen: boolean }>`
  width: 100%;
  height: 48px;
  padding: 12px 16px 12px 40px;
  border-radius: ${({ $isDropdownOpen }) =>
    $isDropdownOpen ? "24px 24px 0 0" : "24px"};
  border: 1px solid ${theme.palette.gray_400};
  border-bottom: ${({ $isDropdownOpen }) =>
    $isDropdownOpen ? "none" : `1px solid ${theme.palette.gray_400}`};
  outline: none;
  font-family: "Pretendard-Regular";
  font-size: 16px;
  line-height: 150%;

  &::placeholder {
    color: ${theme.palette.gray_400};
  }

  &:hover,
  &:focus {
    border: 1.5px solid ${theme.palette.gray_300};
    border-bottom: ${({ $isDropdownOpen }) =>
      $isDropdownOpen ? "none" : `1.5px solid ${theme.palette.gray_300}`};
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.05);
  }
`;
