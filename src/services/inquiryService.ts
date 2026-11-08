import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  service: string;
  budget: string;
  message: string;
  status: 'new' | 'contacted' | 'closed';
  created_at: string;
}

export const inquiryService = {
  async getInquiries() {
    const { data, error } = await supabase
      .from('inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Inquiry[];
  },

  async updateInquiryStatus(id: string, status: 'new' | 'contacted' | 'closed') {
    const { data, error } = await supabase
      .from('inquiries')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Inquiry;
  },

  async deleteInquiry(id: string) {
    const { error } = await supabase
      .from('inquiries')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async getSettings() {
    if (!isSupabaseConfigured) {
      return {
        recipient_email: 'info@conversionfoxx.com',
        success_message: 'Thank you for your inquiry! Our team will get back to you within 24 hours.',
        error_message: 'Something went wrong. Please try again or contact us directly at info@conversionfoxx.com.',
        consultation_cta: 'Book Your Free Strategy Session',
        consultation_link: '/contact',
      };
    }

    try {
      const { data, error } = await supabase
          .from('contact_settings')
          .select('*')
          .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No settings found, return default
          return {
            recipient_email: 'info@conversionfoxx.com',
            success_message: 'Thank you for your inquiry! Our team will get back to you within 24 hours.',
            error_message: 'Something went wrong. Please try again or contact us directly at info@conversionfoxx.com.',
            consultation_cta: 'Book Your Free Strategy Session',
            consultation_link: '/contact',
          };
        }
        throw error;
      }
      return data;
    } catch (err) {
      console.warn('Supabase fetch error, using defaults:', err);
      return {
        recipient_email: 'info@conversionfoxx.com',
        success_message: 'Thank you for your inquiry! Our team will get back to you within 24 hours.',
        error_message: 'Something went wrong. Please try again or contact us directly at info@conversionfoxx.com.',
        consultation_cta: 'Book Your Free Strategy Session',
        consultation_link: '/contact',
      };
    }
  },

  async updateSettings(settings: any) {
    const { data, error } = await supabase
      .from('contact_settings')
      .upsert({ id: 1, ...settings })
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async createInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'created_at'>) {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([{ ...inquiry, status: 'new' }])
      .select()
      .single();

    if (error) throw error;
    return data as Inquiry;
  }
};

