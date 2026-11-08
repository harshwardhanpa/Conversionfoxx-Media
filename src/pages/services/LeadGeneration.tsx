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
  Megaphone,
  MousePointer2,
  Mail,
  MessageSquare,
  FileSearch,
  Workflow
} from 'lucide-react';
import Container from '../../components/ui/Container';
import Section from '../../components/ui/Section';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import { useResponsiveAnimation } from '../../components/utils/useResponsiveAnimation';
import { useSEO } from '../../components/utils/useSEO';

const LeadGeneration: React.FC = () => {
  const { getTransition, getViewport, adjustY, adjustX, adjustScale } = useResponsiveAnimation();

  useSEO({
    title: 'Predictable B2B Lead Generation Systems',
    description: 'Build scalable, high-intent B2B customer acquisition pipelines designed to feed your sales team with quality leads continuously.',
    canonical: '/services/lead-generation'
  });

  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: "Which platforms do you use for lead generation?",
      answer: "We focus on the platforms where your target audience is most active. This typically includes Google Ads (Search & Display), Meta (Facebook & Instagram), and LinkedIn. We choose the channel based on your specific business goals and audience behavior."
    },
    {
      question: "How do you ensure lead quality?",
      answer: "We use a combination of advanced targeting, high-intent keywords, and strategic landing page design. We also implement lead scoring and qualification forms to ensure that only high-quality prospects reach your sales team."
    },
    {
      question: "Do you handle the ad creative?",
      answer: "Yes. Our team handles everything from ad copy and design to video creative. We focus on direct-response creative that is designed to stop the scroll and drive action."
    },
    {
      question: "How do you measure success?",
      answer: "We focus on the metrics that matter: Cost Per Lead (CPL), Lead-to-Opportunity rate, and ultimately, Return on Ad Spend (ROAS). We provide real-time dashboards so you can see exactly how your campaigns are performing."
    },
    {
      question: "What's the minimum budget for lead generation?",
      answer: "While we work with various budgets, we recommend a minimum monthly ad spend to ensure we have enough data to optimize effectively. This varies by industry and platform, which we discuss during our initial strategy call."
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
                  <Target className="w-4 h-4" />
                  Lead Generation
                </div>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.05] font-display">
                  Dominant <br />
                  <span className="text-brand-primary">Traffic Acquisition.</span>
                </h1>
                <p className="text-lg md:text-xl text-brand-text-secondary font-medium leading-relaxed max-w-xl opacity-80 font-sans">
                  We engineer the acquisition layer of your revenue infrastructure to bridge the gap between anonymous traffic and high-intent SQLs. Predictable scale, forced through precision targeting.
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
                        <TrendingUp className="w-8 h-8 text-brand-primary" />
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
              <span className="text-brand-primary text-sm font-bold uppercase tracking-widest">Execution</span>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight">What’s Included</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: 'Google Search Ads', description: 'Capturing high-intent users who are actively searching for your solution.', icon: Search },
                { title: 'Meta Ads (FB & IG)', description: 'Scaling your reach through targeted social media campaigns and scroll-stopping creative.', icon: Megaphone },
                { title: 'LinkedIn Lead Gen', description: 'B2B lead generation targeting specific industries, roles, and company sizes.', icon: Users },
                { title: 'Direct Response Creative', description: 'Ad copy and design that is engineered to drive clicks and conversions.', icon: MousePointer2 },
                { title: 'Landing Page Optimization', description: 'Ensuring your ad traffic lands on pages that are built to convert.', icon: Target },
                { title: 'Real-Time Performance Tracking', description: 'Custom dashboards that show your lead volume, quality, and ROI in real-time.', icon: BarChart3 },
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
                  Stop wasting money on traffic that doesn't convert. We build lead generation systems that focus on quality and scalability.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: 'Low Lead Volume', text: 'We scale your reach to bring in a consistent flow of new prospects.' },
                  { title: 'Poor Lead Quality', text: 'We use advanced targeting to ensure you\'re talking to the right people.' },
                  { title: 'High Cost Per Lead', text: 'We optimize your campaigns to bring down acquisition costs.' },
                  { title: 'Inconsistent Results', text: 'We build systems that provide predictable lead flow month after month.' },
                  { title: 'Wasted Ad Spend', text: 'We eliminate low-performing keywords and audiences to maximize ROI.' },
                  { title: 'Lack of Attribution', text: 'We track every lead back to its source so you know what\'s working.' },
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
                { step: '01', title: 'Strategy & Targeting', description: 'We define your ideal customer profile and select the best traffic sources.', icon: Target },
                { step: '02', title: 'Creative Development', description: 'We build high-converting ad creative and landing pages.', icon: MousePointer2 },
                { step: '03', title: 'Campaign Launch', description: 'We launch your campaigns and begin gathering initial performance data.', icon: Rocket },
                { step: '04', title: 'Optimization & Scaling', description: 'We continuously optimize for lead quality and scale your successful campaigns.', icon: TrendingUp },
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
                  title: 'Conversion Optimization', 
                  description: 'Turn more visitors into customers through data-driven A/B testing and landing page optimization.', 
                  icon: MousePointer2,
                  link: '/services/conversion-optimization'
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
                    Ready to Build a <br />
                    Lead Generation Engine?
                  </h2>
                  <p className="text-brand-text-secondary text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed">
                    Start scaling your business with a predictable flow of high-quality leads. Let's build your traffic system today.
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

export default LeadGeneration;
