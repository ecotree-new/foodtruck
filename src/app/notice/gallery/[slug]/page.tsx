import Link from 'next/link';
import { notFound } from 'next/navigation';
import { fetchEvent, incrementEventView } from '@/lib/api';
import MarkdownBody from '@/components/notice/MarkdownBody';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function GalleryDetailPage({ params }: PageProps) {
  const { slug } = await params;

  await incrementEventView(slug);
  const event = await fetchEvent(slug);

  if (!event) notFound();

  const date = new Date(event.created_at).toISOString().split('T')[0];

  return (
    <main className="bg-bg-inverse min-h-screen">
      <div className="container-content py-16 md:py-24">
        {/* Page Title */}
        <h1 className="text-[length:var(--text-title-2)] font-bold text-text-inverse">
          행사 갤러리
        </h1>

        {/* Post Title */}
        <h2 className="text-[length:var(--text-heading-2)] font-bold text-text-inverse mt-10">
          {event.title}
        </h2>

        {/* Divider */}
        <hr className="border-[#111] mt-6" />

        {/* Meta */}
        <div className="flex items-center gap-8 py-4 text-[length:var(--text-label-1)] text-text-subtle">
          <span>날짜&nbsp;&nbsp;&nbsp;{date}</span>
          <span>조회수&nbsp;&nbsp;&nbsp;{event.view_count ?? 0}</span>
        </div>

        {/* Divider */}
        <hr className="border-[#E0E0E0]" />

        {/* Content */}
        <div className="py-10 min-h-[300px]">
          <MarkdownBody content={event.content} />
        </div>

        {/* Divider */}
        <hr className="border-[#E0E0E0]" />

        {/* Attachment */}
        {event.attachment_url && (
          <>
            <div className="flex items-center gap-3 py-4">
              <span className="text-[length:var(--text-label-1)] font-medium text-text-inverse shrink-0">
                첨부파일
              </span>
              <a
                href={event.attachment_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-[length:var(--text-label-1)] text-text-subtle hover:text-text-inverse transition-colors"
              >
                <svg width="16" height="16" viewBox="0 0 18 18" fill="none" className="shrink-0">
                  <path d="M15.75 8.47L9.31 14.91C8.52 15.7 7.46 16.14 6.35 16.14C5.24 16.14 4.18 15.7 3.39 14.91C2.6 14.12 2.16 13.06 2.16 11.95C2.16 10.84 2.6 9.78 3.39 8.99L9.83 2.55C10.36 2.02 11.08 1.72 11.83 1.72C12.58 1.72 13.3 2.02 13.83 2.55C14.36 3.08 14.66 3.8 14.66 4.55C14.66 5.3 14.36 6.02 13.83 6.55L7.38 12.99C7.12 13.25 6.76 13.4 6.38 13.4C6 13.4 5.64 13.25 5.38 12.99C5.12 12.73 4.97 12.37 4.97 11.99C4.97 11.61 5.12 11.25 5.38 10.99L11.3 5.08" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                {event.attachment_filename || '첨부파일'}
              </a>
            </div>
            <hr className="border-[#E0E0E0]" />
          </>
        )}

        {/* Back to List */}
        <div className="flex justify-center mt-12">
          <Link
            href="/notice/gallery"
            className="flex items-center justify-center w-[180px] h-[48px] bg-[#242527] text-white text-[length:var(--text-body-2)] font-medium rounded-lg hover:bg-[#333] transition-colors"
          >
            목록보기
          </Link>
        </div>
      </div>
    </main>
  );
}
