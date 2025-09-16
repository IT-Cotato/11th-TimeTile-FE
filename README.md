<a  href="https://11th-time-tile-fe.vercel.app/"  target="_blank">
<img width="100%" height="100%" alt="대표이미지" src="https://github.com/user-attachments/assets/547d8c00-475d-4acd-adf8-3828886a2f67" />

<br/>

</a>

<br/>

<br/>

# 📝 0. Getting Started

```typescript

$  pnpm start

```

[🌐 서비스 링크](https://11th-time-tile-fe.vercel.app/)

<br/>

<br/>

# 🔉 1. Project Overview

- 프로젝트 이름: TimeTile (타임타일)

- 프로젝트 설명: 타임라인 기반 덕질 아카이빙 서비스
  - timetile(타임타일)은 팬의 시선으로 아티스트의 활동을 연대기 형태로 아카이빙하고, 각자의 기록을 타일처럼 쌓아가는 커뮤니티 서비스입니다.

</a>  
<br/>
<br/>

# 👩🏻‍💻 2. FE Team Members

| 👤 팀원 |                    🔗 GitHub                     |                            🛠 담당                             |
| :-----: | :----------------------------------------------: | :-----------------------------------------------------------: |
| 김초연  |    [@choyeon2e](https://github.com/choyeon2e)    | 🏠 메인페이지 <br/> 🔑 회원가입 및 로그인 <br/> 👤 마이페이지 |
| 한정현  | [@JungHyunHann](https://github.com/JungHyunHann) |                       📚 마이타일 데크                        |

<br/>

<br/>

# 🔑 3. Key Features

1️⃣ **회원가입 & 로그인**

- 서비스 자체 회원가입/로그인 및 구글, 카카오 소셜 로그인 지원

2️⃣ **타임타일 데크**

- 시간순 아카이빙으로 아티스트의 모든 활동 확인
- 연도별 대표 타일, 태그 기반 분류, 데크/타일 간 빠른 이동

3️⃣ **타임타일 데크 편집**

- 타일 추가/수정, 시작·종료일 설정, 분산 컨텐츠 아카이빙

4️⃣ **마이타일 데크**

- 관심 있는 활동 감상, 최신순/인기순 정렬, 댓글 소통

5️⃣ **마이타일 작성**

- 글 작성 및 작성시 전체공개/비공개 설정 가능

6️⃣ **마이페이지**

- 프로필 조회, 내 활동 기록 확인, 타일/좋아요/스크랩 관리
- 등급 페이지로 활동 현황 및 다음달 예상 등급 확인

<br/>

<br/>

# 🛠 4. FE Tech Stack

|      🏷 구분      |                                                                                                    💻 기술                                                                                                    | 🔢 버전 |
| :--------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----: |
|    Framework     |                                                   <img src="https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js&logoColor=white" />                                                   | 15.3.4  |
|    UI Library    |                                                    <img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black" />                                                     | 19.0.0  |
|     Styling      |                                        <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white" />                                        | 6.1.19  |
| State Management |                                                                  <img src="https://img.shields.io/badge/Jotai-007af4?style=for-the-badge" />                                                                  | 2.12.5  |
|  Data Fetching   |                                             <img src="https://img.shields.io/badge/React%20Query-FF4154?style=for-the-badge&logo=react-query&logoColor=white" />                                              | 5.81.2  |
|     Routing      |                                            <img src="https://img.shields.io/badge/React%20Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />                                             |  7.6.2  |
|      Editor      |                                                              <img src="https://img.shields.io/badge/React%20Quill-09A3AF?style=for-the-badge" />                                                              |  2.0.0  |
|   Color Picker   |                                                            <img src="https://img.shields.io/badge/React%20Colorful-FF4C3B?style=for-the-badge" />                                                             |  5.6.1  |
|     Testing      |                                                                 <img src="https://img.shields.io/badge/Vitest-00BFFF?style=for-the-badge" />                                                                  |  3.2.4  |
|    Storybook     |                                                <img src="https://img.shields.io/badge/Storybook-FF4785?style=for-the-badge&logo=storybook&logoColor=white" />                                                 | 9.0.15  |
| Version Control  | <img src="https://img.shields.io/badge/Git-F05033?style=for-the-badge&logo=git&logoColor=white" /> / <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white" /> |    -    |
|     Language     |                                               <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" />                                                |   5.0   |
| Package Manager  |                                                     <img src="https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=white" />                                                      |    -    |

<br/>

|       🏷 구분        |                                                     💻 서비스 / 도구                                                      | 🔢 설명                                     |
| :-----------------: | :-----------------------------------------------------------------------------------------------------------------------: | :------------------------------------------ |
| **프론트엔드 배포** |         <img src="https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />          | Next.js 프로젝트 배포                       |
|  **스토리북 배포**  |      <img src="https://img.shields.io/badge/Chromatic-FF4785?style=for-the-badge&logo=storybook&logoColor=white" />       | GitHub Actions CI/CD 연동 후 Storybook 배포 |
|      **CI/CD**      | <img src="https://img.shields.io/badge/GitHub%20Actions-2088FF?style=for-the-badge&logo=githubactions&logoColor=white" /> | PR 이벤트 기반 자동 빌드 및 스토리북 배포   |

<br/>

<br/>

# 📂 5. Project Structure

```plaintext

├── 📂.github
├── 📂public
├── 📂src
│ ├── 📂apis
│ ├── 📂app
│ ├── 📂assets
│ ├── 📂components
│ ├── 📂constants
│ ├── 📂hooks
│ ├── 📂model
│ ├── 📂store
│ ├── 📂styles
│ ├── 📂utils
┗ 📜etc (setting files)

```

<br/>

<br/>

# 6. Development Workflow

## Branch Strategy

- develop

  - 🏠 기본 브랜치
  - ✅ 배포 가능한 상태 유지
  - 🚀 모든 배포는 이 브랜치에서 수행

- feat/기능명 (예: `feat/mypage`)

  - ✨ 새로운 기능 개발용 브랜치

- ui/컴포넌트명 (예: `ui/record-card`)

  - 🎨 UI 컴포넌트 개발용 브랜치

- fix/버그명 (예: `fix/login-error`)
  - 🐞 버그 수정용 브랜치

<br/>

<br/>

# 7. Commit Convention

## Structure

```

type: subject



body

```

<br/>

## type

```

feat : 새로운 기능에 대한 커밋

fix : 버그 수정에 대한 커밋

docs : 문서 수정에 대한 커밋

ui: 컴포넌트 생성 및 수정에 대한 커밋

style : 코드 스타일 혹은 포맷 등에 관한 커밋

refactor : 코드 리팩토링에 대한 커밋

test : 테스트 코드에 대한 커밋

add : 코드에 추가된 사항이 있을 때

chore : 그 외 자잘한 수정에 관한 커밋

```

<br/>

<br/>

<img width="100%" height="100%" alt="하단이미지" src="https://github.com/user-attachments/assets/921c78b3-5daf-4ec5-b354-981c5bf88437" />
