import React, { useState } from 'react';
import { Search, Save, RotateCcw, Globe, Share2, Info, CheckCircle2, AlertCircle, Eye, ExternalLink, Plus, Edit3 } from 'lucide-react';
import { Logo } from '../../components/ui/Logo';

interface SEOItem {
  id: string;
  page: string;
  title: string;
  description: string;
  slug: string;
  score: number;
}

const SEOManager: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'global' | 'pages'>('global');
  const [globalSEO, setGlobalSEO] = useState({
    siteTitle: 'ConversionFoxx | Precision Digital Marketing & Web Solutions',
    metaDescription: 'ConversionFoxx is a premium digital agency specializing in web development, social media management, and CRM solutions for high-growth businesses.',
    ogImage: 'https://conversionfoxx.com/og-image.jpg',
    robots: 'index, follow',
    canonical: 'https://conversionfoxx.com',
  });

  const pageSEO: SEOItem[] = [
    { id: '1', page: 'Homepage', title: 'ConversionFoxx | Precision Digital Marketing', description: 'ConversionFoxx is a premium digital agency...', slug: '/', score: 98 },
    { id: '2', page: 'About Us', title: 'About ConversionFoxx | Our Mission & Team', description: 'Learn more about the team behind ConversionFoxx...', slug: '/about', score: 92 },
    { id: '3', page: 'Services', title: 'Our Services | Web, Social, CRM & Ads', description: 'Explore our full range of digital solutions...', slug: '/services', score: 88 },
    { id: '4', page: 'Contact', title: 'Contact ConversionFoxx | Let\'s Build Something', description: 'Get in touch with us today for a consultation...', slug: '/contact', score: 95 },
  ];

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">SEO Settings</h2>
          <p className="text-white/40">Optimize your website for search engines and social sharing.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-[#111] border border-white/5 p-2 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('global')}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'global' 
              ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
              : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <Globe size={18} />
          Global SEO
        </button>
        <button
          onClick={() => setActiveTab('pages')}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'pages' 
              ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
              : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <Search size={18} />
          Page-Level SEO
        </button>
      </div>

      {activeTab === 'global' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                  <Globe size={20} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Global Meta Tags</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">Default Site Title</label>
                  <input
                    type="text"
                    value={globalSEO.siteTitle || ''}
                    onChange={(e) => setGlobalSEO(prev => ({ ...prev, siteTitle: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                  <div className="flex items-center justify-between text-[10px] text-white/30 px-1">
                    <span>Recommended: 50-60 characters</span>
                    <span>{globalSEO.siteTitle.length} characters</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">Default Meta Description</label>
                  <textarea
                    rows={4}
                    value={globalSEO.metaDescription || ''}
                    onChange={(e) => setGlobalSEO(prev => ({ ...prev, metaDescription: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all resize-none"
                  />
                  <div className="flex items-center justify-between text-[10px] text-white/30 px-1">
                    <span>Recommended: 150-160 characters</span>
                    <span>{globalSEO.metaDescription.length} characters</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 ml-1">Robots Meta</label>
                    <select 
                      value={globalSEO.robots}
                      onChange={(e) => setGlobalSEO(prev => ({ ...prev, robots: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all appearance-none"
                    >
                      <option value="index, follow">Index, Follow</option>
                      <option value="noindex, follow">Noindex, Follow</option>
                      <option value="index, nofollow">Index, Nofollow</option>
                      <option value="noindex, nofollow">Noindex, Nofollow</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-white/60 ml-1">Canonical URL</label>
                    <input
                      type="text"
                      value={globalSEO.canonical || ''}
                      onChange={(e) => setGlobalSEO(prev => ({ ...prev, canonical: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                  <Share2 size={20} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Social Sharing (Open Graph)</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <label className="text-sm font-bold text-white/60 ml-1">Default OG Image</label>
                  <div className="aspect-video bg-white/5 border-2 border-dashed border-white/10 rounded-3xl flex flex-col items-center justify-center group cursor-pointer hover:border-brand-primary/50 transition-all overflow-hidden relative">
                    <img src={globalSEO.ogImage} alt="OG Preview" className="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-60 transition-opacity" />
                    <div className="relative z-10 text-center space-y-2">
                      <div className="w-12 h-12 bg-brand-primary/20 rounded-2xl flex items-center justify-center mx-auto text-brand-primary">
                        <Plus size={24} />
                      </div>
                      <p className="text-xs font-bold text-white/60">Upload New Image</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-white/30 text-center">Recommended: 1200x630px (JPG, PNG)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-1 space-y-8 sticky top-24 h-fit">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
              Google Preview
              <div className="h-[1px] flex-1 bg-white/5" />
            </h3>
            <div className="bg-white rounded-2xl p-6 space-y-2 shadow-2xl">
              <div className="flex items-center gap-2 text-xs text-[#202124]">
                <Logo className="w-4 h-4" />
                <span>conversionfoxx.com</span>
              </div>
              <h4 className="text-xl text-[#1a0dab] hover:underline cursor-pointer line-clamp-1">{globalSEO.siteTitle}</h4>
              <p className="text-sm text-[#4d5156] line-clamp-3 leading-relaxed">
                {globalSEO.metaDescription}
              </p>
            </div>

            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2 pt-4">
              Social Preview
              <div className="h-[1px] flex-1 bg-white/5" />
            </h3>
            <div className="bg-[#111] border border-white/10 rounded-2xl overflow-hidden shadow-2xl">
              <img src={globalSEO.ogImage} alt="OG Preview" className="w-full aspect-video object-cover" />
              <div className="p-4 space-y-1">
                <p className="text-[10px] text-white/30 uppercase font-bold tracking-widest">conversionfoxx.com</p>
                <h4 className="text-sm font-bold text-white line-clamp-1">{globalSEO.siteTitle}</h4>
                <p className="text-xs text-white/40 line-clamp-2 leading-relaxed">{globalSEO.metaDescription}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Page</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">SEO Title</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Score</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {pageSEO.map((item) => (
                <tr key={item.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-bold text-white group-hover:text-brand-primary transition-colors">{item.page}</p>
                    <code className="text-[10px] font-mono text-white/30">{item.slug}</code>
                  </td>
                  <td className="px-8 py-6">
                    <p className="text-sm text-white/60 line-clamp-1">{item.title}</p>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-1.5 w-24 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-brand-primary" 
                          style={{ width: `${item.score}%` }} 
                        />
                      </div>
                      <span className="text-xs font-bold text-brand-primary">
                        {item.score}%
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-white/20 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all">
                      <Edit3 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SEOManager;
