import React from 'react';
import { useSEO } from '../components/utils/useSEO';
import Hero from '../components/Hero';
import Logos from '../components/Logos';
import Services from '../components/Services';
import GrowthCalculator from '../components/GrowthCalculator';
import Process from '../components/Process';
import Results from '../components/Results';
import CaseStudies from '../components/CaseStudies';
import Testimonials from '../components/Testimonials';
import TechStack from '../components/TechStack';
import Blog from '../components/Blog';
import FinalCTA from '../components/FinalCTA';
import ScrollReveal from '../components/ui/ScrollReveal';

const Home: React.FC = () => {
  useSEO({
    title: 'ConversionFoxx | Performance Marketing & Revenue Systems',
    description: 'ConversionFoxx engineers predictable revenue infrastructure for B2B tech and high-growth brands through paid acquisition, conversion architecture, and CRM RevOps.',
    canonical: '/'
  });

  return (
    <>
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#070709]">
        {/* Soft Ambient Radiance */}
        <div className="absolute top-[-15%] left-[-10%] w-[45%] h-[45%] bg-[#FF6A00]/10 blur-[140px] rounded-full pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[35%] h-[35%] bg-[#E63900]/10 blur-[150px] rounded-full pointer-events-none" />
        
        {/* Subtle grid texture */}
        <div 
          className="absolute inset-0 opacity-[0.15]" 
          style={{ 
            backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTAgMGg0MHYxSDB6bTAgMHY0MGgxVjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDMpIi8+Cjwvc3ZnPg==')",
            maskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)"
          }} 
        />
      </div>

      <Hero />
      <Logos />
      
      <div className="section-divider" />
      <ScrollReveal>
        <Services />
      </ScrollReveal>
      
      <div className="section-divider" />
      <ScrollReveal>
        <GrowthCalculator />
      </ScrollReveal>

      <div className="section-divider" />
      <ScrollReveal>
        <Process />
      </ScrollReveal>
      
      <div className="section-divider" />
      <ScrollReveal>
        <Results />
      </ScrollReveal>
      
      <div className="section-divider" />
      <ScrollReveal>
        <CaseStudies />
      </ScrollReveal>
      
      <div className="section-divider" />
      <ScrollReveal>
        <Testimonials />
      </ScrollReveal>
      
      <div className="section-divider" />
      <ScrollReveal>
        <TechStack />
      </ScrollReveal>
      
      <div className="section-divider" />
      <ScrollReveal>
        <Blog />
      </ScrollReveal>
      
      <div className="section-divider" />
      <ScrollReveal>
        <FinalCTA />
      </ScrollReveal>
    </>
  );
};

export default Home;
