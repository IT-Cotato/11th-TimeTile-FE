"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import { usersApi } from "@/apis/usersApi";
import { EditorComponent } from "@/components/mypage/role/Editor/EditorComponent";
import { UserRole } from "@/model/common/user";
import { LinkerComponent } from "@/components/mypage/role/Linker/LinkerComponent";
import { WatcherComponent } from "@/components/mypage/role/Watcher/WatcherComponent";
interface GradeData {
  nickname: string;
  role: UserRole;
  visitCount: number;
  postCount: number;
  likeCount: number;
  commentCount: number;
  achievementRate: number;
}

// const mockGradeData = {
//   nickname: "초연",
//   role: "EDITOR" as UserRole,
//   visitCount: 12,
//   postCount: 5,
//   likeCount: 20,
//   commentCount: 8,
//   achievementRate: 80,
// };

export default function RolePage() {
  const [gradeData, setGradeData] = useState<GradeData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGrade = async () => {
      try {
        const res = await usersApi.getMyGrade();
        setGradeData(res.data);
      } catch (error) {
        console.error("등급 정보를 불러오는 데 실패했습니다", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGrade();
  }, []);

  const renderRoleComponent = () => {
    if (!gradeData) return <div>유저 정보 없음</div>;

    switch (gradeData.role) {
      case "WATCHER":
        return <WatcherComponent data={gradeData} />;
      case "EDITOR":
        return <EditorComponent data={gradeData} />;
      case "LINKER":
        return <LinkerComponent data={gradeData} />;
      default:
        return <div>잘못된 권한입니다.</div>;
    }
  };

  return (
    <Container>
      <Wrapper>
        {isLoading ? <div>로딩 중...</div> : renderRoleComponent()}
        {/* <EditorComponent data={mockGradeData} /> */}
      </Wrapper>
    </Container>
  );
}

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
