import React, { useEffect } from 'react';

const Modal = ({ isOpen, onClose, title, children, maxWidth = 'max-w-lg' }) => {
  
  // Agar modal open hai, toh background scrolling band kar do
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
      
      {/* Background Overlay (Dark & Blur) */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      ></div>

      {/* Modal Box */}
      <div className={`glass w-full ${maxWidth} rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative z-10 animate-fade-up font-outfit flex flex-col max-h-[90vh]`}>
        
        {/* Modal Header */}
        <div className="flex justify-between items-center p-5 md:p-6 border-b border-white/10 bg-white/[0.02]">
          <h3 className="text-xl font-bold text-white">{title}</h3>
          
          {/* Close Button (X) */}
          <button 
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-red-500/80 transition-all focus:outline-none"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Modal Content (Scrollable) */}
        <div className="p-5 md:p-6 overflow-y-auto custom-scrollbar">
          {children}
        </div>

      </div>
    </div>
  );
};

export default Modal;