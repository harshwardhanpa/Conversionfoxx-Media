import React from 'react';
import { motion } from 'motion/react';
import { Target, Zap, LayoutDashboard, Search, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from './ui/Container';
import Section from './ui/Section';
import { useResponsiveAnimation } from './utils/useResponsiveAnimation';

interface Capability {
  id: string;
  index: string;
  title: string;
  headline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
  outcome: string;
  isFlagship?: boolean;
  link: string;
}

const capabilities: Capability[] = [
  {
    id: 'traffic',
    index: '01',
    title: 'Multi-Channel Paid Acquisition',
    headline: 'High-intent buyer acquisition across search and direct-response social.',
    description: 'We deploy algorithmic bidding frameworks and hyper-segmented audience architectures engineered to capture high-value decision-makers at optimal acquisition costs.',
    icon: Target,
    tags: ['Google Search & Performance Max', 'Meta Growth Engine', 'LinkedIn Account-Based Ads', 'YouTube Direct Response'],
    outcome: 'Predictable high-velocity deal flow',
    link: '/services/lead-generation',
  },
  {
    id: 'cro',
    index: '02',
    title: 'High-Yield Conversion Architecture',
    headline: 'Turn passive website visitors into committed enterprise pipeline.',
    description: 'We dismantle funnel friction and build bespoke landing page experiences powered by conversion psychology, guaranteeing an immediate lift in visitor-to-demo conversion rates.',
    icon: Zap,
    tags: ['Bespoke Landing Page Systems', 'Behavioral Funnel Analysis', 'Direct-Response Copywriting', 'Sub-Second Load Speeds'],
    outcome: '+35% to +60% baseline conversion lift',
    link: '/services/conversion-optimization',
  },
  {
    id: 'revops',
    index: '03',
    title: 'Full-Funnel Revenue Operations & CRM Infrastructure',
    headline: 'The vital connective tissue turning inbound leads into closed revenue.',
    description: 'Our flagship discipline: we connect your CRM (HubSpot, Salesforce) directly with advertising platforms via server-side conversion APIs. This feeds offline deal closures back into ad networks so algorithms optimize for actual revenue rather than cheap form fills.',
    icon: LayoutDashboard,
    tags: ['Server-Side CAPI & GA4', 'HubSpot & Salesforce Sync', 'Closed-Loop Revenue Attribution', 'Automated Lead Routing Workflows'],
    outcome: '100% full-funnel attribution and automated deal flow',
    isFlagship: true,
    link: '/services/revenue-operations-system',
  },
  {
    id: 'growth',
    index: '04',
    title: 'Compounding Growth & Experimentation',
    headline: 'Structured multivariate testing to sustain profitable acquisition.',
    description: 'Ad fatigue and market saturation are inevitable without structured experimentation. We run continuous bi-weekly growth sprints to discover winning creative angles, lower CAC, and expand margins.',
    icon: Search,
    tags: ['Multivariate A/B Testing', 'Creative Fatigue Shielding', 'Channel Diversification', 'CAC Compression Models'],
    outcome: 'Sustainable scale without ROAS degradation',
    link: '/services',
  },
];

const Services: React.FC = () => {
  const { getTransition, getViewport, adjustY } = useResponsiveAnimation();

  return (
    <Section id="services" padding="md" background="default">
      <Container>
        {/* Section Header */}
        <div className="text-center space-y-3 mb-10 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-primary tracking-wider uppercase">
            <span>Growth Architecture</span>
            <span aria-hidden="true">·</span>
            <span>Mathematical Systems</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-brand-text-heading font-display tracking-tight">
            The Revenue <span className="brand-gradient-text">Engine.</span>
          </h2>

          <p className="text-brand-text-secondary text-sm md:text-base font-medium font-sans">
            Most agencies sell disconnected hours. We build connected growth systems that scale enterprise pipeline with mathematical predictability.
          </p>
        </div>

        {/* Compact Asymmetric Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: adjustY(15) }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={getViewport({ once: true, margin: '-50px' })}
                transition={getTransition({ duration: 0.4, delay: idx * 0.05 })}
                className={`core-card rounded-2xl p-6 md:p-7 border border-white/10 flex flex-col justify-between hover:border-brand-primary/30 transition-all relative group overflow-hidden ${
                  item.isFlagship ? 'lg:col-span-2 bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent' : 'bg-white/[0.02]'
                }`}
              >
                <div className="space-y-4 relative z-10">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-brand-primary/10 text-brand-primary group-hover:bg-brand-primary group-hover:text-white transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="text-[11px] font-mono font-bold text-white/40 tracking-wider">
                      CAPABILITY {item.index}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="text-lg md:text-xl font-bold font-display text-white tracking-tight group-hover:text-brand-primary transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-xs font-mono text-brand-primary font-medium">
                      {item.headline}
                    </p>
                    <p className="text-xs sm:text-sm text-brand-text-secondary font-sans leading-relaxed pt-1">
                      {item.description}
                    </p>
                  </div>

                  {/* Capabilities Tags as unboxed text */}
                  <div className="pt-1">
                    <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-white/60 font-sans">
                      {item.tags.map((tag, tIdx) => (
                        <React.Fragment key={tag}>
                          <span>{tag}</span>
                          {tIdx < item.tags.length - 1 && <span className="text-white/20" aria-hidden="true">·</span>}
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom Outcome & Link */}
                <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-2 text-xs font-bold text-white font-sans">
                    <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    <span>{item.outcome}</span>
                  </div>

                  <Link
                    to={item.link}
                    className="p-2 rounded-lg bg-white/5 hover:bg-brand-primary hover:text-white text-white/70 transition-all shrink-0"
                    aria-label={`Learn more about ${item.title}`}
                  >
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </motion.div>
            );
          })}

          {/* Compact Enterprise Growth Commitment Card */}
          <motion.div
            initial={{ opacity: 0, y: adjustY(15) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={getViewport({ once: true, margin: '-50px' })}
            transition={getTransition({ duration: 0.4, delay: 0.25 })}
            className="core-card rounded-2xl p-6 md:p-7 border border-brand-primary/25 bg-gradient-to-br from-brand-primary/10 via-white/[0.02] to-transparent flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="p-2.5 rounded-xl bg-brand-primary/15 text-brand-primary w-fit">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg md:text-xl font-bold font-display text-white tracking-tight">
                Unified Growth Partnership
              </h3>
              <p className="text-xs sm:text-sm text-brand-text-secondary font-sans leading-relaxed">
                Direct partner access, transparent daily data dashboards, and structured execution sprints designed for high-growth category leaders.
              </p>
            </div>

            <div className="pt-6">
              <Link
                to="/contact"
                className="w-full py-2.5 px-4 rounded-xl bg-brand-primary hover:bg-[#E63900] text-white text-xs font-bold text-center block transition-colors shadow-sm"
              >
                Schedule Architecture Review
              </Link>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
};

export default Services;
