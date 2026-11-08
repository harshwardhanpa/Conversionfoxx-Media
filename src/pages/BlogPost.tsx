import React, { useMemo } from 'react';
import { motion } from 'motion/react';
import { 
  ArrowLeft, 
  ArrowRight, 
  Calendar, 
  Clock, 
  User, 
  ChevronRight, 
  Share2, 
  Bookmark, 
  CheckCircle2, 
  Zap, 
  TrendingUp, 
  Layout as LayoutIcon, 
  Settings, 
  Smartphone, 
  Megaphone, 
  Database,
  Quote,
  Users
} from 'lucide-react';
import { Link, useParams, Navigate } from 'react-router-dom';
import { useResponsiveAnimation } from '../components/utils/useResponsiveAnimation';
import { useSEO } from '../components/utils/useSEO';

import Button from '../components/ui/Button';
import { blogPosts } from '../data/blogs';

const BlogPost: React.FC = () => {
  const { getTransition, getViewport, adjustY, adjustX, adjustScale } = useResponsiveAnimation();
  const { slug } = useParams<{ slug: string }>();

  const post = useMemo(() => {
    return blogPosts.find(p => p.slug === slug);
  }, [slug]);

  const relatedArticles = useMemo(() => {
    return blogPosts.filter(p => p.slug !== slug).slice(0, 3);
  }, [slug]);

  // Hook must be called unconditionally or before conditional exits,
  // but if post is undefined, we redirect. To follow React Hook rules perfectly, 
  // we can supply fallback values to useSEO and prevent conditional hook executes.
  useSEO({
    title: post ? post.title : 'Blog Post',
    description: post ? post.excerpt : 'Read our latest blog post on digital marketing and web solutions.',
    canonical: post ? `/blogs/${post.slug}` : '/blogs',
    ogType: 'article',
    ogImage: post ? post.image : undefined
  });

  if (!post) {
    return <Navigate to="/blogs" replace />;
  }

  return (
    <>
      <div className="relative z-10">
        {/* 1. BLOG POST HERO */}
        <section className="relative pt-40 pb-20 px-4 md:px-8 overflow-hidden">
          {/* Background Glows */}
          <div className="absolute top-1/4 -left-20 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full pointer-events-none" />
          <div className="absolute bottom-0 -right-20 w-96 h-96 bg-brand-primary/5 blur-[100px] rounded-full pointer-events-none" />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs font-sans font-semibold uppercase tracking-[0.2em] text-brand-text-secondary/40 mb-12">
              <Link to="/" className="hover:text-brand-primary transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link to="/blogs" className="hover:text-brand-primary transition-colors">Blogs</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-brand-text-secondary/60 truncate">{post.title}</span>
            </nav>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <motion.div
                initial={{ opacity: 0, x: adjustX(-30) }}
                animate={{ opacity: 1, x: 0 }}
                transition={getTransition({ duration: 0.8 })}
                className="space-y-8"
              >
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 glass border-brand-primary/20 text-brand-primary text-xs font-sans font-semibold uppercase tracking-[0.2em] rounded-full">
                    {post.category}
                  </div>
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-7xl font-display font-black tracking-tight leading-[1.05] text-brand-text-heading">
                  {post.title}
                </h1>

                <p className="text-xl md:text-2xl text-brand-text-secondary font-sans font-normal leading-[1.6]">
                  {post.excerpt}
                </p>

                <div className="pt-8 border-t border-white/5 flex flex-wrap items-center justify-between gap-6">
                  <div className="flex flex-wrap items-center gap-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-primary/20 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-brand-primary" />
                      </div>
                      <div>
                        <div className="text-xs text-brand-text-secondary/50 font-sans font-semibold uppercase tracking-[0.2em]">Author</div>
                        <div className="text-sm font-sans font-semibold text-brand-text-heading">ConversionFoxx Team</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-brand-text-secondary/40" />
                      </div>
                      <div>
                        <div className="text-xs text-brand-text-secondary/50 font-sans font-semibold uppercase tracking-[0.2em]">Date</div>
                        <div className="text-sm font-sans font-semibold text-brand-text-heading">{post.date}</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-brand-primary transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                    <button className="w-10 h-10 glass rounded-full flex items-center justify-center text-white/40 hover:text-brand-primary transition-colors">
                      <Bookmark className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: adjustScale(0.95) }}
                animate={{ opacity: 1, scale: 1 }}
                transition={getTransition({ duration: 0.8, delay: 0.2 })}
                className="aspect-[4/3] rounded-3xl overflow-hidden glass border-white/10 relative group shadow-2xl"
              >
                <img 
                  src={post.image} 
                  alt={post.title} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/40 to-transparent" />
              </motion.div>
            </div>
          </div>
        </section>

        {/* 2. FEATURED ARTICLE VISUAL OR HIGHLIGHT PANEL */}
        <section className="pb-24 px-4 md:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: adjustScale(0.95) }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={getViewport({ once: true })}
              transition={getTransition({ duration: 0.6 })}
              className="glass p-8 md:p-12 rounded-2xl border-brand-primary/20 relative overflow-hidden group liquid-glass"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/10 blur-[100px] rounded-full opacity-50" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-brand-primary/10 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary transition-all duration-500 shadow-xl shadow-brand-primary/10 glass">
                  <Zap className="w-10 h-10 text-brand-primary group-hover:text-brand-dark transition-colors" />
                </div>
                <div className="text-center md:text-left">
                  <p className="text-2xl md:text-3xl font-display font-black leading-tight text-brand-text-heading tracking-tight">
                    {post.excerpt}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 3. ARTICLE CONTENT SECTION */}
        <section className="pb-24 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <article className="prose prose-invert prose-orange max-w-none">
              <div className="space-y-12 text-brand-text-secondary font-sans leading-[1.6] text-lg font-normal">
                <section className="space-y-6">
                  <p>{post.content.intro}</p>
                </section>

                {post.content.sections.map((section, idx) => (
                  <section key={idx} className="space-y-6">
                    <h2 className="text-3xl font-display font-black text-brand-text-heading tracking-tight">{section.title}</h2>
                    {Array.isArray(section.content) ? (
                      <ul className="space-y-4 list-none pl-0">
                        {section.content.map((item, i) => (
                          <li key={i} className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-brand-primary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                              <div className="w-2 h-2 bg-brand-primary rounded-full" />
                            </div>
                            <span className="font-sans">{item}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>{section.content}</p>
                    )}
                  </section>
                ))}

                <section className="space-y-6 pt-8 border-t border-white/5">
                  <h2 className="text-3xl font-display font-black text-brand-text-heading tracking-tight">Conclusion</h2>
                  <p>{post.content.conclusion}</p>
                </section>
              </div>
            </article>
          </div>
        </section>

        {/* 4. KEY TAKEAWAYS SECTION */}
        <section className="py-24 px-4 md:px-8 bg-white/2">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tight text-brand-text-heading leading-tight">Key Takeaways</h2>
              <p className="text-brand-text-secondary font-sans font-medium leading-[1.6]">A quick summary of the core insights from this article.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'Connected systems create smoother customer journeys',
                  description: 'Reducing friction at every touchpoint leads to higher trust and better conversion rates.'
                },
                {
                  title: 'Better tool alignment improves operational clarity',
                  description: 'When your tools talk to each other, your team spends less time on data and more time on strategy.'
                },
                {
                  title: 'Unlock more value from existing traffic',
                  description: 'Stronger follow-up systems ensure that no lead is left behind, maximizing your current marketing spend.'
                },
                {
                  title: 'Marketing and systems must work together',
                  description: 'Growth is a team sport. Your technical infrastructure must support your marketing promises.'
                }
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: adjustY(20) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={getViewport({ once: true })}
                  transition={getTransition({ delay: idx * 0.1 })}
                  className="glass p-8 rounded-3xl border-white/5 flex gap-6 group hover:border-brand-primary/30 transition-all duration-500 hover-lift"
                >
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-brand-primary transition-all duration-500 shadow-xl shadow-brand-primary/10">
                    <CheckCircle2 className="w-6 h-6 text-brand-primary group-hover:text-brand-dark transition-colors" />
                  </div>
                  <div>
                    <h3 className="text-lg font-display font-black mb-2 text-brand-text-heading tracking-tight">{item.title}</h3>
                    <p className="text-brand-text-secondary font-sans text-sm leading-[1.6]">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 5. INLINE CTA / SERVICE RELEVANCE SECTION */}
        <section className="py-24 px-4 md:px-8">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: adjustY(30) }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={getViewport({ once: true })}
              transition={getTransition({ duration: 0.6 })}
              className="glass p-12 md:p-16 rounded-2xl border-brand-primary/20 text-center space-y-8 liquid-glass"
            >
              <h2 className="text-3xl md:text-4xl font-display font-black tracking-tight text-brand-text-heading leading-tight">Need Help Building Better Connected Systems?</h2>
              <p className="text-brand-text-secondary font-sans text-lg max-w-2xl mx-auto font-medium leading-[1.6]">
                ConversionFoxx helps businesses improve the connection between digital presence, lead flow, customer management, and performance execution.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-4">
                <Button to="/contact" size="lg" icon={ArrowRight} className="font-sans font-bold">
                  Let's Talk
                </Button>
                <Button to="/services" variant="secondary" size="lg" className="font-sans font-bold">
                  Explore Services
                </Button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* 6. AUTHOR OR PUBLISHER NOTE SECTION */}
        <section className="pb-24 px-4 md:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="glass p-8 rounded-3xl border-white/5 flex flex-col md:flex-row items-center gap-8">
              <div className="w-20 h-20 bg-brand-primary/20 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Quote className="w-10 h-10 text-brand-primary" />
              </div>
              <div className="space-y-4 text-center md:text-left">
                <h3 className="text-xl font-display font-black text-brand-text-heading tracking-tight">About ConversionFoxx Insights</h3>
                <p className="text-brand-text-secondary/80 font-sans text-sm leading-[1.6]">
                  Our articles are built around practical business questions in growth, technology, performance, and digital systems. We write to help modern businesses make clearer, smarter digital decisions.
                </p>
                <Link to="/blogs" className="text-brand-primary font-sans font-bold text-sm hover:underline inline-flex items-center gap-2">
                  View More Articles
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* 7. RELATED ARTICLES SECTION */}
        <section className="py-24 px-4 md:px-8 bg-white/2">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl font-display font-black tracking-tight text-brand-text-heading">Related Insights</h2>
              <Link to="/blogs" className="text-brand-primary font-sans font-bold text-sm hover:underline flex items-center gap-2">
                View All Blogs
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedArticles.map((post, idx) => (
                <motion.div
                  key={post.slug}
                  initial={{ opacity: 0, y: adjustY(20) }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={getViewport({ once: true })}
                  transition={getTransition({ delay: idx * 0.1 })}
                  className="group"
                >
                  <Link to={`/blogs/${post.slug}`} className="block space-y-6">
                    <div className="aspect-[16/10] glass bg-white/5 rounded-[2.5rem] overflow-hidden border-none relative">
                      <img 
                        src={post.image} 
                        alt={post.title} 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-100"
                      />
                      <div className="absolute top-6 left-6 px-4 py-1.5 glass rounded-full text-xs font-sans font-semibold uppercase tracking-[0.2em] text-brand-text-heading">
                        {post.category}
                      </div>
                    </div>
                    <div className="space-y-4 px-2">
                      <h3 className="text-2xl font-display font-black group-hover:text-brand-primary transition-colors leading-tight text-brand-text-heading tracking-tight">
                        {post.title}
                      </h3>
                      <p className="text-brand-text-secondary font-sans text-sm leading-[1.6] line-clamp-2 opacity-80 group-hover:opacity-100 transition-colors">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-brand-primary font-sans font-bold text-sm group-hover:gap-3 transition-all pt-2">
                        Read More <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 8. FINAL CTA SECTION */}
        <section className="py-24 px-4 md:px-8 relative overflow-hidden">
          <div className="max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, scale: adjustScale(0.95) }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={getViewport({ once: true })}
              transition={getTransition({ duration: 0.6 })}
              className="glass p-12 md:p-24 rounded-2xl text-center space-y-10 relative overflow-hidden border-brand-primary/20 liquid-glass"
            >
              <div className="absolute top-0 right-0 w-96 h-96 bg-brand-primary/10 blur-[120px] rounded-full opacity-50" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-primary/5 blur-[120px] rounded-full opacity-30" />
              
              <div className="relative z-10 space-y-8">
                <h2 className="text-4xl md:text-6xl font-display font-black tracking-tight leading-[1.05] text-brand-text-heading">
                  Want to Turn Strategy <br />
                  <span className="brand-gradient-text">Into Real Execution?</span>
                </h2>
                <p className="text-brand-text-secondary font-sans text-lg md:text-xl max-w-2xl mx-auto font-medium leading-[1.6]">
                  If your business needs stronger systems, smarter digital structure, or better performance alignment, ConversionFoxx is ready to help.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                  <Button to="/contact" size="lg" icon={ArrowRight} className="font-sans font-bold">
                    Let's Talk
                  </Button>
                  <Button to="/services" variant="secondary" size="lg" className="font-sans font-bold">
                    Explore Services
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default BlogPost;

