import React from 'react';
import { motion } from 'motion/react';
import { TrendingUp, Users, Rocket } from 'lucide-react';
import Section from './ui/Section';
import Container from './ui/Container';
import { useResponsiveAnimation } from './utils/useResponsiveAnimation';

const results = [
  {
    metric: '320%',
    label: 'Revenue Expansion',
    description: 'We help high-growth companies unlock expansion revenue through structured up-sell and cross-sell automation.',
    icon: TrendingUp,
    color: 'from-brand-primary/20 to-brand-primary/10',
  },
  {
    metric: '4.5X',
    label: 'LTV/CAC Efficiency',
    description: 'Our systems optimize acquisition spend, driving higher customer lifetime value while reducing unit costs.',
    icon: Users,
    color: 'from-brand-primary/20 to-brand-primary/10',
  },
  {
    metric: '28%',
    label: 'Gross Yield Lift',
    description: 'Immediate performance improvements in your core funnel through our proprietary optimization methodology.',
    icon: Rocket,
    color: 'from-brand-primary/20 to-brand-primary/10',
  },
];

const Results: React.FC = () => {
  const { getTransition, getViewport, adjustY, adjustScale } = useResponsiveAnimation();

  return (
    <Section id="results" padding="lg">
      <Container>
        <div className="text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: adjustY(10) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={getViewport({ once: true })}
            className="inline-block px-3 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-[0.2em] font-sans"
          >
            Validated Growth Performance
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: adjustY(20) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={getViewport({ once: true })}
            transition={getTransition({ delay: 0.1 })}
            className="text-3xl md:text-4xl font-black text-brand-text-heading font-display max-w-4xl mx-auto tracking-tight"
          >
            Systems that power <br />
            <span className="text-brand-primary">hyper-scale growth.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {results.map((result, idx) => (
            <motion.div
              key={result.label}
              initial={{ opacity: 0, scale: adjustScale(0.95) }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={getViewport({ once: true, margin: "-50px" })}
              transition={getTransition({ duration: 0.5, delay: idx * 0.05 })}
              className="group relative core-card p-10 rounded-2xl border-white/5 hover:border-brand-primary/30 transition-all duration-500 text-center flex flex-col h-full hover-lift liquid-glass"
            >
              <div className="absolute inset-0 brand-gradient opacity-0 group-hover:opacity-[0.03] transition-opacity duration-700 rounded-2xl" />
              
              <div className="relative z-10 space-y-6 flex flex-col h-full">
                <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary group-hover:bg-brand-primary group-hover:text-brand-dark transition-all duration-500 mb-4 mx-auto w-fit shadow-xl shadow-brand-primary/10">
                  <result.icon className="w-8 h-8" />
                </div>
                
                <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white group-hover:brand-gradient-text transition-all duration-700 font-display tracking-tight font-mono tabular-nums">
                  {result.metric}
                </div>
                
                <h3 className="text-xl font-bold tracking-tight text-brand-text-heading group-hover:text-white transition-colors font-display">
                  {result.label}
                </h3>
                
                <p className="text-brand-text-secondary text-sm leading-[1.6] group-hover:text-white transition-colors font-sans font-medium">
                  {result.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Results;
