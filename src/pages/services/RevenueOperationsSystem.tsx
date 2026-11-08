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
  Target,
  Users,
  TrendingUp,
  Layers,
  Activity,
  Settings,
  Workflow,
  FileSearch,
  MousePointer2
} from 'lucide-react';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useResponsiveAnimation } from '../../components/utils/useResponsiveAnimation';
import { useSEO } from '../../components/utils/useSEO';

const RevenueOperationsSystem: React.FC = () => {
  const { getTransition, getViewport, adjustY, adjustX, adjustScale } = useResponsiveAnimation();

  useSEO({
    title: 'Revenue Operations & CRM Automation Systems',
    description: 'Eliminate administrative drag and siloed marketing datasets. Unify marketing, sales, and analytics with robust Hubspot/Salesforce automation and workflows.',
    canonical: '/services/revenue-operations-system'
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "What is a Revenue Operations (RevOps) System?",
      answer: "A RevOps System is a unified infrastructure that aligns your marketing, sales, and customer success teams. It ensures that data flows seamlessly across your entire growth engine, allowing for better decision-making and scalable revenue growth."
    },
    {
      question: "How is this different from a CRM?",
      answer: "A CRM is a tool; a RevOps System is the entire architecture. We don't just set up a CRM; we build the workflows, integrations, and data structures that make your CRM (and other tools) actually work for your business."
    },
    {
      question: "Which tools do you work with?",
      answer: "We specialize in the modern growth stack, including HubSpot, Salesforce, GA4, Meta Ads, and various automation tools like Zapier or Make. We choose the best tools for your specific needs and integrate them into a unified system."
    },
    {
      question: "How long does it take to build the system?",
      answer: "Building a full RevOps System is a phased process. We typically start with a 90-day implementation phase where we build the core architecture, followed by ongoing optimization to ensure the system scales with your business."
    },
    {
      question: "What kind of results can I expect?",
      answer: "Expect better lead quality, shorter sales cycles, and a clear view of your ROI. By aligning your teams and data, you'll be able to scale your revenue more predictably and efficiently."
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
                  <Workflow className="w-4 h-4" />
                  Flagship Service
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
                  Unified Data. <br />
                  Scalable Revenue.
                </h1>
                <p className="text-lg md:text-xl text-brand-text-secondary font-light leading-relaxed max-w-xl">
                  Our flagship service. We build the entire growth infrastructure for your business, aligning marketing, sales, and data into a single, high-performance revenue engine.
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
                        <Layers className="w-8 h-8 text-brand-primary" />
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
              <span className="text-brand-primary text-sm font-bold uppercase tracking-widest">Infrastructure</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">What’s Included</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Full-Stack RevOps Setup', description: 'Building the core data architecture that connects your marketing and sales teams.', icon: Layers },
                { title: 'CRM Architecture & Automation', description: 'Designing custom workflows and automations that save time and improve lead management.', icon: Settings },
                { title: 'Unified Growth Dashboard', description: 'A single source of truth for all your growth metrics, from traffic to revenue.', icon: BarChart3 },
                { title: 'Marketing & Sales Alignment', description: 'Ensuring your teams are working toward the same goals with the same data.', icon: Users },
                { title: 'Scalable Data Infrastructure', description: 'Building a technical foundation that can handle your growth as you scale.', icon: Database },
                { title: 'Continuous System Optimization', description: 'Ongoing monitoring and improvement of your revenue engine to ensure peak performance.', icon: Activity },
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
                  Fragmented data and misaligned teams are the biggest killers of growth. We build the system that brings everything together.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Disconnected Data', text: 'We unify your marketing and sales data for a single source of truth.' },
                  { title: 'Manual Workflows', text: 'We automate repetitive tasks so your team can focus on growth.' },
                  { title: 'Poor Lead Handoff', text: 'We build seamless transitions between marketing and sales.' },
                  { title: 'Lack of Visibility', text: 'We provide clear dashboards so you know exactly what\'s driving revenue.' },
                  { title: 'Inconsistent Reporting', text: 'We ensure your data is accurate and consistent across all tools.' },
                  { title: 'Unscalable Systems', text: 'We build a foundation that grows with your business.' },
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
                { step: '01', title: 'System Audit', description: 'We analyze your current tools, data, and workflows to find gaps.', icon: Search },
                { step: '02', title: 'Architecture Design', description: 'We design your unified growth infrastructure and data model.', icon: Layers },
                { step: '03', title: 'Implementation', description: 'We build the workflows, integrations, and dashboards.', icon: Rocket },
                { step: '04', title: 'Optimization', description: 'We monitor performance and continuously optimize the system.', icon: TrendingUp },
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
                  title: 'Conversion Optimization', 
                  description: 'Turn more visitors into customers through data-driven A/B testing and landing page optimization.', 
                  icon: MousePointer2,
                  link: '/services/conversion-optimization'
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
                    Ready to Build Your <br />
                    Revenue Operations System?
                  </h2>
                  <p className="text-brand-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                    Stop fighting with fragmented data. Let's build a unified growth infrastructure that scales with your business. Book your strategy call today.
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

export default RevenueOperationsSystem;
