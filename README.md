# Dior Backoffice Web

백오피스 운영을 위한 React 기반 관리자 웹 애플리케이션입니다.  
CRM, 제품 카탈로그, 추천 관리, 통계, 사용자/디바이스 관리 등 운영 기능을 하나의 콘솔로 제공합니다.

## Overview

- 관리자 전용 화면 제공
- 라우트별 권한 제어
- 목록/상세/등록/수정/삭제 흐름을 기능 단위로 분리
- React Query로 서버 상태 관리
- Zustand로 전역 UI 상태 관리
- MUI 기반 테마 커스터마이징

## Tech Stack

- React 18
- TypeScript
- React Router v6
- @tanstack/react-query
- Zustand
- Material UI
- Styled Components
- Axios
- react-hook-form
- yup

## Architecture

이 프로젝트는 기능별 페이지를 기준으로 구조를 나눈 vertical slice 스타일입니다.

- `src/pages`: 도메인별 화면
- `src/components`: 공통 UI 컴포넌트
- `src/api`: API 요청 모듈
- `src/hooks`: 공통 훅
- `src/store`: 전역 상태
- `src/routers`: 라우팅과 보호 라우트
- `src/config`: 테마, react-query 설정
- `src/constants`: 메뉴, 권한, 페이지 정의

### Main Flow

1. `src/index.tsx`에서 전역 Provider 초기화
2. `src/routers/router.tsx`에서 페이지 라우팅 구성
3. `src/routers/private/private.tsx`에서 로그인 및 권한 체크
4. 각 페이지는 `useXxx` 훅 + `components` 조합으로 구성
5. API 응답은 React Query로 캐싱 및 에러 처리

## Key Features

- 로그인/세션 기반 보호 라우팅
- 권한별 메뉴 노출
- 제품 및 속성 관리
- 브랜드/컨설턴트/사용자 관리
- 디바이스 로그 및 통계 조회
- 엑셀 다운로드/업로드 지원
- 이미지 및 파일 업로드 처리
- 토큰 만료 시 자동 로그아웃 처리

## Folder Structure

```text
src
├─ api
├─ assets
├─ components
├─ config
├─ constants
├─ hooks
├─ pages
├─ routers
├─ store
├─ types
└─ utils
```

## Run Locally

```bash
npm install
npm run dev
```

기본 개발 서버는 `http://localhost:3000`에서 실행됩니다.

## Environment Variables

`.env.local` 예시:

```bash
REACT_APP_BASE_URL=https://your-api-base-url
REACT_APP_ENV=dev
```

## Build

```bash
npm run build
```

## Portfolio Notes

- 운영 화면을 기능 단위로 쪼개 유지보수성을 높였습니다.
- 서버 상태와 UI 상태를 분리해 화면 복잡도를 낮췄습니다.
- 권한 기반 라우팅으로 관리자 페이지 구조를 명확히 했습니다.
