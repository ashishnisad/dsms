import React, { useState, useMemo } from 'react';
// import '../styles/attendance.css';

// --- Mock Data ---
const availableClasses = [
  'Ballet Basics (9:00 AM)', 
  'Hip Hop Fusion (11:00 AM)', 
  'Contemporary Flow (2:00 PM)', 
  'Salsa Social (4:00 PM)'
];

const initialStudents = [
  { id: 1, name: 'Ananya Patel', avatar: '👩', status: 'Present' },
  { id: 2, name: 'Rahul Sharma', avatar: '👨', status: 'Absent' },
  { id: 3, name: 'Priya Singh', avatar: '👩', status: 'Present' },
  { id: 4, name: 'Arjun Reddy', avatar: '👨', status: 'Pending' },
  { id: 5, name: 'Meera Gupta', avatar: '👩', status: 'Pending' },
  { id: 6, name: 'Vikram Joshi', avatar: '👨', status: 'Pending' },
  { id: 7, name: 'Sneha Kapoor', avatar: '👩', status: 'Pending' },
];

const AttendancePage = () => {
  // --- States ---
  const [selectedClass, setSelectedClass] = useState(availableClasses[0]);
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]); // Today's date
  const [students, setStudents] = useState(initialStudents);

  // --- Derived Stats (useMemo for performance) ---
  const stats = useMemo(() => {
    const total = students.length;
    const present = students.filter(s => s.status === 'Present').length;
    const absent = students.filter(s => s.status === 'Absent').length;
    const pending = students.filter(s => s.status === 'Pending').length;
    const rate = total > 0 ? Math.round((present / total) * 100) : 0;
    return { total, present, absent, pending, rate };
  }, [students]);

  // --- Handlers ---
  const handleMarkAttendance = (id, newStatus) => {
    setStudents(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const markAll = (status) => {
    setStudents(prev => prev.map(s => ({ ...s, status })));
  };

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* --- Header & Filters --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-1">Class Attendance</h1>
          <p className="text-[#b0bec5] text-sm">Mark daily attendance and track student consistency.</p>
        </div>
        
        {/* Responsive Filters */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          {/* Date Picker */}
          <div className="glass rounded-xl px-4 py-3 flex items-center gap-3 focus-within:ring-2 focus-within:ring-[#4ECDC4] transition-all">
            <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <input 
              type="date" 
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="bg-transparent outline-none text-sm text-white w-full sm:w-auto cursor-pointer"
              style={{ colorScheme: 'dark' }} // Makes calendar icon visible in dark mode
            />
          </div>

          {/* Class Dropdown */}
          <select 
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="glass rounded-xl px-4 py-3 text-sm text-white bg-transparent outline-none cursor-pointer focus:ring-2 focus:ring-[#4ECDC4] transition-all flex-1 sm:flex-none"
          >
            {availableClasses.map(cls => (
              <option key={cls} value={cls} className="bg-[#0A0E27]">{cls}</option>
            ))}
          </select>
        </div>
      </div>

      {/* --- Live Stats Overview --- */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
        <div className="glass rounded-2xl p-4 md:p-5 flex flex-col justify-center border-l-4 border-[#4ECDC4]">
          <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-1">Total Enrolled</p>
          <p className="text-2xl md:text-3xl font-bold text-white">{stats.total}</p>
        </div>
        <div className="glass rounded-2xl p-4 md:p-5 flex flex-col justify-center border-l-4 border-[#2ecc71]">
          <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-1">Present</p>
          <p className="text-2xl md:text-3xl font-bold text-[#2ecc71]">{stats.present}</p>
        </div>
        <div className="glass rounded-2xl p-4 md:p-5 flex flex-col justify-center border-l-4 border-[#FF6B6B]">
          <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-1">Absent</p>
          <p className="text-2xl md:text-3xl font-bold text-[#FF6B6B]">{stats.absent}</p>
        </div>
        <div className="glass rounded-2xl p-4 md:p-5 flex flex-col justify-center relative overflow-hidden">
          <p className="text-gray-400 text-xs md:text-sm font-medium uppercase tracking-wider mb-1 relative z-10">Attendance Rate</p>
          <div className="flex items-end gap-2 relative z-10">
            <p className="text-2xl md:text-3xl font-bold text-white">{stats.rate}%</p>
          </div>
          {/* Progress Background */}
          <div className="absolute bottom-0 left-0 h-1 bg-white/10 w-full">
            <div className="h-full bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] transition-all duration-500" style={{ width: `${stats.rate}%` }}></div>
          </div>
        </div>
      </div>

      {/* --- Attendance List Section --- */}
      <div className="glass rounded-2xl overflow-hidden shadow-xl border border-white/5">
        
        {/* List Header with Bulk Actions */}
        <div className="p-4 md:p-5 border-b border-white/10 bg-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-bold text-white tracking-wide">Student Roster</h3>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => markAll('Present')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#2ecc71]/10 text-[#2ecc71] hover:bg-[#2ecc71]/20 border border-[#2ecc71]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#2ecc71]"
            >
              Mark All Present
            </button>
            <button 
              onClick={() => markAll('Absent')}
              className="px-3 py-1.5 rounded-lg text-xs font-bold uppercase tracking-wider bg-[#FF6B6B]/10 text-[#FF6B6B] hover:bg-[#FF6B6B]/20 border border-[#FF6B6B]/20 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]"
            >
              Mark All Absent
            </button>
          </div>
        </div>
        
        {/* Student Roster List */}
        <div className="divide-y divide-white/5">
          {students.map((student, i) => (
            <div 
              key={student.id} 
              className="interactive-row flex flex-col sm:flex-row sm:items-center justify-between p-4 md:p-5 hover:bg-white/[0.02] transition-all gap-4 sm:gap-0"
              style={{ animationDelay: `${i * 0.05}s` }}
            >
              {/* Student Info */}
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-lg md:text-xl shrink-0 shadow-lg">
                  {student.avatar}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm md:text-base">{student.name}</p>
                  <p className={`text-xs font-medium uppercase tracking-wider mt-0.5 ${student.status === 'Present' ? 'text-[#2ecc71]' : student.status === 'Absent' ? 'text-[#FF6B6B]' : 'text-[#f39c12]'}`}>
                    {student.status}
                  </p>
                </div>
              </div>
              
              {/* Action Toggle Buttons (Mobile-friendly large tap targets) */}
              <div className="flex items-center justify-between sm:justify-end gap-2 w-full sm:w-auto border-t border-white/5 sm:border-none pt-3 sm:pt-0">
                <button 
                  onClick={() => handleMarkAttendance(student.id, 'Present')}
                  className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm font-semibold transition-all focus:outline-none ${student.status === 'Present' ? 'bg-[#2ecc71] text-white shadow-lg shadow-[#2ecc71]/20 scale-105' : 'bg-white/5 text-gray-400 hover:bg-[#2ecc71]/20 hover:text-[#2ecc71]'}`}
                >
                  Present
                </button>
                <button 
                  onClick={() => handleMarkAttendance(student.id, 'Absent')}
                  className={`flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm font-semibold transition-all focus:outline-none ${student.status === 'Absent' ? 'bg-[#FF6B6B] text-white shadow-lg shadow-[#FF6B6B]/20 scale-105' : 'bg-white/5 text-gray-400 hover:bg-[#FF6B6B]/20 hover:text-[#FF6B6B]'}`}
                >
                  Absent
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Save Button */}
      <div className="mt-6 flex justify-end">
        <button className="w-full md:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold shadow-lg shadow-[#FF6B6B]/20 hover:opacity-90 transition-all focus:outline-none focus:ring-2 focus:ring-[#FF6B6B]">
          Save Attendance
        </button>
      </div>

    </div>
  );
};

export default AttendancePage;