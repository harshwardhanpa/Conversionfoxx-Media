import React, { Suspense, lazy } from 'react';
import Header from './Header';
import ScrollToTop from '../utils/ScrollToTop';

const Footer = lazy(() => import('./Footer'));

interface LayoutProps {
  children: React.ReactNode;
}

/**
 * Shared structural wrapper used by every page.
 * Handles global background styling, Header, Footer, and ScrollToTop.
 */
const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen text-white selection:bg-brand-primary selection:text-white overflow-x-hidden flex flex-col bg-transparent">
      <ScrollToTop />
      <Header />
      
      <main className="flex-grow">
        {children}
      </main>

      <Suspense fallback={<div className="h-40 bg-[#0A0705]" />}>
        <Footer />
      </Suspense>
    </div>
  );
};

export default Layout;
