import React, { useState, useMemo, useContext, useEffect } from 'react';
import { AuthContext } from '../../context/AuthContext';

// --- Mock Data ---
const initialClassesData = [
  { id: 1, name: 'Ballet Basics', time: '9:00 AM - 10:30 AM', instructor: 'Sarah Johnson', students: 12, level: 'Beginner', attendance: 10, studentsList: ['Student1', 'Student2', /* ... */] },
  { id: 2, name: 'Hip Hop Fusion', time: '11:00 AM - 12:30 PM', instructor: 'Mike Chen', students: 18, level: 'Intermediate', attendance: 15, studentsList: ['Student3', 'Student4', /* ... */] },
  { id: 3, name: 'Contemporary Flow', time: '2:00 PM - 3:30 PM', instructor: 'Emma Wilson', students: 15, level: 'Advanced', attendance: 13, studentsList: ['Student5', 'Student6', /* ... */] },
  { id: 4, name: 'Salsa Social', time: '4:00 PM - 5:30 PM', instructor: 'Carlos Rivera', students: 20, level: 'All Levels', attendance: 18, studentsList: ['Student7', 'Student8', /* ... */] },
];

const attendanceData = {
  totalExpected: initialClassesData.reduce((sum, cls) => sum + cls.students, 0),
  checkedIn: initialClassesData.reduce((sum, cls) => sum + cls.attendance, 0),
  absent: 0, // Calculated below
};

attendanceData.absent = attendanceData.totalExpected - attendanceData.checkedIn;

const revenueData = {
  today: 15000,
  week: 85000,
  month: 240000,
};

const quickActions = [
  { name: 'Add Class', icon: '➕', action: () => {} }, // Will be handled in component
  { name: 'Register Student', icon: '👤', action: () => {} },
  { name: 'Generate Invoice', icon: '💳', action: () => {} },
  { name: 'View Reports', icon: '📊', action: () => {} },
];

const initialNotifications = [
  { id: 1, message: 'New student registered: Alice Smith', time: '2 hours ago', type: 'info', read: false },
  { id: 2, message: 'Class cancellation request', time: '1 hour ago', type: 'warning', read: false },
  { id: 3, message: 'Payment received: ₹5000', time: '30 min ago', type: 'success', read: false },
  { id: 4, message: 'Low attendance in Ballet Basics', time: '15 min ago', type: 'alert', read: false },
];

const reportsShortcuts = [
  { name: 'Monthly Revenue Report', action: () => {} },
  { name: 'Attendance Report', action: () => {} },
  { name: 'Membership Analytics', action: () => {} },
  { name: 'Instructor Performance', action: () => {} },
];

const activityFeed = [
  { id: 1, event: 'New registration: Alice Smith', time: '2 hours ago' },
  { id: 2, event: 'Payment processed for Rahul Sharma', time: '1 hour ago' },
  { id: 3, event: 'Class started: Hip Hop Fusion', time: '45 min ago' },
];

const insights = {
  topClass: 'Salsa Social',
  attendanceRate: ((attendanceData.checkedIn / attendanceData.totalExpected) * 100).toFixed(1),
  revenueGrowth: 8,
};

const DashboardPage = () => {
  const { user } = useContext(AuthContext);

  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);
  const [modal, setModal] = useState({ isOpen: false, data: null });
  const [classModal, setClassModal] = useState({ isOpen: false, data: null });
  const [actionModal, setActionModal] = useState({ isOpen: false, type: '' });
  const [reportModal, setReportModal] = useState({ isOpen: false, type: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [classesData, setClassesData] = useState(initialClassesData);
  const [notifications, setNotifications] = useState(initialNotifications);
  const [loading, setLoading] = useState(true);
  const currentDate = new Date('2026-02-26');

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  // --- Summary Engine (KPI Aggregator) ---
  const kpis = useMemo(() => ({
    activeMembers: 248,
    classesToday: classesData.length,
    monthlyRevenue: revenueData.month,
    avgRating: 4.9,
  }), [classesData]);

  // --- Revenue Engine ---
  const revenueInsights = useMemo(() => ({
    today: revenueData.today,
    week: revenueData.week,
    month: revenueData.month,
    growth: insights.revenueGrowth,
  }), []);

  // --- Attendance Engine ---
  const attendanceInsights = useMemo(() => ({
    checkedIn: classesData.reduce((sum, cls) => sum + cls.attendance, 0),
    absent: classesData.reduce((sum, cls) => sum + (cls.students - cls.attendance), 0),
    expected: classesData.reduce((sum, cls) => sum + cls.students, 0),
    rate: ((classesData.reduce((sum, cls) => sum + cls.attendance, 0) / classesData.reduce((sum, cls) => sum + cls.students, 0)) * 100).toFixed(1),
  }), [classesData]);

  // --- Today Operations Engine (Calendar Logic) ---
  const calendarDays = useMemo(() => {
    const today = currentDate;
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay() + 1 + (currentWeekOffset * 7));
    
    const endOfWeek = new Date(startOfWeek);
    endOfWeek.setDate(startOfWeek.getDate() + 6);
    
    const weekLabel = `${startOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${endOfWeek.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;

    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const isToday = date.toDateString() === today.toDateString();
      let hasClass = false;
      let classCount = 0;
      if (i < 5) { // Mon-Fri
        hasClass = true;
        classCount = classesData.length;
      } else if (i === 5) { // Sat
        hasClass = true;
        classCount = 2;
      } // Sun: false

      days.push({ date, isToday, hasClass, classCount, dayNum: date.getDate() });
    }
    return { days, weekLabel };
  }, [currentWeekOffset, currentDate, classesData]);

  // Filtered classes based on search
  const filteredClasses = classesData.filter(cls => cls.name.toLowerCase().includes(searchQuery.toLowerCase()));

  // --- Alerts Engine ---
  const alerts = useMemo(() => notifications.filter(n => (n.type === 'alert' || n.type === 'warning') && !n.read), [notifications]);

  // --- Activity Feed Engine ---
  const activityFeedData = activityFeed;

  // --- Insights Engine ---
  const keyInsights = useMemo(() => ({
    topClass: insights.topClass,
    attendanceRate: attendanceInsights.rate,
    revenueGrowth: insights.revenueGrowth,
  }), [attendanceInsights]);

  const closeModal = () => setModal({ isOpen: false, data: null });
  const closeClassModal = () => setClassModal({ isOpen: false, data: null });
  const closeActionModal = () => setActionModal({ isOpen: false, type: '' });
  const closeReportModal = () => setReportModal({ isOpen: false, type: '' });

  const handleAddClass = (newClass) => {
    setClassesData([...classesData, { ...newClass, id: classesData.length + 1, attendance: 0, studentsList: [] }]);
    closeActionModal();
  };

  const handleMarkRead = (id) => {
    setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const handleMarkAttendance = (classId, newAttendance) => {
    setClassesData(classesData.map(cls => cls.id === classId ? { ...cls, attendance: newAttendance } : cls));
  };

  if (loading) {
    return <div className="w-full h-full flex items-center justify-center text-white">Loading Dashboard...</div>;
  }

  return (
    <div className="w-full pb-10">
      
      {/* Header */}
      <header className="mb-6 md:mb-8 mt-2">
        <h1 className="text-2xl md:text-3xl font-bold mb-1 md:mb-2 text-white">
          Welcome back, {user?.name || 'Admin'}! ✨
        </h1>
        <p className="text-[#b0bec5] text-sm md:text-base">Here's your studio dashboard overview</p>
      </header>

      {/* Summary Engine (KPI Aggregator) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6 md:mb-8">
        <div className="card glass rounded-2xl p-4 md:p-6 cursor-pointer" style={{ animationDelay: '0.1s' }} onClick={() => alert('Active Members details')}>
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <span className="text-xl md:text-2xl">👥</span> 
            <span className="text-[#2ecc71] text-xs md:text-sm font-medium">+12%</span>
          </div>
          <p className="text-xl md:text-3xl font-bold text-white">{kpis.activeMembers}</p>
          <p className="text-[#b0bec5] text-xs md:text-sm">Active Members</p>
        </div>
        <div className="card glass rounded-2xl p-4 md:p-6 cursor-pointer" style={{ animationDelay: '0.2s' }} onClick={() => alert('Classes Today details')}>
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <span className="text-xl md:text-2xl">📅</span> 
            <span className="text-[#FF6B6B] text-xs md:text-sm font-medium">Today</span>
          </div>
          <p className="text-xl md:text-3xl font-bold text-white">{kpis.classesToday}</p>
          <p className="text-[#b0bec5] text-xs md:text-sm">Classes Today</p>
        </div>
        <div className="card glass rounded-2xl p-4 md:p-6 cursor-pointer" style={{ animationDelay: '0.3s' }} onClick={() => alert('Monthly Revenue details')}>
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <span className="text-xl md:text-2xl">💰</span> 
            <span className="text-[#2ecc71] text-xs md:text-sm font-medium">+{keyInsights.revenueGrowth}%</span>
          </div>
          <p className="text-xl md:text-3xl font-bold text-white">₹{(kpis.monthlyRevenue / 100000).toFixed(1)}L</p>
          <p className="text-[#b0bec5] text-xs md:text-sm">This Month</p>
        </div>
        <div className="card glass rounded-2xl p-4 md:p-6 cursor-pointer" style={{ animationDelay: '0.4s' }} onClick={() => alert('Avg Rating details')}>
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <span className="text-xl md:text-2xl">⭐</span> 
            <span className="text-[#FFE66D] text-xs md:text-sm font-medium pulse">New!</span>
          </div>
          <p className="text-xl md:text-3xl font-bold text-white">{kpis.avgRating}</p>
          <p className="text-[#b0bec5] text-xs md:text-sm">Avg Rating</p>
        </div>
      </div>

      {/* Today Operations Engine */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 md:mb-6 gap-3">
          <h2 className="text-lg md:text-xl font-bold text-white">Today’s Operations</h2>
          <div className="flex items-center justify-between sm:justify-end gap-2 bg-white/5 p-1 rounded-xl">
            <button onClick={() => setCurrentWeekOffset(prev => prev - 1)} className="p-2 rounded-lg hover:bg-white/10 transition-all text-white">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <span className="font-medium px-2 text-sm md:text-base text-white whitespace-nowrap">{calendarDays.weekLabel}</span>
            <button onClick={() => setCurrentWeekOffset(prev => prev + 1)} className="p-2 rounded-lg hover:bg-white/10 transition-all text-white">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        <div className="glass rounded-2xl p-3 md:p-6 mb-6">
          <div className="grid grid-cols-7 gap-1 md:gap-2 text-center mb-2 md:mb-4">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <span key={day} className="text-gray-400 text-[10px] md:text-sm font-medium">{day}</span>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {calendarDays.days.map((dayObj, i) => (
              <button 
                key={i} 
                onClick={() => setModal({ isOpen: true, data: dayObj })}
                className={`calendar-day aspect-square rounded-lg md:rounded-xl flex flex-col items-center justify-center cursor-pointer p-1 transition-all ${dayObj.hasClass ? 'has-class' : 'glass'} ${dayObj.isToday ? 'ring-2 ring-pink-500' : ''}`}
              >
                <span className="text-sm md:text-lg font-bold text-white">{dayObj.dayNum}</span>
                {dayObj.hasClass && <span className="text-[9px] md:text-xs text-pink-400 mt-0.5 hidden sm:block">{dayObj.classCount} classes</span>}
                {dayObj.hasClass && <span className="w-1.5 h-1.5 rounded-full bg-pink-400 mt-1 sm:hidden"></span>}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-4">
          <input 
            type="text" 
            placeholder="Search classes..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full p-2 rounded bg-white/5 text-white placeholder-gray-400"
          />
        </div>

        <div className="glass rounded-2xl p-4 md:p-6">
          <h3 className="font-bold mb-4 text-white">Today's Classes</h3>
          <div className="space-y-3">
            {filteredClasses.map((cls, i) => (
              <div key={cls.id} className="list-item interactive-row glass rounded-xl p-3 md:p-4 cursor-pointer" style={{ animationDelay: `${i * 0.05}s` }} onClick={() => setClassModal({ isOpen: true, data: cls })}>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-3 md:gap-4">
                    <div className="min-w-[40px] h-10 md:min-w-[48px] md:h-12 rounded-xl bg-gradient-to-br from-pink-500/30 to-purple-600/30 flex items-center justify-center text-lg md:text-xl shrink-0">
                      💃
                    </div>
                    <div>
                      <p className="font-medium text-white text-sm md:text-base">{cls.name}</p>
                      <p className="text-xs md:text-sm text-gray-400">{cls.time} • {cls.instructor}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between sm:justify-end sm:text-right w-full sm:w-auto border-t border-white/5 sm:border-none pt-2 sm:pt-0">
                    <p className="font-medium text-xs md:text-sm text-gray-300 sm:mr-3">{cls.attendance}/{cls.students} attended</p>
                    <span className={`text-[10px] md:text-xs px-2.5 py-1 rounded-full whitespace-nowrap ${cls.level === 'Beginner' ? 'bg-green-500/20 text-green-400' : cls.level === 'Intermediate' ? 'bg-blue-500/20 text-blue-400' : cls.level === 'Advanced' ? 'bg-red-500/20 text-red-400' : 'bg-purple-500/20 text-purple-400'}`}>
                      {cls.level}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Engine */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4">Attendance Engine</h2>
        <div className="glass rounded-2xl p-4 md:p-6">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-white">{attendanceInsights.checkedIn}</p>
              <p className="text-sm text-[#b0bec5]">Checked In</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{attendanceInsights.absent}</p>
              <p className="text-sm text-[#b0bec5]">Absent</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{attendanceInsights.expected}</p>
              <p className="text-sm text-[#b0bec5]">Expected</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">Attendance Rate: <span className="font-bold text-white">{attendanceInsights.rate}%</span></p>
            <button onClick={() => alert('Refreshing attendance data...')} className="mt-2 text-sm text-blue-400 hover:underline">Refresh</button>
          </div>
        </div>
      </div>

      {/* Revenue Engine */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4">Revenue Engine</h2>
        <div className="glass rounded-2xl p-4 md:p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#b0bec5]">Today</p>
              <p className="font-medium text-white">₹{revenueInsights.today.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#b0bec5]">This Week</p>
              <p className="font-medium text-white">₹{revenueInsights.week.toLocaleString()}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#b0bec5]">This Month</p>
              <p className="font-medium text-white">₹{revenueInsights.month.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400">Growth: <span className="font-bold text-[#2ecc71]">+{revenueInsights.growth}%</span></p>
            <button onClick={() => alert('Viewing revenue chart...')} className="mt-2 text-sm text-blue-400 hover:underline">View Chart</button>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {quickActions.map((action, i) => (
            <button key={i} onClick={() => setActionModal({ isOpen: true, type: action.name })} className="card glass rounded-2xl p-4 md:p-6 flex flex-col items-center justify-center hover:bg-white/10 transition-all duration-200">
              <span className="text-2xl mb-2">{action.icon}</span>
              <p className="text-sm font-medium text-white text-center">{action.name}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Engine */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4">Alerts Engine</h2>
        <div className="glass rounded-2xl p-4 md:p-6 space-y-3">
          {alerts.map((alert) => (
            <div key={alert.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
              <span className={`text-xl flex-shrink-0 mt-0.5 ${alert.type === 'success' ? 'text-green-400' : alert.type === 'warning' ? 'text-yellow-400' : 'text-red-400'}`}>•</span>
              <div className="flex-grow">
                <p className="text-sm text-white">{alert.message}</p>
                <p className="text-xs text-[#b0bec5] mt-0.5">{alert.time}</p>
              </div>
              <button onClick={() => handleMarkRead(alert.id)} className="text-sm text-gray-400 hover:text-white">Mark Read</button>
            </div>
          ))}
          {alerts.length === 0 && <p className="text-center text-[#b0bec5] py-4">No alerts</p>}
        </div>
      </div>

      {/* Activity Feed Engine */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4">Activity Feed Engine</h2>
        <div className="glass rounded-2xl p-4 md:p-6 space-y-3">
          {activityFeedData.map((activity) => (
            <div key={activity.id} className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all" onClick={() => alert(`Activity details: ${activity.event}`)}>
              <span className="text-xl flex-shrink-0 mt-0.5 text-blue-400">•</span>
              <div className="flex-grow">
                <p className="text-sm text-white">{activity.event}</p>
                <p className="text-xs text-[#b0bec5] mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
          {activityFeedData.length === 0 && <p className="text-center text-[#b0bec5] py-4">No recent activity</p>}
        </div>
      </div>

      {/* Insights Engine */}
      <div className="mb-8">
        <h2 className="text-lg md:text-xl font-bold text-white mb-4">Insights Engine</h2>
        <div className="glass rounded-2xl p-4 md:p-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#b0bec5]">Top Class</p>
              <p className="font-medium text-white cursor-pointer hover:underline" onClick={() => alert('Top Class details')}>{keyInsights.topClass}</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#b0bec5]">Attendance Rate</p>
              <p className="font-medium text-white">{keyInsights.attendanceRate}%</p>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-sm text-[#b0bec5]">Revenue Growth</p>
              <p className="font-medium text-[#2ecc71]">+{keyInsights.revenueGrowth}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Reports Shortcut */}
      <div>
        <h2 className="text-lg md:text-xl font-bold text-white mb-4">Reports Shortcut</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          {reportsShortcuts.map((report, i) => (
            <button key={i} onClick={() => setReportModal({ isOpen: true, type: report.name })} className="card glass rounded-2xl p-4 md:p-6 flex items-center justify-center hover:bg-white/10 transition-all duration-200 text-center">
              <span className="text-sm font-medium text-white">{report.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Modal */}
      {modal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
          <div className="relative w-full max-w-sm glass rounded-2xl p-6 z-10 animate-scale-in shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold text-white">
                {modal.data.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
              </h3>
              <button onClick={closeModal} className="text-[#b0bec5] hover:text-white transition-colors text-xl">✕</button>
            </div>
            
            {modal.data.hasClass ? (
              <div className="space-y-3">
                {classesData.slice(0, modal.data.classCount).map(cls => (
                  <div key={cls.id} className="glass rounded-xl p-3 border border-white/5 cursor-pointer" onClick={() => { closeModal(); setClassModal({ isOpen: true, data: cls }); }}>
                    <p className="font-medium text-white text-sm">{cls.name}</p>
                    <div className="flex justify-between items-center mt-1">
                      <span className="text-xs text-[#b0bec5]">{cls.time}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-pink-500/20 text-pink-400">{cls.students} spots</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-6">
                <p className="text-3xl mb-2">📅</p>
                <p className="text-sm text-[#b0bec5]">No classes scheduled</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Class Details Modal */}
      {classModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
          <div className="relative w-full max-w-md glass rounded-2xl p-6 z-10 animate-scale-in shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold text-white">{classModal.data.name}</h3>
              <button onClick={closeClassModal} className="text-[#b0bec5] hover:text-white transition-colors text-xl">✕</button>
            </div>
            <p className="text-sm text-gray-400 mb-4">{classModal.data.time} • {classModal.data.instructor} • {classModal.data.level}</p>
            <p className="font-medium mb-2">Attendance: {classModal.data.attendance}/{classModal.data.students}</p>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {classModal.data.studentsList.map((student, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <input type="checkbox" checked={idx < classModal.data.attendance} onChange={(e) => {
                    const newAtt = e.target.checked ? classModal.data.attendance + 1 : classModal.data.attendance - 1;
                    handleMarkAttendance(classModal.data.id, newAtt);
                  }} />
                  <p className="text-sm text-white">{student}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Action Modal (Example for Add Class) */}
      {actionModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
          <div className="relative w-full max-w-sm glass rounded-2xl p-6 z-10 animate-scale-in shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold text-white">{actionModal.type}</h3>
              <button onClick={closeActionModal} className="text-[#b0bec5] hover:text-white transition-colors text-xl">✕</button>
            </div>
            {actionModal.type === 'Add Class' && (
              <form onSubmit={(e) => { e.preventDefault(); handleAddClass({ name: e.target.name.value, time: e.target.time.value, instructor: e.target.instructor.value, students: parseInt(e.target.students.value), level: e.target.level.value }); }}>
                <input name="name" placeholder="Class Name" className="w-full p-2 mb-2 rounded bg-white/5 text-white" required />
                <input name="time" placeholder="Time" className="w-full p-2 mb-2 rounded bg-white/5 text-white" required />
                <input name="instructor" placeholder="Instructor" className="w-full p-2 mb-2 rounded bg-white/5 text-white" required />
                <input name="students" type="number" placeholder="Students" className="w-full p-2 mb-2 rounded bg-white/5 text-white" required />
                <select name="level" className="w-full p-2 mb-4 rounded bg-white/5 text-white">
                  <option>Beginner</option>
                  <option>Intermediate</option>
                  <option>Advanced</option>
                  <option>All Levels</option>
                </select>
                <button type="submit" className="w-full py-2 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold">Add</button>
              </form>
            )}
            {/* Add similar forms for other actions */}
          </div>
        </div>
      )}

      {/* Report Modal (Mock) */}
      {reportModal.isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/60">
          <div className="relative w-full max-w-sm glass rounded-2xl p-6 z-10 animate-scale-in shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg md:text-xl font-bold text-white">{reportModal.type}</h3>
              <button onClick={closeReportModal} className="text-[#b0bec5] hover:text-white transition-colors text-xl">✕</button>
            </div>
            <p className="text-sm text-gray-400">Mock report data for {reportModal.type}.</p>
            {/* Add mock table or chart */}
          </div>
        </div>
      )}

    </div>
  );
};

export default DashboardPage;