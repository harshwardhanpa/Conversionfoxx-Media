import React from 'react';
import { motion } from 'motion/react';
import { Cloud, BarChart3, Search, Globe, Briefcase, Zap, Database, MousePointer2 } from 'lucide-react';
import Section from './ui/Section';
import Container from './ui/Container';
import { useResponsiveAnimation } from './utils/useResponsiveAnimation';

const tools = [
  { name: 'HubSpot', icon: Database },
  { name: 'Salesforce', icon: Cloud },
  { name: 'GA4', icon: BarChart3 },
  { name: 'Google Ads', icon: Search },
  { name: 'Meta Ads', icon: Globe },
  { name: 'LinkedIn Ads', icon: Briefcase },
  { name: 'Zapier', icon: Zap },
  { name: 'Hotjar', icon: MousePointer2 },
];

const TechStack: React.FC = () => {
  const { getTransition, getViewport, adjustY } = useResponsiveAnimation();

  return (
    <Section id="tech-stack" padding="lg" background="subtle">
      <Container>
        <div className="text-center space-y-6 mb-20">
          <div className="inline-flex items-center gap-2 text-xs font-semibold text-brand-primary tracking-wider uppercase">
            <span>Enterprise Infrastructure</span>
            <span aria-hidden="true">·</span>
            <span>Global MarTech Stack</span>
          </div>
          <motion.h2
            initial={{ opacity: 0, y: adjustY(20) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={getViewport({ once: true })}
            transition={getTransition({ delay: 0.1 })}
            className="text-brand-text-heading max-w-4xl mx-auto font-display text-3xl md:text-4xl font-black tracking-tight leading-tight"
          >
            The tech stack behind your <br />
            <span className="text-brand-primary">revenue engine.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
          {tools.map((tool, idx) => (
            <motion.div
              key={tool.name}
              initial={{ opacity: 0, y: adjustY(20) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={getViewport({ once: true })}
              transition={getTransition({ delay: idx * 0.05 })}
              className="core-card p-6 md:p-10 rounded-2xl group text-center hover-lift liquid-glass"
            >
              <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-6 w-fit mx-auto group-hover:bg-brand-primary group-hover:text-brand-dark transition-all duration-300 shadow-xl shadow-brand-primary/10 glass border border-brand-primary/20">
                <tool.icon className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-black text-white/60 uppercase tracking-[0.2em] group-hover:text-brand-primary transition-colors duration-300 font-sans">
                {tool.name}
              </h3>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default TechStack;
