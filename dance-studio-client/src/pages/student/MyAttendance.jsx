import React, { useState } from 'react';


// --- Mock Data ---
const attendanceStats = {
  percentage: 88,
  totalClasses: 45,
  present: 40,
  absent: 5,
  streak: '5 Weeks 🔥',
  message: "Awesome job! You're extremely consistent."
};

const attendanceHistory = [
  { id: 1, date: 'Feb 23, 2026', className: 'Hip Hop Fusion', status: 'Present', time: '5:00 PM' },
  { id: 2, date: 'Feb 21, 2026', className: 'Contemporary Flow', status: 'Present', time: '2:00 PM' },
  { id: 3, date: 'Feb 18, 2026', className: 'Hip Hop Fusion', status: 'Absent', time: '5:00 PM' },
  { id: 4, date: 'Feb 16, 2026', className: 'Salsa Social', status: 'Present', time: '6:30 PM' },
  { id: 5, date: 'Feb 14, 2026', className: 'Hip Hop Fusion', status: 'Present', time: '5:00 PM' },
  { id: 6, date: 'Feb 09, 2026', className: 'Contemporary Flow', status: 'Present', time: '2:00 PM' },
];

const MyAttendance = () => {
  const [filterMonth, setFilterMonth] = useState('February 2026');

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* --- Header --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">My Attendance</h1>
          <p className="text-[#b0bec5] text-sm">Track your consistency and class history.</p>
        </div>
        
        {/* Month Filter */}
        <select 
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="glass rounded-xl px-4 py-3 text-sm text-white bg-transparent outline-none cursor-pointer focus:ring-2 focus:ring-[#4ECDC4] transition-all w-full md:w-auto"
        >
          <option className="bg-[#0A0E27]">February 2026</option>
          <option className="bg-[#0A0E27]">January 2026</option>
          <option className="bg-[#0A0E27]">December 2025</option>
        </select>
      </div>

      {/* --- Top Dashboard Stats (Hero Section) --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        
        {/* Main Progress Card */}
        <div className="lg:col-span-2 relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#2ecc71]/20 to-[#4ECDC4]/20 p-6 md:p-8 shadow-xl border border-[#2ecc71]/30 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-[#2ecc71]/10 rounded-full blur-3xl pointer-events-none"></div>
          
          <div>
            <span className="inline-block px-3 py-1 bg-[#2ecc71]/20 text-[#2ecc71] rounded-full text-xs font-bold uppercase tracking-wider mb-3">
              Overall Performance
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">{attendanceStats.percentage}% Attendance</h2>
            <p className="text-gray-300 font-medium">{attendanceStats.message}</p>
          </div>

          {/* SVG Circular Progress */}
          <div className="relative w-32 h-32 shrink-0">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="64" cy="64" r="54" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="12" />
              <circle 
                cx="64" cy="64" r="54" fill="none" 
                stroke="#2ecc71" strokeWidth="12" strokeLinecap="round" 
                strokeDasharray="339.29" 
                strokeDashoffset={339.29 - (339.29 * attendanceStats.percentage) / 100}
                className="transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-2xl font-bold text-white">{attendanceStats.percentage}%</span>
            </div>
          </div>
        </div>

        {/* Small Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
          <div className="glass rounded-2xl p-5 flex flex-col justify-center text-center lg:text-left border-l-4 border-[#FF6B6B]">
            <p className="text-[#b0bec5] text-xs font-medium uppercase tracking-wider mb-1">Current Streak</p>
            <p className="text-xl font-bold text-[#FFE66D]">{attendanceStats.streak}</p>
          </div>
          <div className="glass rounded-2xl p-5 flex flex-col justify-center text-center lg:text-left">
            <p className="text-[#b0bec5] text-xs font-medium uppercase tracking-wider mb-1">Classes Attended</p>
            <p className="text-xl font-bold text-white"><span className="text-[#2ecc71]">{attendanceStats.present}</span> / {attendanceStats.totalClasses}</p>
          </div>
        </div>

      </div>

      {/* --- Attendance History List --- */}
      <div className="glass rounded-2xl overflow-hidden shadow-xl border border-white/5">
        <div className="p-5 border-b border-white/10 bg-white/5 flex items-center justify-between">
          <h3 className="font-bold text-white tracking-wide">Recent History</h3>
          <span className="text-sm text-gray-400 font-medium">Showing: {filterMonth}</span>
        </div>
        
        <div className="divide-y divide-white/5">
          {attendanceHistory.map((record, i) => (
            <div 
              key={record.id} 
              className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-white/[0.02] transition-colors gap-3 sm:gap-0"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Left: Date & Icon */}
              <div className="flex items-center gap-4 w-full sm:w-1/3">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl shrink-0 ${record.status === 'Present' ? 'bg-[#2ecc71]/10 text-[#2ecc71] shadow-inner border border-[#2ecc71]/20' : 'bg-[#FF6B6B]/10 text-[#FF6B6B] shadow-inner border border-[#FF6B6B]/20'}`}>
                  {record.status === 'Present' ? '✅' : '❌'}
                </div>
                <div>
                  <p className="font-semibold text-white text-base">{record.date}</p>
                  <p className="text-sm text-gray-400 mt-0.5">{record.time}</p>
                </div>
              </div>

              {/* Middle: Class Name */}
              <div className="w-full sm:w-1/3 sm:text-center pl-16 sm:pl-0">
                <p className="font-medium text-white text-sm md:text-base">{record.className}</p>
              </div>

              {/* Right: Status Pill */}
              <div className="w-full sm:w-1/3 flex justify-start pl-16 sm:pl-0 sm:justify-end">
                <span className={`text-xs px-4 py-1.5 rounded-full font-bold uppercase tracking-wider ${record.status === 'Present' ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#FF6B6B]/20 text-[#FF6B6B]'}`}>
                  {record.status}
                </span>
              </div>

            </div>
          ))}
        </div>
        
        {/* Pagination / View More */}
        <div className="p-4 border-t border-white/10 bg-black/10 flex justify-center">
          <button className="text-sm font-medium text-[#4ECDC4] hover:text-white transition-colors">
            Load More Records
          </button>
        </div>
      </div>

    </div>
  );
};

export default MyAttendance;