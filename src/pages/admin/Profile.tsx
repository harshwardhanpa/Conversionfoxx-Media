import React, { useState } from 'react';
import { User, Mail, Shield, Lock, Save, RotateCcw, Camera, Bell, Monitor, LogOut, ChevronRight, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    name: 'Harsh Parmar',
    email: 'harshparmar2898@gmail.com',
    role: 'Owner / Administrator',
    bio: 'Founder of ConversionFoxx. Managing digital strategy and technical solutions.',
    notifications: true,
    twoFactor: false,
  });

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className="space-y-10 max-w-5xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-2">Admin Profile</h2>
          <p className="text-white/40">Manage your personal information and security settings.</p>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-6 py-3 rounded-xl text-white/40 hover:bg-white/5 hover:text-white transition-all font-bold"
          >
            <LogOut size={18} />
            Logout
          </button>
          <button className="flex items-center gap-2 px-8 py-3 bg-brand-primary text-white rounded-xl font-bold shadow-lg shadow-brand-primary/20 hover:bg-brand-primary/90 transition-all">
            <Save size={18} />
            Save Changes
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Profile Card */}
        <div className="lg:col-span-1 space-y-8">
          <div className="bg-[#111] border border-white/5 rounded-[2.5rem] p-8 text-center space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-[40px] rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative inline-block group">
              <div className="w-32 h-32 rounded-full bg-brand-primary/20 border-4 border-brand-primary/30 flex items-center justify-center text-brand-primary text-4xl font-bold shadow-2xl group-hover:scale-105 transition-transform duration-500">
                HP
              </div>
              <button className="absolute bottom-0 right-0 w-10 h-10 bg-brand-primary text-white rounded-full flex items-center justify-center border-4 border-[#111] hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="text-2xl font-bold tracking-tight">{profile.name}</h3>
              <p className="text-brand-primary text-xs font-bold uppercase tracking-widest">{profile.role}</p>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Status</span>
                <span className="text-brand-primary font-bold flex items-center gap-1">
                  <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse" />
                  Active
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Last Login</span>
                <span className="text-white/60">2 hours ago</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/40">Member Since</span>
                <span className="text-white/60">Jan 2026</span>
              </div>
            </div>
          </div>

          {/* Security Summary */}
          <div className="bg-[#111] border border-white/5 rounded-3xl p-6 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/30">Security Summary</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 size={16} className="text-brand-primary" />
                <span className="text-white/60">Email Verified</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <AlertCircle size={16} className="text-brand-primary" />
                <span className="text-white/60">2FA Not Enabled</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <CheckCircle2 size={16} className="text-brand-primary" />
                <span className="text-white/60">Strong Password</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Info */}
          <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <User size={20} />
              </div>
              <h3 className="text-lg font-bold tracking-tight">Personal Information</h3>
            </div>
            <div className="p-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">Full Name</label>
                  <input
                    type="text"
                    value={profile.name || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-white/60 ml-1">Email Address</label>
                  <input
                    type="email"
                    value={profile.email || ''}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-white/60 ml-1">Bio / Role Description</label>
                <textarea
                  rows={3}
                  value={profile.bio || ''}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-4 text-white focus:outline-none focus:border-brand-primary/50 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Security Settings */}
          <div className="bg-[#111] border border-white/5 rounded-3xl overflow-hidden">
            <div className="p-6 border-b border-white/5 flex items-center gap-4 bg-white/[0.02]">
              <div className="w-10 h-10 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                <Shield size={20} />
              </div>
              <h3 className="text-lg font-bold tracking-tight">Security Settings</h3>
            </div>
            <div className="p-8 space-y-8">
              <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-brand-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                    <Lock size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Change Password</h4>
                    <p className="text-xs text-white/40">Last changed 3 months ago</p>
                  </div>
                </div>
                <button className="px-6 py-2 bg-white/5 hover:bg-brand-primary hover:text-white rounded-xl text-xs font-bold transition-all">
                  Update
                </button>
              </div>

              <div className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/5 group hover:border-brand-primary/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                    <Shield size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold">Two-Factor Authentication</h4>
                    <p className="text-xs text-white/40">Add an extra layer of security</p>
                  </div>
                </div>
                <div className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" checked={profile.twoFactor} onChange={() => setProfile(p => ({ ...p, twoFactor: !p.twoFactor }))} />
                  <div className="w-11 h-6 bg-white/10 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-brand-primary"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
