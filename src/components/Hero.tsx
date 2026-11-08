import React, { Suspense, lazy } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles, Calculator } from 'lucide-react';
import Button from './ui/Button';

const DashboardMockup = lazy(() => import('./DashboardMockup'));

const Hero: React.FC = () => {
  const scrollToSprint = () => {
    const element = document.getElementById('process');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCalculator = () => {
    const element = document.getElementById('growth-calculator');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center pt-28 pb-16 lg:pt-36 lg:pb-24 overflow-hidden bg-transparent">
      {/* Background Ambience & Lighting */}
      <div className="absolute inset-0 bg-transparent overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-brand-primary/5 via-transparent to-transparent opacity-40" />
        <div className="absolute top-[8%] right-[10%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-[#FF6A00]/15 blur-[140px] rounded-full mix-blend-screen" />
        <div className="absolute bottom-[-5%] left-[-5%] w-[450px] sm:w-[650px] h-[450px] sm:h-[650px] bg-[#E63900]/15 blur-[150px] rounded-full mix-blend-screen" />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 w-full items-center my-auto">
        {/* Left Column: Proposition */}
        <div className="lg:col-span-7 flex flex-col justify-center text-center lg:text-left space-y-7">
          {/* Kicker (Clean unboxed metadata, no country words) */}
          <div className="flex items-center justify-center lg:justify-start gap-2 text-xs font-mono font-semibold text-brand-primary tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5 shrink-0" />
            <span>Performance Marketing & Revenue Systems</span>
            <span aria-hidden="true" className="text-white/20">·</span>
            <span className="text-white/60">Enterprise Scale</span>
          </div>

          <div className="space-y-5">
            <h1 
              className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.08] text-white font-display" 
              style={{ textWrap: 'balance' }}
            >
              Engineering Predictable <br />
              <span className="bg-gradient-to-r from-[#FF5500] via-[#FFA200] to-[#E63900] bg-clip-text text-transparent">
                Revenue Infrastructure.
              </span>
            </h1>

            <p className="text-base md:text-lg text-brand-text-secondary max-w-xl mx-auto lg:mx-0 font-medium leading-relaxed font-sans">
              ConversionFoxx architects end-to-end growth engines for enterprise leaders and high-growth brands. We fuse multi-channel paid acquisition with high-yield conversion architecture and CRM revenue operations.
            </p>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center gap-4 pt-2 justify-center lg:justify-start">
            <Button to="/contact" size="lg" icon={ArrowRight} className="w-full sm:w-auto font-bold shadow-lg shadow-brand-primary/25">
              Book Strategy Call
            </Button>
            <Button variant="secondary" size="lg" onClick={scrollToCalculator} icon={Calculator} className="w-full sm:w-auto font-medium">
              Calculate Pipeline ROI
            </Button>
          </div>

          {/* Social Proof Strip */}
          <div className="pt-6 border-t border-white/5 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 text-xs font-mono text-white/50">
            <div>
              <span className="text-white font-bold font-display text-sm mr-1.5 tabular-nums">$48M+</span>
              <span>Client Pipeline</span>
            </div>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">·</span>
            <div>
              <span className="text-white font-bold font-display text-sm mr-1.5 tabular-nums">4.2x</span>
              <span>Avg Blended ROAS</span>
            </div>
            <span className="text-white/20 hidden sm:inline" aria-hidden="true">·</span>
            <div>
              <span className="text-white font-bold font-display text-sm mr-1.5 tabular-nums">100%</span>
              <span>Attribution Fidelity</span>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Dashboard Mockup */}
        <div className="lg:col-span-5 relative w-full min-h-[380px] sm:min-h-[460px] flex flex-col justify-center">
          <Suspense fallback={
            <div className="w-full h-[420px] rounded-2xl bg-white/[0.02] border border-white/5 animate-pulse flex flex-col justify-between p-6">
              <div className="h-4 bg-white/5 rounded w-1/4" />
              <div className="space-y-4 flex-grow flex flex-col justify-center">
                <div className="h-14 bg-white/5 rounded w-full" />
                <div className="h-32 bg-white/5 rounded w-full" />
              </div>
            </div>
          }>
            <DashboardMockup />
          </Suspense>
        </div>
      </div>
    </section>
  );
};

export default Hero;
