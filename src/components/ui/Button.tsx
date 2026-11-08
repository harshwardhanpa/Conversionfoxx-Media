import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { LucideIcon } from 'lucide-react';

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  ariaLabel?: string;
  fullWidth?: boolean;
}

const MotionLink = motion(Link);

/**
 * Standardized CTA and secondary buttons matching the ConversionFoxx style.
 */
const Button: React.FC<ButtonProps> = ({
  children,
  to,
  onClick,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'right',
  type = 'button',
  disabled = false,
  ariaLabel,
  fullWidth = false,
}) => {
  const baseStyles = "inline-flex items-center justify-center font-black tracking-tight font-sans transition-all duration-300 rounded-2xl disabled:opacity-50 disabled:cursor-not-allowed uppercase btn-premium";
  
  const variants = {
    primary: "btn-primary-neon text-white active:scale-95",
    secondary: "border border-white/10 bg-white/5 text-white hover:bg-white/10 active:scale-95 backdrop-blur-md glass hover:border-white/20",
    ghost: "text-brand-text-secondary hover:text-white hover:bg-white/5 active:scale-95",
    outline: "border-2 border-[#FF6A00] bg-transparent text-[#FF6A00] hover:bg-[#FF6A00]/10 active:scale-95",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-xs tracking-widest",
    md: "px-8 py-3.5 text-xs tracking-widest",
    lg: "px-10 py-4.5 text-sm tracking-widest",
    xl: "px-14 py-6 text-base tracking-[0.2em]",
  };

  const content = (
    <>
      {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 mr-2" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 ml-2" />}
    </>
  );

  const combinedClasses = `${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  if (to) {
    return (
      <MotionLink 
        to={to} 
        className={combinedClasses}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        aria-label={ariaLabel}
      >
        {content}
      </MotionLink>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={combinedClasses}
      aria-label={ariaLabel}
    >
      {content}
    </motion.button>
  );
};

export default Button;
