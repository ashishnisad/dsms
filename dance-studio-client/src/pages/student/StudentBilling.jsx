import React, { useState, useMemo } from 'react';


// --- Mock Data ---
const invoicesData = [
  { id: 'INV-2026-041', desc: 'March Monthly Fee', amount: 2500, date: 'Mar 01, 2026', dueDate: 'Mar 05, 2026', status: 'Pending' },
  { id: 'INV-2026-038', desc: 'Zumba Workshop', amount: 500, date: 'Feb 15, 2026', dueDate: 'Feb 15, 2026', status: 'Paid' },
  { id: 'INV-2026-022', desc: 'February Monthly Fee', amount: 2500, date: 'Feb 01, 2026', dueDate: 'Feb 05, 2026', status: 'Paid' },
  { id: 'INV-2026-005', desc: 'Registration & Jan Fee', amount: 3500, date: 'Jan 05, 2026', dueDate: 'Jan 10, 2026', status: 'Paid' }
];

const StudentBilling = () => {
  const [invoices, setInvoices] = useState(invoicesData);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Calculate Total Due
  const totalDue = useMemo(() => {
    return invoices.filter(inv => inv.status === 'Pending').reduce((acc, curr) => acc + curr.amount, 0);
  }, [invoices]);

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* --- Header --- */}
      <div className="mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">My Invoices & Payments</h1>
        <p className="text-[#b0bec5] text-sm">Manage your fees, view receipts, and make payments securely.</p>
      </div>

      {/* --- Outstanding Balance Hero Card --- */}
      <div className="mb-8 relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#1a1a3a] to-[#0f1635] p-6 md:p-8 shadow-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Glow Effects */}
        <div className={`absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl pointer-events-none ${totalDue > 0 ? 'bg-[#FF6B6B]/10' : 'bg-[#2ecc71]/10'}`}></div>

        <div>
          <p className="text-[#b0bec5] text-sm font-medium uppercase tracking-wider mb-2">Total Outstanding Balance</p>
          <div className="flex items-end gap-3">
            <h2 className={`text-4xl md:text-5xl font-bold ${totalDue > 0 ? 'text-[#FF6B6B]' : 'text-[#2ecc71]'}`}>
              ₹{totalDue.toLocaleString()}
            </h2>
            {totalDue === 0 && <span className="text-[#2ecc71] font-bold text-lg mb-1">All clear! 🎉</span>}
          </div>
          {totalDue > 0 && (
            <p className="text-gray-400 text-sm mt-2">Please clear your dues before the next billing cycle.</p>
          )}
        </div>

        {totalDue > 0 ? (
          <button 
            onClick={() => setIsPaymentModalOpen(true)}
            className="w-full md:w-auto px-10 py-4 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#ff4757] text-white font-bold text-lg shadow-lg shadow-[#FF6B6B]/25 hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-[#FF6B6B]/50 flex items-center justify-center gap-2 shrink-0"
          >
            <span>Pay Now</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
          </button>
        ) : (
          <div className="px-6 py-4 rounded-xl bg-[#2ecc71]/10 border border-[#2ecc71]/20 text-[#2ecc71] font-bold flex items-center gap-2">
            ✅ No pending dues
          </div>
        )}
      </div>

      {/* --- Payment History / Invoice List --- */}
      <div className="glass rounded-2xl overflow-hidden shadow-xl border border-white/5">
        <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <h3 className="font-bold text-white tracking-wide">Payment History</h3>
        </div>
        
        <div className="divide-y divide-white/5">
          {invoices.map((inv, i) => (
            <div 
              key={inv.id} 
              className="flex flex-col md:flex-row md:items-center justify-between p-5 hover:bg-white/[0.02] transition-colors gap-4 md:gap-0"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              
              {/* Left: Icon & Details */}
              <div className="flex items-start md:items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 border shadow-inner ${inv.status === 'Paid' ? 'bg-[#2ecc71]/10 text-[#2ecc71] border-[#2ecc71]/20' : 'bg-[#f39c12]/10 text-[#f39c12] border-[#f39c12]/20'}`}>
                  {inv.status === 'Paid' ? '🧾' : '⏳'}
                </div>
                <div>
                  <p className="font-semibold text-white text-base">{inv.desc}</p>
                  <div className="flex flex-wrap items-center gap-2 text-xs text-gray-400 mt-1">
                    <span>{inv.id}</span>
                    <span className="hidden md:inline">•</span>
                    <span>Billed: {inv.date}</span>
                    {inv.status === 'Pending' && (
                      <>
                        <span className="hidden md:inline">•</span>
                        <span className="text-[#FF6B6B] font-medium">Due: {inv.dueDate}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Right: Amount, Status & Actions */}
              <div className="flex items-center justify-between md:justify-end gap-4 w-full md:w-auto border-t border-white/5 md:border-none pt-4 md:pt-0 pl-16 md:pl-0">
                <div className="text-left md:text-right">
                  <p className="text-lg font-bold text-white">₹{inv.amount.toLocaleString()}</p>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider inline-block mt-0.5 ${inv.status === 'Paid' ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#f39c12]/20 text-[#f39c12]'}`}>
                    {inv.status}
                  </span>
                </div>
                
                <button 
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition-all focus:outline-none ${inv.status === 'Paid' ? 'bg-white/5 text-gray-300 hover:text-white hover:bg-white/10 border border-white/10' : 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white shadow-lg'}`}
                >
                  {inv.status === 'Paid' ? 'Download' : 'Pay'}
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* --- Dummy Payment Modal (Opens on Pay Now) --- */}
      {isPaymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setIsPaymentModalOpen(false)}></div>
          
          <div className="relative w-full max-w-sm glass border border-white/10 rounded-2xl p-6 md:p-8 z-10 animate-scale-in shadow-2xl">
            <h3 className="text-xl font-bold text-white mb-2">Secure Payment</h3>
            <p className="text-sm text-gray-400 mb-6">Complete your payment of <strong className="text-white">₹{totalDue.toLocaleString()}</strong></p>
            
            {/* Payment Options Placeholder */}
            <div className="space-y-3 mb-6">
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/10 hover:border-[#4ECDC4] transition-colors group">
                <span className="font-medium text-white group-hover:text-[#4ECDC4]">Pay with UPI</span>
                <span className="text-2xl">📱</span>
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-xl bg-black/20 border border-white/10 hover:border-[#4ECDC4] transition-colors group">
                <span className="font-medium text-white group-hover:text-[#4ECDC4]">Credit / Debit Card</span>
                <span className="text-2xl">💳</span>
              </button>
            </div>

            <button 
              onClick={() => setIsPaymentModalOpen(false)}
              className="w-full py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all text-sm border border-white/5"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default StudentBilling;