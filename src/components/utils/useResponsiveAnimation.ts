import { useState, useEffect } from 'react';

/**
 * A custom hook to adjust Framer Motion configurations dynamically
 * based on screen width (mobile/tablet vs desktop).
 * 
 * Breakpoint used: 1024px (Tailwind's 'lg')
 */
export function useResponsiveAnimation() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  /**
   * Generates a smooth, linear/vercel-style transition on mobile instead of bouncy springs.
   */
  const getTransition = (desktopTransition: any = {}) => {
    if (!isMobile) return desktopTransition;

    return {
      type: "tween",
      ease: [0.16, 1, 0.3, 1], // Custom premium ease-out (similar to linear/stripe fast but smooth)
      duration: 0.65, // Gentle, premium speed (not aggressive)
      ...desktopTransition,
      // Remove bouncing/spring physics explicitly for mobile
      bounce: 0,
      damping: undefined,
      stiffness: undefined,
      mass: undefined,
    };
  };

  /**
   * Configures viewport triggering.
   * On mobile, elements trigger once with a clean threshold, minimizing paint jank during scroll.
   */
  const getViewport = (desktopViewport: any = {}) => {
    if (!isMobile) return desktopViewport;

    return {
      once: true,
      amount: 0.15, // Trigger slightly after entering viewport for a smooth glide
      ...desktopViewport,
    };
  };

  /**
   * Softens translate Y values to avoid giant "pop-up" jumps on small screens.
   */
  const adjustY = (desktopY: number | string) => {
    if (!isMobile || typeof desktopY !== 'number') return desktopY;
    
    // Reduce movement distance to a subtle 10-15px on mobile
    return desktopY > 0 ? Math.min(12, desktopY) : Math.max(-12, desktopY);
  };

  /**
   * Softens translate X values to avoid massive side-swipe motion.
   */
  const adjustX = (desktopX: number | string) => {
    if (!isMobile || typeof desktopX !== 'number') return desktopX;
    
    // Reduce side movement to a subtle fraction on mobile
    return desktopX > 0 ? Math.min(12, desktopX) : Math.max(-12, desktopX);
  };

  /**
   * Softens zoom / scale transitions.
   */
  const adjustScale = (desktopScale: number) => {
    if (!isMobile) return desktopScale;
    
    // Very subtle zoom factor on mobile (near 1.0)
    return desktopScale < 1 ? Math.max(0.98, desktopScale) : Math.min(1.02, desktopScale);
  };

  return {
    isMobile,
    getTransition,
    getViewport,
    adjustY,
    adjustX,
    adjustScale,
  };
}
