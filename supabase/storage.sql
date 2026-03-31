-- Run in Supabase SQL Editor AFTER schema.sql (and while logged in as project owner).
-- Creates a public bucket for site images; only authenticated users can upload.

INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated insert media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated update media" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated delete media" ON storage.objects;

-- Anyone can read (public site + anon key can load image URLs)
CREATE POLICY "Public read media"
ON storage.objects FOR SELECT
USING (bucket_id = 'media');

-- Logged-in admin (Supabase Auth) can upload
CREATE POLICY "Authenticated insert media"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'media');

CREATE POLICY "Authenticated update media"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'media');

CREATE POLICY "Authenticated delete media"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'media');
