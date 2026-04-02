-- Run this in Supabase SQL Editor to create tables

-- Site settings (contact info, emails, etc.)
CREATE TABLE IF NOT EXISTS site_settings (
  id TEXT PRIMARY KEY DEFAULT 'default',
  email TEXT,
  phone TEXT,
  address TEXT,
  hours TEXT,
  social_links JSONB DEFAULT '{}',
  whatsapp TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- If site_settings already existed without whatsapp (older DBs), add column
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS whatsapp TEXT;

INSERT INTO site_settings (id, email, phone, address, hours) VALUES 
('default', 'info@logixcontact.co.uk', '+123-456-7890', '123 Street, City, Country', 'Mon - Fri: 9AM - 6PM')
ON CONFLICT (id) DO NOTHING;

-- Portfolio projects
CREATE TABLE IF NOT EXISTS portfolio (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  type TEXT,
  category TEXT,
  tech TEXT,
  description TEXT,
  gradient TEXT,
  image TEXT,
  details JSONB DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog posts
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  excerpt TEXT,
  category TEXT,
  content TEXT,
  image TEXT,
  date DATE DEFAULT CURRENT_DATE,
  published BOOLEAN DEFAULT true,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  slug TEXT,
  seo_title TEXT,
  seo_description TEXT,
  seo_keywords TEXT,
  og_image TEXT,
  author_name TEXT
);

-- If blog_posts already existed from an older schema, CREATE TABLE above is skipped — add missing columns
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_keywords TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_name TEXT;

-- Team members
CREATE TABLE IF NOT EXISTS team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  avatar TEXT,
  photo_url TEXT,
  bio TEXT,
  github_url TEXT,
  linkedin_url TEXT,
  twitter_url TEXT,
  youtube_url TEXT,
  show_on_home BOOLEAN DEFAULT false,
  home_sort_order INT DEFAULT 0,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Testimonials
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  role TEXT,
  text TEXT NOT NULL,
  avatar TEXT,
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services (menu + page content stored as JSON for flexibility)
CREATE TABLE IF NOT EXISTS services (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  path TEXT,
  items JSONB DEFAULT '[]',
  page_content JSONB DEFAULT '{}',
  sort_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact form submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT,
  email TEXT,
  phone TEXT,
  subject TEXT,
  message TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Newsletter subscribers (email capture from homepage)
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Keep emails unique (case-insensitive)
CREATE UNIQUE INDEX IF NOT EXISTS newsletter_subscribers_email_unique
  ON newsletter_subscribers (lower(email));

-- Enable RLS (Row Level Security) - allow public read for portfolio, blog, team, testimonials, services, site_settings
-- Admin write requires auth
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE portfolio ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Idempotent policies (safe to re-run after a partial or full previous run)
DROP POLICY IF EXISTS "Public read site_settings" ON site_settings;
DROP POLICY IF EXISTS "Admin all site_settings" ON site_settings;
DROP POLICY IF EXISTS "Public read portfolio" ON portfolio;
DROP POLICY IF EXISTS "Admin all portfolio" ON portfolio;
DROP POLICY IF EXISTS "Public read blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Admin all blog_posts" ON blog_posts;
DROP POLICY IF EXISTS "Public read team_members" ON team_members;
DROP POLICY IF EXISTS "Admin all team_members" ON team_members;
DROP POLICY IF EXISTS "Public read testimonials" ON testimonials;
DROP POLICY IF EXISTS "Admin all testimonials" ON testimonials;
DROP POLICY IF EXISTS "Public read services" ON services;
DROP POLICY IF EXISTS "Admin all services" ON services;
DROP POLICY IF EXISTS "Public insert contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Admin all contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "Public insert newsletter_subscribers" ON newsletter_subscribers;
DROP POLICY IF EXISTS "Admin all newsletter_subscribers" ON newsletter_subscribers;

-- Public can read everything
CREATE POLICY "Public read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Public read portfolio" ON portfolio FOR SELECT USING (true);
CREATE POLICY "Public read blog_posts" ON blog_posts FOR SELECT USING (true);
CREATE POLICY "Public read team_members" ON team_members FOR SELECT USING (true);
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (true);
CREATE POLICY "Public read services" ON services FOR SELECT USING (true);

-- Public can insert contact submissions
CREATE POLICY "Public insert contact_submissions" ON contact_submissions FOR INSERT WITH CHECK (true);

-- Public can insert newsletter signups
CREATE POLICY "Public insert newsletter_subscribers" ON newsletter_subscribers FOR INSERT WITH CHECK (true);

-- Authenticated users (admins) can do everything
CREATE POLICY "Admin all site_settings" ON site_settings FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all portfolio" ON portfolio FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all blog_posts" ON blog_posts FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all team_members" ON team_members FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all testimonials" ON testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all services" ON services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all contact_submissions" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admin all newsletter_subscribers" ON newsletter_subscribers FOR ALL USING (auth.role() = 'authenticated');

-- Unique URL slugs for blog posts (optional column; multiple NULLs allowed)
CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_unique ON blog_posts (slug) WHERE slug IS NOT NULL AND btrim(slug) <> '';
