import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon';
}

export const Logo: React.FC<LogoProps> = ({ className = "w-8 h-8", variant = 'icon' }) => {
  return (
    <div className={`flex items-center gap-2 group shrink-0`}>
      <img
        src="/logo.png"
        alt="ConversionFoxx Logo"
        width="48"
        height="48"
        fetchPriority="high"
        className={`object-contain ${className}`}
        referrerPolicy="no-referrer"
        onError={(e) => {
          // Fallback to text if image fails to load
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />
      
      {variant === 'full' && (
        <span className="text-xl font-display font-bold tracking-tight text-white group-hover:text-brand-primary transition-colors duration-300">
          Conversion<span className="text-brand-primary">Foxx</span>
        </span>
      )}
    </div>
  );
};
