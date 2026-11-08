import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  Search, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  Plus, 
  Minus,
  Database,
  Globe,
  Cpu,
  Monitor,
  Rocket,
  Users,
  TrendingUp,
  MousePointer2,
  Activity,
  Layers,
  Layout as LayoutIcon,
  FileSearch,
  Target,
  Workflow
} from 'lucide-react';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useResponsiveAnimation } from '../../components/utils/useResponsiveAnimation';
import { useSEO } from '../../components/utils/useSEO';

const ConversionOptimization: React.FC = () => {
  const { getTransition, getViewport, adjustY, adjustX, adjustScale } = useResponsiveAnimation();

  useSEO({
    title: 'Systematic Conversion Rate Optimization (CRO)',
    description: 'Maximize your revenue per visitor. Turn idle traffic into high-value sales conversations with conversion-centered user experiences and continuous testing.',
    canonical: '/services/conversion-optimization'
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is Conversion Rate Optimization (CRO)?",
      answer: "CRO is the process of increasing the percentage of website visitors who take a desired action—such as filling out a form or making a purchase. We use data, user feedback, and A/B testing to improve your site's performance."
    },
    {
      question: "How do you decide what to test?",
      answer: "We start with a deep-dive analysis of your current data (GA4, Hotjar, etc.) and user behavior. We identify the biggest drop-off points and create hypotheses for testing based on where we see the most potential for lift."
    },
    {
      question: "Do I need a lot of traffic for CRO?",
      answer: "While more traffic allows for faster testing, we can still perform valuable optimization with lower traffic volumes by focusing on high-impact changes and qualitative user research."
    },
    {
      question: "What kind of lift can I expect?",
      answer: "Results vary by business, but we typically see conversion lifts ranging from 15% to over 100% on key pages. The goal is to make your existing traffic more valuable."
    },
    {
      question: "How long does a CRO project take?",
      answer: "CRO is an ongoing process. We typically work in 90-day cycles, where we perform research, run tests, and implement winners. This allows for continuous improvement and compounding results."
    }
  ];

  return (
    <>
      <div className="relative z-10">
        {/* BREADCRUMB */}
        <Container className="pt-32 mb-8">
          <Button 
            to="/services" 
            variant="ghost" 
            size="sm" 
            icon={ChevronLeft} 
            className="p-0 hover:bg-transparent text-white/40 hover:text-brand-primary"
          >
            Back to Services
          </Button>
        </Container>

        {/* 1. SERVICE HERO */}
        <Section id="service-hero" className="min-h-[60vh] flex items-center justify-center relative overflow-hidden">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: adjustX(-30) }}
                animate={{ opacity: 1, x: 0 }}
                transition={getTransition({ duration: 0.8 })}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-brand-primary/20 text-brand-primary text-xs font-bold uppercase tracking-widest">
                  <MousePointer2 className="w-4 h-4" />
                  Conversion Optimization
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                  Better Experience. <br />
                  Higher Conversion.
                </h1>
                <p className="text-lg md:text-xl text-brand-text-secondary font-light leading-relaxed max-w-xl">
                  Turn more visitors into leads and customers. We use data-driven A/B testing, user behavior analysis, and landing page optimization to improve your conversion rates.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <Button to="/contact" size="lg" icon={ArrowRight}>
                    Book Strategy Call
                  </Button>
                  <Button to="/services" variant="secondary" size="lg">
                    See How It Works
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: adjustScale(0.9) }}
                animate={{ opacity: 1, scale: 1 }}
                transition={getTransition({ duration: 0.8, delay: 0.2 })}
                className="relative hidden lg:block"
              >
                <Card padding="lg" className="rounded-[3rem] border-white/10 relative z-10" hoverEffect={false}>
                  <div className="flex items-center gap-2 mb-6">
                    <div className="w-3 h-3 rounded-full bg-white/20" />
                    <div className="w-3 h-3 rounded-full bg-white/10" />
                    <div className="w-3 h-3 rounded-full bg-white/5" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-4 w-3/4 bg-white/5 rounded-full" />
                    <div className="h-4 w-1/2 bg-white/5 rounded-full" />
                    <div className="grid grid-cols-3 gap-4 pt-4">
                      <div className="aspect-square bg-brand-primary/10 rounded-2xl flex items-center justify-center">
                        <Zap className="w-8 h-8 text-brand-primary" />
                      </div>
                      <div className="aspect-square bg-white/5 rounded-2xl" />
                      <div className="aspect-square bg-white/5 rounded-2xl" />
                    </div>
                    <div className="h-32 w-full bg-white/5 rounded-2xl mt-4" />
                  </div>
                </Card>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-primary/10 blur-3xl rounded-full" />
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* 2. WHAT’S INCLUDED */}
        <Section id="whats-included" background="subtle">
          <Container>
            <div className="text-center mb-20 space-y-4">
              <span className="text-brand-primary text-sm font-bold uppercase tracking-widest">Optimization</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">What’s Included</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'A/B Testing Strategy', description: 'Running controlled experiments to identify the most effective page elements.', icon: Activity },
                { title: 'Landing Page Design', description: 'Building high-converting landing pages specifically designed for your ad traffic.', icon: LayoutIcon },
                { title: 'User Behavior Analysis', description: 'Using heatmaps and session recordings to see exactly how users interact with your site.', icon: Search },
                { title: 'Copywriting for Conversion', description: 'Direct-response copy that speaks to your audience\'s pain points and drives action.', icon: MousePointer2 },
                { title: 'Technical Speed Optimization', description: 'Improving load times to ensure users don\'t bounce before they convert.', icon: Zap },
                { title: 'Funnel Architecture', description: 'Reorganizing your site structure to guide users naturally toward conversion.', icon: Layers },
              ].map((item) => (
                <Card
                  key={item.title}
                  hoverEffect={true}
                  padding="lg"
                  className="rounded-[2.5rem] group"
                >
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-primary transition-all duration-500">
                    <item.icon className="w-7 h-7 text-brand-primary group-hover:text-brand-dark transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-primary transition-colors">{item.title}</h3>
                  <p className="text-brand-text-secondary opacity-50 leading-relaxed group-hover:text-brand-text-secondary group-hover:opacity-100 transition-colors">{item.description}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* 3. PROBLEMS WE HELP SOLVE */}
        <Section id="problems-we-solve">
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <span className="text-brand-primary text-sm font-bold uppercase tracking-widest">Pain Points</span>
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Problems We Help Solve</h2>
                <p className="text-brand-text-secondary text-lg leading-relaxed">
                  Traffic is expensive. If your site isn't converting, you're throwing money away. We help you get more value from every visitor.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'High Bounce Rates', text: 'We identify why users are leaving and fix the friction points.' },
                  { title: 'Low Form Completions', text: 'We optimize your forms to increase lead volume without increasing traffic.' },
                  { title: 'Confusing User Journeys', text: 'We simplify your site architecture for a better user experience.' },
                  { title: 'Poor Landing Page ROI', text: 'We build pages that are specifically designed to convert ad traffic.' },
                  { title: 'Lack of Testing', text: 'We implement a culture of testing so you stop guessing what works.' },
                  { title: 'Slow Load Speeds', text: 'We optimize your site for speed to improve both UX and conversion.' },
                ].map((problem) => (
                  <Card
                    key={problem.title}
                    padding="md"
                    className="rounded-3xl group"
                  >
                    <h3 className="text-lg font-bold mb-2 text-brand-primary">{problem.title}</h3>
                    <p className="text-white/40 text-sm leading-relaxed group-hover:text-white/60 transition-colors">{problem.text}</p>
                  </Card>
                ))}
              </div>
            </div>
          </Container>
        </Section>

        {/* 4. HOW IT WORKS */}
        <Section id="how-it-works" background="subtle">
          <Container>
            <div className="text-center mb-20 space-y-4">
              <span className="text-brand-primary text-sm font-bold uppercase tracking-widest">The Workflow</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">How It Works</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Research & Audit', description: 'We analyze your current data and user behavior to find opportunities.', icon: Search },
                { step: '02', title: 'Hypothesis & Design', description: 'We create testing hypotheses and design optimized variations.', icon: LayoutIcon },
                { step: '03', title: 'A/B Testing', description: 'We run controlled experiments to see which variation performs better.', icon: Activity },
                { step: '04', title: 'Implementation', description: 'We implement the winning variations and monitor for long-term lift.', icon: Rocket },
              ].map((item) => (
                <Card
                  key={item.title}
                  hoverEffect={true}
                  padding="md"
                  className="rounded-[2.5rem] text-center group"
                >
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-8 group-hover:bg-brand-primary transition-all duration-500">
                    <item.icon className="w-8 h-8 text-brand-primary group-hover:text-brand-dark transition-colors" />
                  </div>
                  <div className="text-brand-primary text-xs font-bold uppercase tracking-widest mb-4">Step {item.step}</div>
                  <h3 className="text-xl font-bold mb-4 group-hover:text-brand-primary transition-colors">{item.title}</h3>
                  <p className="text-brand-text-secondary opacity-50 leading-relaxed group-hover:text-brand-text-secondary group-hover:opacity-100 transition-colors">{item.description}</p>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* 7. SERVICE FAQ */}
        <Section id="faq">
          <Container className="max-w-3xl">
            <div className="text-center mb-20 space-y-4">
              <span className="text-brand-primary text-sm font-bold uppercase tracking-widest">Questions</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <Card key={idx} padding="none" className="rounded-2xl overflow-hidden" hoverEffect={false}>
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <span className="font-bold text-lg">{faq.question}</span>
                    {activeFaq === idx ? (
                      <Minus className="w-5 h-5 text-brand-primary" />
                    ) : (
                      <Plus className="w-5 h-5 text-brand-primary" />
                    )}
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 pt-0 text-white/60 leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* 8. RELATED SERVICES */}
        <Section id="related-services" background="subtle">
          <Container>
            <div className="text-center mb-20 space-y-4">
              <span className="text-brand-primary text-sm font-bold uppercase tracking-widest">Explore More</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Related Services</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {[
                { 
                  title: 'Lead Generation', 
                  description: 'Build scalable traffic systems that bring in high-quality leads consistently through paid channels.', 
                  icon: Target,
                  link: '/services/lead-generation'
                },
                { 
                  title: 'Revenue Operations System', 
                  description: 'Our flagship service. A unified data infrastructure that aligns marketing, sales, and revenue.', 
                  icon: Workflow,
                  link: '/services/revenue-operations-system'
                },
              ].map((service) => (
                <Card
                  key={service.title}
                  hoverEffect={true}
                  padding="lg"
                  className="rounded-[2.5rem] group"
                >
                  <div className="w-14 h-14 bg-brand-primary/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-brand-primary transition-all duration-500">
                    <service.icon className="w-7 h-7 text-brand-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-brand-primary transition-colors">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed mb-8 group-hover:text-white/70 transition-colors">{service.description}</p>
                  <Button to={service.link} variant="ghost" size="sm" icon={ArrowRight} className="p-0 hover:bg-transparent text-brand-primary">
                    Learn More
                  </Button>
                </Card>
              ))}
            </div>
          </Container>
        </Section>

        {/* 9. FINAL CTA */}
        <Section id="final-cta">
          <Container>
            <motion.div
              initial={{ opacity: 0, scale: adjustScale(0.95) }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={getViewport({ once: true })}
              transition={getTransition({ duration: 0.6 })}
            >
              <Card padding="xl" className="text-center space-y-10 relative overflow-hidden border-brand-primary/20" hoverEffect={false}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full" />
                
                <div className="relative z-10 space-y-8">
                  <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-tight">
                    Ready to Turn More <br />
                    Visitors into Customers?
                  </h2>
                  <p className="text-brand-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                    Stop wasting traffic. Let's optimize your website for maximum conversion and revenue. Book your strategy call today.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                    <Button to="/contact" size="lg" icon={ArrowRight}>
                      Book Strategy Call
                    </Button>
                    <Button to="/services" variant="secondary" size="lg">
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

export default ConversionOptimization;
