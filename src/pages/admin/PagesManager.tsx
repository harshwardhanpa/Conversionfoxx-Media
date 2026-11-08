import React, { useState, useEffect } from 'react';
import { FileText, Edit3, Eye, Search, Plus, Filter, ChevronRight, MoreVertical, CheckCircle2, Clock, X, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { pageService, Page } from '../../services/pageService';

const PagesManager: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [pages, setPages] = useState<Page[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPages = async () => {
      try {
        const data = await pageService.getPages();
        setPages(data);
      } catch (error) {
        console.error('Error fetching pages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPages();
  }, []);

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          page.slug.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || 
                          (statusFilter === 'published' ? page.is_published : !page.is_published);
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Page Content Manager</h2>
          <p className="text-white/40">Manage and edit the content of your website pages.</p>
        </div>
        <button className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all group">
          <Plus size={20} className="group-hover:rotate-90 transition-transform" />
          Create New Page
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-primary transition-colors" />
          <input
            type="text"
            placeholder="Search pages by title or slug..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
          />
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          )}
        </div>
        <div className="flex items-center gap-3 bg-[#111] border border-white/5 p-2 rounded-2xl">
          {(['all', 'published', 'draft'] as const).map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-6 py-2 rounded-xl text-sm font-bold capitalize transition-all ${
                statusFilter === status 
                  ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Pages List */}
      <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Page Title</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Slug</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Status</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Last Updated</th>
                <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-white/[0.02] transition-colors group">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                        <FileText size={20} />
                      </div>
                      <div>
                        <p className="font-bold text-white group-hover:text-brand-primary transition-colors">{page.title}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <code className="text-xs font-mono text-white/40 bg-white/5 px-2 py-1 rounded-md">{page.slug}</code>
                  </td>
                  <td className="px-8 py-6">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest ${
                      page.is_published 
                        ? 'bg-brand-primary/20 text-brand-primary border border-brand-primary/20' 
                        : 'bg-white/5 text-white/40 border border-white/5'
                    }`}>
                      {page.is_published ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                      {page.is_published ? 'published' : 'draft'}
                    </div>
                  </td>
                  <td className="px-8 py-6 text-sm text-white/40">
                    {new Date(page.updated_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all" title="Preview">
                        <Eye size={18} />
                      </button>
                      <Link to={`/admin/pages/${page.id}`} className="p-2 text-white/40 hover:text-brand-primary hover:bg-brand-primary/10 rounded-lg transition-all" title="Edit Content">
                        <Edit3 size={18} />
                      </Link>
                      <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filteredPages.length === 0 && (
          <div className="p-20 text-center space-y-4">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto text-white/20">
              <Search size={40} />
            </div>
            <p className="text-white/40 font-medium">No pages found matching your search criteria.</p>
            <button 
              onClick={() => { setSearchTerm(''); setStatusFilter('all'); }}
              className="text-brand-primary font-bold hover:text-white transition-colors"
            >
              Clear all filters
            </button>
          </div>
        )}
        <div className="p-6 bg-white/[0.02] border-t border-white/5 flex items-center justify-between text-xs text-white/30">
          <p>Showing {filteredPages.length} of {pages.length} pages</p>
          <div className="flex items-center gap-4">
            <button disabled className="hover:text-white transition-colors disabled:opacity-30">Previous</button>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 bg-brand-primary text-white rounded flex items-center justify-center font-bold">1</span>
            </div>
            <button disabled className="hover:text-white transition-colors disabled:opacity-30">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PagesManager;
