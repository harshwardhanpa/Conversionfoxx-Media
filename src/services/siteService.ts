import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface SiteSettings {
  id?: string;
  site_name: string;
  site_description: string;
  contact_email: string;
  contact_phone: string;
  address: string;
  google_analytics_id: string;
  favicon_url: string;
  logo_url: string;
  tagline?: string;
  facebook_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  instagram_url?: string;
  copyright_text?: string;
}

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  site_name: 'ConversionFoxx',
  site_description: 'ConversionFoxx: Performance marketing agency engineering predictable revenue systems for high-growth brands across the US, UK, Canada, and Australia.',
  contact_email: 'info@conversionfoxx.com',
  contact_phone: '+91 79901 26349',
  address: 'Ahmedabad, India',
  google_analytics_id: '',
  favicon_url: '/logo.png',
  logo_url: '/logo.png',
  tagline: 'Engineering Predictable Revenue Infrastructure',
  facebook_url: 'https://facebook.com/conversionfoxx',
  linkedin_url: 'https://linkedin.com/company/conversionfoxx',
  instagram_url: 'https://instagram.com/conversionfoxx',
  copyright_text: '© 2026 ConversionFoxx Performance Agency. Scaled operations across US, UK, Canada, and Australia.'
};

export const siteService = {
  async getSettings(): Promise<SiteSettings | null> {
    if (!isSupabaseConfigured) return DEFAULT_SITE_SETTINGS;
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.warn('Could not retrieve remote site settings, using defaults:', error.message || error);
        }
        return DEFAULT_SITE_SETTINGS;
      }

      return data || DEFAULT_SITE_SETTINGS;
    } catch (err) {
      console.warn('Supabase fetch exception for site settings, using defaults:', err);
      return DEFAULT_SITE_SETTINGS;
    }
  },

  async updateSettings(settings: Partial<SiteSettings>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { data: existing } = await supabase.from('site_settings').select('id').single();

      let error;
      if (existing) {
        const { error: updateError } = await supabase
          .from('site_settings')
          .update(settings)
          .eq('id', existing.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('site_settings')
          .insert([settings]);
        error = insertError;
      }

      if (error) {
        console.warn('Error updating site settings:', error.message || error);
        return false;
      }

      return true;
    } catch (err) {
      console.warn('Exception updating site settings:', err);
      return false;
    }
  },

  async uploadMedia(file: File, bucket: string = 'media'): Promise<string | null> {
    if (!isSupabaseConfigured) return null;
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, file);

      if (uploadError) {
        console.warn('Error uploading media:', uploadError.message || uploadError);
        return null;
      }

      const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
      return data.publicUrl;
    } catch (err) {
      console.warn('Exception uploading media:', err);
      return null;
    }
  }
};
