import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Settings, 
  Palette, 
  FileText, 
  Briefcase, 
  PenTool, 
  Search, 
  Image, 
  Navigation, 
  Layout as LayoutIcon, 
  Phone, 
  User, 
  LogOut, 
  ChevronRight, 
  X,
  Bell,
  ExternalLink,
  Menu
} from 'lucide-react';
import { useAdminAuth } from '../../../context/AdminAuthContext';
import { Logo } from '../../ui/Logo';

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
  onClick?: () => void;
}

const SidebarItem: React.FC<SidebarItemProps> = ({ to, icon, label, active, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
      active 
        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
        : 'text-white/60 hover:text-white hover:bg-white/5'
    }`}
  >
    <span className={`${active ? 'text-white' : 'text-brand-primary group-hover:scale-110 transition-transform'}`}>
      {icon}
    </span>
    <span className="font-medium">{label}</span>
    {active && <ChevronRight className="ml-auto w-4 h-4" />}
  </Link>
);

const AdminLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { logout, user } = useAdminAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { to: '/admin/dashboard', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/site-settings', icon: <Settings size={20} />, label: 'Site Settings' },
    { to: '/admin/branding', icon: <Palette size={20} />, label: 'Branding' },
    { to: '/admin/pages', icon: <FileText size={20} />, label: 'Pages' },
    { to: '/admin/services', icon: <Briefcase size={20} />, label: 'Services' },
    { to: '/admin/blogs', icon: <PenTool size={20} />, label: 'Blog Manager' },
    { to: '/admin/seo', icon: <Search size={20} />, label: 'SEO Settings' },
    { to: '/admin/media', icon: <Image size={20} />, label: 'Media Library' },
    { to: '/admin/navigation', icon: <Navigation size={20} />, label: 'Navigation' },
    { to: '/admin/footer', icon: <LayoutIcon size={20} />, label: 'Footer' },
    { to: '/admin/contact-settings', icon: <Phone size={20} />, label: 'Contact Settings' },
    { to: '/admin/profile', icon: <User size={20} />, label: 'Admin Profile' },
  ];

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const currentPageLabel = menuItems.find(item => item.to === location.pathname)?.label || 'Admin Panel';

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white flex overflow-hidden font-sans">
      {/* Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 w-72 bg-[#111] border-r border-white/5 z-50 transition-transform duration-300 lg:relative lg:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col p-6">
          <div className="flex items-center justify-between mb-10">
            <Link to="/admin/dashboard" className="flex items-center gap-2">
              <Logo className="w-8 h-8" />
              <span className="text-xl font-bold tracking-tight">Conversion<span className="text-brand-primary">Foxx</span></span>
            </Link>
            <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-white/60 hover:text-white">
              <X size={24} />
            </button>
          </div>

          <nav className="flex-1 space-y-2 overflow-y-auto pr-2 custom-scrollbar">
            <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-4 px-4">Management</div>
            {menuItems.map((item) => (
              <SidebarItem
                key={item.to}
                {...item}
                active={location.pathname === item.to}
                onClick={() => setIsSidebarOpen(false)}
              />
            ))}
          </nav>

          <div className="mt-auto pt-6 border-t border-white/5">
            <button 
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all duration-300"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Topbar */}
        <header className="h-20 bg-[#111]/80 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-6 lg:px-10 sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="lg:hidden p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-bold tracking-tight hidden sm:block">{currentPageLabel}</h1>
          </div>

          <div className="flex items-center gap-4 lg:gap-6">
            <Link 
              to="/" 
              target="_blank"
              className="hidden md:flex items-center gap-2 text-sm text-white/60 hover:text-brand-primary transition-colors"
            >
              <ExternalLink size={16} />
              View Site
            </Link>
            <button className="p-2 text-white/60 hover:text-white hover:bg-white/5 rounded-lg relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-brand-primary rounded-full" />
            </button>
            <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-bold">{user?.email?.split('@')[0] || 'Owner'}</p>
                <p className="text-xs text-white/40 uppercase tracking-widest">Owner</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-brand-primary/20 border border-brand-primary/30 flex items-center justify-center text-brand-primary font-bold uppercase">
                {user?.email?.[0] || 'O'}
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
