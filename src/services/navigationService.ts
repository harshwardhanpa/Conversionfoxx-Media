import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface NavigationItem {
  id: string;
  label: string;
  route: string;
  status: 'active' | 'disabled';
  type: 'internal' | 'external';
  order_index: number;
  menu_type: 'header' | 'footer';
  created_at?: string;
  updated_at?: string;
}

export const navigationService = {
  async getNavigationItems(menuType: 'header' | 'footer') {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('navigation_items')
        .select('*')
        .eq('menu_type', menuType)
        .order('order_index', { ascending: true });

      if (error) throw error;
      return data as NavigationItem[];
    } catch (err) {
      console.warn(`Supabase fetch error for navigation (${menuType}):`, err);
      return [];
    }
  },

  async updateNavigationItems(items: NavigationItem[]) {
    // We'll use a transaction-like approach by deleting and re-inserting or updating
    // For simplicity and to handle reordering, we can upsert
    const { data, error } = await supabase
      .from('navigation_items')
      .upsert(items.map((item, index) => ({
        ...item,
        order_index: index
      })))
      .select();

    if (error) throw error;
    return data as NavigationItem[];
  },

  async deleteNavigationItem(id: string) {
    const { error } = await supabase
      .from('navigation_items')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};
