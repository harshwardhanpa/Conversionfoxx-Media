import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface BrandingSettings {
  id?: string;
  primary_color: string;
  secondary_color: string;
  accent_color: string;
  background_color: string;
  text_color: string;
  font_family_heading: string;
  font_family_body: string;
  border_radius: string;
  glass_intensity: number;
  button_style: string;
}

export const DEFAULT_BRANDING_SETTINGS: BrandingSettings = {
  primary_color: '#FF5500',
  secondary_color: '#FFA200',
  accent_color: '#E63900',
  background_color: '#070709',
  text_color: '#FFFFFF',
  font_family_heading: 'Plus Jakarta Sans',
  font_family_body: 'DM Sans',
  border_radius: '1rem',
  glass_intensity: 0.8,
  button_style: 'rounded-xl',
};

export const brandingService = {
  async getSettings(): Promise<BrandingSettings | null> {
    if (!isSupabaseConfigured) return DEFAULT_BRANDING_SETTINGS;
    try {
      const { data, error } = await supabase
        .from('branding_settings')
        .select('*')
        .single();

      if (error) {
        if (error.code !== 'PGRST116') {
          console.warn('Could not retrieve remote branding settings, using defaults:', error.message || error);
        }
        return DEFAULT_BRANDING_SETTINGS;
      }

      return data || DEFAULT_BRANDING_SETTINGS;
    } catch (err) {
      console.warn('Supabase fetch exception for branding, using defaults:', err);
      return DEFAULT_BRANDING_SETTINGS;
    }
  },

  async updateSettings(settings: Partial<BrandingSettings>): Promise<boolean> {
    if (!isSupabaseConfigured) return false;
    try {
      const { data: existing } = await supabase.from('branding_settings').select('id').single();

      let error;
      if (existing) {
        const { error: updateError } = await supabase
          .from('branding_settings')
          .update(settings)
          .eq('id', existing.id);
        error = updateError;
      } else {
        const { error: insertError } = await supabase
          .from('branding_settings')
          .insert([settings]);
        error = insertError;
      }

      if (error) {
        console.warn('Error updating branding settings:', error.message || error);
        return false;
      }

      return true;
    } catch (err) {
      console.warn('Exception updating branding settings:', err);
      return false;
    }
  }
};
