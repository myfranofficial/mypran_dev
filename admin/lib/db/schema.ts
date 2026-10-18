/**
 * HiQ Billiard 어드민 DB 스키마.
 * 모든 DDL은 IF NOT EXISTS — 앱 부팅마다 안전하게 재실행.
 */
export const SCHEMA_SQL = /* sql */ `
-- 관리자 계정
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  name TEXT,
  role TEXT DEFAULT 'admin',          -- 'admin' | 'super_admin'
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 사이트 설정 (키-값)
CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT
);

-- 히어로 배너
CREATE TABLE IF NOT EXISTS banners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image_url TEXT NOT NULL,
  image_url_mobile TEXT,
  link_url TEXT,
  title TEXT,
  subtitle TEXT,
  start_at TEXT,
  end_at TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

-- 공지사항
CREATE TABLE IF NOT EXISTS notices (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT,
  title TEXT NOT NULL,
  content TEXT,
  date TEXT,
  is_pinned INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 사진 갤러리
CREATE TABLE IF NOT EXISTS gallery_images (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT,
  category TEXT,
  branch TEXT,
  image_url TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 영상 갤러리
CREATE TABLE IF NOT EXISTS videos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  thumbnail_url TEXT,
  youtube_id TEXT,
  date TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 이벤트
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  start_date TEXT,
  end_date TEXT,
  status TEXT DEFAULT '진행중',
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 매장 정보
CREATE TABLE IF NOT EXISTS stores (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  address TEXT,
  size TEXT,
  tables_count INTEGER,
  phone TEXT,
  hours TEXT,
  features TEXT,                     -- JSON array string
  image_url TEXT,
  is_new INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- FAQ
CREATE TABLE IF NOT EXISTS faq_items (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category TEXT,
  question TEXT NOT NULL,
  answer TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 자료실
CREATE TABLE IF NOT EXISTS downloads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT,
  filename TEXT,
  file_url TEXT,
  file_size TEXT,
  download_count INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 서브페이지 콘텐츠
CREATE TABLE IF NOT EXISTS page_content (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  page_slug TEXT NOT NULL,
  section TEXT NOT NULL,
  content_json TEXT,
  updated_at TEXT DEFAULT (datetime('now','localtime')),
  UNIQUE(page_slug, section)
);

-- 메인페이지 섹션
CREATE TABLE IF NOT EXISTS homepage_sections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  section_key TEXT UNIQUE NOT NULL,
  content_json TEXT,
  updated_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 매장 사진
CREATE TABLE IF NOT EXISTS store_photos (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  store_id INTEGER NOT NULL,
  image_url TEXT NOT NULL,
  title TEXT,
  is_representative INTEGER DEFAULT 0,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime')),
  FOREIGN KEY (store_id) REFERENCES stores(id) ON DELETE CASCADE
);

-- 상담 문의
CREATE TABLE IF NOT EXISTS consultations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  phone TEXT,
  email TEXT,
  location TEXT,
  message TEXT,
  is_read INTEGER DEFAULT 0,
  is_handled INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 팝업
CREATE TABLE IF NOT EXISTS popups (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  link_url TEXT,
  link_text TEXT DEFAULT '자세히 보기',
  position TEXT DEFAULT 'center',
  start_at TEXT,
  end_at TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 리뷰/후기
CREATE TABLE IF NOT EXISTS reviews (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  author TEXT NOT NULL,
  rating INTEGER NOT NULL DEFAULT 5,
  content TEXT,
  source TEXT DEFAULT 'admin',
  is_active INTEGER DEFAULT 1,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_notices_category ON notices(category);
CREATE INDEX IF NOT EXISTS idx_gallery_category ON gallery_images(category);
CREATE INDEX IF NOT EXISTS idx_videos_category ON videos(category);
CREATE INDEX IF NOT EXISTS idx_faq_category ON faq_items(category);
CREATE INDEX IF NOT EXISTS idx_consultations_read ON consultations(is_read);
CREATE INDEX IF NOT EXISTS idx_store_photos_store ON store_photos(store_id);
CREATE INDEX IF NOT EXISTS idx_page_content_slug ON page_content(page_slug);
`;
