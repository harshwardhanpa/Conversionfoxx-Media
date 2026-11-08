import React from 'react';
import { motion } from 'motion/react';
import { 
  TrendingUp, 
  Users, 
  ArrowUpRight, 
  Activity,
  BarChart3,
  MousePointer2,
  PieChart,
  Layout
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import { useResponsiveAnimation } from './utils/useResponsiveAnimation';

const data = [
  { name: 'Mon', value: 420 },
  { name: 'Tue', value: 380 },
  { name: 'Wed', value: 650 },
  { name: 'Thu', value: 890 },
  { name: 'Fri', value: 720 },
  { name: 'Sat', value: 1100 },
  { name: 'Sun', value: 1250 },
];

const DashboardMockup: React.FC = () => {
  const { getTransition, adjustY, isMobile } = useResponsiveAnimation();

  return (
    <div className="relative w-full max-w-[480px] mx-auto lg:ml-auto group">
      <motion.div
        initial={{ opacity: 0, y: adjustY(40) }}
        animate={{ opacity: 1, y: 0 }}
        transition={getTransition({ duration: 0.8, ease: [0.22, 1, 0.36, 1] })}
        className="relative z-10"
      >
        {/* Main Dashboard Window */}
        <div className="rounded-2xl shadow-[0_40px_80px_-15px_rgba(0,0,0,0.9)] overflow-hidden glass border border-brand-border-card shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]">
          {/* Header */}
          <div className="px-6 py-4 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-[#FF5F57] shadow-lg shadow-[#FF5F57]/20" />
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E] shadow-lg shadow-[#FFBD2E]/20" />
                <div className="w-3 h-3 rounded-full bg-[#28C840] shadow-lg shadow-[#28C840]/20" />
              </div>
              <div className="ml-4 h-6 w-px bg-white/10" />
              <div className="ml-4 flex items-center gap-2 text-xs font-sans font-bold text-white/60 uppercase tracking-[0.2em]">
                <span className="font-bold text-white tracking-widest text-[10px]">Revenue OS</span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-[120px] rounded-lg bg-white/5 border border-white/10 flex items-center px-3">
                <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: '65%' }}
                    transition={{ duration: 1.2, delay: 0.5 }}
                    className="h-full bg-brand-primary" 
                  />
                </div>
              </div>
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center p-1.5 ring-2 ring-white/5">
                <Layout className="w-4 h-4 text-white/50" />
              </div>
            </div>
          </div>

          <div className="flex">
            {/* Sidebar Left */}
            <div className="w-16 border-r border-white/5 bg-white/[0.01] hidden sm:flex flex-col items-center py-6 gap-6">
              {[Activity, BarChart3, Users, PieChart].map((Icon, i) => (
                <div key={i} className={`p-2 rounded-lg transition-colors ${i === 1 ? 'bg-brand-primary/10 text-brand-primary' : 'text-white/20 hover:text-white/40 hover:bg-white/5'}`}>
                  <Icon className="w-5 h-5" />
                </div>
              ))}
            </div>

            {/* Content Area */}
            <div className="flex-1 p-6 md:p-8 space-y-8 bg-transparent">
              {/* Top Stats */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-1">
                  <div className="text-[10px] md:text-xs text-white/50 uppercase font-sans font-bold tracking-widest truncate">Active Revenue</div>
                  <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
                    <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tighter">$142,850</span>
                    <span className="text-[10px] md:text-xs text-[#22c55e] font-sans font-bold flex items-center shrink-0">
                      <TrendingUp className="w-2.5 h-2.5 md:w-3 h-3 mr-0.5" /> +24%
                    </span>
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="text-[10px] md:text-xs text-white/50 uppercase font-sans font-bold tracking-widest truncate">Conversion Rate</div>
                  <div className="flex items-baseline gap-1.5 md:gap-2 flex-wrap">
                    <span className="text-xl sm:text-2xl md:text-3xl font-display font-bold text-white tracking-tighter">4.82%</span>
                    <span className="text-[10px] md:text-xs text-[#22c55e] font-sans font-bold flex items-center shrink-0">
                      <ArrowUpRight className="w-2.5 h-2.5 md:w-3 h-3 mr-0.5" /> +1.2%
                    </span>
                  </div>
                </div>
              </div>

              {/* Chart Section */}
              <div className="h-[180px] sm:h-[220px] w-full rounded-2xl bg-white/[0.02] border border-white/[0.05] p-3 sm:p-4 relative">
                <div className="absolute top-3 left-4 sm:top-4 sm:left-6 flex items-center gap-2 z-10">
                  <div className="w-2 h-2 rounded-full bg-brand-primary" />
                  <span className="text-[10px] sm:text-xs text-white/60 font-bold uppercase tracking-wider">Revenue Forecast</span>
                </div>
                <div className="w-full h-full pt-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 10, right: 5, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="brandGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#FF6A00" stopOpacity={0.25}/>
                          <stop offset="95%" stopColor="#FF6A00" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis 
                        dataKey="name" 
                        hide={false} 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: 'rgba(255,255,255,0.2)', fontSize: 10 }}
                        dy={5}
                      />
                      <YAxis hide={true} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: '#0A0A0A', 
                          border: '1px solid rgba(255,255,255,0.1)',
                          borderRadius: '8px',
                          fontSize: '12px'
                        }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="value" 
                        stroke="#FF6A00" 
                        strokeWidth={2}
                        fillOpacity={1} 
                        fill="url(#brandGradient)" 
                        animationDuration={isMobile ? 650 : 1200}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Recent Activity List */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/50 uppercase font-sans font-bold tracking-widest">Live Feed</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-[#22c55e] animate-pulse" />
                    <span className="text-xs text-[#22c55e] font-sans font-bold uppercase">System Online</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {[1, 2].map((i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] border border-white/[0.05] group/item hover:bg-white/[0.04] transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                          <MousePointer2 className="w-4 h-4 text-brand-primary" />
                        </div>
                        <div>
                          <div className="text-xs font-display font-medium text-white">Conversion Triggered</div>
                          <div className="text-xs text-white/50 font-sans">Funnel B → Checkout</div>
                        </div>
                      </div>
                      <div className="text-xs font-mono text-brand-primary">+$850</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating KPI Badges */}
        <motion.div
          animate={isMobile ? { y: 0 } : { x: [0, 8, 0], y: [0, -3, 0] }}
          transition={isMobile ? {} : { duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-12 -right-8 p-5 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 glass liquid-glass hidden md:block"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#22c55e]/10 flex items-center justify-center ring-1 ring-[#22c55e]/20">
              <TrendingUp className="w-6 h-6 text-[#22c55e]" />
            </div>
            <div>
              <div className="text-xs text-white/60 font-bold uppercase tracking-wider">Growth Delta</div>
              <div className="text-2xl font-display font-bold text-white tracking-tight">+428%</div>
            </div>
          </div>
        </motion.div>

        <motion.div
          animate={isMobile ? { y: 0 } : { x: [0, -6, 0], y: [0, 6, 0] }}
          transition={isMobile ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -bottom-10 -left-12 p-4 rounded-2xl shadow-[0_20px_40px_rgba(0,0,0,0.6)] z-20 glass liquid-glass hidden md:block"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center ring-1 ring-brand-primary/20">
              <Users className="w-5 h-5 text-brand-primary" />
            </div>
            <div>
              <div className="text-xs text-white/60 font-bold uppercase tracking-wider">Active Users</div>
              <div className="text-xl font-display font-bold text-white tracking-tight">2,840</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Extreme Visual Depth Shadow */}
      <div className="absolute inset-0 bg-brand-primary/10 blur-[120px] rounded-full -z-10 group-hover:bg-brand-primary/15 transition-colors duration-1000" />
    </div>
  );
};

export default DashboardMockup;
