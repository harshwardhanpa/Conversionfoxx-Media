import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import Section from './ui/Section';
import Container from './ui/Container';
import Button from './ui/Button';
import { useResponsiveAnimation } from './utils/useResponsiveAnimation';

interface CaseStudy {
  category: string;
  stage: string;
  title: string;
  description: string;
  results: string[];
  image: string;
  primaryStat: string;
  primaryStatLabel: string;
}

const cases: CaseStudy[] = [
  {
    category: 'Enterprise B2B SaaS',
    stage: 'Series B Growth',
    title: 'How VertexScale achieved 4.2x Lead Velocity in 6 Months.',
    description: 'We rebuilt their entire conversion architecture and deployed server-side CRM automation to bridge the gap between ad spend and closed sales pipeline.',
    results: ['420% Increase in Sales Qualified Leads', '28% Lower Customer Acquisition Cost', 'Closed-Loop Revenue Attribution'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    primaryStat: '+420%',
    primaryStatLabel: 'SQL Velocity',
  },
  {
    category: 'FinTech Infrastructure',
    stage: 'Enterprise Scale',
    title: 'Transforming Quantos from Manual Outbound to a Predictable Engine.',
    description: 'A complete overhaul of their multi-channel paid search and HubSpot CRM integration, delivering end-to-end visibility into unit economics and CAC.',
    results: ['3.5x Expansion Pipeline', '100% Attribution Transparency', '140+ Qualified Enterprise Demos/mo'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=1200',
    primaryStat: '3.5x',
    primaryStatLabel: 'Expansion Pipeline',
  }
];

const CaseStudies: React.FC = () => {
  const { getTransition, getViewport, adjustY, adjustX } = useResponsiveAnimation();

  return (
    <Section id="case-studies" padding="md" background="subtle">
      <Container>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 max-w-5xl mx-auto">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 text-xs font-mono font-semibold text-brand-primary tracking-wider uppercase">
              <span>Verified Client Impact</span>
              <span aria-hidden="true">·</span>
              <span>Documented Case Studies</span>
            </div>

            <h2 className="text-2xl sm:text-4xl font-black text-brand-text-heading font-display tracking-tight">
              Measurable <span className="brand-gradient-text">Business Outcomes.</span>
            </h2>
          </div>
          
          <motion.div
            initial={{ opacity: 0, x: adjustX(15) }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={getViewport({ once: true })}
            transition={getTransition()}
          >
            <Button variant="secondary" to="/contact" icon={ArrowRight} size="sm">
              View All Outcomes
            </Button>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {cases.map((item, idx) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: adjustY(15) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={getViewport({ once: true, margin: '-50px' })}
              transition={getTransition({ duration: 0.5, delay: idx * 0.08 })}
              className="group core-card overflow-hidden hover-lift flex flex-col h-full rounded-2xl border border-white/10 hover:border-brand-primary/30 transition-all"
            >
              <div className="aspect-[16/8] w-full relative overflow-hidden bg-[#0F0C0A]">
                <img 
                  src={item.image} 
                  alt={item.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-80"
                  onError={(e) => {
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0705] via-[#0A0705]/50 to-transparent pointer-events-none" />
                
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-mono text-brand-primary">
                    <span className="font-bold">{item.category}</span>
                    <span aria-hidden="true" className="text-white/40">·</span>
                    <span className="text-white/80">{item.stage}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-xl font-black font-display text-white font-mono tabular-nums">{item.primaryStat}</span>
                    <div className="text-[10px] font-mono text-brand-primary">{item.primaryStatLabel}</div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 flex flex-col flex-grow space-y-4">
                <h3 className="text-lg md:text-xl font-black text-white font-display tracking-tight group-hover:text-brand-primary transition-colors leading-tight">
                  {item.title}
                </h3>
                <p className="text-brand-text-secondary font-sans leading-relaxed text-xs sm:text-sm flex-grow">
                  {item.description}
                </p>
                
                <div className="pt-4 border-t border-white/5 space-y-2">
                  {item.results.map((result) => (
                    <div key={result} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                      <span className="text-xs font-bold text-white tracking-wide font-sans">{result}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default CaseStudies;
