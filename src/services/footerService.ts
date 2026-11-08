import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface FooterSettings {
  id: string;
  brand_text: string;
  description: string;
  email: string;
  phone: string;
  location: string;
  copyright_text: string;
  column_1_title: string;
  column_2_title: string;
  updated_at?: string;
}

export const footerService = {
  async getFooterSettings() {
    if (!isSupabaseConfigured) return null;
    try {
      const { data, error } = await supabase
        .from('footer_settings')
        .select('*')
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return data as FooterSettings | null;
    } catch (err) {
      console.warn('Supabase fetch error for footer:', err);
      return null;
    }
  },

  async updateFooterSettings(settings: Partial<FooterSettings>) {
    const { data: existing } = await supabase.from('footer_settings').select('id').single();
    
    let result;
    if (existing) {
      result = await supabase
        .from('footer_settings')
        .update(settings)
        .eq('id', existing.id)
        .select()
        .single();
    } else {
      result = await supabase
        .from('footer_settings')
        .insert(settings)
        .select()
        .single();
    }

    if (result.error) throw result.error;
    return result.data as FooterSettings;
  }
};
