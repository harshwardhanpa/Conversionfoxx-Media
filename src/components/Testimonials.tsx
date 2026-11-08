import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';
import Section from './ui/Section';
import Container from './ui/Container';
import { useResponsiveAnimation } from './utils/useResponsiveAnimation';

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, TechFlow Solutions',
    content: 'Their strategy was an eye-opener. ConversionFoxx identified leaks in our funnel we didn\'t even know existed. Our ROI has doubled since implementing their Revenue Operations System.',
    rating: 5,
  },
  {
    name: 'Michael Chen',
    role: 'Marketing Director, Nexus Retail',
    content: 'Unlike traditional agencies, ConversionFoxx focuses on the entire system. Their Lead Generation and Conversion Optimization strategies have created a predictable growth engine for us.',
    rating: 5,
  },
  {
    name: 'Emily Davis',
    role: 'Founder, EcoGrowth',
    content: 'Their analytical approach to growth is refreshing. They don\'t just run ads; they build scalable systems. Our conversion lift has been consistent and significant.',
    rating: 5,
  },
];

const Testimonials: React.FC = () => {
  const { getTransition, getViewport, adjustY } = useResponsiveAnimation();

  return (
    <Section id="testimonials" padding="lg" background="subtle">
      <Container>
        <div className="text-center space-y-6 mb-20">
          <motion.div
            initial={{ opacity: 0, y: adjustY(10) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={getViewport({ once: true })}
            className="inline-block px-3 py-1.5 rounded-full border border-brand-primary/20 bg-brand-primary/5 text-brand-primary text-xs font-bold uppercase tracking-[0.2em] font-sans"
          >
            Growth Success Stories
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: adjustY(20) }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={getViewport({ once: true })}
            transition={getTransition({ delay: 0.1 })}
            className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-4xl mx-auto font-display tracking-tight leading-tight"
          >
            The engine behind <br />
            <span className="text-brand-primary">high-growth brands.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: adjustY(20) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={getViewport({ once: true, margin: "-50px" })}
              transition={getTransition({ duration: 0.5, delay: idx * 0.05 })}
              className="group relative core-card p-10 rounded-2xl transition-all duration-500 flex flex-col h-full overflow-hidden hover-lift"
            >
              <div className="absolute -top-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-120 transition-all duration-700 pointer-events-none">
                <Quote className="w-32 h-32 text-brand-primary" />
              </div>
              
              <div className="relative z-10 space-y-10 flex flex-col h-full">
                <div className="flex gap-1.5">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={`${testimonial.name}-star-${i}`} className="w-4 h-4 fill-brand-primary text-brand-primary" />
                  ))}
                </div>
                
                <p className="text-brand-text-secondary/70 text-lg leading-relaxed font-medium italic group-hover:text-brand-text-secondary transition-colors duration-700 flex-grow font-sans">
                  "{testimonial.content}"
                </p>
                
                <div className="pt-10 border-t border-white/5 flex items-center gap-5 shrink-0">
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center font-black text-brand-primary font-display text-xl border border-brand-primary/20">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-black text-brand-text-heading group-hover:text-brand-primary transition-colors duration-700 font-display">
                      {testimonial.name}
                    </h3>
                    <div className="text-xs text-brand-primary font-black uppercase tracking-[0.2em] font-sans">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
};

export default Testimonials;
