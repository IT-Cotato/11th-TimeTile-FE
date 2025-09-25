import React from "react";
import styled from "styled-components";
import { Text } from "@/components/atoms/Text";
import { RoleIcon } from "@/components/mypage/RoleIcon";
import { UserRole } from "@/model/common/user";
import { MoreIcon } from "@/assets/icons/MoreIcon";

export type HeaderProps = {
  profileImage: string;
  username: string;
  role?: UserRole;
  roleImageUrl?: string;
  visibility: string; // "PUBLIC" | "PRIVATE" 등
  onOpenMenu: () => void;
};

export default function Header({
  profileImage,
  username,
  role,
  roleImageUrl,
  visibility,
  onOpenMenu,
}: HeaderProps) {
  return (
    <HeaderWrap>
      <Left>
        <Avatar src={profileImage} alt="profile" />
        <InfoCol>
          <NameRow>
            <Text typo="Body_3">{username}</Text>
            {role ? (
              <RoleIcon role={role} width={18} />
            ) : roleImageUrl ? (
              <RoleImg src={roleImageUrl} alt="role" />
            ) : null}
          </NameRow>
          <MetaRow>
            <Text typo="Caption_2">
              {visibility === "PUBLIC" ? "전체공개" : "나만보기"}
            </Text>
          </MetaRow>
        </InfoCol>
      </Left>

      <Right>
        <MoreBtn onClick={onOpenMenu} aria-label="더보기">
          <MoreIcon />
        </MoreBtn>
      </Right>
    </HeaderWrap>
  );
}

const HeaderWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
const Left = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;
const Right = styled.div`
  position: relative;
  margin-left: auto;
`;
const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const InfoCol = styled.div`
  display: inline-flex;
  gap: 8px;
`;
const NameRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const RoleImg = styled.img`
  width: 18px;
  height: 18px;
  border-radius: 4px;
  object-fit: cover;
`;
const MetaRow = styled.div`
  display: flex;
  align-items: center;
  color: #87898c;
  gap: 8px;
  margin-top: 5px;
`;
const MoreBtn = styled.button`
  all: unset;
  cursor: pointer;
  padding: 4px;
`;
