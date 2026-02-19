import Link from 'next/link';
import { fetchNotices } from '@/lib/api';
import Pagination from '@/components/notice/Pagination';

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function NoticeListPage({ searchParams }: PageProps) {
  const { page: pageStr, search } = await searchParams;
  const page = parseInt(pageStr || '1');
  const { data: notices, pagination } = await fetchNotices(page, search);

  return (
    <main className="bg-bg-inverse min-h-screen">
      <div className="container-content py-16 md:py-24">
        {/* Title */}
        <h1 className="text-[length:var(--text-heading-1)] font-bold text-text-inverse">
          공지사항
        </h1>

        {/* Count + Search */}
        <div className="flex items-center justify-between mt-8 mb-6">
          <p className="text-[length:var(--text-label-1)] text-text-subtle">
            전체 {pagination.total}건
          </p>
          <form method="GET" className="relative">
            <input
              type="text"
              name="search"
              defaultValue={search || ''}
              placeholder="검색어를 입력하세요."
              className="w-[220px] md:w-[260px] h-[40px] pl-4 pr-10 text-[length:var(--text-label-1)] border border-[#E0E0E0] rounded-md outline-none focus:border-[#999]"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-text-subtle"
              aria-label="검색"
            >
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <circle cx="7.5" cy="7.5" r="6" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M12 12L16 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </form>
        </div>

        {/* Table */}
        <div className="w-full">
          {/* Header */}
          <div className="border-t-2 border-[#111] flex items-center h-12 text-[length:var(--text-label-1)] font-medium text-text-inverse">
            <div className="w-[80px] text-center shrink-0">번호</div>
            <div className="flex-1">제목</div>
            <div className="w-[120px] text-center shrink-0 hidden md:block">날짜</div>
            <div className="w-[80px] text-center shrink-0 hidden md:block">조회수</div>
            <div className="w-[60px] text-center shrink-0 hidden md:block">첨부파일</div>
          </div>
          <div className="border-t border-[#E0E0E0]" />

          {/* Rows */}
          {notices.length === 0 ? (
            <div className="py-20 text-center text-[length:var(--text-body-2)] text-text-subtle">
              {search ? '검색 결과가 없습니다.' : '등록된 공지사항이 없습니다.'}
            </div>
          ) : (
            notices.map((notice, index) => {
              const rowNumber = pagination.total - (page - 1) * pagination.limit - index;
              const date = new Date(notice.created_at).toISOString().split('T')[0];

              return (
                <Link
                  key={notice.id}
                  href={`/notice/list/${notice.id}`}
                  className="flex items-center h-[52px] border-b border-[#E0E0E0] text-[length:var(--text-body-2)] text-text-inverse hover:bg-[#F5F5F5] transition-colors"
                >
                  <div className="w-[80px] text-center shrink-0 text-[length:var(--text-label-1)]">
                    {String(rowNumber).padStart(2, '0')}
                  </div>
                  <div className="flex-1 truncate pr-4">{notice.title}</div>
                  <div className="w-[120px] text-center shrink-0 text-[length:var(--text-label-1)] text-text-subtle hidden md:block">
                    {date}
                  </div>
                  <div className="w-[80px] text-center shrink-0 text-[length:var(--text-label-1)] text-text-subtle hidden md:block">
                    {notice.view_count ?? 0}
                  </div>
                  <div className="w-[60px] text-center shrink-0 hidden md:block">
                    {notice.attachment_url && (
                      <svg width="18" height="18" viewBox="0 0 18 18" fill="none" className="mx-auto text-text-subtle">
                        <path d="M15.75 8.47L9.31 14.91C8.52 15.7 7.46 16.14 6.35 16.14C5.24 16.14 4.18 15.7 3.39 14.91C2.6 14.12 2.16 13.06 2.16 11.95C2.16 10.84 2.6 9.78 3.39 8.99L9.83 2.55C10.36 2.02 11.08 1.72 11.83 1.72C12.58 1.72 13.3 2.02 13.83 2.55C14.36 3.08 14.66 3.8 14.66 4.55C14.66 5.3 14.36 6.02 13.83 6.55L7.38 12.99C7.12 13.25 6.76 13.4 6.38 13.4C6 13.4 5.64 13.25 5.38 12.99C5.12 12.73 4.97 12.37 4.97 11.99C4.97 11.61 5.12 11.25 5.38 10.99L11.3 5.08" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Pagination */}
        <Pagination currentPage={page} totalPages={pagination.totalPages} />
      </div>
    </main>
  );
}
