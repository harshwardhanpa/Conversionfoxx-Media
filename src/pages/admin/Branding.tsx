import React, { useEffect, useState } from 'react';
import { Palette, Save, RotateCcw, Type, Layout, Sliders, Check, Eye, Loader2 } from 'lucide-react';
import { brandingService, BrandingSettings as IBrandingSettings } from '../../services/brandingService';
import { Logo } from '../../components/ui/Logo';

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker: React.FC<ColorPickerProps> = ({ label, value, onChange }) => (
  <div className="space-y-3">
    <label className="text-sm font-bold text-white/60 ml-1">{label}</label>
    <div className="flex items-center gap-4">
      <div 
        className="w-12 h-12 rounded-xl border border-white/10 shadow-lg cursor-pointer transition-transform hover:scale-105"
        style={{ backgroundColor: value }}
        onClick={() => {}} // In a real app, this would open a color picker
      />
      <div className="flex-1 relative group">
        <input
          type="text"
          value={value || ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full bg-white/5 border border-white/10 rounded-2xl py-3 px-4 text-white font-mono text-sm focus:outline-none focus:border-brand-primary/50 transition-all uppercase"
        />
        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-brand-primary transition-colors">
          #
        </div>
      </div>
    </div>
  </div>
);

const Branding: React.FC = () => {
  const [branding, setBranding] = useState<IBrandingSettings>({
    primary_color: '#F26E22',
    secondary_color: '#BF4417',
    accent_color: '#D91A2A',
    background_color: '#0D0D0D',
    text_color: '#E6EAF0',
    font_family_heading: 'Inter',
    font_family_body: 'Inter',
    border_radius: '1.5rem',
    glass_intensity: 20,
    button_style: 'rounded',
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error', message: string } | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await brandingService.getSettings();
        if (data) {
          setBranding(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error('Error loading branding:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSettings();
  }, []);

  const handleChange = (field: keyof IBrandingSettings, value: any) => {
    setBranding(prev => ({ ...prev, [field]: value }));
    setHasChanges(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setFeedback(null);
    try {
      const success = await brandingService.updateSettings(branding);
      if (success) {
        setFeedback({ type: 'success', message: 'Branding saved successfully!' });
        setHasChanges(false);
      } else {
        setFeedback({ type: 'error', message: 'Failed to save branding.' });
      }
    } catch (err) {
      setFeedback({ type: 'error', message: 'An error occurred while saving.' });
    } finally {
      setIsSaving(false);
      setTimeout(() => setFeedback(null), 3000);
    }
  };

  const fonts = ['Inter', 'Space Grotesk', 'Outfit', 'Playfair Display', 'JetBrains Mono'];
  const borderRadii = [
    { label: 'Sharp', value: '0' },
    { label: 'Slight', value: '0.5rem' },
    { label: 'Medium', value: '1rem' },
    { label: 'Rounded', value: '1.5rem' },
    { label: 'Full', value: '9999px' },
  ];

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-6xl mx-auto pb-24">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Branding & Design</h2>
          <p className="text-white/40">Customize the visual identity and theme of your website.</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Controls */}
        <div className="lg:col-span-2 space-y-8">
          {/* Colors */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <Palette size={20} />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Color Palette</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <ColorPicker label="Primary Color" value={branding.primary_color} onChange={(v) => handleChange('primary_color', v)} />
              <ColorPicker label="Secondary Color" value={branding.secondary_color} onChange={(v) => handleChange('secondary_color', v)} />
              <ColorPicker label="Accent Color" value={branding.accent_color} onChange={(v) => handleChange('accent_color', v)} />
              <ColorPicker label="Background Color" value={branding.background_color} onChange={(v) => handleChange('background_color', v)} />
              <ColorPicker label="Text Color" value={branding.text_color} onChange={(v) => handleChange('text_color', v)} />
            </div>
          </div>

          {/* Typography */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <Type size={20} />
              </div>
              <h3 className="text-xl font-bold tracking-tight">Typography</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-3">
                <label className="text-sm font-bold text-white/60 ml-1">Heading Font</label>
                <select 
                  value={branding.font_family_heading || 'Inter'}
                  onChange={(e) => handleChange('font_family_heading', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all appearance-none"
                >
                  {fonts.map(font => <option key={font} value={font}>{font}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-white/60 ml-1">Body Font</label>
                <select 
                  value={branding.font_family_body || 'Inter'}
                  onChange={(e) => handleChange('font_family_body', e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all appearance-none"
                >
                  {fonts.map(font => <option key={font} value={font}>{font}</option>)}
                </select>
              </div>
            </div>
          </div>

          {/* UI Elements */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <Sliders size={20} />
              </div>
              <h3 className="text-xl font-bold tracking-tight">UI Elements</h3>
            </div>
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="text-sm font-bold text-white/60 ml-1">Border Radius</label>
                <div className="flex flex-wrap gap-4">
                  {borderRadii.map((radius) => (
                    <button
                      key={radius.label}
                      onClick={() => handleChange('border_radius', radius.value)}
                      className={`px-6 py-3 rounded-xl border transition-all font-medium ${
                        branding.border_radius === radius.value 
                          ? 'bg-brand-primary border-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                          : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {radius.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-sm font-bold text-white/60 ml-1">Glassmorphism Intensity</label>
                  <span className="text-brand-primary font-bold font-mono">{branding.glass_intensity}%</span>
                </div>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  value={branding.glass_intensity}
                  onChange={(e) => handleChange('glass_intensity', parseInt(e.target.value))}
                  className="w-full h-2 bg-white/5 rounded-lg appearance-none cursor-pointer accent-brand-primary"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Preview */}
        <div className="lg:col-span-1 space-y-6 sticky top-24 h-fit">
          <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
            Live Preview
            <div className="h-[1px] flex-1 bg-white/5" />
          </h3>
          <div className="bg-[#050505] border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/10 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="space-y-4 relative z-10">
              <Logo className="w-12 h-12" />
              <h4 className="text-2xl font-bold tracking-tight" style={{ color: branding.text_color, fontFamily: branding.font_family_heading }}>
                Design <span style={{ color: branding.primary_color }}>Preview</span>
              </h4>
              <p className="text-sm leading-relaxed opacity-60" style={{ color: branding.text_color, fontFamily: branding.font_family_body }}>
                This is how your branding elements will look on the live website. Adjust the colors and fonts to match your vision.
              </p>
            </div>

            <div 
              className="p-6 border border-white/10 shadow-xl space-y-4"
              style={{ 
                borderRadius: branding.border_radius,
                backgroundColor: `rgba(255, 255, 255, ${branding.glass_intensity / 500})`,
                backdropFilter: `blur(${branding.glass_intensity / 2}px)`
              }}
            >
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4" style={{ color: branding.accent_color }} />
                <span className="text-xs font-bold uppercase tracking-widest opacity-40">Feature Item</span>
              </div>
              <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                <div className="h-full" style={{ backgroundColor: branding.primary_color, width: '70%' }} />
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <button 
                className="w-full py-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02]"
                style={{ backgroundColor: branding.primary_color, borderRadius: branding.border_radius }}
              >
                Primary Action
              </button>
              <button 
                className="w-full py-4 font-bold text-white/60 border border-white/10 transition-all hover:text-white hover:bg-white/5"
                style={{ borderRadius: branding.border_radius }}
              >
                Secondary Action
              </button>
            </div>
          </div>
          <p className="text-center text-xs text-white/20 italic">
            Preview is an approximation of the live theme.
          </p>
        </div>
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

export default Branding;
