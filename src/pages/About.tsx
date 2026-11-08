import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useResponsiveAnimation } from '../components/utils/useResponsiveAnimation';
import { useSEO } from '../components/utils/useSEO';
import { ArrowRight, Sparkles, Target, Eye, Zap, Layers, Rocket, ShieldCheck, BarChart3, Share2, Code, Smartphone, Megaphone, Database, Search, PenTool, TrendingUp, ChevronRight } from 'lucide-react';

const About: React.FC = () => {
  const { getTransition, getViewport, adjustY, adjustX, adjustScale } = useResponsiveAnimation();

  useSEO({
    title: 'About Us | Our Story & Conversion Focus',
    description: 'Learn about the ConversionFoxx team, our mission, core values, and our result-focused methodology for building scalable B2B growth systems.',
    canonical: '/about'
  });

  return (
    <>
      <div className="relative z-10 pt-20">
        {/* 1. ABOUT HERO SECTION */}
        <Section className="relative overflow-hidden pt-32 pb-20">
          {/* Background Decorative Elements */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-primary/5 blur-[120px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-brand-primary/5 blur-[100px] rounded-full" />

          <Container>
            <motion.div
              initial={{ opacity: 0, y: adjustY(15) }}
              animate={{ opacity: 1, y: 0 }}
              transition={getTransition({ duration: 0.6, ease: [0.16, 1, 0.3, 1] })}
              className="text-center space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-sans font-bold uppercase tracking-[0.2em] mx-auto border border-brand-primary/20 glass liquid-glass">
                <Sparkles className="w-4 h-4" />
                About ConversionFoxx
              </div>
              <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[1.05] text-brand-text-heading max-w-4xl mx-auto font-display">
                Engineering High-Performance <br />
                <span className="brand-gradient-text">Growth Infrastructure</span>
              </h1>
              <p className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto font-sans font-normal leading-relaxed">
                ConversionFoxx is a growth system architecture firm. We help high-growth companies scale by engineering the technical and strategic infrastructure needed for predictable revenue acquisition.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                <Button to="/contact" size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-bold transition w-full sm:w-auto">
                  Book Strategy Call
                </Button>
                <Button to="/services" variant="secondary" size="lg" className="border border-white/20 hover:border-brand-primary px-6 py-3 rounded-xl w-full sm:w-auto text-white">
                  See How It Works
                </Button>
              </div>
            </motion.div>
          </Container>
        </Section>

        {/* 2. OUR STORY SECTION */}
        <Section id="our-story">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: adjustX(-20) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={getViewport({ once: true, margin: "-50px" })}
                transition={getTransition({ duration: 0.6 })}
                className="space-y-6"
              >
                <span className="text-brand-primary text-sm font-sans font-bold uppercase tracking-[0.2em]">Our Story</span>
                <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading tracking-tight font-display">Bridging the Gap Between <br />Traffic and Revenue</h2>
                <div className="space-y-4 text-gray-400 font-sans text-base md:text-lg max-w-xl leading-relaxed">
                  <p>
                    In today's digital landscape, many businesses invest heavily in beautiful websites and expensive advertising, yet they often fail to see measurable revenue growth. They have traffic, but they lack a system to convert that traffic into predictable profit.
                  </p>
                  <p>
                    ConversionFoxx was created to solve this. We realized that for a growth strategy to be truly successful, it must be built on a foundation of system-thinking and data-backed optimization.
                  </p>
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: adjustScale(0.9) }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={getViewport({ once: true })}
                transition={getTransition({ duration: 0.6 })}
              >
                <Card padding="xl" className="aspect-square flex items-center justify-center relative overflow-hidden group liquid-glass">
                  <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                  <div className="relative z-10 text-center space-y-6">
                    <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-4 glass shadow-xl shadow-brand-primary/5">
                      <Rocket className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black italic text-brand-text-heading leading-relaxed font-display">"Growth is not an accident; it's a system."</h3>
                    <div className="w-12 h-1 bg-brand-primary mx-auto rounded-full" />
                  </div>
                </Card>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* 3. MISSION AND VISION SECTION */}
        <Section id="mission-vision">
          <Container>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-2xl mx-auto tracking-tight font-display">What Drives Us</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <motion.div
                initial={{ opacity: 0, y: adjustY(20) }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={getViewport({ once: true })}
                transition={getTransition({ duration: 0.6 })}
              >
                <Card padding="xl" className="h-full hover-lift core-card transition-all duration-300">
                  <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-6">
                    <Target className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-4 text-brand-text-heading font-display tracking-tight">Our Mission</h3>
                  <p className="text-brand-text-secondary font-sans text-base leading-relaxed">
                    To help businesses turn marketing efforts into predictable revenue through system-based growth architecture and data-backed optimization.
                  </p>
                </Card>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: adjustY(20) }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={getViewport({ once: true })}
                transition={getTransition({ duration: 0.6, delay: 0.1 })}
              >
                <Card padding="xl" className="h-full hover-lift core-card transition-all duration-300">
                  <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-6">
                    <Eye className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-black mb-4 text-brand-text-heading font-display tracking-tight">Our Vision</h3>
                  <p className="text-brand-text-secondary font-sans text-base leading-relaxed">
                    To become the world's leading growth architecture firm, known for building the most efficient and scalable revenue systems for ambitious brands.
                  </p>
                </Card>
              </motion.div>
            </div>
          </Container>
        </Section>

        {/* 4. WHY BUSINESSES CHOOSE US SECTION */}
        <Section id="why-choose-us" background="subtle">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <span className="text-brand-primary text-sm font-sans font-bold uppercase tracking-[0.2em]">Why ConversionFoxx?</span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-2xl mx-auto tracking-tight font-display">Why Businesses Choose Us</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Revenue-Focused Thinking', description: 'We don\'t just look at clicks; we look at the bottom line. Every strategy is built to drive revenue.', icon: BarChart3 },
                { title: 'Tech + Marketing Under One Roof', description: 'We combine deep technical expertise with high-performance marketing for a unified growth strategy.', icon: Layers },
                { title: 'Scalable Systems', description: 'We build infrastructures that grow with your business, ensuring long-term stability and performance.', icon: ShieldCheck },
                { title: 'Fast, Strategic Execution', description: 'We move quickly without sacrificing quality, delivering results at the speed of modern business.', icon: Zap },
                { title: 'Clear Communication', description: 'We believe in transparency. You\'ll always know exactly what we\'re doing and why it matters.', icon: Share2 },
                { title: 'Data-Backed Decisions', description: 'No guesswork. We use advanced analytics and user data to drive every strategic move we make.', icon: TrendingUp },
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: adjustY(15) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={getViewport({ once: true, margin: "-50px" })}
                  transition={getTransition({ duration: 0.5, delay: idx * 0.05 })}
                >
                  <Card padding="lg" className="h-full group hover-lift">
                    <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-brand-dark transition-all duration-300">
                      <item.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-black mb-4 text-brand-text-heading font-display tracking-tight">{item.title}</h3>
                    <p className="text-brand-text-secondary font-sans text-sm leading-relaxed">{item.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 5. OUR EXPERTISE SECTION */}
        <Section id="expertise">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <span className="text-brand-primary text-sm font-sans font-bold uppercase tracking-[0.2em]">Our Expertise</span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-2xl mx-auto tracking-tight font-display">Built to Support Modern Growth</h2>
              <p className="text-gray-400 font-sans max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                Built to support modern business growth across strategy, technology, and performance.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
              {[
                { title: 'Lead Generation', description: 'Scalable traffic systems built to drive high-quality leads predictably.', icon: Megaphone },
                { title: 'Conversion Optimization', description: 'Data-backed optimization to turn more of your traffic into revenue.', icon: TrendingUp },
                { title: 'Revenue Operations', description: 'The flagship system that ties your marketing and sales into a unified engine.', icon: Database },
                { title: 'System Architecture', description: 'Custom-built growth infrastructure designed for long-term scalability.', icon: Layers },
              ].map((service, idx) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, scale: adjustScale(0.98) }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={getViewport({ once: true, margin: "-50px" })}
                  transition={getTransition({ duration: 0.5, delay: idx * 0.05 })}
                >
                  <Card padding="lg" className="h-full hover-lift">
                    <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-6 group-hover:bg-brand-primary group-hover:text-brand-dark transition-all duration-300">
                      <service.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black mb-4 text-brand-text-heading font-display tracking-tight">{service.title}</h3>
                    <p className="text-gray-400 font-sans leading-relaxed">{service.description}</p>
                  </Card>
                </motion.div>
              ))}
              <div className="bg-brand-primary/5 border-2 border-dashed border-brand-primary/20 p-8 rounded-2xl flex flex-col justify-center items-center text-center gap-6 group hover:border-brand-primary/50 transition-colors duration-300">
                <h3 className="text-xl md:text-2xl font-black text-brand-text-heading font-display tracking-tight">Need a Custom Solution?</h3>
                <Button to="/contact" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-bold transition">
                  Let's Talk
                </Button>
              </div>
            </div>
          </Container>
        </Section>

        {/* 6. RESULTS MINDSET SECTION */}
        <Section id="results-mindset" background="subtle">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: adjustX(-20) }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={getViewport({ once: true, margin: "-50px" })}
                transition={getTransition({ duration: 0.6 })}
                className="space-y-6"
              >
                <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-2xl font-display tracking-tight">We Focus on Results <br /><span className="text-brand-primary">That Scale</span></h2>
                <p className="text-gray-400 font-sans text-base md:text-lg max-w-xl leading-relaxed">
                  Every strategy, Lead Gen campaign, or Revenue Operations System we build is centered around efficiency, conversion, and long-term scalability.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                  {[
                    'Conversion-Oriented Execution',
                    'Performance Tracking',
                    'ROI-Focused Strategy',
                    'Long-Term Scalability'
                  ].map((item) => (
                    <div key={item} className="flex items-center gap-3 group">
                      <div className="w-5 h-5 rounded-full bg-brand-primary/20 flex items-center justify-center group-hover:bg-brand-primary transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-primary group-hover:bg-[#0A0705]" />
                      </div>
                      <span className="font-sans font-medium text-gray-400 group-hover:text-brand-text-heading transition-colors">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-6 pt-12">
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-2 hover:border-brand-primary/30 transition-all duration-300 hover-lift">
                      <div className="text-4xl font-black text-brand-primary tracking-tighter">300%</div>
                      <div className="text-xs font-sans text-gray-500 font-bold uppercase tracking-[0.2em]">ROI Increase</div>
                    </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-2 hover:border-brand-primary/30 transition-all duration-300 hover-lift">
                    <div className="text-4xl font-black text-brand-primary tracking-tighter">5X</div>
                    <div className="text-xs font-sans text-gray-500 font-bold uppercase tracking-[0.2em]">Lead Gen</div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-2 hover:border-brand-primary/30 transition-all duration-300 hover-lift">
                    <div className="text-4xl font-black text-brand-primary tracking-tighter">24/7</div>
                    <div className="text-xs font-sans text-gray-500 font-bold uppercase tracking-[0.2em]">Monitoring</div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 text-center space-y-2 hover:border-brand-primary/30 transition-all duration-300 hover-lift">
                    <div className="text-4xl font-black text-brand-primary tracking-tighter">100%</div>
                    <div className="text-xs font-sans text-gray-500 font-bold uppercase tracking-[0.2em]">Commitment</div>
                  </div>
                </div>
              </div>
            </div>
          </Container>
        </Section>

        {/* 7. TEAM OR LEADERSHIP SECTION */}
        <Section id="team">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <span className="text-brand-primary text-sm font-sans font-bold uppercase tracking-[0.2em]">Our Team</span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-2xl mx-auto tracking-tight font-display">The People Behind ConversionFoxx</h2>
              <p className="text-gray-400 font-sans max-w-xl mx-auto text-base md:text-lg leading-relaxed">
                ConversionFoxx brings together strategic thinking, technical expertise, and creative execution.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Alex Rivera', role: 'Founder & Growth Architect', bio: 'Specialist in revenue operations and scaling high-performance growth systems.' },
                { name: 'Sarah Chen', role: 'Systems Director', bio: 'Expert in building scalable technical infrastructure for revenue operations.' },
                { name: 'Marcus Thorne', role: 'Conversion Lead', bio: 'Focused on data-backed optimization and high-converting funnel entry.' },
                { name: 'Elena Vance', role: 'Operations Lead', bio: 'Ensuring every growth system runs at peak efficiency for our clients.' },
              ].map((member, idx) => (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: adjustY(15) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={getViewport({ once: true, margin: "-50px" })}
                  transition={getTransition({ duration: 0.5, delay: idx * 0.05 })}
                >
                  <Card padding="lg" className="h-full text-center hover-lift">
                    <div className="w-20 h-20 bg-brand-primary/10 rounded-full mx-auto mb-6 flex items-center justify-center font-black text-2xl text-brand-primary transition-transform font-display">
                      {member.name.charAt(0)}
                    </div>
                    <h3 className="text-xl font-bold mb-2 text-brand-text-heading font-display tracking-tight">{member.name}</h3>
                    <div className="text-brand-primary text-xs font-sans font-bold uppercase tracking-[0.2em] mb-4">{member.role}</div>
                    <p className="text-gray-400 font-sans text-sm leading-relaxed max-w-xl mx-auto">{member.bio}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 8. PROCESS SECTION */}
        <Section id="process" background="subtle">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <span className="text-brand-primary text-sm font-sans font-bold uppercase tracking-[0.2em]">How We Work</span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-2xl mx-auto tracking-tight font-display">Our Process</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
              {[
                { title: 'Traffic System', description: 'We deploy precision acquisition systems to dominate search and social intent.', icon: Search },
                { title: 'Conversion Architecture', description: 'We re-engineer user journeys to eliminate friction and maximize yield.', icon: PenTool },
                { title: 'Revenue Operations', description: 'We build the CRM automation and tracking needed to turn leads into revenue.', icon: Rocket },
                { title: 'Growth Optimization', description: 'Continuous data analysis to identify leaks and scale winning experiments.', icon: TrendingUp },
              ].map((step, idx) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, y: adjustY(20) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={getViewport({ once: true, margin: "-50px" })}
                  transition={getTransition({ duration: 0.5, delay: idx * 0.05 })}
                >
                  <Card padding="lg" className="h-full group hover-lift bg-white/5 border border-white/10 border-l-2 border-l-brand-primary/30 relative overflow-hidden">
                    <div className="absolute inset-0 bg-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative z-10 space-y-6">
                      <div className="relative inline-flex">
                        <div className="bg-brand-primary/10 p-4 rounded-xl text-brand-primary inline-flex items-center justify-center mb-4 group-hover:bg-brand-primary group-hover:text-brand-dark transition-all duration-300 shadow-xl shadow-brand-primary/10 border border-brand-primary/20">
                          <step.icon className="w-8 h-8" />
                        </div>
                        <div className="absolute -top-3 -right-3 w-7 h-7 bg-[#0a0a0a] border border-brand-primary/30 rounded-full flex items-center justify-center text-[10px] font-black text-brand-primary">
                          0{idx + 1}
                        </div>
                      </div>
                      <h3 className="text-xl md:text-2xl font-black text-brand-text-heading font-display tracking-tight group-hover:text-brand-primary transition-colors">{step.title}</h3>
                      <p className="text-gray-400 font-sans text-sm leading-relaxed opacity-80 group-hover:opacity-100 transition-opacity">{step.description}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 9. INTERNAL CTA SECTION */}
        <Section id="internal-cta">
          <Container>
            <motion.div
              initial={{ opacity: 0, scale: adjustScale(0.95) }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={getViewport({ once: true })}
              transition={getTransition({ duration: 0.6 })}
            >
              <Card padding="xl" className="text-center space-y-8 relative overflow-hidden" hoverEffect={false}>
                <div className="absolute top-0 left-0 w-64 h-64 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />
                <div className="relative z-10 space-y-6">
                  <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-2xl mx-auto tracking-tight font-display">Want to See What We Can Build?</h2>
                  <p className="text-gray-400 font-sans text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                    Explore our services and discover how ConversionFoxx helps brands grow through strategy, technology, and performance.
                  </p>
                  <Button to="/services" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-8 py-4 rounded-xl font-bold transition inline-flex items-center gap-2">
                    View Services
                    <ChevronRight className="w-5 h-5" />
                  </Button>
                </div>
              </Card>
            </motion.div>
          </Container>
        </Section>

        {/* 10. FINAL CTA SECTION */}
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
                  <h2 className="text-4xl md:text-6xl font-black leading-[1.05] text-brand-text-heading max-w-4xl mx-auto tracking-tight font-display">
                    Start Your <br />
                    <span className="brand-gradient-text">Journey</span>
                  </h2>
                  <p className="text-gray-400 font-sans text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                    Identify the leaks in your current acquisition model and build a predictable growth engine. Our Growth Architects are ready to engineer your revenue system.
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

export default About;
