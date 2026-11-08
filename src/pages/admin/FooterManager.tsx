import React, { useState, useEffect } from 'react';
import { Layout as LayoutIcon, Save, RotateCcw, Info, Share2, Mail, Phone, Globe, ChevronRight, Plus, Trash2, Edit3, Loader2, CheckCircle2, AlertCircle, X } from 'lucide-react';
import { footerService, FooterSettings } from '../../services/footerService';

const FooterManager: React.FC = () => {
  const [footerData, setFooterData] = useState<Partial<FooterSettings>>({
    brand_text: 'ConversionFoxx',
    description: 'Precision digital marketing and web solutions for high-growth businesses. We build the systems that drive measurable results.',
    email: 'info@conversionfoxx.com',
    phone: '+91 79901 26349',
    location: 'Ahmedabad, India',
    copyright_text: '© 2026 ConversionFoxx. All rights reserved.',
    column_1_title: 'Quick Links',
    column_2_title: 'Our Services'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchFooter();
  }, []);

  const fetchFooter = async () => {
    try {
      setLoading(true);
      const data = await footerService.getFooterSettings();
      if (data) {
        setFooterData(data);
      }
      setHasChanges(false);
    } catch (error) {
      console.error('Error fetching footer:', error);
      setFeedback({ type: 'error', message: 'Failed to load footer settings.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setFeedback(null);
      await footerService.updateFooterSettings(footerData);
      setFeedback({ type: 'success', message: 'Footer settings updated successfully.' });
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving footer:', error);
      setFeedback({ type: 'error', message: 'Failed to save footer changes.' });
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (field: keyof FooterSettings, value: string) => {
    setFooterData(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 text-white/20">
        <Loader2 size={48} className="animate-spin mb-4" />
        <p className="font-bold">Loading footer settings...</p>
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      {/* Feedback Message */}
      {feedback && (
        <div className={`fixed top-24 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-300 ${
          feedback.type === 'success' ? 'bg-brand-primary/10 border border-brand-primary/20 text-brand-primary' : 'bg-white/10 border border-white/10 text-white/60'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <p className="font-bold">{feedback.message}</p>
          <button onClick={() => setFeedback(null)} className="ml-4 hover:opacity-70">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Footer Manager</h2>
          <p className="text-white/40">Manage and edit the content of your website's footer section.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleSave}
            disabled={!hasChanges || saving}
            className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {/* Brand Section */}
        <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
              <LayoutIcon size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">Footer Brand Section</h3>
              <p className="text-sm text-white/40">The main branding area in your footer.</p>
            </div>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 ml-1">Brand Name</label>
              <input
                type="text"
                value={footerData.brand_text || ''}
                onChange={(e) => handleChange('brand_text', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 ml-1">Brand Description</label>
              <textarea
                rows={3}
                value={footerData.description || ''}
                onChange={(e) => handleChange('description', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
              <Mail size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">Footer Contact Info</h3>
              <p className="text-sm text-white/40">Contact details displayed in the footer.</p>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 ml-1">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-primary transition-colors" />
                <input
                  type="email"
                  value={footerData.email || ''}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 ml-1">Phone Number</label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-primary transition-colors" />
                <input
                  type="text"
                  value={footerData.phone || ''}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                />
              </div>
            </div>
            <div className="space-y-2 md:col-span-2">
              <label className="text-sm font-bold text-white/60 ml-1">Location Text</label>
              <div className="relative group">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-primary transition-colors" />
                <input
                  type="text"
                  value={footerData.location || ''}
                  onChange={(e) => handleChange('location', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Link Column Titles */}
        <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
              <Share2 size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">Footer Link Columns</h3>
              <p className="text-sm text-white/40">Manage the titles of your footer link columns.</p>
            </div>
          </div>
          <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 ml-1">Column 1 Title</label>
              <input
                type="text"
                value={footerData.column_1_title || ''}
                onChange={(e) => handleChange('column_1_title', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 ml-1">Column 2 Title</label>
              <input
                type="text"
                value={footerData.column_2_title || ''}
                onChange={(e) => handleChange('column_2_title', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
              />
            </div>
          </div>
          <div className="p-8 bg-white/[0.02] border-t border-white/5">
            <p className="text-xs text-white/40 italic">
              Note: The actual links in these columns are managed in the <a href="/admin/navigation" className="text-brand-primary hover:underline">Navigation Manager</a> under the "Footer Links" tab.
            </p>
          </div>
        </div>

        {/* Legal Section */}
        <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
          <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
              <Info size={20} />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">Legal & Copyright</h3>
              <p className="text-sm text-white/40">The very bottom section of your footer.</p>
            </div>
          </div>
          <div className="p-8 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/60 ml-1">Copyright Line</label>
              <input
                type="text"
                value={footerData.copyright_text || ''}
                onChange={(e) => handleChange('copyright_text', e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterManager;
