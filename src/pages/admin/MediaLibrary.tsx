import React, { useState, useEffect, useRef } from 'react';
import { Image, Upload, Search, Filter, Grid, List, MoreVertical, Trash2, Download, Info, Plus, X, FileText, FileCode, FileVideo, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { mediaService, MediaFile } from '../../services/mediaService';

const MediaLibrary: React.FC = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<MediaFile | null>(null);
  const [mediaItems, setMediaItems] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchMedia();
  }, []);

  const fetchMedia = async () => {
    try {
      setLoading(true);
      const data = await mediaService.getMediaFiles();
      setMediaItems(data);
    } catch (error) {
      console.error('Error fetching media:', error);
      setFeedback({ type: 'error', message: 'Failed to load media library.' });
    } finally {
      setLoading(false);
    }
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    setFeedback(null);

    try {
      for (let i = 0; i < files.length; i++) {
        await mediaService.uploadFile(files[i]);
      }
      setFeedback({ type: 'success', message: `Successfully uploaded ${files.length} file(s).` });
      fetchMedia();
    } catch (error) {
      console.error('Error uploading file:', error);
      setFeedback({ type: 'error', message: 'Failed to upload one or more files.' });
    } finally {
      setUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleDelete = async (item: MediaFile) => {
    if (!window.confirm(`Are you sure you want to delete "${item.name}"?`)) return;

    try {
      await mediaService.deleteFile(item.id, item.file_path);
      setFeedback({ type: 'success', message: 'File deleted successfully.' });
      setSelectedItem(null);
      fetchMedia();
    } catch (error) {
      console.error('Error deleting file:', error);
      setFeedback({ type: 'error', message: 'Failed to delete file.' });
    }
  };

  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const filteredMedia = mediaItems.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getIcon = (type: string) => {
    switch (type) {
      case 'image': return <Image size={24} />;
      case 'video': return <FileVideo size={24} />;
      case 'document': return <FileText size={24} />;
      case 'code': return <FileCode size={24} />;
      default: return <FileText size={24} />;
    }
  };

  return (
    <div className="space-y-10 h-full flex flex-col min-h-[calc(100vh-12rem)]">
      {/* Feedback Message */}
      {feedback && (
        <div className={`fixed top-24 right-8 z-50 flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl animate-in slide-in-from-right duration-300 ${
          feedback.type === 'success' ? 'bg-brand-primary/10 border border-brand-primary/20 text-brand-primary' : 'bg-white/10 border border-white/20 text-white/60'
        }`}>
          {feedback.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <p className="font-bold">{feedback.message}</p>
          <button onClick={() => setFeedback(null)} className="ml-4 hover:opacity-70">
            <X size={18} />
          </button>
        </div>
      )}

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Media Library</h2>
          <p className="text-white/40">Manage and organize your website assets and media files.</p>
        </div>
        <div className="flex items-center gap-4">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleUpload}
            multiple
            className="hidden"
          />
          <button 
            onClick={() => fileInputRef.current?.click()}
            disabled={uploading}
            className="flex items-center gap-2 px-8 py-4 bg-brand-primary text-white rounded-2xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all group disabled:opacity-50"
          >
            {uploading ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <Upload size={20} className="group-hover:-translate-y-1 transition-transform" />
            )}
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 relative group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-primary transition-colors" />
          <input
            type="text"
            placeholder="Search media by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#111] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-[#111] border border-white/5 p-2 rounded-2xl">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-xl transition-all ${viewMode === 'list' ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' : 'text-white/40 hover:text-white hover:bg-white/5'}`}
            >
              <List size={20} />
            </button>
          </div>
          <button className="flex items-center gap-2 px-6 py-4 bg-[#111] border border-white/5 rounded-2xl text-white/60 hover:text-white hover:bg-white/5 transition-all font-bold">
            <Filter size={18} />
            Filter
          </button>
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row gap-10 min-h-0">
        {/* Media Grid/List */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-64 text-white/20">
              <Loader2 size={48} className="animate-spin mb-4" />
              <p className="font-bold">Loading media library...</p>
            </div>
          ) : filteredMedia.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-white/20 border-2 border-dashed border-white/5 rounded-3xl">
              <Image size={48} className="mb-4" />
              <p className="font-bold">No media files found.</p>
              <p className="text-sm">Upload some files to get started.</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
              {filteredMedia.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`group relative aspect-square bg-[#111] border rounded-3xl overflow-hidden cursor-pointer transition-all duration-300 ${
                    selectedItem?.id === item.id ? 'border-brand-primary ring-2 ring-brand-primary/20' : 'border-white/5 hover:border-brand-primary/30 shadow-xl'
                  }`}
                >
                  {item.file_type === 'image' ? (
                    <img src={item.url} alt={item.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-white/20 group-hover:text-brand-primary transition-colors">
                      {getIcon(item.file_type)}
                      <span className="text-xs font-bold uppercase tracking-widest">{item.file_type}</span>
                    </div>
                  )}
                  <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <p className="text-xs font-bold text-white truncate">{item.name}</p>
                    <p className="text-xs text-white/40">{formatSize(item.file_size)}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Name</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Type</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Size</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredMedia.map((item) => (
                    <tr 
                      key={item.id} 
                      onClick={() => setSelectedItem(item)}
                      className={`hover:bg-white/[0.02] transition-colors cursor-pointer ${selectedItem?.id === item.id ? 'bg-brand-primary/5' : ''}`}
                    >
                      <td className="px-8 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-white/5 rounded-lg flex items-center justify-center text-white/20">
                            {getIcon(item.file_type)}
                          </div>
                          <p className="font-bold text-sm text-white">{item.name}</p>
                        </div>
                      </td>
                      <td className="px-8 py-4">
                        <span className="text-xs font-bold uppercase tracking-widest text-white/40 capitalize">{item.file_type}</span>
                      </td>
                      <td className="px-8 py-4 text-xs text-white/40">{formatSize(item.file_size)}</td>
                      <td className="px-8 py-4 text-xs text-white/40">{formatDate(item.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selectedItem && (
          <div className="w-full lg:w-80 space-y-6 animate-in slide-in-from-right duration-300">
            <div className="bg-[#111] border border-white/5 rounded-3xl p-6 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold tracking-tight">File Details</h3>
                <button onClick={() => setSelectedItem(null)} className="text-white/20 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <div className="aspect-square bg-white/5 rounded-2xl overflow-hidden flex items-center justify-center text-white/10 border border-white/5">
                {selectedItem.file_type === 'image' ? (
                  <img src={selectedItem.url} alt={selectedItem.name} className="w-full h-full object-contain" />
                ) : (
                  getIcon(selectedItem.file_type)
                )}
              </div>

              <div className="space-y-4">
                <div>
                  <p className="text-xs text-white/30 uppercase font-bold tracking-widest mb-1">File Name</p>
                  <p className="text-sm font-bold break-all">{selectedItem.name}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-white/30 uppercase font-bold tracking-widest mb-1">File Type</p>
                    <p className="text-sm font-bold capitalize">{selectedItem.file_type}</p>
                  </div>
                  <div>
                    <p className="text-xs text-white/30 uppercase font-bold tracking-widest mb-1">File Size</p>
                    <p className="text-sm font-bold">{formatSize(selectedItem.file_size)}</p>
                  </div>
                </div>
                {selectedItem.dimensions && (
                  <div>
                    <p className="text-xs text-white/30 uppercase font-bold tracking-widest mb-1">Dimensions</p>
                    <p className="text-sm font-bold">{selectedItem.dimensions}</p>
                  </div>
                )}
                <div>
                  <p className="text-xs text-white/30 uppercase font-bold tracking-widest mb-1">Uploaded On</p>
                  <p className="text-sm font-bold">{formatDate(selectedItem.created_at)}</p>
                </div>
              </div>

              <div className="pt-4 flex flex-col gap-3">
                <a 
                  href={selectedItem.url} 
                  download={selectedItem.name}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-brand-primary text-white rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-brand-primary/90 transition-all shadow-lg shadow-brand-primary/20"
                >
                  <Download size={16} />
                  Download File
                </a>
                <div className="grid grid-cols-2 gap-3">
                  <button className="py-3 bg-white/5 text-white/60 rounded-xl font-bold flex items-center justify-center gap-2 hover:text-white hover:bg-white/10 transition-all">
                    <Info size={16} />
                    Edit Info
                  </button>
                  <button 
                    onClick={() => handleDelete(selectedItem)}
                    className="py-3 bg-white/5 text-white/40 rounded-xl font-bold flex items-center justify-center gap-2 hover:bg-white/10 hover:text-white transition-all"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MediaLibrary;
