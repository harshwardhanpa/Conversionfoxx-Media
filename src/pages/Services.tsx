import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useResponsiveAnimation } from '../components/utils/useResponsiveAnimation';
import { useSEO } from '../components/utils/useSEO';
import { 
  ArrowRight, 
  Sparkles, 
  FileSearch, 
  Target, 
  MousePointer2, 
  Workflow, 
  CheckCircle2, 
  Users, 
  Rocket, 
  ShoppingBag, 
  Briefcase, 
  Settings,
  Clock,
  Calendar,
  Zap,
  TrendingUp,
  Layers,
  ChevronRight
} from 'lucide-react';

const Services: React.FC = () => {
  const { getTransition, getViewport, adjustY, adjustScale } = useResponsiveAnimation();

  useSEO({
    title: 'Strategic Growth & Conversion Services',
    description: 'Explore our connected digital solutions: predictable Lead Generation, systematic Conversion Optimization, and robust Revenue Operations CRM automation.',
    canonical: '/services'
  });

  const scrollToProcess = () => {
    const element = document.getElementById('engagement-models');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div className="relative z-10 pt-20">
        {/* 1. SERVICES HERO */}
        <Section className="relative overflow-hidden pt-32 pb-20">
          {/* Background Decorative Elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 blur-[120px] rounded-full animate-pulse pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />

          <Container>
            <motion.div
              initial={{ opacity: 0, y: adjustY(15) }}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition({ duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
              className="text-center space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-sans font-bold uppercase tracking-[0.2em] mx-auto border border-brand-primary/20 glass liquid-glass">
                <Sparkles className="w-4 h-4" />
                Our Expertise
              </div>
              <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.05] text-brand-text-heading max-w-4xl mx-auto font-display">
                Engineering High-Performance <br />
                <span className="text-brand-primary">
                  Growth Infrastructure
                </span>
              </h1>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-sans font-normal leading-relaxed">
                Transform your customer acquisition experiments into a predictable, automated revenue engine designed for high-velocity growth.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button to="/contact" size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-bold transition w-full sm:w-auto">
                  Book Strategy Call
                </Button>
                <Button 
                  onClick={scrollToProcess} 
                  variant="secondary" 
                  size="lg"
                  className="border border-white/20 hover:border-brand-primary px-6 py-3 rounded-xl w-full sm:w-auto text-white"
                >
                  See How It Works
                </Button>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* 2. SERVICE CATEGORY GRID */}
        <Section id="explore-services" background="subtle">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <span className="text-brand-primary text-sm font-sans font-bold uppercase tracking-[0.2em]">The Growth System</span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-2xl mx-auto tracking-tight font-display">Expansion Growth Methodology.</h2>
              <p className="text-gray-400 font-sans max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                Most agencies sell hours and "deliverables." We build infrastructure: a four-part system designed for mathematical scale.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { 
                  title: 'Module 1: Lead Generation', 
                  description: 'Scalable acquisition systems engineered to dominate search and social channels, delivering consistent, qualified lead velocity.', 
                  icon: Target,
                  link: '/services/lead-generation'
                },
                { 
                  title: 'Module 2: Conversion Optimization', 
                  description: 'We re-engineer your user journey to eliminate friction, ensuring every visitor is funneled toward high-value conversions.', 
                  icon: MousePointer2,
                  link: '/services/conversion-optimization'
                },
                { 
                  title: 'Module 3: Revenue Operations', 
                  description: 'A fully integrated CRM and automation system that ensures every lead is tracked, nurtured, and converted with certainty.', 
                  icon: Workflow,
                  link: '/services/revenue-operations-system',
                  flagship: true
                },
              ].map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: adjustY(15) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={getViewport({ once: true, margin: "-50px" })}
                  transition={getTransition({ duration: 0.5, delay: idx * 0.05 })}
                  className="h-full"
                >
                  <Card 
                    padding="lg" 
                    className={`h-full flex flex-col relative transition-all duration-300 hover-lift liquid-glass ${service.flagship ? 'ring-2 ring-brand-primary/50' : ''}`}
                  >
                    {service.flagship && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white text-xs font-sans font-bold px-3 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-lg liquid-glass">
                        Flagship
                      </div>
                    )}
                    <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-6 w-fit shadow-xl shadow-brand-primary/5 glass">
                      <service.icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black mb-4 text-brand-text-heading font-display tracking-tight">{service.title}</h3>
                    <p className="text-gray-400 font-sans text-sm leading-relaxed mb-8 flex-grow">
                      {service.description}
                    </p>
                    <Link to={service.link} className="inline-flex items-center gap-2 text-brand-primary font-sans font-bold group/btn hover:translate-x-1 transition-transform">
                      Learn More
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 4. HOW WE WORK */}
        <Section id="engagement-models" background="subtle">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-2xl mx-auto tracking-tight font-display">How We Work</h2>
              <p className="text-gray-400 font-sans max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                A structured approach to identify gaps, fix leaks, and scale your revenue system.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: 'Traffic', 
                  description: 'We deploy precision-engineered acquisition systems to capture and dominate high-intent search and social intent.',
                  icon: Target
                },
                { 
                  title: 'Conversion', 
                  description: 'We re-engineer user journeys to eliminate friction, ensuring every visitor is funneled toward high-value conversions.',
                  icon: Zap
                },
                { 
                  title: 'Revenue', 
                  description: 'We build the CRM automation and full-funnel tracking needed to turn leads into predictable expansion revenue.',
                  icon: Workflow
                },
                { 
                  title: 'Optimization', 
                  description: 'Continuous multivariate testing and data analysis that identifies hidden leaks and scales winning growth experiments.',
                  icon: TrendingUp
                },
              ].map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: adjustY(15) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={getViewport({ once: true, margin: "-50px" })}
                  transition={getTransition({ duration: 0.5, delay: idx * 0.05 })}
                >
                  <Card padding="xl" className="h-full group hover-lift">
                    <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-8 group-hover:bg-brand-primary group-hover:text-brand-dark transition-all duration-300">
                      <step.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black mb-4 text-brand-text-heading font-display tracking-tight">{step.title}</h3>
                    <p className="text-gray-400 font-sans leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* FINAL CTA SECTION */}
        <Section id="final-cta" className="relative overflow-hidden">
          <Container>
            <motion.div
              initial={{ opacity: 0, scale: adjustScale(0.95) }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={getViewport({ once: true })}
              transition={getTransition({ duration: 0.6 })}
            >
              <Card padding="xl" className="text-center space-y-10 relative overflow-hidden border-brand-primary/20 shadow-2xl shadow-brand-primary/5 liquid-glass" hoverEffect={false}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none opacity-50" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none opacity-30" />
                
                <div className="relative z-10 space-y-8">
                  <h2 className="text-3xl md:text-5xl font-black leading-[1.05] text-brand-text-heading max-w-4xl mx-auto tracking-tight font-display">
                    Scale Your <br />
                    <span className="brand-gradient-text">Revenue Engine</span>
                  </h2>
                  <p className="text-gray-400 font-sans text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                    Ready to build a predictable growth engine? Our Growth Architects are ready to engineer your revenue system.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                    <Button to="/contact" size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-medium transition w-full sm:w-auto">
                      Book Strategy Call
                    </Button>
                    <Button to="/" variant="secondary" size="lg" className="border border-white/20 hover:border-brand-primary px-6 py-3 rounded-xl w-full sm:w-auto text-white">
                      See How It Works
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Container>
        </Section>
      </div>
    </>
  );
};

export default Services;
