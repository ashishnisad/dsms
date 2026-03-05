import React from 'react';

const Badge = ({ status, className = '' }) => {
  const getColorStyles = (statusType) => {
    // String match karke color de rahe hain
    if (['Paid', 'Active', 'Completed'].includes(statusType)) {
      return "bg-[#2ecc71]/20 text-[#2ecc71] border-[#2ecc71]/20"; // Green
    } else if (['Pending', 'Inactive', 'Upcoming'].includes(statusType)) {
      return "bg-[#f39c12]/20 text-[#f39c12] border-[#f39c12]/20"; // Orange
    } else {
      return "bg-white/10 text-gray-300 border-white/10"; // Default Grey
    }
  };

  return (
    <span className={`inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getColorStyles(status)} ${className}`}>
      {status}
    </span>
  );
};

export default Badge;   