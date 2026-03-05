import React, { useState, useMemo } from 'react';
// import '../styles/dashboard.css';

// --- Mock Data for Analytics ---
const revenueData = [
  { month: 'Jul', amount: 210000, label: '₹2.1L' },
  { month: 'Aug', amount: 250000, label: '₹2.5L' },
  { month: 'Sep', amount: 280000, label: '₹2.8L' },
  { month: 'Oct', amount: 240000, label: '₹2.4L' },
  { month: 'Nov', amount: 320000, label: '₹3.2L' },
  { month: 'Dec', amount: 482500, label: '₹4.8L' } // Current Peak
];

const classPopularity = [
  { name: 'Hip Hop Fusion', students: 85, percentage: 92, color: 'from-[#FF6B6B] to-[#ff8e8e]' },
  { name: 'Contemporary Flow', students: 64, percentage: 75, color: 'from-[#4ECDC4] to-[#6ee7df]' },
  { name: 'Ballet Basics', students: 52, percentage: 60, color: 'from-[#FFE66D] to-[#fff09e]' },
  { name: 'Salsa Social', students: 48, percentage: 55, color: 'from-[#a855f7] to-[#c084fc]' }
];

// Report categories based on the provided structure
const reportCategories = {
  'Revenue Reports': [
    'Monthly Revenue',
    'Batch-wise Revenue',
    'Payment Method Breakdown',
    'Overdue Report',
    'Refund Summary'
  ],
  'Student Reports': [
    'Enrollment Growth',
    'Attendance %',
    'Dropout Risk',
    'Batch Strength',
    'Medical Alert List'
  ],
  'Teacher Reports': [
    'Salary Summary',
    'Per Class Earnings',
    'Leave Summary',
    'Attendance %',
    'Performance Rating'
  ],
  'Class & Batch Reports': [
    'Class Utilization',
    'Capacity %',
    'Popular Classes',
    'Time-slot Analysis'
  ],
  'Operational Reports': [
    'Daily Activity Log',
    'Notification Log',
    'Audit Trail',
    'Automation Logs'
  ],
  'Custom Report Builder': [
    'Select Module',
    'Select Fields',
    'Apply Filters',
    'Group By',
    'Export / Save Template'
  ]
};

const ReportsPage = () => {
  const [timeframe, setTimeframe] = useState('6 Months');

  // Find max value to scale the bar chart dynamically
  const maxRevenue = useMemo(() => Math.max(...revenueData.map(d => d.amount)), []);

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* --- Header & Filters --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Analytics & Reports</h1>
          <p className="text-[#b0bec5] text-sm">Actionable insights to grow your dance studio.</p>
        </div>
        
        {/* Timeframe Selector */}
        <div className="glass rounded-xl p-1 flex items-center w-full md:w-auto">
          {['1 Month', '6 Months', '1 Year'].map(period => (
            <button 
              key={period}
              onClick={() => setTimeframe(period)}
              className={`flex-1 md:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all ${timeframe === period ? 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'}`}
            >
              {period}
            </button>
          ))}
        </div>
      </div>

      {/* --- KPI Stats Grid --- */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="card glass rounded-2xl p-4 md:p-6" style={{ animationDelay: '0.1s' }}>
          <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-2">Total Revenue</p>
          <p className="text-2xl md:text-3xl font-bold text-white mb-2">₹17.8L</p>
          <div className="flex items-center gap-2">
            <span className="text-[#2ecc71] text-xs font-bold bg-[#2ecc71]/10 px-2 py-0.5 rounded-full">↑ 24%</span>
            <span className="text-[#b0bec5] text-[10px] md:text-xs">vs last period</span>
          </div>
        </div>
        
        <div className="card glass rounded-2xl p-4 md:p-6" style={{ animationDelay: '0.2s' }}>
          <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-2">Avg. Attendance</p>
          <p className="text-2xl md:text-3xl font-bold text-white mb-2">86%</p>
          <div className="flex items-center gap-2">
            <span className="text-[#2ecc71] text-xs font-bold bg-[#2ecc71]/10 px-2 py-0.5 rounded-full">↑ 5%</span>
            <span className="text-[#b0bec5] text-[10px] md:text-xs">vs last period</span>
          </div>
        </div>

        <div className="card glass rounded-2xl p-4 md:p-6" style={{ animationDelay: '0.3s' }}>
          <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-2">New Enrollments</p>
          <p className="text-2xl md:text-3xl font-bold text-white mb-2">42</p>
          <div className="flex items-center gap-2">
            <span className="text-[#FF6B6B] text-xs font-bold bg-[#FF6B6B]/10 px-2 py-0.5 rounded-full">↓ 2</span>
            <span className="text-[#b0bec5] text-[10px] md:text-xs">vs last period</span>
          </div>
        </div>

        <div className="card glass rounded-2xl p-4 md:p-6" style={{ animationDelay: '0.4s' }}>
          <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-2">Retention Rate</p>
          <p className="text-2xl md:text-3xl font-bold text-white mb-2">92%</p>
          <div className="flex items-center gap-2">
            <span className="text-[#2ecc71] text-xs font-bold bg-[#2ecc71]/10 px-2 py-0.5 rounded-full">↑ 1.5%</span>
            <span className="text-[#b0bec5] text-[10px] md:text-xs">steady growth</span>
          </div>
        </div>
      </div>

      {/* --- Main Charts Section --- */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        
        {/* Revenue Bar Chart (Custom UI) */}
        <div className="lg:col-span-2 glass rounded-2xl p-5 md:p-6 shadow-xl border border-white/5 flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-white tracking-wide">Revenue Growth</h3>
            <button className="text-sm text-[#4ECDC4] hover:text-white transition-colors">Download CSV</button>
          </div>
          
          <div className="flex-1 flex items-end gap-2 sm:gap-4 md:gap-6 mt-auto h-48 md:h-64 pb-2 border-b border-white/10" aria-label="Bar chart showing monthly revenue">
            {revenueData.map((data, index) => {
              const heightPercent = (data.amount / maxRevenue) * 100;
              return (
                <div key={index} className="flex-1 flex flex-col justify-end items-center group">
                  {/* Tooltip (Visible on Hover) */}
                  <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xs font-bold text-white bg-black/50 px-2 py-1 rounded mb-2 transform translate-y-2 group-hover:translate-y-0 duration-300">
                    {data.label}
                  </span>
                  {/* Bar */}
                  <div 
                    className="w-full max-w-[40px] rounded-t-lg bg-gradient-to-t from-[#FF6B6B]/40 to-[#FF6B6B] group-hover:from-[#4ECDC4]/40 group-hover:to-[#4ECDC4] transition-all duration-500 cursor-pointer shadow-[0_0_15px_rgba(255,107,107,0.2)] group-hover:shadow-[0_0_15px_rgba(78,205,196,0.4)]"
                    style={{ height: `${heightPercent}%` }}
                    role="progressbar" 
                    aria-valuenow={data.amount} 
                    aria-valuemin="0" 
                    aria-valuemax={maxRevenue}
                  ></div>
                  {/* X-Axis Label */}
                  <span className="text-gray-400 text-xs md:text-sm font-medium mt-3">{data.month}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Key Insights / Summary --- */}
        <div className="glass rounded-2xl p-5 md:p-6 shadow-xl border border-white/5 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-white tracking-wide mb-6">AI Insights ✨</h3>
            <div className="space-y-4">
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Top Performing Class</p>
                <p className="font-semibold text-white">Hip Hop Fusion is driving 35% of this month's revenue.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Attendance Alert</p>
                <p className="font-semibold text-white">Ballet Basics attendance dropped by 12% this week.</p>
              </div>
              <div className="bg-white/5 p-4 rounded-xl border border-white/5 hover:bg-white/10 transition-colors">
                <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Growth Opportunity</p>
                <p className="font-semibold text-white">Consider adding a new weekend batch. Peak hours are fully booked.</p>
              </div>
            </div>
          </div>
          <button className="w-full mt-6 py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-medium transition-all text-sm">
            View Detailed Analysis
          </button>
        </div>
      </div>

      {/* --- Class Popularity (Horizontal Progress Bars) --- */}
      <div className="glass rounded-2xl p-5 md:p-6 shadow-xl border border-white/5">
        <h3 className="font-bold text-white tracking-wide mb-6">Class Popularity & Occupancy</h3>
        
        <div className="space-y-6">
          {classPopularity.map((cls, index) => (
            <div key={index} className="interactive-row p-3 rounded-xl -mx-3">
              <div className="flex justify-between items-end mb-2">
                <div>
                  <p className="font-semibold text-white text-sm md:text-base">{cls.name}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{cls.students} active students</p>
                </div>
                <span className="font-bold text-white">{cls.percentage}% <span className="text-xs text-gray-400 font-normal">capacity</span></span>
              </div>
              
              {/* Progress Bar Container */}
              <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden flex items-center shadow-inner">
                {/* Animated Fill */}
                <div 
                  className={`h-full bg-gradient-to-r ${cls.color} rounded-full animate-slide-left relative`} 
                  style={{ width: `${cls.percentage}%`, animationDelay: `${index * 0.1}s` }}
                  role="progressbar" 
                  aria-valuenow={cls.percentage} 
                  aria-valuemin="0" 
                  aria-valuemax="100"
                >
                  {/* Shimmer effect on the bar */}
                  <div className="absolute top-0 left-0 w-full h-full shimmer opacity-30"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- Detailed Reports Section --- */}
      <div className="glass rounded-2xl p-5 md:p-6 shadow-xl border border-white/5 mt-6">
        <h3 className="font-bold text-white tracking-wide mb-6">Detailed Reports</h3>
        <div className="space-y-6">
          {Object.entries(reportCategories).map(([category, reports]) => (
            <div key={category}>
              <h4 className="text-gray-300 font-semibold mb-2">{category}</h4>
              <ul className="space-y-2">
                {reports.map(report => (
                  <li key={report}>
                    <button className="text-left text-white hover:text-[#4ECDC4] transition-colors text-sm md:text-base">
                      {report}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default ReportsPage;