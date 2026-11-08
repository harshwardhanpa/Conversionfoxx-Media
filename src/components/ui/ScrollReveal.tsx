import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
  duration?: number;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  distance = 18,
  duration = 0.65,
}) => {
  const shouldReduceMotion = useReducedMotion();

  // If user prefers reduced motion, fade opacity only without vertical translation
  const initialY = shouldReduceMotion ? 0 : distance;

  return (
    <motion.div
      initial={{ opacity: 0, y: initialY }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      className={`transform-gpu ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default ScrollReveal;
