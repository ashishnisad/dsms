import React, { useState } from 'react';
import '../../styles/dashboard.css';

// --- Dummy Payroll Data ---
const payrollHistory = [
  { id: 'PAY-2026-03', month: 'March 2026', classesTaken: 24, amount: 12000, status: 'Pending', date: 'Expected Apr 05' },
  { id: 'PAY-2026-02', month: 'February 2026', classesTaken: 20, amount: 10000, status: 'Paid', date: 'Mar 05, 2026' },
  { id: 'PAY-2026-01', month: 'January 2026', classesTaken: 22, amount: 11000, status: 'Paid', date: 'Feb 05, 2026' },
  { id: 'PAY-2025-12', month: 'December 2025', classesTaken: 18, amount: 9000, status: 'Paid', date: 'Jan 05, 2026' },
];

const MyPayroll = () => {
  const [payrolls] = useState(payrollHistory);

  // Current pending amount
  const pendingAmount = payrolls.find(p => p.status === 'Pending')?.amount || 0;

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">My Payroll & Earnings</h1>
        <p className="text-[#b0bec5] text-sm">Track your monthly salary, classes taken, and payment history.</p>
      </div>

      {/* Hero Card */}
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a3a] to-[#0f1635] p-6 md:p-8 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none bg-[#4ECDC4]/10"></div>

        <div className="flex-1 w-full relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">💰</span>
            <p className="text-[#b0bec5] text-sm font-bold uppercase tracking-wider">Current Month Earnings (Est.)</p>
          </div>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl md:text-5xl font-bold text-[#4ECDC4]">
              ₹{pendingAmount.toLocaleString()}
            </h2>
            <span className="text-gray-400 font-medium text-sm mb-1.5">/ Pending</span>
          </div>
          <p className="text-sm text-gray-400 mt-3">
            Based on <strong className="text-white">24 classes</strong> completed this month.
          </p>
        </div>

        <div className="w-full md:w-auto shrink-0 flex flex-col gap-3 relative z-10">
          <div className="px-6 py-4 rounded-xl bg-black/30 border border-white/5 backdrop-blur-md text-center shadow-inner">
            <p className="text-xs text-gray-400 font-bold uppercase mb-1">Next Payout Date</p>
            <p className="text-white font-medium text-lg">05 April, 2026</p>
          </div>
          <button className="w-full px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all text-sm border border-white/10 flex items-center justify-center gap-2 group">
            <span>Download Tax Report</span>
            <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
          </button>
        </div>
      </div>

      {/* Salary History List */}
      <div className="glass rounded-2xl overflow-hidden shadow-xl border border-white/5">
        <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <h3 className="font-bold text-white tracking-wide">Salary Slips & History</h3>
        </div>
        
        <div className="divide-y divide-white/5">
          {payrolls.map((pay, i) => (
            <div 
              key={pay.id} 
              className="flex flex-col md:flex-row md:items-center justify-between p-5 hover:bg-white/[0.02] transition-colors gap-4 md:gap-0"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              
              {/* Icon & Details */}
              <div className="flex items-start md:items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border shadow-inner ${pay.status === 'Paid' ? 'bg-[#2ecc71]/10 text-[#2ecc71] border-[#2ecc71]/20' : 'bg-[#f39c12]/10 text-[#f39c12] border-[#f39c12]/20'}`}>
                  {pay.status === 'Paid' ? '💸' : '⏳'}
                </div>
                <div>
                  <p className="font-bold text-white text-base">{pay.month}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-1">
                    <span>{pay.classesTaken} Classes Taken</span>
                    <span className="hidden md:inline">•</span>
                    <span>{pay.status === 'Paid' ? `Credited: ${pay.date}` : pay.date}</span>
                  </div>
                </div>
              </div>

              {/* Amount & Button */}
              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t border-white/5 md:border-none pt-4 md:pt-0 pl-16 md:pl-0">
                <div className="text-left md:text-right">
                  <p className="text-lg font-bold text-white">₹{pay.amount.toLocaleString()}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider inline-block mt-0.5 ${pay.status === 'Paid' ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#f39c12]/20 text-[#f39c12]'}`}>
                    {pay.status}
                  </span>
                </div>
                
                <button 
                  disabled={pay.status === 'Pending'}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all focus:outline-none ${pay.status === 'Paid' ? 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10' : 'opacity-50 cursor-not-allowed bg-black/20 text-gray-500 border border-transparent'}`}
                >
                  {pay.status === 'Paid' ? 'Payslip' : 'Processing'}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default MyPayroll;