import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface ServicePage {
  id: string;
  slug: string;
  title: string;
  description: string;
  content: any;
  image_url: string;
  is_active: boolean;
  updated_at: string;
}

export const servicePageService = {
  async getServicePages() {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('service_pages')
        .select('*')
        .order('title', { ascending: true });

      if (error) throw error;
      return data as ServicePage[];
    } catch (err) {
      console.warn('Supabase fetch error for service pages:', err);
      return [];
    }
  },

  async getServicePageById(id: string) {
    const { data, error } = await supabase
      .from('service_pages')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as ServicePage;
  },

  async getServicePageBySlug(slug: string) {
    const { data, error } = await supabase
      .from('service_pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as ServicePage;
  },

  async updateServicePage(id: string, updates: Partial<ServicePage>) {
    const { data, error } = await supabase
      .from('service_pages')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as ServicePage;
  },

  async createServicePage(service: Omit<ServicePage, 'id' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('service_pages')
      .insert([service])
      .select()
      .single();

    if (error) throw error;
    return data as ServicePage;
  },

  async deleteServicePage(id: string) {
    const { error } = await supabase
      .from('service_pages')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
