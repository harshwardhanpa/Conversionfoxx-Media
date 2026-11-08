import React, { useEffect, useState, useRef } from 'react';
import { Save, RotateCcw, Globe, Mail, Phone, Clock, Share2, Info, Loader2, Upload, Trash2 } from 'lucide-react';
import { siteService, SiteSettings as ISiteSettings } from '../../services/siteService';

interface FormSectionProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
}

const FormSection: React.FC<FormSectionProps> = ({ title, description, icon, children }) => (
  <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
    <div className="p-6 border-b border-white/5 flex items-center gap-4">
      {icon && <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">{icon}</div>}
      <div>
        <h3 className="text-lg font-bold tracking-tight">{title}</h3>
        {description && <p className="text-sm text-white/40">{description}</p>}
      </div>
    </div>
    <div className="p-8 space-y-6">
      {children}
    </div>
  </div>
);

interface InputFieldProps {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  multiline?: boolean;
  rows?: number;
  hint?: string;
}

const InputField: React.FC<InputFieldProps> = ({ label, type = 'text', placeholder, value, onChange, multiline, rows = 3, hint }) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between">
      <label className="text-sm font-bold text-white/60 ml-1">{label}</label>
      {hint && (
        <div className="group relative">
          <Info size={14} className="text-white/20 hover:text-white transition-colors cursor-help" />
          <div className="absolute bottom-full right-0 mb-2 w-48 p-2 bg-black border border-white/10 rounded-lg text-[10px] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
            {hint}
          </div>
        </div>
      )}
    </div>
    {multiline ? (
      <textarea
        value={value}
        onChange={onChange}
        rows={rows}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all resize-none"
      />
    ) : (
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
      />
    )}
  </div>
);

const SiteSettings: React.FC = () => {
  const [settings, setSettings] = useState<ISiteSettings>({
    site_name: 'ConversionFoxx',
    site_description: '',
    contact_email: 'info@conversionfoxx.com',
    contact_phone: '+91 79901 26349',
    address: 'Ahmedabad, India',
    google_analytics_id: '',
    favicon_url: '',
    logo_url: '',
    tagline: 'Precision Digital Marketing & Web Solutions',
    facebook_url: 'https://facebook.com/conversionfoxx',
    twitter_url: '',
    linkedin_url: 'https://linkedin.com/company/conversionfoxx',
    instagram_url: 'https://instagram.com/conversionfoxx',
    copyright_text: '© 2026 ConversionFoxx. All rights reserved.',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  const faviconInputRef = useRef<HTMLInputElement>(null);
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await siteService.getSettings();
        if (data) {
          setSettings(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error('Error loading settings:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (field: keyof ISiteSettings, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    try {
      const success = await siteService.updateSettings(settings);
      if (success) {
        setFeedback({ type: 'success', message: 'Settings saved successfully!' });
        setHasChanges(false);
      } else {
        setFeedback({ type: 'error', message: 'Failed to save settings. Please try again.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'An error occurred while saving.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: 'favicon_url' | 'logo_url') => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSaving(true);
    try {
      const url = await siteService.uploadMedia(file);
      if (url) {
        setSettings(prev => ({ ...prev, [field]: url }));
        setHasChanges(true);
        setFeedback({ type: 'success', message: 'Image uploaded successfully!' });
      } else {
        setFeedback({ type: 'error', message: 'Failed to upload image.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'An error occurred during upload.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-5xl mx-auto pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Site Settings</h2>
          <p className="text-white/40">Manage your website's global information and contact details.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => window.location.reload()}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold"
          >
            <RotateCcw size={18} />
            Reset
          </button>
          <button 
            onClick={handleSave}
            disabled={isSaving || !hasChanges}
            className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            Save Changes
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`p-4 rounded-xl border ${
          feedback.type === 'success' ? 'bg-brand-primary/10 border-brand-primary/20 text-brand-primary' : 'bg-white/10 border-white/20 text-white/60'
        } transition-all animate-in fade-in slide-in-from-top-2`}>
          {feedback.message}
        </div>
      )}

      <div className="grid grid-cols-1 gap-8">
        <FormSection title="General Information" description="Basic site identity and branding." icon={<Globe size={20} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Website Name" 
              value={settings.site_name || ''} 
              onChange={(e) => handleChange('site_name', e.target.value)} 
              hint="The main name of your website."
            />
            <InputField 
              label="Website Tagline" 
              value={settings.tagline || ''} 
              onChange={(e) => handleChange('tagline', e.target.value)} 
              hint="A short description that appears in search results."
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <label className="text-sm font-bold text-white/60 ml-1">Favicon</label>
              <div 
                onClick={() => faviconInputRef.current?.click()}
                className="w-20 h-20 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center group cursor-pointer hover:border-brand-primary/50 transition-all relative overflow-hidden"
              >
                {settings.favicon_url ? (
                  <img src={settings.favicon_url} alt="Favicon" className="w-full h-full object-contain p-2" />
                ) : (
                  <Upload className="w-6 h-6 text-white/20 group-hover:text-brand-primary transition-colors" />
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Upload className="w-5 h-5 text-white" />
                </div>
              </div>
              <input 
                type="file" 
                ref={faviconInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => handleFileUpload(e, 'favicon_url')} 
              />
              <p className="text-[10px] text-white/30 text-center">PNG, ICO (32x32)</p>
            </div>
            <div className="space-y-4 md:col-span-2">
              <label className="text-sm font-bold text-white/60 ml-1">Website Logo</label>
              <div 
                onClick={() => logoInputRef.current?.click()}
                className="h-20 bg-white/5 border-2 border-dashed border-white/10 rounded-2xl flex items-center justify-center group cursor-pointer hover:border-brand-primary/50 transition-all relative overflow-hidden"
              >
                {settings.logo_url ? (
                  <img src={settings.logo_url} alt="Logo" className="h-full object-contain p-4" />
                ) : (
                  <div className="flex items-center gap-2 text-white/20 group-hover:text-brand-primary transition-colors">
                    <Upload size={20} />
                    <span className="font-bold">Upload Logo</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                  <Upload className="w-6 h-6 text-white" />
                </div>
              </div>
              <input 
                type="file" 
                ref={logoInputRef} 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => handleFileUpload(e, 'logo_url')} 
              />
              <p className="text-[10px] text-white/30 text-center">SVG or Transparent PNG (Max 2MB)</p>
            </div>
          </div>
        </FormSection>

        <FormSection title="Contact Details" description="How clients can reach you." icon={<Mail size={20} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Business Email" 
              type="email"
              value={settings.contact_email || ''} 
              onChange={(e) => handleChange('contact_email', e.target.value)} 
            />
            <InputField 
              label="Business Phone" 
              value={settings.contact_phone || ''} 
              onChange={(e) => handleChange('contact_phone', e.target.value)} 
            />
            <InputField 
              label="Location" 
              value={settings.address || ''} 
              onChange={(e) => handleChange('address', e.target.value)} 
            />
            <InputField 
              label="Google Analytics ID" 
              value={settings.google_analytics_id || ''} 
              onChange={(e) => handleChange('google_analytics_id', e.target.value)} 
              placeholder="G-XXXXXXXXXX"
            />
          </div>
        </FormSection>

        <FormSection title="Social Media" description="Connect your social profiles." icon={<Share2 size={20} />}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Facebook URL" 
              value={settings.facebook_url || ''} 
              onChange={(e) => handleChange('facebook_url', e.target.value)} 
            />
            <InputField 
              label="X (formerly Twitter) URL" 
              value={settings.twitter_url || ''} 
              onChange={(e) => handleChange('twitter_url', e.target.value)} 
              placeholder="https://x.com/your-profile"
            />
            <InputField 
              label="LinkedIn URL" 
              value={settings.linkedin_url || ''} 
              onChange={(e) => handleChange('linkedin_url', e.target.value)} 
            />
            <InputField 
              label="Instagram URL" 
              value={settings.instagram_url || ''} 
              onChange={(e) => handleChange('instagram_url', e.target.value)} 
            />
          </div>
        </FormSection>

        <FormSection title="Footer Content" description="Copyright and legal text." icon={<Info size={20} />}>
          <InputField 
            label="Copyright Text" 
            value={settings.copyright_text || ''} 
            onChange={(e) => handleChange('copyright_text', e.target.value)} 
            multiline
          />
        </FormSection>
      </div>

      {/* Sticky Save Bar */}
      {hasChanges && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-full max-w-4xl px-6 z-50 animate-in slide-in-from-bottom-10">
          <div className="bg-[#111]/90 backdrop-blur-md border border-white/10 p-4 rounded-2xl flex items-center justify-between shadow-2xl">
            <div className="flex items-center gap-3 text-sm text-white/60 ml-4">
              <div className="w-2 h-2 bg-brand-primary rounded-full animate-pulse" />
              Unsaved changes detected
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={() => window.location.reload()}
                className="px-6 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm font-bold"
              >
                Discard
              </button>
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="px-8 py-2 bg-brand-primary text-white rounded-lg font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all text-sm flex items-center gap-2"
              >
                {isSaving && <Loader2 size={14} className="animate-spin" />}
                Save All Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SiteSettings;
