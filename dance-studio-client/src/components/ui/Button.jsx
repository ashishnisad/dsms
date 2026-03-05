import React from 'react';
import Spinner from './Spinner'; // <-- Ye line miss ho gayi thi boss!

const Button = ({ children, onClick, variant = 'primary', size = 'md', isLoading = false, disabled = false, type = 'button', className = '', ...props }) => {
  
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-bold transition-all focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const variants = {
    primary: "bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white shadow-lg hover:shadow-[#4ECDC4]/30 hover:scale-[1.02]",
    secondary: "bg-white/10 text-white hover:bg-white/20 border border-white/10",
    danger: "bg-red-500/80 text-white hover:bg-red-600/80",
    glass: "glass text-white hover:bg-white/10 border border-white/10"
  };

  const sizes = { sm: "px-3 py-1.5 text-xs", md: "px-6 py-3 text-sm", lg: "px-8 py-4 text-base" };

  return (
    <button type={type} onClick={onClick} disabled={disabled || isLoading} className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {isLoading ? (
        <>
          <Spinner size="sm" className="mr-2" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;