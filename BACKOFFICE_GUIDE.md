# Dior Backoffice Guide

## 1. 실행 전제

- 프론트 앱은 `Web_dior-backoffice`입니다.
- 개발 실행은 `npm start`이며 기본 포트는 `http://localhost:3000`입니다.
- API base URL은 `.env.local`의 `REACT_APP_BASE_URL`을 사용합니다.
- 현재 값은 `https://dior-crm.chowis.cloud/v1/api`입니다.

## 2. 로그인 방식

### 2.1 내부용 로그인

- `REACT_APP_IS_INTERNAL=true`일 때 내부용 로그인 화면이 뜹니다.
- 이메일/비밀번호로 `POST /partnerdb/consultants/dior_login`을 호출합니다.
- 성공 시 `token`, `user_type`, `user_id`, `countries` 등을 저장합니다.

### 2.2 Okta/SAML 로그인

- `REACT_APP_IS_INTERNAL`가 `true`가 아니면 SAML 로그인 화면이 뜹니다.
- 로그인 버튼은 `https://dior-crm.choicedx.kr:8097/v1/api/consultants/login/saml`로 리다이렉트합니다.
- 성공 시 `token`, `id`, `name`, `role`을 URL 파라미터로 받아 `localStorage`에 저장합니다.

## 3. 권한 구조

- `Brand Manager`
- `Super Admin`
- `Admin`

권한에 따라 보이는 메뉴가 달라집니다.

### 3.1 메뉴 접근

- `Brand Details`: `Super Admin`, `Admin`
- `Beauty Consultants`: `Super Admin`, `Admin`, `Brand Manager`
- `Registered Devices`: `Super Admin`, `Admin`, `Brand Manager`
- `Product Catalog`: `Super Admin`, `Admin`, `Brand Manager`
- `Product Recommendation`: `Super Admin`
- `Statistics & Reports`: `Super Admin`, `Admin`, `Brand Manager`
- `Market Management`: `Super Admin`
- `User Management`: `Super Admin`
- `Product Attributes`: `Super Admin`
- `Device Logs`: `Super Admin` + `REACT_APP_IS_INTERNAL=true`일 때만 표시

권한 없는 경로로 들어가면 `Super Admin/Admin`은 `/brand-details`, 그 외는 `/beauty-consultants`로 돌려보냅니다.

## 4. 공통 API 규칙

- 대부분의 보호 API는 `Authorization: Bearer <token>`이 필요합니다.
- 일부 업로드/다운로드 API는 `X-CHOWIS-LOCALE` 헤더를 받습니다.
- 토큰이 만료되면 프론트가 자동으로 저장소를 비우고 `/login`으로 이동합니다.

## 5. 화면별 사용법과 API

### 5.1 Brand Details

기능:
- POS 목록 조회
- 국가 필터
- 추가/수정/삭제
- Excel 업로드
- POS/Device export

API:
- `GET /dior/company_branches`
- `POST /dior/company_branches`
- `PUT /dior/company_branches/:id`
- `DELETE /dior/company_branches/:id`
- `DELETE /dior/company_branches/delete_multiple/:ids`
- `POST /dior/company_branches/presign_upload_import_file`
- `POST /dior/company_branches/import`
- `GET /dior/company_branches/export`

메모:
- `Brand Manager`는 추가/삭제 버튼이 숨겨집니다.

### 5.2 Beauty Consultants

기능:
- BC 목록 조회
- 검색, 국가 필터, POS 필터
- 추가/삭제
- Excel 업로드
- export
- 상세 진입 후 고객/히스토리 조회

API:
- `GET /dior/company_consultants`
- `POST /dior/company_consultants`
- `DELETE /dior/company_consultants/:id`
- `DELETE /dior/company_consultants/delete_multiple/:ids`
- `POST /dior/company_consultants/import`
- `GET /dior/company_consultants/export`
- `GET /partnerdb/consultants/:id`
- `GET /partnerdb/consultants/:id/customers`
- `GET /partnerdb/customers/:id`
- `GET /partnerdb/customers/:id/analysis_histories`
- `GET /partnerdb/customers/:id/analysis_histories/:batch_id`
- `GET /partnerdb/customers/:id/analysis_histories/:batch_id/hydration_sebum`

메모:
- `Admin`과 `Super Admin`은 국가 필터가 보입니다.
- `Brand Manager`는 일부 추가/삭제 동작이 제한됩니다.

### 5.3 Registered Devices

기능:
- 디바이스 목록 조회
- 검색
- export

API:
- `GET /dior/devices`
- `POST /dior/devices/connect-reset`

### 5.4 Product Catalog

기능:
- 제품 목록 조회
- 카테고리/컬렉션 필터
- 추가/수정/삭제
- 업로드
- export

API:
- `GET /dior/product_recommendations`
- `POST /dior/product_recommendations`
- `PUT /dior/product_recommendations/:id`
- `GET /dior/product_recommendations/get_collection`
- `GET /dior/product_recommendations/get_category`
- `POST /dior/product_recommendations/presign_upload`
- `POST /dior/product_recommendations/import`
- `POST /dior/product_recommendations/import_translations`
- `POST /dior/product_recommendations/import_countries`
- `POST /dior/product_recommendations/import_pictures`
- `GET /dior/product_recommendations/export`

### 5.5 Product Recommendation

기능:
- 추천 그룹 목록 조회
- 새 그룹 생성
- 삭제
- 그룹별 제품 펼쳐보기
- export

API:
- `GET /dior/product_recommendation_groups`
- `GET /dior/product_recommendation_groups/list`
- `GET /dior/product_recommendation_groups/get_products/:id`
- `POST /dior/product_recommendation_groups`
- `PUT /dior/product_recommendation_groups/:id`
- `DELETE /dior/product_recommendation_groups/:id`
- `DELETE /dior/product_recommendation_groups/delete_multiple/:ids`

### 5.6 Statistics & Reports

기능:
- 통계 요약
- 상세 통계
- 국가별 상세

API:
- `GET /dior/statistics/overall`
- `GET /dior/statistics/overall_details`
- `GET /dior/statistics/overall_by_date`
- `GET /dior/statistics/overall_per_country`
- `GET /dior/statistics/most_popular_products`
- `GET /dior/statistics/stat_details?stat_type=...`
- `GET /dior/statistics/infograph_stat_details`
- `GET /dior/statistics/get_stat_details_country_wise`

### 5.7 Market Management

기능:
- 국가 목록 관리
- 추가/수정/삭제
- 업로드
- export

API:
- `GET /dior/countries`
- `POST /dior/countries`
- `PUT /dior/countries/:id`
- `DELETE /dior/countries/:id`
- `DELETE /dior/countries/delete_multiple/:ids`
- `POST /dior/countries/import`
- `GET /dior/countries/export`

### 5.8 User Management

기능:
- 관리자 계정 관리
- 추가/수정/삭제
- 업로드
- export

API:
- `GET /dior/admins`
- `POST /dior/admins`
- `PUT /dior/admins/:id`
- `DELETE /dior/admins/:id`
- `DELETE /dior/admins/delete_multiple/:ids`
- `POST /dior/admins/import`
- `GET /dior/admins/export`

메모:
- 프론트는 생성 시 현재 로그인한 사용자의 role에 따라 `consultant_position_id`를 자동으로 넣습니다.

### 5.9 Product Attributes

기능:
- 속성 목록 조회
- 추가/수정/삭제
- 업로드
- translation import
- export

API:
- `GET /dior/product_attributes`
- `POST /dior/product_attributes`
- `PUT /dior/product_attributes/:id`
- `DELETE /dior/product_attributes/:id`
- `DELETE /dior/product_attributes/delete_multiple/:ids`
- `POST /dior/product_attributes/import`
- `POST /dior/product_attributes/import_translations`
- `GET /dior/product_attributes/export`

### 5.10 Device Logs

기능:
- 로그 검색
- export

API:
- `GET /product-logs`
- `GET /product-logs/export`

## 6. 업로드 흐름

업로드는 대부분 2단계입니다.

1. `presign` API로 업로드용 URL과 저장 메타데이터를 받습니다.
2. 받은 presigned URL로 파일을 직접 업로드합니다.
3. 최종적으로 `import` API에 `file_url`을 넘겨 서버에 반영합니다.

예:
- POS 업로드
  - `POST /dior/company_branches/presign_upload_import_file`
  - S3 업로드
  - `POST /dior/company_branches/import`
- Product image 업로드
  - `POST /dior/product_recommendations/presign_upload`
  - S3 업로드
  - `POST /dior/product_recommendations/import_pictures`

## 7. 운영 중 자주 보는 동작

- 로그아웃하면 `localStorage`, `sessionStorage`, React Query 캐시가 비워집니다.
- 경로가 없으면 `404` 페이지로 갑니다.
- `files/:hash` 같은 파일 다운로드는 controller 기준으로 별도 파일 응답을 내려줍니다.

## 8. 빠른 확인 순서

1. `.env.local`의 `REACT_APP_BASE_URL` 확인
2. `REACT_APP_IS_INTERNAL` 값으로 로그인 화면 확인
3. 권한에 맞는 메뉴가 노출되는지 확인
4. 목록 조회가 안 되면 토큰 만료 여부 확인
5. 업로드가 실패하면 `presign` 단계와 최종 `import` 단계 중 어느 쪽이 실패했는지 확인

## 9. 요청/응답 예시

아래 예시는 대표 형태입니다. 실제 응답은 서비스 로직에 따라 필드가 더 추가될 수 있습니다.

### 9.1 로그인

Request

```http
POST /v1/api/partnerdb/consultants/dior_login
Content-Type: application/json
X-CHOWIS-LOCALE: ko

{
  "app_id": "88",
  "email": "admin@dior.com",
  "password": "password123"
}
```

Response

```json
{
  "data": {
    "id": 101,
    "name": "Jane",
    "surname": "Kim",
    "email": "admin@dior.com",
    "token": "eyJhbGciOi...",
    "countries": ["KR", "JP"],
    "consultant_country": "KR, JP",
    "consultant_position": {
      "name": "Super Admin"
    }
  }
}
```

### 9.2 POS 목록 조회

Request

```http
GET /v1/api/dior/company_branches?search=seoul&country=KR&page=1&per=20
Authorization: Bearer <token>
X-CHOWIS-LOCALE: ko
```

Response

```json
{
  "data": [
    {
      "id": 11,
      "code": "POS001",
      "name": "Seoul Main Store",
      "email": "pos001@example.com",
      "country": "KR",
      "total_devices": 3,
      "password": "****"
    }
  ],
  "total_size": 1
}
```

### 9.3 BC 추가

Request

```http
POST /v1/api/dior/company_consultants
Authorization: Bearer <token>
X-CHOWIS-LOCALE: ko
Content-Type: application/json

{
  "name": "Alice",
  "code": "BC001",
  "consultant_branch_id": 11,
  "country": "KR"
}
```

Response

```json
{
  "id": 201,
  "name": "Alice",
  "code": "BC001",
  "country": "KR"
}
```

### 9.4 국가 추가

Request

```http
POST /v1/api/dior/countries
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Korea",
  "code": "KR",
  "url_and_port": "https://example.com",
  "default_recommendation": "Recommendation Asia"
}
```

Response

```json
{
  "id": 301,
  "name": "Korea",
  "code": "KR"
}
```

### 9.5 관리자 추가

Request

```http
POST /v1/api/dior/admins
Authorization: Bearer <token>
Content-Type: application/json

{
  "email": "new.user@dior.com",
  "password": "password123",
  "name": "New",
  "surname": "User",
  "countries": ["KR", "JP"],
  "is_admin": true
}
```

Response

```json
{
  "id": 401,
  "email": "new.user@dior.com",
  "name": "New",
  "surname": "User",
  "consultant_position_id": 5,
  "countries": ["KR", "JP"]
}
```

### 9.6 추천 그룹 생성

Request

```http
POST /v1/api/dior/product_recommendation_groups
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Daily Routine",
  "locations": ["KR"],
  "products_selected": [10, 11, 12],
  "principal_product": 10
}
```

Response

```json
{
  "id": 501,
  "name": "Daily Routine"
}
```

### 9.7 통계 조회

Request

```http
GET /v1/api/dior/statistics/stat_details?stat_type=devices&start_date=2026-01-01&end_date=2026-01-31
Authorization: Bearer <token>
```

Response

```json
{
  "data": {
    "KR": 120,
    "JP": 44,
    "unknown_country": 8
  },
  "total_count": 172
}
```

### 9.8 디바이스 로그 export

Request

```http
GET /v1/api/product-logs/export
Authorization: Bearer <token>
```

Response

- CSV 파일이 바로 다운로드됩니다.
