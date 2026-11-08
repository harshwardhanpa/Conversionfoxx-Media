import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from './ui/Button';
import Section from './ui/Section';
import Container from './ui/Container';
import { useResponsiveAnimation } from './utils/useResponsiveAnimation';

const FinalCTA: React.FC = () => {
  const { getTransition, getViewport, adjustScale } = useResponsiveAnimation();
  const scrollToProcess = () => {
    const element = document.getElementById('process');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Section id="final-cta" padding="lg">
      <Container>
        <motion.div
          initial={{ opacity: 0, scale: adjustScale(0.98) }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={getViewport({ once: true, margin: "-50px" })}
          transition={getTransition({ duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
          className="core-card p-12 md:p-24 rounded-2xl text-center space-y-10 relative overflow-hidden liquid-glass"
        >
          {/* Background Glows */}
          <div className="absolute top-0 right-0 w-full h-full bg-brand-primary/[0.03] pointer-events-none" />
          
          <div className="relative z-10 space-y-10">
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mx-auto font-sans glass liquid-glass">
              <Sparkles className="w-3.5 h-3.5" />
              Growth Infrastructure
            </div>
            
            <h2 className="text-brand-text-heading font-display">
              Built for <span className="text-brand-primary">Growth Acceleration.</span>
            </h2>
            
            <p className="text-base md:text-lg max-w-2xl mx-auto font-medium leading-relaxed font-sans text-brand-text-secondary/60">
              Our Growth Architects are ready to engineer your revenue system. Transform your customer acquisition experiments into a high-performance engine that scales with mathematical certainty.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
              <Button to="/contact" size="lg" icon={ArrowRight} className="w-full sm:w-auto">
                Book Strategy Call
              </Button>
            </div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
};

export default FinalCTA;
