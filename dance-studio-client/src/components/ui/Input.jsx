import React from 'react';

const Input = ({ label, type = 'text', name, value, onChange, placeholder = '', error = null, required = false, className = '', ...props }) => {
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label htmlFor={name} className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 ml-1">
          {label} {required && <span className="text-red-400">*</span>}
        </label>
      )}
      <input
        id={name} type={type} name={name} value={value} onChange={onChange} placeholder={placeholder}
        className={`w-full px-4 py-3 rounded-xl bg-black/20 border ${error ? 'border-red-500/50 focus:border-red-500' : 'border-white/10 focus:border-[#4ECDC4]'} text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-[#4ECDC4]/30 transition-all`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-red-400 font-medium ml-1 animate-fade-up">{error}</p>}
    </div>
  );
};

export default Input;