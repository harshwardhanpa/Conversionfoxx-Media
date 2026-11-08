import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import Button from '../ui/Button';
import { Logo } from '../ui/Logo';

const navLinks = [
  { name: 'About Us', href: '/about' },
  { name: 'Our Services', href: '/services' },
  { name: 'Blogs', href: '/blogs' },
  { name: 'Contact', href: '/contact' },
];

/**
 * Shared site-wide navigation bar with sticky glassmorphism.
 */
const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 md:px-6 py-4 ${
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div
        className={`max-w-7xl mx-auto rounded-2xl transition-all duration-500 transform-gpu will-change-transform bg-clip-padding ${
          isScrolled 
            ? 'glass py-2.5 px-6' 
            : 'bg-transparent py-2 px-4'
        }`}
        style={{ WebkitBackfaceVisibility: 'hidden', backfaceVisibility: 'hidden' }}
      >
        <nav className="flex items-center justify-between h-12 md:h-14">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group shrink-0" 
            aria-label="ConversionFoxx Home"
            onClick={(e) => {
              if (location.pathname === '/') {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
          >
            <Logo className="w-9 h-9" />
            <span className="text-xl font-display font-bold tracking-tight text-brand-text-heading group-hover:text-brand-primary transition-colors duration-300">
              Conversion<span className="text-brand-primary">Foxx</span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <li key={link.name}>
                <NavLink
                  to={link.href}
                  className={({ isActive }) => `
                    text-sm font-sans font-semibold transition-colors duration-300 relative group py-2
                    ${isActive ? 'text-brand-primary' : 'text-brand-text-secondary hover:text-brand-primary'}
                  `}
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      <span className={`absolute bottom-0 left-0 h-0.5 bg-brand-primary transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0 group-hover:w-full'
                      }`} />
                    </>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center">
            <Button to="/contact" size="md" icon={ArrowRight} className="rounded-xl font-sans font-medium">
              Let's Talk
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden absolute top-full left-4 right-4 mt-4 glass rounded-2xl p-6 shadow-2xl overflow-hidden"
          >
            <ul className="flex flex-col gap-4">
              {navLinks.map((link, idx) => (
                <motion.li
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <NavLink
                    to={link.href}
                    className={({ isActive }) => `
                      text-lg font-sans font-medium transition-colors block py-2
                      ${isActive ? 'text-brand-primary' : 'text-white/80 hover:text-brand-primary'}
                    `}
                  >
                    {link.name}
                  </NavLink>
                </motion.li>
              ))}
              <motion.li
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.1 }}
                className="pt-4 border-t border-white/10"
              >
                <Button to="/contact" fullWidth className="font-sans font-medium" size="lg" icon={ArrowRight}>
                  Let's Talk
                </Button>
              </motion.li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
