import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  id?: string;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  background?: 'none' | 'subtle';
}

/**
 * Standardized vertical spacing between sections.
 */
const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '', 
  id,
  padding = 'lg',
  background = 'none'
}) => {
  const paddingClasses = {
    none: 'py-0',
    sm: 'py-8 md:py-12',
    md: 'py-12 md:py-16',
    lg: 'py-20 md:py-24',
    xl: 'py-24 md:py-28',
    '2xl': 'py-28 md:py-32',
  }[padding];

  const backgroundClasses = {
    none: '',
    subtle: 'bg-white/[0.02]',
  }[background];

  return (
    <section 
      id={id} 
      className={`relative overflow-hidden ${paddingClasses} ${backgroundClasses} ${className}`}
    >
      {children}
    </section>
  );
};

export default Section;
