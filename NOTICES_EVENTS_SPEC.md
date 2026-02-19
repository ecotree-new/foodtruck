# 공지사항 & 행사 갤러리 — 구현 참고 스펙

foodtruck-admin에서 관리하는 공지사항/행사 갤러리 데이터를 foodtruck 랜딩 사이트에서 표시하기 위한 참고 문서.

---

## 1. 데이터 소스

foodtruck과 foodtruck-admin은 같은 Supabase 프로젝트를 공유한다.
→ foodtruck에서 **Supabase를 직접 조회**하거나, foodtruck-admin의 **공개 API를 호출**하는 두 가지 방식이 가능.

### Supabase 직접 조회 (권장)
- URL: `https://hpdujwnwcxdejyiljalj.supabase.co`
- foodtruck의 `.env.local`에 `NEXT_PUBLIC_SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` (또는 `SUPABASE_ANON_KEY`) 설정
- Server Component에서 직접 쿼리

### Admin API 호출 (대안)
- foodtruck-admin 배포 URL을 환경변수로 설정 후 fetch

---

## 2. DB 스키마

### notices 테이블
| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | uuid (PK) | |
| `title` | text | 제목 |
| `content` | text | 본문 (Markdown) |
| `is_published` | boolean | 공개 여부 — **true인 것만 표시** |
| `attachment_url` | text (nullable) | 첨부파일 R2 URL |
| `attachment_filename` | text (nullable) | 첨부파일 원본 파일명 |
| `created_at` | timestamptz | 작성일 |
| `updated_at` | timestamptz | 수정일 |

### events 테이블
| 컬럼 | 타입 | 설명 |
|------|------|------|
| `id` | uuid (PK) | |
| `title` | text | 제목 |
| `slug` | text (unique) | URL 슬러그 — 상세 페이지 경로에 사용 |
| `content` | text | 본문 (Markdown) |
| `cover_image_url` | text (nullable) | 커버 이미지 R2 URL — 갤러리 썸네일 |
| `is_published` | boolean | 공개 여부 — **true인 것만 표시** |
| `attachment_url` | text (nullable) | 첨부파일 R2 URL |
| `attachment_filename` | text (nullable) | 첨부파일 원본 파일명 |
| `created_at` | timestamptz | 작성일 |
| `updated_at` | timestamptz | 수정일 |

---

## 3. 공개 API (foodtruck-admin)

### 공지사항 목록
```
GET /api/notices?page=1&limit=20&search=검색어
```
응답:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "...",
      "content": "markdown...",
      "is_published": true,
      "attachment_url": "https://pub-...r2.dev/attachments/xxx.pdf",
      "attachment_filename": "안내문.pdf",
      "created_at": "2026-02-19T...",
      "updated_at": "2026-02-19T..."
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 5,
    "totalPages": 1
  }
}
```
- `is_published: true`인 항목만 반환
- `created_at` 내림차순 정렬
- `search`: 제목 부분 일치 검색 (ilike, 선택)

### 공지사항 상세
```
GET /api/notices/:id
```
- `is_published: true`인 항목만 반환
- 없으면 404

### 행사 갤러리 목록
```
GET /api/events?page=1&limit=20&search=검색어
```
응답:
```json
{
  "data": [
    {
      "id": "uuid",
      "title": "...",
      "slug": "행사-제목-m1abc",
      "cover_image_url": "https://pub-...r2.dev/images/xxx.webp",
      "is_published": true,
      "created_at": "2026-02-19T...",
      "updated_at": "2026-02-19T..."
    }
  ],
  "pagination": { ... }
}
```
- 목록 API는 `content` 미포함 (썸네일+제목만)
- `is_published: true`인 항목만 반환
- `search`: 제목 부분 일치 검색 (ilike, 선택)

### 행사 상세
```
GET /api/events/:slug
```
- slug 기반 조회 (id가 아님)
- 전체 필드 반환 (`content`, `attachment_url`, `attachment_filename` 포함)

---

## 4. 라우트 구조 (foodtruck)

NAV_ITEMS에 이미 정의된 경로:
```
/notice/list      → 공지사항 목록
/notice/gallery   → 행사 갤러리 목록
```

필요한 추가 라우트:
```
/notice/list/[id]        → 공지사항 상세
/notice/gallery/[slug]   → 행사 갤러리 상세
```

---

## 5. 본문 렌더링

- content는 **Markdown** 형식 (MDX 아님)
- 본문 내 이미지는 R2 URL로 포함됨: `![alt](https://pub-...r2.dev/images/xxx.webp)`
- foodtruck-admin에서 사용하는 렌더링 라이브러리:
  - `react-markdown`
  - `remark-gfm` (GFM 테이블/체크리스트 등)
  - `rehype-raw` (HTML 태그 허용)

---

## 6. 첨부파일

- `attachment_url`이 있으면 상세 페이지 하단에 다운로드 링크 표시
- `attachment_filename`을 링크 텍스트로 사용
- 새 탭으로 열기: `target="_blank" rel="noopener noreferrer"`

---

## 7. R2 퍼블릭 URL

```
https://pub-8ba77ae4d6be44b2b12c9762cc3ef01a.r2.dev
```
- 이미지: `images/<uuid>.<ext>`
- 첨부파일: `attachments/<uuid>.<ext>`
