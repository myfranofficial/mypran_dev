/**
 * 마이프랜 어드민 DB 스키마.
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

-- 브랜드 업종 카테고리
CREATE TABLE IF NOT EXISTS brand_categories (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1
);

-- 브랜드 정보
CREATE TABLE IF NOT EXISTS brands (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  category_id INTEGER REFERENCES brand_categories(id),
  name TEXT NOT NULL,
  tagline TEXT,              -- 한 줄 소개
  description TEXT,          -- 상세 설명
  founding_cost TEXT,        -- 창업비용 (예: "5,000만원~")
  store_count INTEGER DEFAULT 0,
  logo_url TEXT,
  main_image_url TEXT,
  images TEXT,               -- JSON array: 매장 사진들
  features TEXT,             -- JSON array: 주요 특징들
  phone TEXT,
  kakao_url TEXT,
  is_featured INTEGER DEFAULT 0,
  is_active INTEGER DEFAULT 1,
  sort_order INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 상담 문의
CREATE TABLE IF NOT EXISTS consultations (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  phone TEXT,
  email TEXT,
  region TEXT,               -- 창업 희망 지역
  brand_id INTEGER,          -- 관심 브랜드 ID (nullable)
  brand_name TEXT,           -- 관심 브랜드명 (비정규화)
  message TEXT,
  is_read INTEGER DEFAULT 0,
  is_handled INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now','localtime'))
);

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_notices_category ON notices(category);
CREATE INDEX IF NOT EXISTS idx_faq_category ON faq_items(category);
CREATE INDEX IF NOT EXISTS idx_brands_category ON brands(category_id);
CREATE INDEX IF NOT EXISTS idx_consultations_read ON consultations(is_read);
`;
