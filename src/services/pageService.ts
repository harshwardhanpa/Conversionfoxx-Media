import { supabase } from '../lib/supabaseClient';

export interface PageContent {
  [key: string]: any;
}

export interface SEOSettings {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
}

export interface Page {
  id: string;
  slug: string;
  title: string;
  content: PageContent;
  seo_settings: SEOSettings;
  is_published: boolean;
  updated_at: string;
}

export const pageService = {
  async getPages() {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('title', { ascending: true });

    if (error) throw error;
    return data as Page[];
  },

  async getPageBySlug(slug: string) {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Page;
  },

  async updatePage(id: string, updates: Partial<Page>) {
    const { data, error } = await supabase
      .from('pages')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Page;
  },
};
