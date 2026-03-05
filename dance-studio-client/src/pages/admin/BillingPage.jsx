import React, { useState, useMemo } from 'react';


// --- Mock Data ---
const transactionsData = [
  { id: 1, member: 'Ananya Patel', amount: 5000, type: 'Monthly Fee', date: '2026-02-25', status: 'Completed' },
  { id: 2, member: 'Rahul Sharma', amount: 3000, type: 'Monthly Fee', date: '2026-02-24', status: 'Completed' },
  { id: 3, member: 'Priya Singh', amount: 5000, type: 'Monthly Fee', date: '2026-02-23', status: 'Completed' },
  { id: 4, member: 'Arjun Reddy', amount: 3000, type: 'Monthly Fee', date: '2026-02-20', status: 'Pending' },
  { id: 5, member: 'Meera Gupta', amount: 15000, type: 'Annual Fee', date: '2026-02-18', status: 'Completed' },
  { id: 6, member: 'Vikram Joshi', amount: 500, type: 'Registration', date: '2026-02-15', status: 'Completed' },
  { id: 7, member: 'Sanya Verma', amount: 5000, type: 'Monthly Fee', date: '2026-02-10', status: 'Pending' },
  { id: 8, member: 'Karan Mehta', amount: 3000, type: 'Monthly Fee', date: '2026-02-05', status: 'Completed' },
  { id: 9, member: 'Neha Kapoor', amount: 15000, type: 'Annual Fee', date: '2026-01-30', status: 'Completed' },
  { id: 10, member: 'Amit Desai', amount: 500, type: 'Registration', date: '2026-01-25', status: 'Pending' },
  // Add more for previous months if needed
];

const feePlans = [
  { id: 1, name: 'Monthly Membership', price: 5000, duration: '1 Month', features: ['Unlimited Classes', 'Basic Access'] },
  { id: 2, name: 'Quarterly Membership', price: 12000, duration: '3 Months', features: ['Unlimited Classes', 'Priority Booking'] },
  { id: 3, name: 'Annual Membership', price: 40000, duration: '12 Months', features: ['Unlimited Classes', 'Personal Training', 'Merchandise'] },
];

const BillingPage = () => {
  const [timeframe, setTimeframe] = useState('This Month');
  const [selectedTxn, setSelectedTxn] = useState(null);
  const [gstEnabled, setGstEnabled] = useState(false); // Optional GST toggle

  const currentDate = new Date('2026-02-26'); // Fixed as per current date

  // --- Filtered Transactions ---
  const filteredTransactions = useMemo(() => {
    if (timeframe === 'All Time') return transactionsData;

    const startOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    return transactionsData.filter(t => new Date(t.date) >= startOfMonth);
  }, [timeframe]);

  // --- Calculations ---
  const { totalCollected, pendingDues, pendingCount, thisWeekRevenue, lastWeekRevenue } = useMemo(() => {
    let collected = 0;
    let dues = 0;
    let count = 0;

    const startOfThisWeek = new Date(currentDate);
    startOfThisWeek.setDate(currentDate.getDate() - currentDate.getDay() + 1); // Monday
    const endOfThisWeek = new Date(startOfThisWeek);
    endOfThisWeek.setDate(startOfThisWeek.getDate() + 6);

    const startOfLastWeek = new Date(startOfThisWeek);
    startOfLastWeek.setDate(startOfThisWeek.getDate() - 7);
    const endOfLastWeek = new Date(startOfLastWeek);
    endOfLastWeek.setDate(startOfLastWeek.getDate() + 6);

    let thisWeekRev = 0;
    let lastWeekRev = 0;

    filteredTransactions.forEach(t => {
      const tDate = new Date(t.date);
      if (t.status === 'Completed') {
        collected += t.amount;
        if (tDate >= startOfThisWeek && tDate <= endOfThisWeek) thisWeekRev += t.amount;
        if (tDate >= startOfLastWeek && tDate <= endOfLastWeek) lastWeekRev += t.amount;
      } else {
        dues += t.amount;
        count++;
      }
    });

    return { 
      totalCollected: collected, 
      pendingDues: dues, 
      pendingCount: count,
      thisWeekRevenue: thisWeekRev,
      lastWeekRevenue: lastWeekRev
    };
  }, [filteredTransactions, currentDate]);

  const weekOverWeekChange = lastWeekRevenue > 0 
    ? ((thisWeekRevenue - lastWeekRevenue) / lastWeekRevenue * 100).toFixed(1)
    : 0;

  // --- Accessibility Keyboard Handler ---
  const handleKeyDown = (e, txn) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedTxn(txn);
    }
  };

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Billing Module</h1>
          <p className="text-[#b0bec5] text-sm">Manage fee plans, invoices, payments, subscriptions, dues, refunds, taxes, and analytics.</p>
        </div>
        
        {/* Filters */}
        <div className="flex items-center gap-2 bg-white/5 p-1 rounded-xl w-fit">
          <button 
            onClick={() => setTimeframe('This Month')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeframe === 'This Month' ? 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            This Month
          </button>
          <button 
            onClick={() => setTimeframe('All Time')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeframe === 'All Time' ? 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
          >
            All Time
          </button>
        </div>
      </div>

      {/* --- Revenue Overview Cards --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        
        {/* Total Collected */}
        <div className="card glass rounded-2xl p-6">
          <p className="text-gray-400 text-sm mb-2 font-medium uppercase tracking-wider">Total Collected</p>
          <p className="text-3xl font-bold text-[#2ecc71]">₹{totalCollected.toLocaleString()}</p>
          <div className="mt-5">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-300">Target: ₹50,000</span>
              <span className="text-[#2ecc71] font-bold">{((totalCollected / 50000) * 100).toFixed(1)}%</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#2ecc71] to-emerald-500 rounded-full" style={{width: `${(totalCollected / 50000) * 100}%`}}></div>
            </div>
          </div>
        </div>

        {/* Pending Dues */}
        <div className="card glass rounded-2xl p-6" style={{ animationDelay: '0.1s' }}>
          <p className="text-gray-400 text-sm mb-2 font-medium uppercase tracking-wider">Pending Dues</p>
          <p className="text-3xl font-bold text-[#f39c12]">₹{pendingDues.toLocaleString()}</p>
          <div className="mt-5">
            <div className="flex justify-between text-sm mb-1.5">
              <span className="text-gray-300">{pendingCount} Members</span>
              <span className="text-[#f39c12] font-bold">Overdue</span>
            </div>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-[#f39c12] to-orange-500 rounded-full" style={{width: `${(pendingDues / (totalCollected + pendingDues) * 100).toFixed(1)}%`}}></div>
            </div>
          </div>
        </div>

        {/* This Week */}
        <div className="card glass rounded-2xl p-6" style={{ animationDelay: '0.2s' }}>
          <p className="text-gray-400 text-sm mb-2 font-medium uppercase tracking-wider">This Week</p>
          <p className="text-3xl font-bold text-[#FF6B6B]">₹{thisWeekRevenue.toLocaleString()}</p>
          <div className="mt-5 flex items-center gap-2 bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-white/10">
            <span className={`text-sm font-bold ${weekOverWeekChange >= 0 ? 'text-[#2ecc71]' : 'text-[#FF6B6B]'}`}>{weekOverWeekChange >= 0 ? '↑' : '↓'} {Math.abs(weekOverWeekChange)}%</span>
            <span className="text-gray-400 text-sm">vs last week</span>
          </div>
        </div>
      </div>

      {/* Fee Plans Section */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4">Fee Plans</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {feePlans.map((plan, i) => (
            <div key={plan.id} className="card glass rounded-2xl p-6" style={{ animationDelay: `${i * 0.1}s` }}>
              <p className="text-xl font-bold text-white mb-2">{plan.name}</p>
              <p className="text-2xl font-bold text-[#2ecc71]">₹{plan.price.toLocaleString()}</p>
              <p className="text-sm text-gray-400 mb-4">{plan.duration}</p>
              <ul className="space-y-2">
                {plan.features.map((feature, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-300">
                    <span className="text-[#2ecc71]">✓</span> {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Transactions List */}
      <div className="glass rounded-2xl overflow-hidden shadow-xl border border-white/5 mb-8">
        <div className="p-5 border-b border-white/10 bg-white/5">
          <h3 className="font-bold text-white tracking-wide">Recent Transactions</h3>
        </div>
        
        <div className="divide-y divide-white/5">
          {filteredTransactions.map((t, i) => (
            <div 
              key={t.id} 
              role="button"
              tabIndex={0}
              onKeyDown={(e) => handleKeyDown(e, t)}
              onClick={() => setSelectedTxn(t)}
              className="interactive-row flex flex-col sm:flex-row sm:items-center justify-between p-5 cursor-pointer hover:bg-white/[0.02] focus:outline-none focus:bg-white/5 transition-all gap-4 sm:gap-0"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Left Side: Icon & Info */}
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 shadow-inner ${t.status === 'Completed' ? 'bg-[#2ecc71]/10 text-[#2ecc71] border border-[#2ecc71]/20' : 'bg-[#f39c12]/10 text-[#f39c12] border border-[#f39c12]/20'}`}>
                  {t.status === 'Completed' ? '✓' : '⏳'}
                </div>
                <div>
                  <p className="font-semibold text-white text-base">{t.member}</p>
                  <p className="text-sm text-gray-400 mt-0.5">{t.type} <span className="mx-1">•</span> {t.date}</p>
                </div>
              </div>
              
              {/* Right Side: Amount & Status */}
              <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t border-white/5 sm:border-none pt-3 sm:pt-0">
                <p className={`text-lg font-bold tracking-wide ${t.status === 'Completed' ? 'text-[#2ecc71]' : 'text-[#f39c12]'}`}>
                  ₹{t.amount.toLocaleString()}
                </p>
                <span className={`text-[10px] uppercase tracking-wider font-bold mt-1 px-2 py-0.5 rounded-full ${t.status === 'Completed' ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#f39c12]/20 text-[#f39c12]'}`}>
                  {t.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tax Engine Toggle */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4">Tax Engine (GST)</h2>
        <div className="glass rounded-2xl p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold text-white">Enable GST (18%)</p>
              <p className="text-sm text-gray-400">Apply GST to all transactions</p>
            </div>
            <button 
              onClick={() => setGstEnabled(!gstEnabled)}
              className={`w-12 h-6 rounded-full p-1 transition-all ${gstEnabled ? 'bg-[#2ecc71]' : 'bg-gray-600'}`}
            >
              <div className={`w-4 h-4 bg-white rounded-full transition-transform ${gstEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Reporting & Analytics */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-white mb-4">Reporting & Analytics</h2>
        <div className="glass rounded-2xl p-6">
          <p className="text-gray-400 mb-4">Generate reports for revenue, attendance, and more.</p>
          <div className="grid grid-cols-2 gap-4">
            <button className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all">Revenue Report</button>
            <button className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all">Dues Report</button>
          </div>
        </div>
      </div>

      {/* --- Accessible Transaction Modal --- */}
      {selectedTxn && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <div 
            className="absolute inset-0 bg-black/70 backdrop-blur-md" 
            onClick={() => setSelectedTxn(null)}
          ></div>
          
          <div className="relative w-full max-w-sm glass border border-white/10 rounded-2xl p-6 z-10 animate-scale-in shadow-2xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-white">Invoice Details</h3>
              <button 
                onClick={() => setSelectedTxn(null)} 
                className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-full transition-all focus:outline-none"
              >
                ✕
              </button>
            </div>

            <div className="text-center mb-8 bg-black/20 py-6 rounded-xl border border-white/5">
              <p className="text-gray-400 text-sm mb-1 uppercase tracking-wider">Amount</p>
              <p className={`text-5xl font-bold mb-3 ${selectedTxn.status === 'Completed' ? 'text-[#2ecc71]' : 'text-[#f39c12]'}`}>
                ₹{selectedTxn.amount.toLocaleString()}
              </p>
              <span className={`text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wider ${selectedTxn.status === 'Completed' ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#f39c12]/20 text-[#f39c12]'}`}>
                {selectedTxn.status}
              </span>
            </div>

            <div className="space-y-3">
              <div className="glass rounded-xl p-4 flex justify-between items-center">
                <p className="text-gray-400 text-sm">Member</p>
                <p className="font-semibold text-white">{selectedTxn.member}</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="glass rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">Type</p>
                  <p className="font-semibold text-white">{selectedTxn.type}</p>
                </div>
                <div className="glass rounded-xl p-4">
                  <p className="text-gray-400 text-sm mb-1">Date</p>
                  <p className="font-semibold text-white">{selectedTxn.date}</p>
                </div>
              </div>
              {gstEnabled && (
                <div className="glass rounded-xl p-4 flex justify-between items-center">
                  <p className="text-gray-400 text-sm">GST (18%)</p>
                  <p className="font-semibold text-white">₹{(selectedTxn.amount * 0.18).toLocaleString()}</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4 mt-6">
              <button className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all focus:outline-none border border-white/10">
                Download Receipt
              </button>
              <button className="py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold transition-all focus:outline-none border border-white/10">
                Send Reminder
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default BillingPage;