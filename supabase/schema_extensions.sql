-- Run once in SQL Editor if you already applied an older schema (safe to re-run).

ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS image TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS photo_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS github_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS linkedin_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS twitter_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS youtube_url TEXT;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS show_on_home BOOLEAN DEFAULT false;
ALTER TABLE team_members ADD COLUMN IF NOT EXISTS home_sort_order INT DEFAULT 0;

-- Blog SEO & URLs
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT NOW();
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS slug TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_title TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_description TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS seo_keywords TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS og_image TEXT;
ALTER TABLE blog_posts ADD COLUMN IF NOT EXISTS author_name TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS blog_posts_slug_unique ON blog_posts (slug) WHERE slug IS NOT NULL AND btrim(slug) <> '';

-- Floating WhatsApp CTA (digits for wa.me; editable in Admin → Settings)
ALTER TABLE site_settings ADD COLUMN IF NOT EXISTS whatsapp TEXT;
