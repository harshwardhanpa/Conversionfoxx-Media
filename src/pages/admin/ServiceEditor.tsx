import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, Globe, Settings, Layout as LayoutIcon, Eye, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { servicePageService, ServicePage } from '../../services/servicePageService';

const ServiceEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [service, setService] = useState<ServicePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const fetchService = async () => {
      if (!id) return;
      try {
        const services = await servicePageService.getServicePages();
        const foundService = services.find(s => s.id === id);
        if (foundService) {
          setService(foundService);
        } else {
          setFeedback({ type: 'error', message: 'Service not found' });
        }
      } catch (error) {
        console.error('Error fetching service:', error);
        setFeedback({ type: 'error', message: 'Failed to load service' });
      } finally {
        setLoading(false);
      }
    };

    fetchService();
  }, [id]);

  const handleSave = async () => {
    if (!service || !id) return;
    setSaving(true);
    setFeedback(null);
    try {
      await servicePageService.updateServicePage(id, {
        title: service.title,
        slug: service.slug,
        description: service.description,
        content: service.content,
        image_url: service.image_url,
        is_active: service.is_active,
      });
      setFeedback({ type: 'success', message: 'Service updated successfully' });
    } catch (error) {
      console.error('Error saving service:', error);
      setFeedback({ type: 'error', message: 'Failed to save service' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!service) {
    return (
      <div className="text-center py-20">
        <p className="text-white/40">Service not found.</p>
        <button onClick={() => navigate('/admin/services')} className="mt-4 text-brand-primary font-bold">
          Go back to Services
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
            onClick={() => navigate('/admin/services')}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{service.title}</h2>
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-widest ${
                service.is_active ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/10 text-white/40'
              }`}>
                {service.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="text-white/40 text-sm mt-1">Slug: <code className="text-brand-primary/60">{service.slug}</code></p>
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
          Service Content
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
          General Settings
          {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
        </button>
      </div>

      {/* Editor Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'content' && (
            <div className="space-y-8">
              <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
                <h3 className="text-xl font-bold">Main Content</h3>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/30">Service Description</label>
                    <textarea 
                      value={service.description || ''}
                      onChange={(e) => setService({ ...service, description: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all min-h-[120px]"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Content Sections */}
              <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-bold">Features / Benefits</h3>
                  <button className="flex items-center gap-2 text-brand-primary text-sm font-bold hover:text-white transition-all">
                    <Plus size={16} />
                    Add Item
                  </button>
                </div>
                <div className="space-y-4">
                  {/* Placeholder for dynamic items */}
                  <p className="text-white/20 text-sm italic">No items added yet.</p>
                </div>
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
                    value={service.title || ''}
                    placeholder="Page title for search engines"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Meta Description</label>
                  <textarea 
                    value={service.description || ''}
                    placeholder="Brief summary of the service for search results"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
              <h3 className="text-xl font-bold">Service Configuration</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Service Name</label>
                  <input 
                    type="text"
                    value={service.title || ''}
                    onChange={(e) => setService({ ...service, title: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Slug</label>
                  <input 
                    type="text"
                    value={service.slug || ''}
                    onChange={(e) => setService({ ...service, slug: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
                <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                  <div>
                    <p className="font-bold">Active Status</p>
                    <p className="text-xs text-white/40">Visible to the public on the website.</p>
                  </div>
                  <button 
                    onClick={() => setService({ ...service, is_active: !service.is_active })}
                    className={`w-14 h-8 rounded-full relative transition-all ${
                      service.is_active ? 'bg-brand-primary' : 'bg-white/10'
                    }`}
                  >
                    <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${
                      service.is_active ? 'left-7' : 'left-1'
                    }`} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Featured Image</h4>
            <div className="aspect-video bg-white/5 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-brand-primary/50 transition-all overflow-hidden relative">
              {service.image_url ? (
                <img src={service.image_url} alt={service.title} className="w-full h-full object-cover" />
              ) : (
                <>
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/20 group-hover:text-brand-primary transition-all">
                    <ImageIcon size={24} />
                  </div>
                  <p className="text-xs text-white/20 font-bold uppercase tracking-widest">Upload Image</p>
                </>
              )}
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Danger Zone</h4>
            <button 
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white/40 hover:bg-white/10 hover:text-white rounded-xl font-bold transition-all"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this service? This action cannot be undone.')) {
                  servicePageService.deleteServicePage(service.id).then(() => navigate('/admin/services'));
                }
              }}
            >
              <Trash2 size={18} />
              Delete Service
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceEditor;
