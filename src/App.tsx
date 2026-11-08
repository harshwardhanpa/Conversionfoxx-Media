import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';

import Home from './pages/Home';

// Lazy load non-critical pages
const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));

// Lazy load non-critical pages
const Services = lazy(() => import('./pages/Services'));
const LeadGeneration = lazy(() => import('./pages/services/LeadGeneration'));
const ConversionOptimization = lazy(() => import('./pages/services/ConversionOptimization'));
const RevenueOperationsSystem = lazy(() => import('./pages/services/RevenueOperationsSystem'));
const Blogs = lazy(() => import('./pages/Blogs'));
const BlogPost = lazy(() => import('./pages/BlogPost'));

// Admin context wrapper to lazy load Supabase JS
const AdminWrapper = lazy(() => import('./components/admin/AdminWrapper'));

// Admin Lazy Imports
const AdminLogin = lazy(() => import('./pages/admin/Login'));
const AdminDashboard = lazy(() => import('./pages/admin/Dashboard'));
const SiteSettings = lazy(() => import('./pages/admin/SiteSettings'));
const Branding = lazy(() => import('./pages/admin/Branding'));
const PagesManager = lazy(() => import('./pages/admin/PagesManager'));
const PageEditor = lazy(() => import('./pages/admin/PageEditor'));
const ServicesManager = lazy(() => import('./pages/admin/ServicesManager'));
const ServiceEditor = lazy(() => import('./pages/admin/ServiceEditor'));
const BlogManager = lazy(() => import('./pages/admin/BlogManager'));
const BlogEditor = lazy(() => import('./pages/admin/BlogEditor'));
const SEOManager = lazy(() => import('./pages/admin/SEOManager'));
const MediaLibrary = lazy(() => import('./pages/admin/MediaLibrary'));
const NavigationManager = lazy(() => import('./pages/admin/NavigationManager'));
const FooterManager = lazy(() => import('./pages/admin/FooterManager'));
const ContactSettings = lazy(() => import('./pages/admin/ContactSettings'));
const Profile = lazy(() => import('./pages/admin/Profile'));

// Lazy load admin utility shells to reduce main bundle payload size
const ProtectedRoute = lazy(() => import('./components/admin/auth/ProtectedRoute'));
const AdminLayout = lazy(() => import('./components/admin/layout/AdminLayout'));

const LoadingFallback = () => (
  <div className="min-h-screen bg-transparent flex items-center justify-center">
    <div className="w-10 h-10 border-4 border-brand-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Layout><Home /></Layout>} />
          <Route path="/about" element={<Layout><About /></Layout>} />
          <Route path="/services" element={<Layout><Services /></Layout>} />
          <Route path="/services/lead-generation" element={<Layout><LeadGeneration /></Layout>} />
          <Route path="/services/conversion-optimization" element={<Layout><ConversionOptimization /></Layout>} />
          <Route path="/services/revenue-operations-system" element={<Layout><RevenueOperationsSystem /></Layout>} />
          <Route path="/blogs" element={<Layout><Blogs /></Layout>} />
          <Route path="/blogs/:slug" element={<Layout><BlogPost /></Layout>} />
          <Route path="/contact" element={<Layout><Contact /></Layout>} />

          {/* Admin Routes - Wrap all with AdminWrapper to lazy load Supabase */}
          <Route element={<AdminWrapper />}>
            <Route path="/admin/login" element={<AdminLogin />} />
            
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            
            <Route path="/admin/dashboard" element={<ProtectedRoute><AdminLayout><AdminDashboard /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/site-settings" element={<ProtectedRoute><AdminLayout><SiteSettings /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/branding" element={<ProtectedRoute><AdminLayout><Branding /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/pages" element={<ProtectedRoute><AdminLayout><PagesManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/pages/:id" element={<ProtectedRoute><AdminLayout><PageEditor /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/services" element={<ProtectedRoute><AdminLayout><ServicesManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/services/:id" element={<ProtectedRoute><AdminLayout><ServiceEditor /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/blogs" element={<ProtectedRoute><AdminLayout><BlogManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/blogs/:id" element={<ProtectedRoute><AdminLayout><BlogEditor /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/seo" element={<ProtectedRoute><AdminLayout><SEOManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/media" element={<ProtectedRoute><AdminLayout><MediaLibrary /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/navigation" element={<ProtectedRoute><AdminLayout><NavigationManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/footer" element={<ProtectedRoute><AdminLayout><FooterManager /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/contact-settings" element={<ProtectedRoute><AdminLayout><ContactSettings /></AdminLayout></ProtectedRoute>} />
            <Route path="/admin/profile" element={<ProtectedRoute><AdminLayout><Profile /></AdminLayout></ProtectedRoute>} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
