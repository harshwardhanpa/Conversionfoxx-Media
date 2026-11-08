import React, { useState } from 'react';
import { motion } from 'motion/react';
import { useResponsiveAnimation } from '../components/utils/useResponsiveAnimation';
import { useSEO } from '../components/utils/useSEO';
import { 
  ArrowRight, 
  Search, 
  Calendar, 
  Clock, 
  ChevronRight, 
  Mail, 
  BookOpen, 
  Lightbulb, 
  Zap, 
  TrendingUp, 
  Layout as LayoutIcon, 
  Settings, 
  Smartphone, 
  Megaphone, 
  Database, 
  Users 
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Container from '../components/ui/Container';
import Section from '../components/ui/Section';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { blogPosts } from '../data/blogs';

const categories = [
  'All',
  'Growth Strategy',
  'Social Media',
  'Web Development',
  'App Development',
  'Paid Advertising',
  'CRM & Automation',
  'Business Insights'
];

const Blogs: React.FC = () => {
  const { getTransition, getViewport, adjustY, adjustX, adjustScale } = useResponsiveAnimation();

  useSEO({
    title: 'Growth Marketing, CRO & CRM Automation Blog',
    description: 'Read conversion strategy articles, automation case studies, and step-by-step optimization guides from our team of B2B growth architects.',
    canonical: '/blogs'
  });

  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const featuredPost = blogPosts[0];
  const otherPosts = blogPosts.slice(1);

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = activeCategory === 'All' || post.category === activeCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <div className="relative z-10">
        {/* 1. BLOGS HERO */}
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
                  <BookOpen className="w-4 h-4" />
                  ConversionFoxx Insights
                </div>
                <h1 className="text-3xl md:text-5xl font-black tracking-tight leading-[1.05] text-brand-text-heading max-w-2xl font-display">
                  Insights That Help <br />
                  Businesses Grow Smarter
                </h1>
                <p className="text-base md:text-lg text-gray-400 font-sans font-normal leading-relaxed max-w-xl">
                  Explore practical insights from ConversionFoxx on digital growth, marketing performance, websites, applications, CRM systems, and the strategies that help modern businesses move forward.
                </p>
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <Button to="/contact" size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-bold transition w-full sm:w-auto">
                    Let's Talk
                  </Button>
                  <Button to="/services" variant="secondary" size="lg" className="border border-white/20 hover:border-brand-primary px-6 py-3 rounded-xl w-full sm:w-auto text-white">
                    Explore Services
                  </Button>
                </div>
                <p className="text-gray-500 text-sm font-sans italic">
                  “Built for founders, marketers, and businesses looking for clearer digital direction.”
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
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border-white/5 hover:border-brand-primary/30 transition-all duration-300">
                      <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6 text-brand-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-brand-text-heading">Growth Strategy</div>
                        <div className="text-xs text-gray-400 font-sans">5 min read</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border-white/5 translate-x-8 hover:border-brand-primary/30 transition-all duration-300">
                      <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                        <LayoutIcon className="w-6 h-6 text-brand-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-brand-text-heading">Web Development</div>
                        <div className="text-xs text-gray-400 font-sans">7 min read</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border-white/5 translate-x-4 hover:border-brand-primary/30 transition-all duration-300">
                      <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center">
                        <Database className="w-6 h-6 text-brand-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold text-brand-text-heading">CRM & Automation</div>
                        <div className="text-xs text-gray-400 font-sans">4 min read</div>
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

        {/* 2. FEATURED ARTICLE SECTION */}
        <Section background="subtle">
          <Container>
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px flex-1 bg-white/10" />
              <h2 className="text-xl font-black uppercase tracking-[0.2em] text-gray-600 font-display">Featured Insight</h2>
              <div className="h-px flex-1 bg-white/10" />
            </div>

            <motion.div
              initial={{ opacity: 0, y: adjustY(30) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={getViewport({ once: true })}
              transition={getTransition({ duration: 0.6 })}
            >
              <Card padding="none" className="rounded-2xl border-white/5 overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative aspect-video lg:aspect-auto overflow-hidden">
                    <img 
                      src={featuredPost.image} 
                      alt={featuredPost.title} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent lg:hidden" />
                  </div>
                  <div className="p-8 md:p-16 flex flex-col justify-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-brand-primary/10 rounded-full text-xs font-sans font-semibold uppercase tracking-[0.2em] text-brand-primary border border-brand-primary/20">
                      {featuredPost.category}
                    </div>
                    <h3 className="text-xl md:text-3xl font-black leading-tight group-hover:text-brand-primary transition-colors text-brand-text-heading font-display tracking-tight">
                      {featuredPost.title}
                    </h3>
                    <p className="text-brand-text-secondary font-sans text-base md:text-lg leading-[1.6] opacity-80 group-hover:opacity-100 transition-opacity">
                      {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center gap-6 text-gray-500 font-sans text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-brand-primary" />
                        {featuredPost.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-brand-primary" />
                        {featuredPost.readTime}
                      </div>
                    </div>
                    <div className="pt-4">
                      <Button to={`/blogs/${featuredPost.slug}`} size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-bold transition">
                        Read Article
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </Container>
        </Section>

        {/* 3. BLOG CATEGORIES / FILTER BAR & 4. BLOG SEARCH BAR */}
        <Section className="py-8 sticky top-24 z-30">
          <Container>
            <div className="bg-black/60 backdrop-blur-md p-4 rounded-2xl border border-white/10 flex flex-col lg:flex-row items-center gap-6 shadow-2xl">
              {/* Categories */}
              <div className="flex-1 w-full overflow-x-auto no-scrollbar">
                <div className="flex items-center gap-2 min-w-max px-2">
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setActiveCategory(category)}
                      className={`px-6 py-2.5 rounded-xl text-sm font-sans font-semibold transition-all whitespace-nowrap ${
                        activeCategory === category 
                        ? 'bg-brand-primary text-white shadow-lg shadow-brand-primary/20' 
                        : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Search */}
              <div className="w-full lg:w-96 relative group">
                <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-white/20 group-focus-within:text-brand-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="Search insights, topics, and ideas..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-14 pr-6 py-3 text-sm font-sans text-brand-text-heading placeholder:text-gray-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
                />
              </div>
            </div>
          </Container>
        </Section>

        {/* 5. BLOG GRID SECTION */}
        <Section className="py-12 pb-24">
          <Container>
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-2xl font-black tracking-tight text-brand-text-heading font-display">Latest Articles</h2>
              <div className="text-gray-500 text-xs font-sans font-semibold uppercase tracking-[0.2em]">
                Showing {filteredPosts.length} Results
              </div>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post, idx) => (
                  <motion.div
                    key={post.slug}
                    initial={{ opacity: 0, y: adjustY(20) }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={getViewport({ once: true })}
                    transition={getTransition({ delay: idx * 0.1 })}
                    className="group"
                  >
                    <Link to={`/blogs/${post.slug}`} className="block space-y-6 flex flex-col h-full">
                      <div className="aspect-[16/10] bg-white/5 rounded-2xl overflow-hidden border border-white/10 relative group-hover:shadow-2xl transition-all duration-700 shrink-0">
                        {post.image ? (
                          <img 
                            src={post.image} 
                            alt={post.title} 
                            referrerPolicy="no-referrer"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-brand-primary/20 to-brand-primary/5 flex items-center justify-center p-6 text-center">
                            <span className="text-brand-text-heading font-display font-black text-lg opacity-40">{post.title}</span>
                          </div>
                        )}
                        <div className="absolute top-6 left-6 px-4 py-1.5 bg-black/60 backdrop-blur-md rounded-full text-[10px] font-sans font-semibold uppercase tracking-[0.2em] text-brand-text-heading border border-white/10">
                          {post.category}
                        </div>
                      </div>
                      <div className="space-y-4 px-2 flex flex-col flex-grow">
                        <div className="flex items-center gap-4 text-gray-500 text-[10px] font-sans font-semibold uppercase tracking-[0.2em]">
                          <div className="flex items-center gap-1.5">
                            <Calendar className="w-3 h-3 text-brand-primary" />
                            {post.date}
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3 h-3 text-brand-primary" />
                            {post.readTime}
                          </div>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black group-hover:text-brand-primary transition-colors leading-tight text-brand-text-heading font-display tracking-tight">
                          {post.title}
                        </h3>
                        <p className="text-brand-text-secondary font-sans text-sm leading-relaxed line-clamp-2 opacity-70 group-hover:opacity-100 transition-opacity flex-grow">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-brand-primary font-sans font-semibold text-sm group-hover:gap-3 transition-all pt-2 group-hover:translate-x-1 duration-300">
                          Read More <ArrowRight className="w-4 h-4" />
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            ) : (
              <Card padding="xl" className="text-center border-white/5">
                <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-8 h-8 text-white/20" />
                </div>
                <h3 className="text-2xl font-semibold mb-2 text-brand-text-heading">No articles found</h3>
                <p className="text-gray-400 font-sans">Try adjusting your search or filters to find what you're looking for.</p>
                <Button 
                  variant="ghost"
                  onClick={() => {setActiveCategory('All'); setSearchQuery('');}}
                  className="mt-8 text-brand-primary font-sans font-semibold hover:underline"
                >
                  Clear all filters
                </Button>
              </Card>
            )}
          </Container>
        </Section>

        {/* 6. EDITORIAL HIGHLIGHTS / TOPICS SECTION */}
        <Section background="subtle">
          <Container>
            <div className="text-center mb-16 space-y-4">
              <span className="text-brand-primary text-sm font-sans font-semibold uppercase tracking-[0.2em]">Deep Dives</span>
              <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-2xl mx-auto tracking-tight font-display">Explore Popular Themes</h2>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {[
                {
                  title: 'Growth & Conversion',
                  description: 'Strategies focused on turning digital traffic into measurable business revenue.',
                  icon: TrendingUp,
                  links: [
                    { name: 'The Psychology of High-Converting Landing Pages', slug: 'psychology-of-conversion' },
                    { name: 'A/B Testing Frameworks for Modern Growth', slug: 'ab-testing-frameworks' },
                    { name: 'How to Reduce Churn Through Better Onboarding', slug: 'reduce-churn-onboarding' }
                  ]
                },
                {
                  title: 'Technology & Product Systems',
                  description: 'Insights into building scalable, reliable, and high-performing digital infrastructure.',
                  icon: Settings,
                  links: [
                    { name: 'Why We Choose React for Enterprise Applications', slug: 'why-react-enterprise' },
                    { name: 'The Role of API-First Architecture in Growth', slug: 'api-first-architecture' },
                    { name: 'Securing Your Digital Assets in a Cloud-First World', slug: 'securing-digital-assets' }
                  ]
                },
                {
                  title: 'Marketing Performance & Visibility',
                  description: 'Technical marketing insights that improve reach, relevance, and ROI.',
                  icon: Megaphone,
                  links: [
                    { name: 'Advanced SEO Strategies for 2026', slug: 'advanced-seo-2026' },
                    { name: 'How to Scale Paid Ads Without Losing Efficiency', slug: 'scale-paid-ads' },
                    { name: 'The Impact of Site Speed on Ad Quality Scores', slug: 'site-speed-ad-quality' }
                  ]
                }
              ].map((topic, idx) => (
                <motion.div
                  key={topic.title}
                  initial={{ opacity: 0, y: adjustY(20) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={getViewport({ once: true })}
                  transition={getTransition({ delay: idx * 0.1 })}
                >
                  <Card padding="lg" className="h-full group hover-lift">
                    <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-8 group-hover:bg-brand-primary group-hover:text-brand-dark transition-all duration-300">
                      <topic.icon className="w-7 h-7" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-black mb-4 text-brand-text-heading font-display tracking-tight">{topic.title}</h3>
                    <p className="text-gray-400 font-sans text-sm leading-relaxed mb-8">
                      {topic.description}
                    </p>
                    <div className="space-y-4">
                      {topic.links.map((link) => (
                        <Link 
                          key={link.slug} 
                          to={`/blogs/${link.slug}`}
                          className="flex items-center justify-between group/link py-3 border-b border-white/5 hover:border-brand-primary/30 transition-colors"
                        >
                          <span className="text-sm font-sans font-medium text-gray-400 group-hover/link:text-brand-text-heading transition-colors line-clamp-1">
                            {link.name}
                          </span>
                          <ChevronRight className="w-4 h-4 text-gray-600 group-hover/link:text-brand-primary transition-colors" />
                        </Link>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 7. NEWSLETTER / CONTENT CTA SECTION */}
        <Section>
          <Container size="md">
            <motion.div
              initial={{ opacity: 0, scale: adjustScale(0.95) }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={getViewport({ once: true })}
              transition={getTransition({ duration: 0.6 })}
            >
              <Card padding="xl" className="text-center space-y-8 relative overflow-hidden border-brand-primary/20" hoverEffect={false}>
                <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full" />
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full" />
                
                <div className="relative z-10 space-y-6">
                  <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-4 mx-auto">
                    <Mail className="w-8 h-8" />
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-brand-text-heading max-w-2xl mx-auto font-display tracking-tight">Stay Connected With New Insights</h2>
                  <p className="text-brand-text-secondary font-sans text-base md:text-lg max-w-2xl mx-auto font-medium">
                    Get practical ideas on growth, performance, systems, and digital execution from the ConversionFoxx perspective.
                  </p>
                  
                  <form className="max-w-md mx-auto flex flex-col sm:flex-row items-center gap-4 pt-4">
                    <input 
                      type="email" 
                      placeholder="Enter your email"
                      className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-brand-text-heading font-sans placeholder:text-gray-600 focus:outline-none focus:border-brand-primary/50 focus:ring-1 focus:ring-brand-primary/50 transition-all"
                    />
                    <Button type="submit" size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-bold transition w-full sm:w-auto">
                      Subscribe
                    </Button>
                  </form>
                  <p className="text-gray-500 text-xs font-sans font-semibold uppercase tracking-[0.2em]">
                    No spam. Just useful insights.
                  </p>
                </div>
              </Card>
            </motion.div>
          </Container>
        </Section>

        {/* 8. WHY OUR INSIGHTS MATTER SECTION */}
        <Section>
          <Container>
            <div className="text-center mb-16 space-y-4">
              <span className="text-brand-primary text-sm font-sans font-semibold uppercase tracking-[0.2em]">Our Editorial Philosophy</span>
              <h2 className="text-3xl md:text-4xl font-semibold text-brand-text-heading max-w-2xl mx-auto">Built Around Real Business Questions</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  title: 'Practical, Not Theoretical',
                  description: 'We skip the buzzwords and focus on the actual steps required to achieve digital results.',
                  icon: Lightbulb
                },
                {
                  title: 'Built for Growth Decisions',
                  description: 'Our content is designed to help founders and marketers make better strategic choices.',
                  icon: TrendingUp
                },
                {
                  title: 'Informed by Real Execution',
                  description: 'Everything we write is based on the work we do every day for our clients.',
                  icon: Zap
                },
                {
                  title: 'Focused on Clarity and Action',
                  description: 'We aim to leave you with a clear understanding of the next step for your business.',
                  icon: ArrowRight
                }
              ].map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: adjustY(20) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={getViewport({ once: true })}
                  transition={getTransition({ delay: idx * 0.1 })}
                >
                  <Card padding="md" className="h-full text-center group">
                    <div className="bg-brand-primary/10 p-3 rounded-xl text-brand-primary inline-flex items-center justify-center mb-6 mx-auto group-hover:bg-brand-primary group-hover:text-brand-dark transition-all duration-300 shadow-lg shadow-brand-primary/5">
                      <item.icon className="w-6 h-6" />
                    </div>
                   <h3 className="text-xl md:text-2xl font-black mb-4 text-brand-text-heading font-display tracking-tight group-hover:text-brand-primary transition-colors">{item.title}</h3>
                  <p className="text-brand-text-secondary font-sans text-sm leading-relaxed">
                    {item.description}
                  </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Container>
        </Section>

        {/* 9. FINAL CTA SECTION */}
        <Section className="relative overflow-hidden">
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
                  <h2 className="text-3xl md:text-5xl font-black leading-[1.1] text-brand-text-heading max-w-4xl mx-auto">
                    Need Help Turning <br />
                    <span className="text-brand-primary">Insight Into Action?</span>
                  </h2>
                  <p className="text-gray-400 font-sans text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                    If your business needs stronger systems, better execution, or clearer digital direction, ConversionFoxx is ready to help.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                    <Button to="/contact" size="lg" className="bg-brand-primary hover:bg-brand-primary/90 text-white px-6 py-3 rounded-xl font-bold transition w-full sm:w-auto">
                      Let's Talk
                    </Button>
                    <Button to="/services" variant="secondary" size="lg" className="border border-white/20 hover:border-brand-primary px-6 py-3 rounded-xl w-full sm:w-auto text-white">
                      Explore Services
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

export default Blogs;
