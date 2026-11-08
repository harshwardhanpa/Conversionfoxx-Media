-- Supabase Schema for ConversionFoxx CMS

-- 1. Admin Users Table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'owner',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policies for admin_users
CREATE POLICY "Admins can view their own profile" ON admin_users
  FOR SELECT USING (auth.uid() = id);

-- 2. Site Settings Table
CREATE TABLE IF NOT EXISTS site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  site_name TEXT DEFAULT 'ConversionFoxx',
  site_description TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  address TEXT,
  google_analytics_id TEXT,
  favicon_url TEXT,
  logo_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Only admins can read/write site settings
CREATE POLICY "Admins can manage site settings" ON site_settings
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Public can read site settings
CREATE POLICY "Public can view site settings" ON site_settings
  FOR SELECT TO public USING (true);

-- 3. Branding Settings Table
CREATE TABLE IF NOT EXISTS branding_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  primary_color TEXT DEFAULT '#F27D26',
  secondary_color TEXT DEFAULT '#0A0A0A',
  accent_color TEXT DEFAULT '#FFFFFF',
  font_family_heading TEXT DEFAULT 'Inter',
  font_family_body TEXT DEFAULT 'Inter',
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE branding_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage branding" ON branding_settings
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can view branding" ON branding_settings
  FOR SELECT TO public USING (true);

-- 4. Pages Table
CREATE TABLE IF NOT EXISTS pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content JSONB DEFAULT '{}'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  is_published BOOLEAN DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage pages" ON pages
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can view published pages" ON pages
  FOR SELECT TO public USING (is_published = true);

-- 5. Service Pages Table
CREATE TABLE IF NOT EXISTS service_pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  content JSONB DEFAULT '{}'::jsonb,
  seo_title TEXT,
  seo_description TEXT,
  is_published BOOLEAN DEFAULT false,
  order_index INTEGER DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE service_pages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage service pages" ON service_pages
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can view published service pages" ON service_pages
  FOR SELECT TO public USING (is_published = true);

-- 6. Blog Posts Table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  excerpt TEXT,
  content TEXT,
  featured_image TEXT,
  author_id UUID REFERENCES admin_users(id),
  status TEXT DEFAULT 'draft', -- draft, published, scheduled
  published_at TIMESTAMP WITH TIME ZONE,
  seo_title TEXT,
  seo_description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage blog posts" ON blog_posts
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can view published blog posts" ON blog_posts
  FOR SELECT TO public USING (status = 'published');

-- 7. Media Files Table
CREATE TABLE IF NOT EXISTS media_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  filename TEXT NOT NULL,
  url TEXT NOT NULL,
  size INTEGER,
  type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE media_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage media" ON media_files
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can view media" ON media_files
  FOR SELECT TO public USING (true);

-- 8. Navigation Items Table
CREATE TABLE IF NOT EXISTS navigation_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  path TEXT NOT NULL,
  order_index INTEGER DEFAULT 0,
  parent_id UUID REFERENCES navigation_items(id),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE navigation_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage navigation" ON navigation_items
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can view navigation" ON navigation_items
  FOR SELECT TO public USING (true);

-- 9. Footer Settings Table
CREATE TABLE IF NOT EXISTS footer_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  copyright_text TEXT,
  social_links JSONB DEFAULT '[]'::jsonb,
  footer_columns JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE footer_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage footer" ON footer_settings
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

CREATE POLICY "Public can view footer" ON footer_settings
  FOR SELECT TO public USING (true);

-- 10. Inquiries Table
CREATE TABLE IF NOT EXISTS inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new', -- new, read, replied, archived
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

-- Public can create inquiries
CREATE POLICY "Public can submit inquiries" ON inquiries
  FOR INSERT TO public WITH CHECK (true);

-- Only admins can read/manage inquiries
CREATE POLICY "Admins can manage inquiries" ON inquiries
  FOR ALL USING (EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid()));

-- Function to handle updated_at
CREATE OR REPLACE FUNCTION handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers for updated_at
CREATE TRIGGER set_updated_at_site_settings BEFORE UPDATE ON site_settings FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_updated_at_branding_settings BEFORE UPDATE ON branding_settings FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_updated_at_pages BEFORE UPDATE ON pages FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_updated_at_service_pages BEFORE UPDATE ON service_pages FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_updated_at_blog_posts BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_updated_at_navigation_items BEFORE UPDATE ON navigation_items FOR EACH ROW EXECUTE FUNCTION handle_updated_at();
CREATE TRIGGER set_updated_at_footer_settings BEFORE UPDATE ON footer_settings FOR EACH ROW EXECUTE FUNCTION handle_updated_at();

-- Initial Data (Optional, but helpful)
-- INSERT INTO site_settings (site_name) VALUES ('ConversionFoxx');
-- INSERT INTO branding_settings (primary_color) VALUES ('#F27D26');
