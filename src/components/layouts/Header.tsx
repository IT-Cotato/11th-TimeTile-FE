"use client";

import { useAtom } from "jotai";
import styled from "styled-components";
import { userProfileAtom } from "@/store/UserProfileAtom";
import { useRouter } from "next/navigation";
import { SymbolTextLogo } from "@/assets/images/SymbolTextLogo";
import { useState, useRef, useEffect } from "react";
import { AlarmIcon } from "@/assets/icons/AlarmIcon";
import { theme } from "@/styles/theme";
import { SearchIcon } from "@/assets/icons/SearchIcon";
import { Text } from "../atoms/Text";

export const Header = () => {
  const [userProfile, setUserProfile] = useAtom(userProfileAtom);
  const router = useRouter();
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  // 바깥 클릭 시 모달 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setIsProfileModalOpen(false);
      }
    };
    if (isProfileModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isProfileModalOpen]);

  const handleLogout = () => {
    setUserProfile(null);
    router.push("/login");
  };

  return (
    <Container>
      <HeaderWrapper>
        <LogoDiv onClick={() => router.push("/")}>
          <SymbolTextLogo width={150} height={30} />
        </LogoDiv>
        <Nav>
          <SearchInputWrapper>
            <SearchIconStyled>
              <SearchIcon />
            </SearchIconStyled>
            <SearchInput
              type="text"
              placeholder="문서를 검색해보세요."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  const target = e.target as HTMLInputElement;
                  const keyword = target.value.trim();
                  if (keyword) {
                    router.push(`/search?query=${encodeURIComponent(keyword)}`);
                  }
                }
              }}
            />
          </SearchInputWrapper>
          <AlarmButton aria-label="알림">
            <AlarmIcon />
          </AlarmButton>
          {userProfile ? (
            <ProfileWrapper ref={profileRef}>
              <ProfileImg
                src={userProfile.profileImageUrl}
                alt="프로필"
                onClick={() => setIsProfileModalOpen((prev) => !prev)}
              />
              {isProfileModalOpen && (
                <ProfileModal>
                  <ProfileInfo>
                    <ProfileImgLarge
                      src={userProfile.profileImageUrl}
                      alt="프로필 이미지"
                    />
                    <Nickname>
                      <Text
                        typo="H4"
                        color="gray_1000"
                        children={userProfile.nickname}
                      />
                    </Nickname>
                  </ProfileInfo>
                  <ModalButton
                    onClick={() => {
                      router.push("/users/mypage");
                      setIsProfileModalOpen(false);
                    }}
                  >
                    <Text color="gray_800" typo="H5" children="마이페이지" />
                  </ModalButton>
                  <ModalButton
                    onClick={() => {
                      router.push("/settings");
                      setIsProfileModalOpen(false);
                    }}
                  >
                    <Text color="gray_800" typo="H5" children="설정" />
                  </ModalButton>
                  <LogoutButton onClick={handleLogout}>
                    <Text color="gray_800" typo="H5" children="로그아웃" />
                  </LogoutButton>
                </ProfileModal>
              )}
            </ProfileWrapper>
          ) : (
            <Button
              onClick={() => {
                setIsProfileModalOpen(false);
                router.push("/login");
              }}
            >
              <Text typo="H5" children="로그인" />
            </Button>
          )}
        </Nav>
      </HeaderWrapper>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  padding: 0 119px;
`;

const HeaderWrapper = styled.header`
  display: flex;
  width: 100%;
  height: 72px;
  padding: 14px 0;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
`;

const LogoDiv = styled.div`
  cursor: pointer;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
`;

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

const SearchInput = styled.input`
  width: 100%;
  height: 48px;
  padding: 8px 17px 8px 40px;
  border-radius: 24px;
  border: 1px solid ${theme.palette.gray_400};
  outline: none;

  font-family: "Pretendard-Regular";
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 150%;

  &:focus {
    border: 1px solid ${theme.palette.gray_400};
  }

  &::placeholder {
    color: ${theme.palette.gray_400};
  }
`;

const AlarmButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

const ProfileWrapper = styled.div`
  position: relative;
`;

const ProfileImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  cursor: pointer;
`;

const ProfileModal = styled.div`
  position: absolute;
  top: 40px;
  right: 0;
  width: 250px;
  height: 336px;
  z-index: 999;
  display: inline-flex;
  padding: 24px 40px;
  gap: 23px;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  border: 1px solid var(--Primary-400, #a6c6fa);
  background: var(--Primary-50, #f7faff);
  box-shadow: 0 4px 16px 0 rgba(159, 198, 255, 0.25);
`;

const ProfileInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

const ProfileImgLarge = styled.img`
  width: 100px;
  height: 100px;
  flex-shrink: 0;
  aspect-ratio: 1/1;
  border-radius: 50%;
`;

const Nickname = styled.div``;

const ModalButton = styled.button`
  all: unset;
  cursor: pointer;
`;

const LogoutButton = styled(ModalButton)`
  padding-top: 23px;
  width: 169px;
  border-top: 1px solid #a6c6fa;
  font-weight: 600;
  text-align: center;
`;

const Button = styled.button`
  all: unset;
  cursor: pointer;
`;
