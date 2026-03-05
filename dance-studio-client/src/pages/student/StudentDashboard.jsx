import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';


// --- Mock Data specifically for a Student ---
const upcomingClasses = [
  { id: 1, name: 'Hip Hop Fusion', time: 'Today, 5:00 PM', instructor: 'Mike Chen', duration: '60 min', room: 'Studio A' },
  { id: 2, name: 'Contemporary Flow', time: 'Tomorrow, 2:00 PM', instructor: 'Emma Wilson', duration: '90 min', room: 'Studio B' }
];

const myProgress = [
  { id: 1, style: 'Hip Hop', level: 'Intermediate', completion: 75, color: 'from-[#FF6B6B] to-[#ff8e8e]' },
  { id: 2, style: 'Contemporary', level: 'Beginner', completion: 40, color: 'from-[#4ECDC4] to-[#6ee7df]' }
];

const recentInvoices = [
  { id: 'INV-089', desc: 'Monthly Membership - Dec', amount: 3000, status: 'Paid', date: 'Dec 01, 2025' },
  { id: 'INV-095', desc: 'Workshop Registration', amount: 500, status: 'Pending', date: 'Dec 15, 2025' }
];

const StudentDashboard = () => {
  const { user } = useContext(AuthContext);

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* --- Header --- */}
      <header className="mb-6 md:mb-8 mt-2">
        <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-white">
          Hello, {user?.name?.split(' ')[0] || 'Dancer'}! 🎵
        </h1>
        <p className="text-[#b0bec5] text-sm md:text-base">Ready to hit the dance floor today?</p>
      </header>

      {/* --- Highlight Card: Next Class (Hero Section) --- */}
      <div className="mb-6 md:mb-8">
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] p-6 md:p-8 shadow-2xl shadow-[#FF6B6B]/20">
          {/* Abstract Background Shapes */}
          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 translate-y-1/4 -translate-x-1/4 w-48 h-48 bg-black/10 rounded-full blur-2xl pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="inline-block px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-white text-xs font-bold uppercase tracking-wider mb-3 shadow-sm">
                Up Next
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{upcomingClasses[0].name}</h2>
              <div className="flex flex-wrap items-center gap-4 text-white/90 text-sm md:text-base font-medium">
                <span className="flex items-center gap-1">⏰ {upcomingClasses[0].time}</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">📍 {upcomingClasses[0].room}</span>
                <span className="hidden md:inline">•</span>
                <span className="flex items-center gap-1">👤 {upcomingClasses[0].instructor}</span>
              </div>
            </div>
            
            <button className="w-full md:w-auto px-8 py-3.5 bg-white text-[#FF6B6B] font-bold rounded-xl shadow-lg hover:bg-opacity-90 hover:scale-105 transition-all focus:outline-none focus:ring-4 focus:ring-white/50">
              Check In
            </button>
          </div>
        </div>
      </div>

      {/* --- Quick Stats Grid --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="card glass rounded-2xl p-4 md:p-5 flex flex-col justify-center text-center md:text-left">
          <p className="text-[#b0bec5] text-xs md:text-sm font-medium uppercase tracking-wider mb-1">Attendance</p>
          <p className="text-2xl md:text-3xl font-bold text-[#2ecc71]">92%</p>
        </div>
        <div className="card glass rounded-2xl p-4 md:p-5 flex flex-col justify-center text-center md:text-left">
          <p className="text-[#b0bec5] text-xs md:text-sm font-medium uppercase tracking-wider mb-1">Classes Done</p>
          <p className="text-2xl md:text-3xl font-bold text-white">48</p>
        </div>
        <div className="card glass rounded-2xl p-4 md:p-5 flex flex-col justify-center text-center md:text-left">
          <p className="text-[#b0bec5] text-xs md:text-sm font-medium uppercase tracking-wider mb-1">Current Streak</p>
          <p className="text-2xl md:text-3xl font-bold text-[#FFE66D]">4 Weeks 🔥</p>
        </div>
        <div className="card glass rounded-2xl p-4 md:p-5 flex flex-col justify-center text-center md:text-left">
          <p className="text-[#b0bec5] text-xs md:text-sm font-medium uppercase tracking-wider mb-1">Pending Dues</p>
          <p className="text-2xl md:text-3xl font-bold text-[#f39c12]">₹500</p>
        </div>
      </div>

      {/* --- Main Dashboard Content (2 Columns on Desktop) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: My Progress */}
        <div className="flex flex-col gap-6">
          <div className="glass rounded-2xl p-5 md:p-6 shadow-xl border border-white/5">
            <h3 className="font-bold text-white tracking-wide mb-6">My Journey</h3>
            
            <div className="space-y-6">
              {myProgress.map((prog, index) => (
                <div key={prog.id} className="interactive-row p-3 rounded-xl -mx-3">
                  <div className="flex justify-between items-end mb-2">
                    <div>
                      <p className="font-semibold text-white text-sm md:text-base">{prog.style}</p>
                      <p className="text-xs text-[#4ECDC4] mt-0.5 font-medium">{prog.level}</p>
                    </div>
                    <span className="font-bold text-white">{prog.completion}%</span>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden flex items-center shadow-inner">
                    <div 
                      className={`h-full bg-gradient-to-r ${prog.color} rounded-full animate-slide-left relative`} 
                      style={{ width: `${prog.completion}%`, animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="absolute top-0 left-0 w-full h-full shimmer opacity-30"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all text-sm border border-white/10">
              View Detailed Syllabus
            </button>
          </div>
        </div>

        {/* Right Column: Schedule & Billing */}
        <div className="flex flex-col gap-6">
          
          {/* Upcoming Schedule */}
          <div className="glass rounded-2xl p-5 shadow-xl border border-white/5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white tracking-wide">Upcoming Schedule</h3>
              <a href="#calendar" className="text-sm text-[#4ECDC4] hover:text-white transition-colors">Full Calendar</a>
            </div>
            
            <div className="space-y-3">
              {upcomingClasses.map((cls) => (
                <div key={cls.id} className="bg-black/20 border border-white/5 rounded-xl p-4 flex items-center gap-4 hover:border-white/10 transition-colors">
                  <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-xl shrink-0">
                    📅
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-white text-sm truncate">{cls.name}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{cls.time} • {cls.duration}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Billing */}
          <div className="glass rounded-2xl p-5 shadow-xl border border-white/5">
            <h3 className="font-bold text-white tracking-wide mb-4">Recent Invoices</h3>
            
            <div className="divide-y divide-white/5">
              {recentInvoices.map((inv) => (
                <div key={inv.id} className="py-3 first:pt-0 last:pb-0 flex items-center justify-between">
                  <div>
                    <p className="font-medium text-white text-sm">{inv.desc}</p>
                    <p className="text-xs text-gray-400 mt-0.5">{inv.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-white text-sm">₹{inv.amount}</p>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mt-1 inline-block ${inv.status === 'Paid' ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#f39c12]/20 text-[#f39c12]'}`}>
                      {inv.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default StudentDashboard;