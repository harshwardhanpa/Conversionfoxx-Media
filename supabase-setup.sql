-- 1. Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role TEXT DEFAULT 'owner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create site_settings table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  site_name TEXT NOT NULL,
  site_description TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  google_analytics_id TEXT,
  favicon_url TEXT,
  logo_url TEXT,
  tagline TEXT,
  facebook_url TEXT,
  twitter_url TEXT,
  linkedin_url TEXT,
  instagram_url TEXT,
  copyright_text TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create branding_settings table
CREATE TABLE IF NOT EXISTS branding_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  primary_color TEXT DEFAULT '#F27D26',
  secondary_color TEXT DEFAULT '#0A0A0A',
  accent_color TEXT DEFAULT '#FFFFFF',
  background_color TEXT DEFAULT '#0A0A0A',
  text_color TEXT DEFAULT '#FFFFFF',
  font_family_heading TEXT DEFAULT 'Inter',
  font_family_body TEXT DEFAULT 'Inter',
  border_radius TEXT DEFAULT '1rem',
  glass_intensity NUMERIC DEFAULT 0.1,
  button_style TEXT DEFAULT 'rounded',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create footer_settings table
CREATE TABLE IF NOT EXISTS footer_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  brand_text TEXT,
  description TEXT,
  email TEXT,
  phone TEXT,
  location TEXT,
  copyright_text TEXT,
  column_1_title TEXT DEFAULT 'Services',
  column_2_title TEXT DEFAULT 'Company',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  excerpt TEXT,
  featured_image TEXT,
  status TEXT DEFAULT 'draft',
  author_id UUID REFERENCES auth.users,
  published_at TIMESTAMP WITH TIME ZONE,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. Create media_files table
CREATE TABLE IF NOT EXISTS media_files (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT,
  file_size INTEGER,
  mime_type TEXT,
  dimensions TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Create navigation_items table
CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  route TEXT NOT NULL,
  status TEXT DEFAULT 'active',
  type TEXT DEFAULT 'internal',
  order_index INTEGER DEFAULT 0,
  menu_type TEXT DEFAULT 'header',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Create pages table
CREATE TABLE IF NOT EXISTS pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content JSONB DEFAULT '{}'::jsonb,
  seo_settings JSONB DEFAULT '{}'::jsonb,
  is_published BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Create service_pages table
CREATE TABLE IF NOT EXISTS service_pages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content JSONB DEFAULT '{}'::jsonb,
  image_url TEXT,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Create inquiries table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  service TEXT,
  budget TEXT,
  message TEXT,
  status TEXT DEFAULT 'new',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 11. Create contact_settings table
CREATE TABLE IF NOT EXISTS contact_settings (
  id INTEGER PRIMARY KEY DEFAULT 1,
  recipient_email TEXT,
  success_message TEXT,
  error_message TEXT,
  consultation_cta TEXT,
  consultation_link TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
  CONSTRAINT single_row CHECK (id = 1)
);

-- 12. Create Storage Bucket for Media
-- Note: This requires the storage schema to exist (default in Supabase)
INSERT INTO storage.buckets (id, name, public)
VALUES ('media', 'media', true)
ON CONFLICT (id) DO NOTHING;

-- Set up Storage Policies
-- Allow public access to read files
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'media');

-- Allow authenticated users to upload files
DROP POLICY IF EXISTS "Authenticated Upload" ON storage.objects;
CREATE POLICY "Authenticated Upload" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media');

-- Allow authenticated users to update files (needed for some upload scenarios)
DROP POLICY IF EXISTS "Authenticated Update" ON storage.objects;
CREATE POLICY "Authenticated Update" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media');

-- Allow authenticated users to delete files
DROP POLICY IF EXISTS "Authenticated Delete" ON storage.objects;
CREATE POLICY "Authenticated Delete" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media');

-- Allow authenticated users to view buckets (needed for client library)
DROP POLICY IF EXISTS "Allow authenticated to view buckets" ON storage.buckets;
CREATE POLICY "Allow authenticated to view buckets" ON storage.buckets FOR SELECT TO authenticated USING (true);

-- Enable RLS on all tables
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE branding_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE footer_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE service_pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_settings ENABLE ROW LEVEL SECURITY;

-- Create basic RLS policies (Owner-only access for most things)
-- Note: These are simplified. You may want to refine them.

-- Admin Users: Only owner can read/write
CREATE POLICY "Owner can manage admin_users" ON admin_users FOR ALL TO authenticated USING (auth.uid() = id);

-- Site Settings: Public read, Authenticated write
CREATE POLICY "Public can read site_settings" ON site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage site_settings" ON site_settings FOR ALL TO authenticated USING (true);

-- Branding Settings: Public read, Authenticated write
CREATE POLICY "Public can read branding_settings" ON branding_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage branding_settings" ON branding_settings FOR ALL TO authenticated USING (true);

-- Footer Settings: Public read, Authenticated write
CREATE POLICY "Public can read footer_settings" ON footer_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage footer_settings" ON footer_settings FOR ALL TO authenticated USING (true);

-- Blog Posts: Public read (if published), Authenticated write
CREATE POLICY "Public can read published blog_posts" ON blog_posts FOR SELECT USING (status = 'published');
CREATE POLICY "Admins can manage blog_posts" ON blog_posts FOR ALL TO authenticated USING (true);

-- Media Files: Public read, Authenticated write
DROP POLICY IF EXISTS "Public can read media_files" ON media_files;
CREATE POLICY "Public can read media_files" ON media_files FOR SELECT USING (true);

DROP POLICY IF EXISTS "Admins can manage media_files" ON media_files;
CREATE POLICY "Admins can manage media_files" ON media_files FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- Navigation Items: Public read, Authenticated write
CREATE POLICY "Public can read navigation_items" ON navigation_items FOR SELECT USING (true);
CREATE POLICY "Admins can manage navigation_items" ON navigation_items FOR ALL TO authenticated USING (true);

-- Pages: Public read (if published), Authenticated write
CREATE POLICY "Public can read published pages" ON pages FOR SELECT USING (is_published = true);
CREATE POLICY "Admins can manage pages" ON pages FOR ALL TO authenticated USING (true);

-- Service Pages: Public read (if active), Authenticated write
CREATE POLICY "Public can read active service_pages" ON service_pages FOR SELECT USING (is_active = true);
CREATE POLICY "Admins can manage service_pages" ON service_pages FOR ALL TO authenticated USING (true);

-- Inquiries: Public create, Authenticated read/write
CREATE POLICY "Public can create inquiries" ON inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can manage inquiries" ON inquiries FOR ALL TO authenticated USING (true);

-- Contact Settings: Public read, Authenticated write
CREATE POLICY "Public can read contact_settings" ON contact_settings FOR SELECT USING (true);
CREATE POLICY "Admins can manage contact_settings" ON contact_settings FOR ALL TO authenticated USING (true);

-- Insert initial data
INSERT INTO site_settings (site_name, site_description) 
VALUES ('ConversionFoxx', 'High-performance marketing and conversion optimization.')
ON CONFLICT DO NOTHING;

INSERT INTO branding_settings (primary_color) 
VALUES ('#F27D26')
ON CONFLICT DO NOTHING;

INSERT INTO contact_settings (recipient_email, success_message)
VALUES ('info@conversionfoxx.com', 'Thank you for your inquiry!')
ON CONFLICT DO NOTHING;
