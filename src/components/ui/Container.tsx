import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '7xl';
}

/**
 * Standardized page width and horizontal padding container.
 */
const Container: React.FC<ContainerProps> = ({ 
  children, 
  className = '', 
  maxWidth = '7xl' 
}) => {
  const maxWidthClass = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    '7xl': 'max-w-7xl',
  }[maxWidth];

  return (
    <div className={`mx-auto px-4 md:px-8 w-full ${maxWidthClass} ${className}`}>
      {children}
    </div>
  );
};

export default Container;
