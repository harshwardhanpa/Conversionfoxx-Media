import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string;
  status: 'draft' | 'published' | 'archived';
  author_id: string;
  published_at: string | null;
  updated_at: string;
}

export const blogService = {
  async getPosts() {
    if (!isSupabaseConfigured) return [];
    try {
      const { data, error } = await supabase
        .from('blog_posts')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      return data as BlogPost[];
    } catch (err) {
      console.warn('Supabase fetch error for blog posts:', err);
      return [];
    }
  },

  async getPostById(id: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  async getPostBySlug(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  async createPost(post: Omit<BlogPost, 'id' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .insert([post])
      .select()
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  async updatePost(id: string, updates: Partial<BlogPost>) {
    const { data, error } = await supabase
      .from('blog_posts')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as BlogPost;
  },

  async deletePost(id: string) {
    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
