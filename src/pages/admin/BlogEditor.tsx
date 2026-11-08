import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, ArrowLeft, Loader2, Globe, Settings, Layout as LayoutIcon, Eye, Image as ImageIcon, Trash2, Calendar, User, Tag, FileText, Upload } from 'lucide-react';
import { blogService, BlogPost } from '../../services/blogService';
import { mediaService } from '../../services/mediaService';
import { supabase } from '../../lib/supabaseClient';

const BlogEditor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'seo' | 'settings'>('content');
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id || id === 'new') {
        const { data: { user } } = await supabase.auth.getUser();
        setPost({
          id: '',
          slug: '',
          title: '',
          content: '',
          excerpt: '',
          featured_image: '',
          status: 'draft',
          author_id: user?.id || '',
          published_at: null,
          updated_at: new Date().toISOString(),
        });
        setLoading(false);
        return;
      }

      try {
        const foundPost = await blogService.getPostById(id);
        if (foundPost) {
          setPost(foundPost);
        } else {
          setFeedback({ type: 'error', message: 'Post not found' });
        }
      } catch (error) {
        console.error('Error fetching post:', error);
        setFeedback({ type: 'error', message: 'Failed to load post' });
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleSave = async () => {
    if (!post) return;
    setSaving(true);
    setFeedback(null);
    try {
      const slug = post.slug || post.title.toLowerCase().trim().replace(/ /g, '-').replace(/[^\w-]+/g, '');
      const published_at = post.status === 'published' && !post.published_at 
        ? new Date().toISOString() 
        : post.published_at;

      if (id === 'new') {
        const newPost = await blogService.createPost({
          ...post,
          slug,
          published_at,
        });
        navigate(`/admin/blogs/${newPost.id}`, { replace: true });
        setFeedback({ type: 'success', message: 'Post created successfully' });
      } else {
        await blogService.updatePost(id!, {
          ...post,
          slug,
          published_at,
        });
        setFeedback({ type: 'success', message: 'Post updated successfully' });
      }
    } catch (error) {
      console.error('Error saving post:', error);
      setFeedback({ type: 'error', message: 'Failed to save post' });
    } finally {
      setSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !post) return;

    setIsUploading(true);
    try {
      const mediaFile = await mediaService.uploadFile(file);
      setPost({ ...post, featured_image: mediaFile.url || '' });
      setFeedback({ type: 'success', message: 'Image uploaded successfully' });
    } catch (error) {
      console.error('Error uploading image:', error);
      setFeedback({ type: 'error', message: 'Failed to upload image' });
    } finally {
      setIsUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center py-20">
        <p className="text-white/40">Post not found.</p>
        <button onClick={() => navigate('/admin/blogs')} className="mt-4 text-brand-primary font-bold">
          Go back to Blogs
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
            onClick={() => navigate('/admin/blogs')}
            className="p-3 bg-white/5 hover:bg-white/10 rounded-xl text-white/60 hover:text-white transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{post.title || 'Untitled Post'}</h2>
              <span className={`px-2 py-0.5 rounded text-xs font-bold uppercase tracking-widest ${
                post.status === 'published' ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/10 text-white/40'
              }`}>
                {post.status}
              </span>
            </div>
            <p className="text-white/40 text-sm mt-1">Slug: <code className="text-brand-primary/60">{post.slug || 'auto-generated'}</code></p>
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
          <FileText size={18} />
          Post Content
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
          Post Settings
          {activeTab === 'settings' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-primary" />}
        </button>
      </div>

      {/* Editor Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {activeTab === 'content' && (
            <div className="space-y-8">
              <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/30">Post Title</label>
                    <input 
                      type="text"
                      value={post.title || ''}
                      onChange={(e) => setPost({ ...post, title: e.target.value })}
                      placeholder="Enter a catchy title..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-2xl font-bold text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/30">Excerpt / Summary</label>
                    <textarea 
                      value={post.excerpt || ''}
                      onChange={(e) => setPost({ ...post, excerpt: e.target.value })}
                      placeholder="Brief summary for the blog list page..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all min-h-[100px]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-widest text-white/30">Main Content (Markdown Supported)</label>
                    <textarea 
                      value={post.content || ''}
                      onChange={(e) => setPost({ ...post, content: e.target.value })}
                      placeholder="Write your post content here..."
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-4 px-6 text-white focus:outline-none focus:border-brand-primary/50 transition-all min-h-[400px] font-mono text-sm leading-relaxed"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'seo' && (
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
              <h3 className="text-xl font-bold">SEO & Social Sharing</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Meta Title</label>
                  <input 
                    type="text"
                    value={post.title || ''}
                    placeholder="SEO title"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Meta Description</label>
                  <textarea 
                    value={post.excerpt || ''}
                    placeholder="SEO description"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all min-h-[100px]"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
              <h3 className="text-xl font-bold">Post Configuration</h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Slug</label>
                  <input 
                    type="text"
                    value={post.slug || ''}
                    onChange={(e) => setPost({ ...post, slug: e.target.value })}
                    placeholder="my-awesome-post"
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-widest text-white/30">Status</label>
                  <select 
                    value={post.status}
                    onChange={(e) => setPost({ ...post, status: e.target.value as any })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  >
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-8">
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Featured Image</h4>
            <div 
              onClick={() => fileInputRef.current?.click()}
              className="aspect-video bg-white/5 rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3 group cursor-pointer hover:border-brand-primary/50 transition-all overflow-hidden relative"
            >
              {isUploading ? (
                <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
              ) : post.featured_image ? (
                <>
                  <img src={post.featured_image} alt={post.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <Upload className="w-6 h-6 text-white" />
                  </div>
                </>
              ) : (
                <>
                  <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-white/20 group-hover:text-brand-primary transition-all">
                    <ImageIcon size={24} />
                  </div>
                  <p className="text-xs text-white/20 font-bold uppercase tracking-widest">Upload Image</p>
                </>
              )}
            </div>
            <input 
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </div>

          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Post Info</h4>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-white/40">Created</span>
                <span className="text-white font-medium">{new Date(post.updated_at).toLocaleDateString()}</span>
              </div>
              {post.published_at && (
                <div className="flex justify-between text-sm">
                  <span className="text-white/40">Published</span>
                  <span className="text-white font-medium">{new Date(post.published_at).toLocaleDateString()}</span>
                </div>
              )}
            </div>
          </div>

          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest text-white/30">Danger Zone</h4>
            <button 
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-white/5 text-white/40 hover:bg-white/10 hover:text-white rounded-xl font-bold transition-all"
              onClick={() => {
                if (window.confirm('Are you sure you want to delete this post? This action cannot be undone.')) {
                  blogService.deletePost(post.id).then(() => navigate('/admin/blogs'));
                }
              }}
            >
              <Trash2 size={18} />
              Delete Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogEditor;
