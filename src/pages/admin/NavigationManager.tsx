import React, { useState, useEffect } from 'react';
import { Menu, Plus, Save, RotateCcw, GripVertical, Edit3, Trash2, ExternalLink, ChevronRight, CheckCircle2, X, Loader2, AlertCircle } from 'lucide-react';
import { navigationService, NavigationItem } from '../../services/navigationService';

const NavigationManager: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<'header' | 'footer'>('header');
  const [navItems, setNavItems] = useState<NavigationItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    fetchNavigation();
  }, [activeMenu]);

  const fetchNavigation = async () => {
    try {
      setLoading(true);
      const data = await navigationService.getNavigationItems(activeMenu);
      setNavItems(data);
      setHasChanges(false);
    } catch (error) {
      console.error('Error fetching navigation:', error);
      setFeedback({ type: 'error', message: 'Failed to load navigation items.' });
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setFeedback(null);
      await navigationService.updateNavigationItems(navItems);
      setFeedback({ type: 'success', message: 'Navigation updated successfully.' });
      setHasChanges(false);
    } catch (error) {
      console.error('Error saving navigation:', error);
      setFeedback({ type: 'error', message: 'Failed to save navigation changes.' });
    } finally {
      setSaving(false);
    }
  };

  const addItem = () => {
    const newItem: NavigationItem = {
      id: crypto.randomUUID(),
      label: 'New Link',
      route: '/',
      status: 'active',
      type: 'internal',
      order_index: navItems.length,
      menu_type: activeMenu
    };
    setNavItems([...navItems, newItem]);
    setHasChanges(true);
  };

  const updateItem = (id: string, updates: Partial<NavigationItem>) => {
    setNavItems(prev => prev.map(item => 
      item.id === id ? { ...item, ...updates } : item
    ));
    setHasChanges(true);
  };

  const toggleStatus = (id: string) => {
    const item = navItems.find(i => i.id === id);
    if (item) {
      updateItem(id, { status: item.status === 'active' ? 'disabled' : 'active' });
    }
  };

  const removeItem = async (id: string) => {
    if (!window.confirm('Are you sure you want to remove this navigation item?')) return;
    
    try {
      // If it's a new item (not in DB yet), just filter it out
      const itemToDelete = navItems.find(i => i.id === id);
      if (itemToDelete && itemToDelete.created_at) {
        await navigationService.deleteNavigationItem(id);
      }
      setNavItems(prev => prev.filter(item => item.id !== id));
      setFeedback({ type: 'success', message: 'Item removed successfully.' });
    } catch (error) {
      console.error('Error deleting item:', error);
      setFeedback({ type: 'error', message: 'Failed to delete item.' });
    }
  };

  const moveItem = (index: number, direction: 'up' | 'down') => {
    const newItems = [...navItems];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    
    if (targetIndex < 0 || targetIndex >= newItems.length) return;
    
    [newItems[index], newItems[targetIndex]] = [newItems[targetIndex], newItems[index]];
    setNavItems(newItems);
    setHasChanges(true);
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
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

      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Navigation Manager</h2>
          <p className="text-white/40">Manage your website's header and footer navigation menus.</p>
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

      {/* Tabs */}
      <div className="flex items-center gap-2 bg-[#111] border border-white/5 p-2 rounded-2xl w-fit">
        <button
          onClick={() => setActiveMenu('header')}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeMenu === 'header' 
              ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
              : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <Menu size={18} />
          Header Menu
        </button>
        <button
          onClick={() => setActiveMenu('footer')}
          className={`px-8 py-3 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
            activeMenu === 'footer' 
              ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
              : 'text-white/40 hover:text-white hover:bg-white/5'
          }`}
        >
          <ChevronRight size={18} />
          Footer Links
        </button>
      </div>

      <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
        <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
          <h3 className="text-lg font-bold tracking-tight capitalize">{activeMenu} Navigation Items</h3>
          <button 
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2 bg-brand-primary/10 text-brand-primary rounded-xl text-xs font-bold hover:bg-brand-primary hover:text-white transition-all"
          >
            <Plus size={14} />
            Add Menu Item
          </button>
        </div>

        <div className="divide-y divide-white/5">
          {loading ? (
            <div className="p-20 flex flex-col items-center justify-center text-white/20">
              <Loader2 size={40} className="animate-spin mb-4" />
              <p className="font-bold">Loading navigation...</p>
            </div>
          ) : navItems.length === 0 ? (
            <div className="p-20 flex flex-col items-center justify-center text-white/20">
              <Menu size={40} className="mb-4" />
              <p className="font-bold">No navigation items found.</p>
              <button onClick={addItem} className="mt-4 text-brand-primary hover:underline text-sm font-bold">Add your first item</button>
            </div>
          ) : navItems.map((item, index) => (
            <div key={item.id} className="p-6 flex items-center gap-6 hover:bg-white/[0.01] transition-colors group">
              <div className="flex flex-col gap-1 text-white/20">
                <button 
                  onClick={() => moveItem(index, 'up')}
                  disabled={index === 0}
                  className="hover:text-brand-primary disabled:opacity-0 transition-all"
                >
                  <ChevronRight size={16} className="-rotate-90" />
                </button>
                <div className="cursor-grab active:cursor-grabbing hover:text-brand-primary transition-colors">
                  <GripVertical size={20} />
                </div>
                <button 
                  onClick={() => moveItem(index, 'down')}
                  disabled={index === navItems.length - 1}
                  className="hover:text-brand-primary disabled:opacity-0 transition-all"
                >
                  <ChevronRight size={16} className="rotate-90" />
                </button>
              </div>
              
              <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Link Label</p>
                  <input
                    type="text"
                    value={item.label || ''}
                    onChange={(e) => updateItem(item.id, { label: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all font-bold"
                  />
                </div>
                <div className="space-y-1">
                  <p className="text-xs text-white/30 uppercase font-bold tracking-widest">Route / URL</p>
                  <div className="relative">
                    <input
                      type="text"
                      value={item.route || ''}
                      onChange={(e) => updateItem(item.id, { route: e.target.value })}
                      className="w-full bg-white/5 border border-white/10 rounded-xl py-2 px-4 text-sm text-white focus:outline-none focus:border-brand-primary/50 transition-all font-mono"
                    />
                    <button 
                      onClick={() => updateItem(item.id, { type: item.type === 'internal' ? 'external' : 'internal' })}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-brand-primary transition-colors"
                      title={`Switch to ${item.type === 'internal' ? 'External' : 'Internal'} Link`}
                    >
                      {item.type === 'internal' ? <ChevronRight size={14} /> : <ExternalLink size={14} />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <button 
                  onClick={() => toggleStatus(item.id)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest border transition-all ${
                    item.status === 'active' 
                      ? 'bg-brand-primary/10 text-brand-primary border-brand-primary/20' 
                      : 'bg-white/5 text-white/20 border-white/10 hover:text-white/40'
                  }`}
                >
                  {item.status}
                </button>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => removeItem(item.id)}
                    className="p-2 text-white/20 hover:text-white hover:bg-white/10 rounded-lg transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="p-8 bg-white/[0.02] border-t border-white/5">
          <div className="bg-brand-primary/5 border border-brand-primary/20 rounded-2xl p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary shrink-0">
              <CheckCircle2 size={20} />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-sm">Navigation Best Practice</h4>
              <p className="text-xs text-white/40 leading-relaxed">
                Keep your primary navigation to 5-7 items for optimal user experience. Use clear, descriptive labels that help users find what they're looking for quickly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationManager;
