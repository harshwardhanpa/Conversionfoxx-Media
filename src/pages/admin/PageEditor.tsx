import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, Globe, Settings, Layout as LayoutIcon, Eye } from 'lucide-react';
import { pageService, Page } from '../../services/pageService';

const PageEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [page, setPage] = useState<Page | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const fetchPage = async () => {
      if (!id) return;
      try {
        const pages = await pageService.getPages();
        const foundPage = pages.find(p => p.id === id);
        if (foundPage) {
          setPage(foundPage);
        } else {
          setFeedback({ type: 'error', message: 'Page not found' });
        }
      } catch (error) {
        console.error('Error fetching page:', error);
        setFeedback({ type: 'error', message: 'Failed to load page' });
      } finally {
        setLoading(false);
      }
    };

    fetchPage();
  }, [id]);

  const handleSave = async () => {
    if (!page || !id) return;
    setSaving(true);
    setFeedback(null);
    try {
      await pageService.updatePage(id, {
        title: page.title,
        content: page.content,
        seo_settings: page.seo_settings,
        is_published: page.is_published,
      });
      setFeedback({ type: 'success', message: 'Page updated successfully' });
    } catch (error) {
      console.error('Error saving page:', error);
      setFeedback({ type: 'error', message: 'Failed to save page' });
    } finally {
      setSaving(false);
    }
  };

  const updateContent = (key: string, value: any) => {
    if (!page) return;
    setPage({
      ...page,
      content: {
        ...page.content,
        [key]: value,
      },
    });
  };

  const updateSEO = (key: string, value: string) => {
    if (!page) return;
    setPage({
      ...page,
      seo_settings: {
        ...page.seo_settings,
        [key]: value,
      },
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!page) {
    return (
      <div className="text-center py-20">
        <p className="text-white/40">Page not found.</p>
        <button onClick={() => navigate('/admin/pages')} className="mt-4 text-brand-primary font-bold">
          Go back to Pages
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-24">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/admin/pages')}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{page.title}</h2>
              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-widest ${
                page.is_published ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/10 text-white/40'
              }`}>
                {page.is_published ? 'Published' : 'Draft'}
              </span>
            </div>
            <p className="text-white/40 text-sm mt-1">Slug: <code className="text-brand-primary/60">{page.slug}</code></p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-6 py-3 bg-white/5 text-white/60 hover:text-white rounded-xl font-bold transition-all">
            <Eye size={18} />
            Preview
          </button>
          <button 
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </div>

      {feedback && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 ${
          feedback.type === 'success' ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20' : 'bg-white/10 text-white/60 border border-white/10'
        }`}>
          <p className="text-sm font-medium">{feedback.message}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-white/5 pb-px">
        <button 
          onClick={() => setActiveTab('content')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
            activeTab === 'content' ? 'text-brand-primary' : 'text-white/40 hover:text-white'
          }`}
        >
          <LayoutIcon size={18} />
          Page Content
          {activeTab === 'content' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
        </button>
        <button 
          onClick={() => setActiveTab('seo')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
            activeTab === 'seo' ? 'text-brand-primary' : 'text-white/40 hover:text-white'
          }`}
        >
          <Globe size={18} />
          SEO Settings
          {activeTab === 'seo' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
        </button>
        <button 
          onClick={() => setActiveTab('settings')}
          className={`flex items-center gap-2 px-6 py-4 text-sm font-bold transition-all relative ${
            activeTab === 'settings' ? 'text-brand-primary' : 'text-white/40 hover:text-white'
          }`}
        >
          <Settings size={18} />
          Page Settings
          {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
        </button>
      </div>

      {/* Editor Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'content' && (
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
              <h3 className="text-xl font-bold">Content Editor</h3>
              <p className="text-white/40 text-sm">Edit the visual content of this page. Changes will be saved to the database.</p>
              
              {/* Dynamic form based on page slug would go here */}
              <div className="space-y-6">
                {Object.entries(page.content).map(([key, value]) => (
                  <div key={key} className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/30">{key.replace(/_/g, ' ')}</label>
                    {typeof value === 'string' && value.length > 50 ? (
                      <textarea 
                        value={value || ''}
                        onChange={(e) => updateContent(key, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all min-h-[120px]"
                      />
                    ) : (
                      <input 
                        type="text"
                        value={value || ''}
                        onChange={(e) => updateContent(key, e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
              <h3 className="text-xl font-bold">SEO & Meta Tags</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Meta Title</label>
                  <input 
                    type="text"
                    value={page.seo_settings.title || ''}
                    onChange={(e) => updateSEO('title', e.target.value)}
                    placeholder="Page title for search engines"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Meta Description</label>
                  <textarea 
                    value={page.seo_settings.description || ''}
                    onChange={(e) => updateSEO('description', e.target.value)}
                    placeholder="Brief summary of the page for search results"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all min-h-[100px]"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Keywords</label>
                  <input 
                    type="text"
                    value={page.seo_settings.keywords || ''}
                    onChange={(e) => updateSEO('keywords', e.target.value)}
                    placeholder="keyword1, keyword2, keyword3"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
              <h3 className="text-xl font-bold">Page Configuration</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Page Title (Internal)</label>
                  <input 
                    type="text"
                    value={page.title || ''}
                    onChange={(e) => setPage({ ...page, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="font-bold">Published Status</p>
                    <p className="text-xs text-white/40">Visible to the public on the website.</p>
                  </div>
                  <button 
                    onClick={() => setPage({ ...page, is_published: !page.is_published })}
                    className={`w-14 h-8 rounded-full relative transition-all ${
                      page.is_published ? 'bg-brand-primary' : 'bg-white/10'
                    }`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                      page.is_published ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Page Info</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Last Updated</span>
                <span className="text-white font-medium">{new Date(page.updated_at).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Slug</span>
                <span className="text-brand-primary font-mono">{page.slug}</span>
              </div>
            </div>
          </div>

          <div className="bg-brand-primary/10 border border-brand-primary/20 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-sm text-brand-primary uppercase tracking-widest">Pro Tip</h4>
            <p className="text-sm text-white/60 leading-relaxed">
              Use clear, descriptive meta titles and descriptions to improve your search engine rankings.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageEditor;
