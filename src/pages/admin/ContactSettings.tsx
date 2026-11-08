import React, { useState, useEffect } from 'react';
import { Phone, Mail, Clock, MapPin, Save, RotateCcw, CheckCircle2, AlertCircle, Info, MessageSquare, User, Calendar, DollarSign, ExternalLink, MoreVertical, Search, Filter, Eye, Loader2, Trash2 } from 'lucide-react';
import { inquiryService, Inquiry } from '../../services/inquiryService';

const ContactSettings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'inquiries'>('settings');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);
  
  const [settings, setSettings] = useState({
    recipient_email: '',
    success_message: '',
    error_message: '',
    consultation_cta: '',
    consultation_link: '',
  });

  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'closed'>('all');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [settingsData, inquiriesData] = await Promise.all([
        inquiryService.getSettings(),
        inquiryService.getInquiries()
      ]);
      setSettings(settingsData);
      setInquiries(inquiriesData);
    } catch (error) {
      console.error('Error fetching contact data:', error);
      setMessage({ type: 'error', text: 'Failed to load contact data.' });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string, value: string) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveSettings = async () => {
    setSaving(true);
    setMessage(null);
    try {
      await inquiryService.updateSettings(settings);
      setMessage({ type: 'success', text: 'Settings saved successfully!' });
    } catch (error) {
      console.error('Error saving settings:', error);
      setMessage({ type: 'error', text: 'Failed to save settings.' });
    } finally {
      setSaving(false);
    }
  };

  const handleUpdateStatus = async (id: string, status: 'new' | 'contacted' | 'closed') => {
    try {
      const updated = await inquiryService.updateInquiryStatus(id, status);
      setInquiries(prev => prev.map(inq => inq.id === id ? updated : inq));
    } catch (error) {
      console.error('Error updating status:', error);
      setMessage({ type: 'error', text: 'Failed to update inquiry status.' });
    }
  };

  const handleDeleteInquiry = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      await inquiryService.deleteInquiry(id);
      setInquiries(prev => prev.filter(inq => inq.id !== id));
      setMessage({ type: 'success', text: 'Inquiry deleted.' });
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      setMessage({ type: 'error', text: 'Failed to delete inquiry.' });
    }
  };

  const filteredInquiries = inquiries.filter(inq => {
    const matchesSearch = 
      inq.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      inq.service.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || inq.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const newInquiriesCount = inquiries.filter(inq => inq.status === 'new').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-8 h-8 text-brand-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Contact & Inquiry Settings</h2>
          <p className="text-white/40">Manage how you receive and handle inquiries from your website.</p>
        </div>
        {activeTab === 'settings' && (
          <button 
            onClick={handleSaveSettings}
            disabled={saving}
            className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all disabled:opacity-50"
          >
            {saving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        )}
      </div>

      {message && (
        <div className={`p-4 rounded-2xl flex items-center gap-3 ${
          message.type === 'success' ? 'bg-brand-primary/10 text-brand-primary border border-brand-primary/20' : 'bg-white/10 text-white/60 border border-white/10'
        }`}>
          {message.type === 'success' ? <CheckCircle2 size={20} /> : <AlertCircle size={20} />}
          <p className="text-sm font-bold">{message.text}</p>
        </div>
      )}

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-[#111] border border-white/5 p-2 rounded-2xl w-fit">
        <button
          onClick={() => setActiveTab('settings')}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'settings' 
              ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
              : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <Phone size={18} />
          Contact Settings
        </button>
        <button
          onClick={() => setActiveTab('inquiries')}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeTab === 'inquiries' 
              ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
              : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageSquare size={18} />
          Recent Inquiries
          {newInquiriesCount > 0 && (
            <span className="bg-brand-primary/20 text-brand-primary px-2 py-0.5 rounded-full text-xs">
              {newInquiriesCount} New
            </span>
          )}
        </button>
      </div>

      {activeTab === 'settings' ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2 space-y-8">
            {/* Form Settings */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                  <Mail size={20} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Form Configuration</h3>
              </div>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">Inquiry Recipient Email</label>
                  <input
                    type="email"
                    value={settings.recipient_email || ''}
                    onChange={(e) => handleChange('recipient_email', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                  <p className="text-xs text-white/30 px-1">All website inquiries will be sent to this address.</p>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">Success Message</label>
                  <textarea
                    rows={3}
                    value={settings.success_message || ''}
                    onChange={(e) => handleChange('success_message', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">Error Message</label>
                  <textarea
                    rows={3}
                    value={settings.error_message || ''}
                    onChange={(e) => handleChange('error_message', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all resize-none"
                  />
                </div>
              </div>
            </div>

            {/* CTA Settings */}
            <div className="bg-[#111] border border-white/5 rounded-3xl p-8 space-y-8">
              <div className="flex items-center gap-4 mb-2">
                <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                  <ExternalLink size={20} />
                </div>
                <h3 className="text-xl font-bold tracking-tight">Consultation CTA</h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">CTA Button Text</label>
                  <input
                    type="text"
                    value={settings.consultation_cta || ''}
                    onChange={(e) => handleChange('consultation_cta', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">CTA Link / Route</label>
                  <input
                    type="text"
                    value={settings.consultation_link || ''}
                    onChange={(e) => handleChange('consultation_link', e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Business Info Preview */}
          <div className="lg:col-span-1 space-y-6 sticky top-24 h-fit">
            <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
              Contact Card Preview
              <div className="h-[1px] flex-1 bg-white/5" />
            </h3>
            <div className="bg-[#111] border border-white/10 rounded-[2.5rem] p-8 space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
              
              <div className="space-y-6 relative z-10">
                <div className="space-y-2">
                  <h4 className="text-2xl font-bold tracking-tight">Let's Build <span className="text-brand-primary">Something.</span></h4>
                  <p className="text-sm text-white/40 leading-relaxed">Have a project in mind? We'd love to hear from you.</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-brand-primary">
                      <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Email Us</p>
                      <p className="text-sm font-bold">info@conversionfoxx.com</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-brand-primary">
                      <Phone size={18} />
                    </div>
                    <div>
                      <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Call Us</p>
                      <p className="text-sm font-bold">+91 79901 26349</p>
                    </div>
                  </div>
                </div>

                <button className="w-full py-4 bg-brand-primary text-white rounded-2xl font-bold shadow-lg shadow-brand-primary/20">
                  {settings.consultation_cta || 'Book Your Strategy Session'}
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Inquiry Toolbar */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-primary transition-colors" />
              <input
                type="text"
                placeholder="Search inquiries by name, email, or service..."
                value={searchTerm || ''}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#111] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as any)}
                className="appearance-none bg-[#111] border border-white/5 rounded-2xl py-4 pl-12 pr-10 text-white/60 focus:outline-none focus:border-brand-primary/50 transition-all font-bold cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="closed">Closed</option>
              </select>
            </div>
          </div>

          {/* Inquiries Table */}
          <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Client</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Service & Budget</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Status</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30">Date</th>
                    <th className="px-8 py-5 text-xs font-bold uppercase tracking-widest text-white/30 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {filteredInquiries.length > 0 ? (
                    filteredInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-white/[0.02] transition-colors group">
                        <td className="px-8 py-6">
                          <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary font-bold text-xs uppercase">
                              {inquiry.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div>
                              <p className="font-bold text-white group-hover:text-brand-primary transition-colors">{inquiry.name}</p>
                              <p className="text-xs text-white/30 mt-0.5">{inquiry.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <div className="space-y-1">
                            <p className="text-sm font-bold text-white/80">{inquiry.service}</p>
                            <p className="text-xs text-white/30 flex items-center gap-1">
                              <DollarSign size={10} />
                              {inquiry.budget}
                            </p>
                          </div>
                        </td>
                        <td className="px-8 py-6">
                          <select
                            value={inquiry.status}
                            onChange={(e) => handleUpdateStatus(inquiry.id, e.target.value as any)}
                            className={`bg-transparent border-none text-xs font-bold uppercase tracking-widest focus:ring-0 cursor-pointer ${
                              inquiry.status === 'new' 
                                ? 'text-brand-primary' 
                                : inquiry.status === 'contacted'
                                ? 'text-white/60'
                                : 'text-white/30'
                            }`}
                          >
                            <option value="new" className="bg-[#111]">New</option>
                            <option value="contacted" className="bg-[#111]">Contacted</option>
                            <option value="closed" className="bg-[#111]">Closed</option>
                          </select>
                        </td>
                        <td className="px-8 py-6 text-xs text-white/40">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-8 py-6 text-right">
                          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button 
                              onClick={() => handleDeleteInquiry(inquiry.id)}
                              className="p-2 text-white/40 hover:text-white hover:bg-white/10 rounded-lg transition-all" 
                              title="Delete Inquiry"
                            >
                              <Trash2 size={18} />
                            </button>
                            <button className="p-2 text-white/40 hover:text-white hover:bg-white/5 rounded-lg transition-all">
                              <Eye size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="px-8 py-12 text-center text-white/30">
                        No inquiries found matching your criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactSettings;

