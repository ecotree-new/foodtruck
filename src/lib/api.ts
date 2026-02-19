const API_BASE = process.env.NEXT_PUBLIC_ADMIN_API_URL || 'https://foodtruck-admin.vercel.app';

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface Notice {
  id: string;
  title: string;
  content: string;
  is_published: boolean;
  view_count: number;
  attachment_url: string | null;
  attachment_filename: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  cover_image_url: string | null;
  is_published: boolean;
  view_count: number;
  attachment_url: string | null;
  attachment_filename: string | null;
  created_at: string;
  updated_at: string;
}

export async function fetchNotices(page: number, search?: string): Promise<PaginatedResponse<Notice>> {
  const params = new URLSearchParams({ page: String(page), limit: '10' });
  if (search) params.set('search', search);
  const res = await fetch(`${API_BASE}/api/notices?${params}`, { cache: 'no-store' });
  return res.json();
}

export async function fetchNotice(id: string): Promise<Notice | null> {
  const res = await fetch(`${API_BASE}/api/notices/${id}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function fetchEvents(page: number, search?: string): Promise<PaginatedResponse<EventItem>> {
  const params = new URLSearchParams({ page: String(page), limit: '8' });
  if (search) params.set('search', search);
  const res = await fetch(`${API_BASE}/api/events?${params}`, { cache: 'no-store' });
  return res.json();
}

export async function fetchEvent(slug: string): Promise<EventItem | null> {
  const res = await fetch(`${API_BASE}/api/events/${slug}`, { cache: 'no-store' });
  if (!res.ok) return null;
  return res.json();
}

export async function incrementNoticeView(id: string) {
  try {
    await fetch(`${API_BASE}/api/notices/${id}/view`, { method: 'POST', cache: 'no-store' });
  } catch {
    // fire-and-forget
  }
}

export async function incrementEventView(slug: string) {
  try {
    await fetch(`${API_BASE}/api/events/${slug}/view`, { method: 'POST', cache: 'no-store' });
  } catch {
    // fire-and-forget
  }
}
