import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, PenTool, Rocket, TrendingUp, CheckCircle2, ArrowRight, ShieldCheck, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './ui/Container';
import Section from './ui/Section';

interface SprintPhase {
  id: string;
  phaseNumber: string;
  timeframe: string;
  title: string;
  headline: string;
  description: string;
  deliverables: string[];
  keyMetric: string;
  metricLabel: string;
  icon: React.ComponentType<{ className?: string }>;
}

const sprintPhases: SprintPhase[] = [
  {
    id: 'audit',
    phaseNumber: '01',
    timeframe: 'Days 1 – 14',
    title: 'Diagnostic & Tracking Calibration',
    headline: 'Eliminate revenue leaks before spending an extra dollar.',
    description: 'We perform a forensic audit of your conversion funnel, install server-side conversion APIs (CAPI), and configure multi-touch attribution to ensure 100% data fidelity.',
    deliverables: [
      'Comprehensive Funnel & Unit Economics Audit',
      'Server-Side Tracking (Meta CAPI & GA4 Protocol)',
      'CRM & Pipeline Stage Synchronization',
      'Competitor Benchmark & Opportunity Analysis'
    ],
    keyMetric: '100%',
    metricLabel: 'Attribution Fidelity',
    icon: Search,
  },
  {
    id: 'architecture',
    phaseNumber: '02',
    timeframe: 'Days 15 – 30',
    title: 'Conversion Architecture & Creatives',
    headline: 'Engineer frictionless conversion pathways that multiply visitor value.',
    description: 'We build bespoke, high-converting landing pages tailored to specific buyer personas, paired with data-backed creative angles designed to out-convert industry baselines.',
    deliverables: [
      'Dedicated High-Yield Landing Page Architecture',
      'Direct-Response Offer Framing & Positioning',
      'High-Velocity Ad Creative System (Video & Static)',
      'Under-1-Second Speed & Mobile Optimization'
    ],
    keyMetric: '+45%',
    metricLabel: 'Baseline Conversion Lift',
    icon: PenTool,
  },
  {
    id: 'scaling',
    phaseNumber: '03',
    timeframe: 'Days 31 – 60',
    title: 'Channel Domination & Spend Scaling',
    headline: 'Deploy high-intent search and paid social campaigns at scale.',
    description: 'We launch precision campaigns across Google Ads, Meta, and LinkedIn targeting high-value buyers, pacing daily budgets efficiently toward your target CPA and ROAS.',
    deliverables: [
      'High-Intent Paid Search (Target CPA/ROAS Bidding)',
      'Hyper-Targeted Paid Social (Meta, LinkedIn, YouTube)',
      'High-Yield Audience Segmentation & Lookalikes',
      'Algorithmic Bid Tuning & Daily Budget Pacing'
    ],
    keyMetric: '3.8x – 5.2x',
    metricLabel: 'Average Blended ROAS',
    icon: Rocket,
  },
  {
    id: 'revops',
    phaseNumber: '04',
    timeframe: 'Days 61 – 90+',
    title: 'RevOps Automation & Compounding Scale',
    headline: 'Turn qualified leads into closed pipeline with automated revenue operations.',
    description: 'Our flagship integration: we connect sales pipeline velocity with advertising signals to create an automated engine that continuously compounds customer lifetime value.',
    deliverables: [
      'Automated Lead Nurturing & Speed-to-Lead Workflows',
      'Offline Conversion Feedback Loops to Ad Networks',
      'Continuous Multivariate A/B Testing Matrix',
      'Executive Strategic Performance Reviews'
    ],
    keyMetric: '4.2x',
    metricLabel: 'Pipeline Velocity',
    icon: TrendingUp,
  },
];

const Process: React.FC = () => {
  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const currentPhase = sprintPhases[activePhaseIndex];

  return (
    <Section id="process" padding="md" background="subtle">
      <Container>
        {/* Header */}
        <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-primary tracking-wider uppercase">
            <span>Execution Roadmap</span>
            <span aria-hidden="true">·</span>
            <span>Disciplined Delivery</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-brand-text-heading font-display tracking-tight">
            The 90-Day <span className="brand-gradient-text">Growth Sprint.</span>
          </h2>

          <p className="text-brand-text-secondary text-sm md:text-base font-medium font-sans">
            A structured, four-phase sprint engineered to build your revenue engine and produce measurable pipeline growth.
          </p>
        </div>

        {/* Phase Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 mb-6 max-w-5xl mx-auto">
          {sprintPhases.map((phase, idx) => {
            const Icon = phase.icon;
            const isActive = idx === activePhaseIndex;
            return (
              <button
                key={phase.id}
                onClick={() => setActivePhaseIndex(idx)}
                className={`p-3.5 sm:p-4 rounded-xl text-left transition-all border flex flex-col justify-between ${
                  isActive
                    ? 'bg-white/[0.06] border-brand-primary/50 shadow-md shadow-brand-primary/5'
                    : 'bg-white/[0.02] border-white/5 hover:border-white/15 hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-mono font-bold ${isActive ? 'text-brand-primary' : 'text-brand-text-secondary'}`}>
                    PHASE {phase.phaseNumber}
                  </span>
                  <div className={`p-1 rounded-md ${isActive ? 'bg-brand-primary/20 text-brand-primary' : 'bg-white/5 text-white/40'}`}>
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div className="space-y-0.5">
                  <div className="text-[11px] text-white/40 font-mono flex items-center gap-1">
                    <Clock className="w-2.5 h-2.5 text-brand-primary/70" />
                    <span>{phase.timeframe}</span>
                  </div>
                  <div className={`text-xs sm:text-sm font-display font-bold leading-tight ${isActive ? 'text-white' : 'text-white/80'}`}>
                    {phase.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Phase Deep Dive Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPhase.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
            className="core-card rounded-2xl p-6 md:p-8 border border-white/10 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              {/* Left Column: Narrative & Deliverables */}
              <div className="lg:col-span-7 space-y-4">
                <div className="flex items-center gap-2 text-xs font-mono text-brand-primary">
                  <span className="font-bold">MILESTONE {currentPhase.phaseNumber}</span>
                  <span aria-hidden="true" className="text-white/30">/</span>
                  <span className="text-white/60">{currentPhase.timeframe}</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-black font-display text-white tracking-tight leading-snug">
                  {currentPhase.headline}
                </h3>

                <p className="text-brand-text-secondary font-sans leading-relaxed text-xs sm:text-sm">
                  {currentPhase.description}
                </p>

                {/* Deliverables List */}
                <div className="pt-3 border-t border-white/5 space-y-2">
                  <div className="text-[11px] font-mono uppercase tracking-wider text-white/50 font-semibold">
                    Core Operational Deliverables
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    {currentPhase.deliverables.map((item) => (
                      <div key={item} className="flex items-start gap-2 text-xs text-white/90 font-medium">
                        <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0 mt-0.5" />
                        <span className="leading-snug">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Compact Metric Callout & Action */}
              <div className="lg:col-span-5 flex flex-col justify-between p-5 md:p-6 rounded-xl bg-white/[0.03] border border-white/5 gap-5">
                <div className="space-y-1">
                  <div className="text-[10px] font-mono uppercase tracking-wider text-brand-primary font-bold">
                    Target Milestone Benchmark
                  </div>
                  <div className="text-4xl sm:text-5xl font-black font-display text-white tracking-tight font-mono tabular-nums">
                    {currentPhase.keyMetric}
                  </div>
                  <div className="text-xs font-sans text-brand-text-secondary">
                    {currentPhase.metricLabel}
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-brand-primary/5 border border-brand-primary/15 text-[11px] text-brand-text-secondary leading-relaxed">
                  <div className="flex items-center gap-1.5 text-brand-primary font-semibold mb-0.5">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Enterprise Data Privacy</span>
                  </div>
                  Engineered for enterprise security, GDPR compliance, and server-side tracking standards.
                </div>

                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-brand-primary text-white font-bold text-xs hover:bg-[#E63900] transition-colors shadow-md shadow-brand-primary/15"
                >
                  <span>Deploy This Sprint</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </Container>
    </Section>
  );
};

export default Process;
