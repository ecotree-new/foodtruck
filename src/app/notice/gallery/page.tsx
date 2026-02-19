import Link from 'next/link';
import { fetchEvents } from '@/lib/api';
import Pagination from '@/components/notice/Pagination';

interface PageProps {
  searchParams: Promise<{ page?: string; search?: string }>;
}

export default async function GalleryListPage({ searchParams }: PageProps) {
  const { page: pageStr, search } = await searchParams;
  const page = parseInt(pageStr || '1');
  const { data: events, pagination } = await fetchEvents(page, search);

  return (
    <main className="bg-bg-inverse min-h-screen">
      <div className="container-content py-16 md:py-24">
        {/* Title */}
        <h1 className="text-[length:var(--text-heading-1)] font-bold text-text-inverse">
          행사 갤러리
        </h1>

        {/* Count + Search */}
        <div className="flex items-center justify-between mt-8 mb-8">
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

        {/* Card Grid */}
        {events.length === 0 ? (
          <div className="py-20 text-center text-[length:var(--text-body-2)] text-text-subtle">
            {search ? '검색 결과가 없습니다.' : '등록된 행사가 없습니다.'}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-5 gap-y-8">
            {events.map((event, index) => {
              const rowNumber = pagination.total - (page - 1) * pagination.limit - index;
              const date = new Date(event.created_at).toISOString().split('T')[0];

              return (
                <Link
                  key={event.id}
                  href={`/notice/gallery/${event.slug}`}
                  className="group"
                >
                  {/* Cover Image */}
                  <div className="relative aspect-[3/2] rounded-lg overflow-hidden bg-[#D9D9D9]">
                    {event.cover_image_url && (
                      <img
                        src={event.cover_image_url}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </div>

                  {/* Number */}
                  <p className="mt-3 text-[length:var(--text-label-1)] font-semibold text-brand-primary">
                    {String(rowNumber).padStart(2, '0')}
                  </p>

                  {/* Title */}
                  <p className="mt-1 text-[length:var(--text-body-2)] font-medium text-text-inverse line-clamp-2">
                    {event.title}
                  </p>

                  {/* Date + Views */}
                  <div className="flex items-center justify-between mt-2 text-[length:var(--text-label-1)] text-text-subtle">
                    <span>{date}</span>
                    <span className="flex items-center gap-1">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M1 8C1 8 3.5 3 8 3C12.5 3 15 8 15 8C15 8 12.5 13 8 13C3.5 13 1 8 1 8Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.2"/>
                      </svg>
                      {event.view_count ?? 0}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        <Pagination currentPage={page} totalPages={pagination.totalPages} />
      </div>
    </main>
  );
}
