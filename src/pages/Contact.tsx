import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useResponsiveAnimation } from '../components/utils/useResponsiveAnimation';
import { useSEO } from '../components/utils/useSEO';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  Mail, 
  Calendar, 
  Briefcase, 
  Zap, 
  User, 
  Building, 
  Phone, 
  MessageSquare, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  Plus, 
  Minus, 
  ArrowRight, 
  ChevronRight,
  Globe,
  ShieldCheck,
  TrendingUp,
  Layout as LayoutIcon,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { inquiryService } from '../services/inquiryService';

const Contact: React.FC = () => {
  const { getTransition, getViewport, adjustY, adjustX, adjustScale } = useResponsiveAnimation();

  useSEO({
    title: 'Get in Touch | Request a Strategic Growth Consultation',
    description: 'Contact ConversionFoxx today to discuss how we can help optimize your funnel, scale your qualified B2B leads, and build continuous growth systems.',
    canonical: '/contact'
  });

  const [formState, setFormState] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    service: '',
    budget: '',
    message: ''
  });

  const [settings, setSettings] = useState<any>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await inquiryService.getSettings();
        setSettings(data);
      } catch (err) {
        console.warn('Could not fetch contact settings, using fallback defaults:', err);
      }
    };
    fetchSettings();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    try {
      await inquiryService.createInquiry({
        name: formState.name,
        email: formState.email,
        service: formState.service,
        budget: formState.budget,
        message: formState.message
      });
      setIsSubmitted(true);
    } catch (err) {
      console.error('Error submitting inquiry:', err);
      setError(settings?.error_message || 'Something went wrong. Please try again or contact us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };


  const toggleFaq = (index: number) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const contactOptions = [
    {
      title: 'Email Us',
      description: 'Send us your requirements, questions, or project goals and we’ll get back to you with clarity.',
      info: 'info@conversionfoxx.com',
      icon: <Mail className="w-6 h-6 text-brand-primary" />,
      delay: 0.1
    },
    {
      title: 'Book a Consultation',
      description: 'Start with a focused conversation about your business goals, digital gaps, and growth opportunities.',
      info: 'Schedule a Call',
      icon: <Calendar className="w-6 h-6 text-brand-primary" />,
      delay: 0.2
    },
    {
      title: 'Business Inquiries',
      description: 'For partnerships, proposals, and long-term collaboration opportunities.',
      info: 'Partnership Desk',
      icon: <Briefcase className="w-6 h-6 text-brand-primary" />,
      delay: 0.3
    },
    {
      title: 'Quick Response',
      description: 'Share the basics and we’ll guide you to the right service or next action.',
      info: 'Fast-track Inquiry',
      icon: <Zap className="w-6 h-6 text-brand-primary" />,
      delay: 0.4
    }
  ];

  const whyContactUs = [
    {
      title: 'Clear Strategic Direction',
      description: 'We don’t just build; we plan. Every project starts with a clear roadmap aligned with your business objectives.',
      icon: <Globe className="w-6 h-6 text-brand-primary" />
    },
    {
      title: 'Connected Revenue Thinking',
      description: 'We bridge the gap between traffic and revenue to ensure your systems actually scale your business.',
      icon: <TrendingUp className="w-6 h-6 text-brand-primary" />
    },
    {
      title: 'Practical, Business-Focused Execution',
      description: 'No fluff, no over-engineering. We focus on high-impact solutions that solve real business challenges efficiently.',
      icon: <LayoutIcon className="w-6 h-6 text-brand-primary" />
    },
    {
      title: 'Scalable Solutions for Modern Brands',
      description: 'Our systems are built to grow with you. We ensure your digital foundation can handle future expansion.',
      icon: <ShieldCheck className="w-6 h-6 text-brand-primary" />
    }
  ];

  const nextSteps = [
    {
      step: '01',
      title: 'Discovery Call',
      description: 'We dive deep into your business model, revenue goals, and current bottlenecks.'
    },
    {
      step: '02',
      title: 'System Architecture',
      description: 'We present a tailored roadmap and system design to scale your revenue predictably.'
    },
    {
      step: '03',
      title: 'Execution & Launch',
      description: 'Once aligned, we begin building and optimizing your high-performance growth engine.'
    }
  ];

  const faqs = [
    {
      question: 'How is this different from a marketing agency?',
      answer: 'Traditional agencies focus on tactics like "running ads" or "posting on social." We focus on systems. We architect the entire Revenue Operations System that connects your traffic to your bottom line, ensuring every dollar spent on marketing has a clear path to revenue.'
    },
    {
      question: 'Do you work with businesses of different sizes?',
      answer: 'We typically work with businesses doing $500k to $10M in annual revenue that are looking to scale predictably. However, we also have specific frameworks for high-growth startups.'
    },
    {
      question: 'How soon can we see results?',
      answer: 'Once we begin implementation, most clients see measurable improvements in lead quality and conversion rates within the first 30-60 days.'
    },
    {
      question: 'What is the Revenue Operations System?',
      answer: 'It is our flagship service. It is a unified system that integrates your lead generation, sales CRM, and data analytics into one high-performance engine. It gives you 100% visibility into your revenue pipeline.'
    }
  ];

  return (
    <>
      <div className="relative z-10">
        {/* 1. CONTACT HERO */}
        <Section className="relative pt-40 pb-20 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 -right-20 w-96 h-96 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />

          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: adjustX(-30) }}
                animate={{ opacity: 1, x: 0 }}
                transition={getTransition({ duration: 0.8 })}
                className="space-y-8"
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-sans font-semibold uppercase tracking-[0.2em]">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
                  </span>
                  Let's Connect
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.05] text-brand-text-heading max-w-2xl font-display">
                  Let’s Build a <br />
                  <span className="text-brand-primary">
                    Revenue System
                  </span> That Scales
                </h1>
                <p className="text-base md:text-lg text-gray-400 font-sans font-normal leading-[1.6] max-w-xl">
                  Whether you need high-performance Lead Generation, or a complete Revenue Operations System, ConversionFoxx is ready to help you scale with precision.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button 
                    to="#contact-form" 
                    className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-medium transition w-full sm:w-auto" 
                    size="lg" 
                    onClick={() => {
                      const el = document.getElementById('contact-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Book Strategy Call
                  </Button>
                  <Button 
                    to="/services" 
                    variant="secondary" 
                    className="border border-white/20 hover:border-brand-primary px-6 py-3 rounded-xl w-full sm:w-auto" 
                    size="lg"
                  >
                    See How It Works
                  </Button>
                </div>
                <p className="text-gray-500 text-sm font-sans italic">
                  “Tell us what you need. We’ll help you find the right next step.”
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: adjustScale(0.9) }}
                animate={{ opacity: 1, scale: 1 }}
                transition={getTransition({ duration: 0.8, delay: 0.2 })}
                className="relative hidden lg:block"
              >
                <Card padding="lg" className="rounded-2xl border-white/10 shadow-2xl" hoverEffect={false}>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border-white/5">
                      <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center">
                        <MessageSquare className="w-6 h-6 text-brand-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-brand-text-heading">New Message</div>
                        <div className="text-xs text-gray-400 font-sans">From: Potential Client</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border-white/5 translate-x-8">
                      <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center">
                        <Zap className="w-6 h-6 text-brand-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-brand-text-heading">Project Scope</div>
                        <div className="text-xs text-gray-400 font-sans">Status: Analyzing...</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border-white/5 translate-x-4">
                      <div className="w-12 h-12 bg-brand-primary/20 rounded-xl flex items-center justify-center">
                        <Calendar className="w-6 h-6 text-brand-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-brand-text-heading">Meeting Scheduled</div>
                        <div className="text-xs text-gray-400 font-sans">Tomorrow at 10:00 AM</div>
                      </div>
                    </div>
                  </div>
                </Card>
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand-primary/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-brand-primary/10 blur-3xl rounded-full" />
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* 2. CONTACT OPTIONS SECTION */}
        <Section background="subtle">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading tracking-tight font-display">How You Can Reach Us</h2>
              <p className="text-gray-400 font-sans max-w-2xl mx-auto text-base md:text-lg">Multiple ways to connect without friction. Choose the one that fits your needs.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactOptions.map((option, idx) => (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: adjustY(20) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={getViewport({ once: true })}
                  transition={getTransition({ delay: option.delay })}
                >
                  <Card padding="lg" className="h-full group hover-lift">
                    <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-8 group-hover:bg-brand-primary group-hover:text-brand-dark transition-all duration-300">
                      <div className="w-6 h-6 flex items-center justify-center">
                        {React.cloneElement(option.icon as React.ReactElement, { className: 'w-full h-full' })}
                      </div>
                    </div>
                    <h3 className="text-xl font-black mb-4 text-brand-text-heading font-display tracking-tight group-hover:text-brand-primary transition-colors">{option.title}</h3>
                    <p className="text-brand-text-secondary font-sans text-sm leading-relaxed mb-6">
                      {option.description}
                    </p>
                    <div className="text-brand-primary font-sans font-semibold text-xs tracking-[0.2em] uppercase">
                      {option.info}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 3. CONTACT FORM SECTION */}
        <Section id="contact-form" className="relative">
          <Container size="md">
            <motion.div
              initial={{ opacity: 0, scale: adjustScale(0.95) }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={getViewport({ once: true })}
              transition={getTransition({ duration: 0.6 })}
            >
              <Card padding="xl" className="relative overflow-hidden border-brand-primary/10 shadow-2xl" hoverEffect={false}>
                {/* Background Glow */}
                <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10">
                  <div className="text-center mb-12 space-y-4">
                    <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading tracking-tight font-display">Tell Us About Your Project</h2>
                    <p className="text-base md:text-lg text-gray-400 font-sans leading-[1.6] max-w-2xl mx-auto">Share a few details and our team will reach out with the most relevant next step.</p>
                  </div>

                  <AnimatePresence mode="wait">
                    {!isSubmitted ? (
                      <motion.form 
                        key="contact-form"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onSubmit={handleSubmit} 
                        className="space-y-6"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gray-500 ml-1 flex items-center gap-2">
                              <User className="w-4 h-4 text-brand-primary" />
                              Full Name
                            </label>
                            <input
                              required
                              type="text"
                              name="name"
                              value={formState.name}
                              onChange={handleInputChange}
                              placeholder="John Doe"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-text-heading font-sans placeholder:text-gray-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gray-500 ml-1 flex items-center gap-2">
                              <Building className="w-4 h-4 text-brand-primary" />
                              Company Name
                            </label>
                            <input
                              required
                              type="text"
                              name="company"
                              value={formState.company}
                              onChange={handleInputChange}
                              placeholder="Acme Corp"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-text-heading font-sans placeholder:text-gray-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gray-500 ml-1 flex items-center gap-2">
                              <Mail className="w-4 h-4 text-brand-primary" />
                              Email Address
                            </label>
                            <input
                              required
                              type="email"
                              name="email"
                              value={formState.email}
                              onChange={handleInputChange}
                              placeholder="john@example.com"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-text-heading font-sans placeholder:text-gray-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gray-500 ml-1 flex items-center gap-2">
                              <Phone className="w-4 h-4 text-brand-primary" />
                              Phone Number
                            </label>
                            <input
                              required
                              type="tel"
                              name="phone"
                              value={formState.phone}
                              onChange={handleInputChange}
                              placeholder="+1 (555) 000-0000"
                              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-text-heading font-sans placeholder:text-gray-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gray-500 ml-1 flex items-center gap-2">
                              <Zap className="w-4 h-4 text-brand-primary" />
                              Service Needed
                            </label>
                            <div className="relative group/select">
                              <select
                                required
                                name="service"
                                value={formState.service}
                                onChange={handleInputChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-text-heading font-sans focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all appearance-none cursor-pointer"
                              >
                                <option value="" disabled className="bg-[#0a0a0a]">Select a service</option>
                                <option value="lead-gen" className="bg-[#0a0a0a]">Lead Generation</option>
                                <option value="cro" className="bg-[#0a0a0a]">Conversion Optimization</option>
                                <option value="rev-ops" className="bg-[#0a0a0a]">Revenue Operations System</option>
                                <option value="multiple" className="bg-[#0a0a0a]">Multiple Services</option>
                                <option value="not-sure" className="bg-[#0a0a0a]">Not Sure Yet</option>
                              </select>
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-focus-within/select:text-brand-primary transition-colors">
                                <ChevronRight className="w-4 h-4 rotate-90" />
                              </div>
                            </div>
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gray-500 ml-1 flex items-center gap-2">
                              <TrendingUp className="w-4 h-4 text-brand-primary" />
                              Project Budget
                            </label>
                            <div className="relative group/select">
                              <select
                                required
                                name="budget"
                                value={formState.budget}
                                onChange={handleInputChange}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-text-heading font-sans focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all appearance-none cursor-pointer"
                              >
                                <option value="" disabled className="bg-[#0a0a0a]">Select a budget range</option>
                                <option value="under-1k" className="bg-[#0a0a0a]">Under $1,000</option>
                                <option value="1k-3k" className="bg-[#0a0a0a]">$1,000 – $3,000</option>
                                <option value="3k-7k" className="bg-[#0a0a0a]">$3,000 – $7,000</option>
                                <option value="7k-plus" className="bg-[#0a0a0a]">$7,000+</option>
                                <option value="discuss" className="bg-[#0a0a0a]">Let’s Discuss</option>
                              </select>
                              <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500 group-focus-within/select:text-brand-primary transition-colors">
                                <ChevronRight className="w-4 h-4 rotate-90" />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-sans font-semibold uppercase tracking-[0.2em] text-gray-500 ml-1 flex items-center gap-2">
                            <MessageSquare className="w-4 h-4 text-brand-primary" />
                            Project Details / Message
                          </label>
                          <textarea
                            required
                            name="message"
                            value={formState.message}
                            onChange={handleInputChange}
                            rows={5}
                            placeholder="Tell us about your challenges and what you're looking to achieve..."
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-text-heading font-sans placeholder:text-gray-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all resize-none"
                          ></textarea>
                        </div>
                        
                        {error && (
                          <div className="p-4 bg-brand-primary/10 border border-brand-primary/20 rounded-2xl flex items-center gap-3 text-brand-primary">
                            <AlertCircle size={20} />
                            <p className="text-sm font-sans font-semibold">{error}</p>
                          </div>
                        )}

                        <div className="pt-4 text-center">
                          <Button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-xl font-medium transition w-full md:w-auto"
                            size="lg"
                          >
                            {isSubmitting ? (
                              <div className="flex items-center gap-2">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                Sending...
                              </div>
                            ) : (
                              "Send Inquiry"
                            )}
                          </Button>
                          <p className="mt-6 text-gray-500 text-xs font-sans font-semibold uppercase tracking-[0.2em] flex items-center justify-center gap-2">
                            <ShieldCheck className="w-4 h-4" />
                            Your information stays private and is only used to respond to your inquiry.
                          </p>
                        </div>
                      </motion.form>
                    ) : (
                      <motion.div
                        key="success-state"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-center py-12 space-y-8"
                      >
                        <div className="w-24 h-24 bg-brand-primary/20 rounded-full flex items-center justify-center mx-auto">
                          <CheckCircle2 className="w-12 h-12 text-brand-primary" />
                        </div>
                        <div className="space-y-4">
                          <h3 className="text-3xl md:text-4xl font-semibold text-brand-text-heading">Inquiry Sent Successfully!</h3>
                          <p className="text-gray-400 font-sans text-base md:text-lg max-w-md mx-auto leading-[1.6]">
                            {settings?.success_message || `Thank you for reaching out, ${formState.name.split(' ')[0]}. Our team has received your details and will get back to you within 24 hours.`}
                          </p>
                        </div>

                        <div className="pt-4">
                          <Button to="/" variant="secondary" className="border border-white/20 hover:border-brand-primary px-6 py-3 rounded-xl">
                            Back to Home
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Card>
            </motion.div>
          </Container>
        </Section>

        {/* 4. WHY CONTACT US SECTION */}
        <Section>
          <Container>
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading tracking-tight font-display">Why Businesses Reach Out to ConversionFoxx</h2>
              <p className="text-gray-400 font-sans max-w-2xl mx-auto text-base md:text-lg">We focus on the intersection of technical excellence and business growth.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {whyContactUs.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, scale: adjustScale(0.95) }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={getViewport({ once: true })}
                  transition={getTransition({ delay: idx * 0.1 })}
                >
                  <Card padding="lg" className="h-full text-center group hover-lift">
                    <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-6 mx-auto group-hover:bg-brand-primary group-hover:text-brand-dark transition-all duration-300">
                      <div className="w-6 h-6 flex items-center justify-center">
                        {React.cloneElement(item.icon as React.ReactElement, { className: 'w-full h-full' })}
                      </div>
                    </div>
                    <h3 className="text-xl font-black mb-4 text-brand-text-heading font-display tracking-tight group-hover:text-brand-primary transition-colors">{item.title}</h3>
                    <p className="text-brand-text-secondary font-sans text-sm leading-relaxed">
                      {item.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 5. WHAT HAPPENS NEXT SECTION */}
        <Section background="subtle">
          <Container>
            <div className="text-center mb-20 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading tracking-tight font-display">What Happens Next</h2>
              <p className="text-gray-400 font-sans max-w-2xl mx-auto text-base md:text-lg">We’ve streamlined our onboarding to get your project moving quickly and clearly.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {nextSteps.map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: adjustX(-20) }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={getViewport({ once: true })}
                  transition={getTransition({ delay: idx * 0.1 })}
                  className="relative group"
                >
                  <Card padding="lg" className="h-full hover-lift">
                    <div className="text-6xl font-black text-white/5 mb-6 group-hover:text-brand-primary/10 transition-colors font-display">
                      {step.step}
                    </div>
                    <h3 className="text-xl font-black mb-4 text-brand-text-heading font-display tracking-tight">{step.title}</h3>
                    <p className="text-brand-text-secondary font-sans text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </Card>
                  {idx < nextSteps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 translate-y-[-50%] z-20">
                      <ChevronRight className="w-8 h-8 text-white/10" />
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 6. CONTACT DETAILS + BUSINESS INFO SECTION */}
        <Section>
          <Container>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-1 space-y-8">
                <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading font-display tracking-tight">Business Information</h2>
                <p className="text-brand-text-secondary font-sans text-base md:text-lg leading-relaxed">
                  We work with businesses looking for focused execution, stronger systems, and measurable digital growth.
                </p>
                <div className="w-20 h-1 bg-brand-primary rounded-full" />
              </div>
              <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
                <Card padding="md" className="flex items-start gap-6">
                  <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary flex-shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-[0.2em] mb-1">Email</div>
                    <a href="mailto:info@conversionfoxx.com" className="text-lg font-semibold text-brand-text-heading hover:text-brand-primary transition-colors">
                      info@conversionfoxx.com
                    </a>
                  </div>
                </Card>
                <Card padding="md" className="flex items-start gap-6">
                  <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary flex-shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-[0.2em] mb-1">Phone</div>
                    <a href="tel:+917990126349" className="text-lg font-semibold text-brand-text-heading hover:text-brand-primary transition-colors">
                      +91 79901 26349
                    </a>
                  </div>
                </Card>
                <Card padding="md" className="flex items-start gap-6">
                  <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary flex-shrink-0">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-[0.2em] mb-1">Business Hours</div>
                    <div className="text-lg font-semibold text-brand-text-heading">Mon – Fri, 9 AM – 6 PM</div>
                  </div>
                </Card>
                <Card padding="md" className="flex items-start gap-6">
                  <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary flex-shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-sans font-semibold text-gray-500 uppercase tracking-[0.2em] mb-1">Location</div>
                    <div className="text-lg font-semibold text-brand-text-heading">Ahmedabad, India</div>
                  </div>
                </Card>
              </div>
            </div>
          </Container>
        </Section>

        {/* 7. FAQ SECTION */}
        <Section background="subtle">
          <Container size="md">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading font-display tracking-tight">Frequently Asked Questions</h2>
              <p className="text-brand-text-secondary font-sans text-base md:text-lg leading-relaxed">Common questions about starting a project with ConversionFoxx.</p>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={faq.question} className="bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 text-left flex items-center justify-between hover:bg-white/5 transition-colors"
                  >
                    <span className="font-black text-lg text-brand-text-heading font-display tracking-tight">{faq.question}</span>
                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                      {activeFaq === idx ? (
                        <Minus className="w-4 h-4 text-brand-primary" />
                      ) : (
                        <Plus className="w-4 h-4 text-brand-primary" />
                      )}
                    </div>
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 pt-0 text-brand-text-secondary font-sans leading-relaxed border-t border-white/5">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 8. FINAL CTA SECTION */}
        <Section className="relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-primary/5 blur-[150px] rounded-full pointer-events-none" />

          <Container>
            <motion.div
              initial={{ opacity: 0, y: adjustY(30) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={getViewport({ once: true })}
              transition={getTransition({ duration: 0.6 })}
            >
              <Card padding="xl" className="text-center space-y-10 relative overflow-hidden border-brand-primary/20 shadow-2xl shadow-brand-primary/5" hoverEffect={false}>
                <div className="relative z-10 space-y-8">
              <h2 className="text-3xl md:text-5xl font-black leading-[1.05] text-brand-text-heading max-w-4xl mx-auto tracking-tight font-display">
                Have a Project <span className="text-brand-primary">in Mind?</span>
              </h2>
                  <p className="text-gray-400 font-sans text-base md:text-lg max-w-2xl mx-auto mb-12 font-normal leading-relaxed">
                    Let’s turn your ideas, challenges, or growth goals into a clear and practical next step.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <Button 
                      to="#contact-form" 
                      size="lg" 
                      className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-medium transition w-full sm:w-auto"
                      onClick={() => {
                        const el = document.getElementById('contact-form');
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }}
                    >
                      Book Strategy Call
                    </Button>
                    <Button to="/" variant="secondary" size="lg" className="border border-white/20 hover:border-brand-primary px-6 py-3 rounded-xl w-full sm:w-auto">
                      See How It Works
                    </Button>
                  </div>
                  <div className="mt-10">
                    <Link to="/services" className="text-brand-primary hover:text-brand-primary/90 font-sans font-semibold flex items-center justify-center gap-2 transition-colors group">
                      Explore Services
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
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

export default Contact;
