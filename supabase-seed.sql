-- SEED DATA FOR CONVERSIONFOXX
-- Run this in your Supabase SQL Editor to populate your tables with the initial website content.

-- 1. Site Settings
INSERT INTO site_settings (site_name, site_description, contact_email, contact_phone, address, google_analytics_id, favicon_url, logo_url, tagline, facebook_url, twitter_url, linkedin_url, instagram_url, copyright_text)
VALUES (
  'ConversionFoxx',
  'ConversionFoxx helps businesses scale faster with powerful tech, data-driven marketing, and conversion-focused solutions.',
  'info@conversionfoxx.com',
  '+91 79901 26349',
  'Ahmedabad, India',
  'UA-XXXXXXXXX-X',
  'https://conversionfoxx.com/favicon.ico',
  'https://conversionfoxx.com/logo.png',
  'Growth-First IT Agency',
  '#',
  '#',
  '#',
  '#',
  '© 2026 ConversionFoxx IT Solutions. All rights reserved.'
) ON CONFLICT DO NOTHING;

-- 2. Branding Settings
INSERT INTO branding_settings (primary_color, secondary_color, accent_color, background_color, text_color, font_family_heading, font_family_body, border_radius, glass_intensity, button_style)
VALUES (
  '#F27D26',
  '#0A0A0A',
  '#FFFFFF',
  '#0A0A0A',
  '#FFFFFF',
  'Inter',
  'Inter',
  '1rem',
  0.1,
  'rounded'
) ON CONFLICT DO NOTHING;

-- 3. Footer Settings
INSERT INTO footer_settings (brand_text, description, email, phone, location, copyright_text, column_1_title, column_2_title)
VALUES (
  'ConversionFoxx',
  'ConversionFoxx is a premium IT and growth agency dedicated to building digital ecosystems that actually drive results.',
  'info@conversionfoxx.com',
  '+91 79901 26349',
  'Ahmedabad, India',
  '© 2026 ConversionFoxx IT Solutions. All rights reserved.',
  'Services',
  'Company'
) ON CONFLICT DO NOTHING;

-- 4. Navigation Items
INSERT INTO navigation_items (label, route, status, type, order_index, menu_type)
VALUES 
  ('About Us', '/about', 'active', 'internal', 1, 'header'),
  ('Our Services', '/services', 'active', 'internal', 2, 'header'),
  ('Blogs', '/blogs', 'active', 'internal', 3, 'header'),
  ('Contact', '/contact', 'active', 'internal', 4, 'header'),
  ('Home', '/', 'active', 'internal', 1, 'footer'),
  ('About', '/about', 'active', 'internal', 2, 'footer'),
  ('Services', '/services', 'active', 'internal', 3, 'footer'),
  ('Blogs', '/blogs', 'active', 'internal', 4, 'footer'),
  ('Contact', '/contact', 'active', 'internal', 5, 'footer');

-- 5. Pages
INSERT INTO pages (slug, title, content, seo_settings, is_published)
VALUES 
  ('home', 'Home', '{"hero": {"title": "We Don’t Just Build Digital Products — We Build Revenue Engines", "subtitle": "From strategy to execution, ConversionFoxx helps businesses scale faster with powerful tech, data-driven marketing, and conversion-focused solutions."}}', '{"title": "Home | ConversionFoxx", "description": "Welcome to ConversionFoxx"}', true),
  ('about', 'About Us', '{"hero": {"title": "We Build Systems That Drive Real Business Growth", "subtitle": "ConversionFoxx is a growth-focused tech agency helping businesses scale through powerful digital solutions."}}', '{"title": "About Us | ConversionFoxx", "description": "Learn more about ConversionFoxx"}', true),
  ('services', 'Our Services', '{"hero": {"title": "Complete growth and technology solutions under one roof", "subtitle": "We provide a wide range of services to help your business grow."}}', '{"title": "Services | ConversionFoxx", "description": "Explore our services"}', true),
  ('blogs', 'Blogs', '{"hero": {"title": "Insights & Resources", "subtitle": "Latest from our blog"}}', '{"title": "Blogs | ConversionFoxx", "description": "Read our latest blog posts"}', true),
  ('contact', 'Contact Us', '{"hero": {"title": "Let’s Build Something That Actually Works", "subtitle": "Get in touch with us today."}}', '{"title": "Contact Us | ConversionFoxx", "description": "Get in touch with us"}', true)
ON CONFLICT (slug) DO NOTHING;

-- 6. Service Pages
INSERT INTO service_pages (slug, title, description, content, image_url, is_active)
VALUES 
  ('social-media-management', 'Social Media Management', 'Strategic content creation and community management to build brand authority and engagement.', '{"features": ["Content Strategy", "Community Management", "Analytics"]}', 'https://picsum.photos/seed/social/800/600', true),
  ('web-development', 'Web Development', 'High-performance, conversion-focused websites built with modern tech stacks like React and Next.js.', '{"features": ["React/Next.js", "E-commerce", "Custom CMS"]}', 'https://picsum.photos/seed/web/800/600', true),
  ('app-development', 'App Development', 'Native and cross-platform mobile applications that deliver seamless user experiences.', '{"features": ["iOS/Android", "React Native", "Flutter"]}', 'https://picsum.photos/seed/app/800/600', true),
  ('paid-advertising', 'Paid Advertising', 'Data-driven Meta and Google Ads campaigns optimized for maximum ROI and lead generation.', '{"features": ["Google Ads", "Meta Ads", "Retargeting"]}', 'https://picsum.photos/seed/ads/800/600', true),
  ('crm-solutions', 'CRM Solutions', 'Custom CRM implementations and automation to streamline your sales and customer management.', '{"features": ["Salesforce", "HubSpot", "Custom Automation"]}', 'https://picsum.photos/seed/crm/800/600', true)
ON CONFLICT (slug) DO NOTHING;

-- 7. Blog Posts
-- Note: author_id is set to NULL initially. You can update it in the Admin Panel after creating your account.
INSERT INTO blog_posts (slug, title, content, excerpt, featured_image, status)
VALUES 
  ('future-of-digital-transformation-2026', 'The Future of Digital Transformation in 2026', 'Full content here...', 'Exploring how AI and cloud computing are reshaping the IT landscape for modern enterprises.', 'https://picsum.photos/seed/tech/800/600', 'published'),
  ('5-growth-strategies-for-high-growth-startups', '5 Growth Strategies for High-Growth Startups', 'Full content here...', 'How to leverage data-driven marketing to scale your product faster and more efficiently.', 'https://picsum.photos/seed/growth/800/600', 'published'),
  ('why-conversion-focused-design-matters', 'Why Conversion-Focused Design Matters', 'Full content here...', 'The psychology behind high-converting websites and how to apply it to your digital products.', 'https://picsum.photos/seed/design/800/600', 'published')
ON CONFLICT (slug) DO NOTHING;

-- 8. Contact Settings
INSERT INTO contact_settings (id, recipient_email, success_message, error_message, consultation_cta, consultation_link)
VALUES (
  1,
  'info@conversionfoxx.com',
  'Thank you for your inquiry! We will get back to you shortly.',
  'Something went wrong. Please try again later.',
  'Book a Free Consultation',
  '/contact'
) ON CONFLICT (id) DO UPDATE SET
  recipient_email = EXCLUDED.recipient_email,
  success_message = EXCLUDED.success_message,
  error_message = EXCLUDED.error_message;
