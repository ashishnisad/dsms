import React, { useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
// import '../../styles/dashboard.css';

// --- Dummy Data ---
const todayClasses = [
  { id: 1, time: '10:00 AM - 11:30 AM', name: 'Morning Zumba', room: 'Studio A', students: 15, status: 'Completed' },
  { id: 2, time: '04:00 PM - 05:30 PM', name: 'Hip Hop Beginners', room: 'Studio B', students: 22, status: 'Upcoming' },
  { id: 3, time: '06:00 PM - 07:30 PM', name: 'Advanced Choreography', room: 'Studio A', students: 18, status: 'Upcoming' }
];

const TeacherDashboard = () => {
  const { user } = useContext(AuthContext);

  // Stats calculation
  const totalClassesToday = todayClasses.length;
  const upcomingClasses = todayClasses.filter(c => c.status === 'Upcoming').length;

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* --- Welcome Header --- */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4]">{user?.name || 'Instructor'}</span>! 👋
          </h1>
          <p className="text-[#b0bec5] text-sm">Here is your schedule and overview for today.</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-400 font-medium">{new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</p>
        </div>
      </div>

      {/* --- Quick Stats Grid --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        
        {/* Stat Card 1 */}
        <div className="glass rounded-2xl p-6 border-l-4 border-[#4ECDC4] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-6 -top-6 text-[#4ECDC4]/10 text-7xl group-hover:scale-110 transition-transform">📅</div>
          <p className="text-[#b0bec5] text-xs font-bold uppercase tracking-wider mb-2">Total Classes Today</p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold text-white">{totalClassesToday}</h2>
            <span className="text-[#4ECDC4] font-medium text-sm mb-1">Sessions</span>
          </div>
        </div>

        {/* Stat Card 2 */}
        <div className="glass rounded-2xl p-6 border-l-4 border-[#FF6B6B] relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300">
          <div className="absolute -right-6 -top-6 text-[#FF6B6B]/10 text-7xl group-hover:scale-110 transition-transform">⏳</div>
          <p className="text-[#b0bec5] text-xs font-bold uppercase tracking-wider mb-2">Upcoming Classes</p>
          <div className="flex items-end gap-3">
            <h2 className="text-4xl font-bold text-white">{upcomingClasses}</h2>
            <span className="text-[#FF6B6B] font-medium text-sm mb-1">Remaining</span>
          </div>
        </div>

        {/* Action Card */}
        <div className="bg-gradient-to-br from-[#FF6B6B]/20 to-[#4ECDC4]/20 border border-white/10 rounded-2xl p-6 flex flex-col justify-center items-center text-center shadow-lg hover:shadow-[#4ECDC4]/20 transition-all">
          <p className="text-white font-semibold mb-3">Ready to start your next class?</p>
          <Link 
            to="/attendance" 
            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold shadow-lg hover:opacity-90 transition-opacity flex justify-center items-center gap-2"
          >
            <span>Mark Attendance</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
          </Link>
        </div>

      </div>

      {/* --- Today's Schedule Timeline --- */}
      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <span>🕒</span> Today's Schedule
      </h2>

      <div className="glass rounded-2xl p-6 md:p-8">
        <div className="relative border-l border-white/10 ml-3 md:ml-4 space-y-8">
          
          {todayClasses.map((cls, index) => (
            <div key={cls.id} className="relative pl-6 md:pl-8 group">
              
              {/* Timeline Dot */}
              <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${cls.status === 'Completed' ? 'bg-[#2ecc71] shadow-[0_0_8px_#2ecc71]' : 'bg-[#f39c12] shadow-[0_0_8px_#f39c12]'}`}></div>
              
              {/* Content Card */}
              <div className="bg-black/20 border border-white/5 rounded-2xl p-5 hover:border-white/10 transition-colors">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block ${cls.status === 'Completed' ? 'bg-[#2ecc71]/20 text-[#2ecc71]' : 'bg-[#f39c12]/20 text-[#f39c12]'}`}>
                      {cls.status}
                    </span>
                    <h3 className="text-lg font-bold text-white">{cls.name}</h3>
                    <p className="text-[#4ECDC4] font-medium text-sm mt-0.5">{cls.time}</p>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="text-left md:text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Room</p>
                      <p className="text-white text-sm font-medium">{cls.room}</p>
                    </div>
                    <div className="text-left md:text-right">
                      <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Students</p>
                      <p className="text-white text-sm font-medium">{cls.students}</p>
                    </div>
                    
                    {/* Only show action button if class is upcoming */}
                    {cls.status === 'Upcoming' && (
                      <Link 
                        to="/attendance"
                        className="hidden md:flex p-2 rounded-xl bg-white/5 hover:bg-[#4ECDC4]/20 text-[#4ECDC4] transition-colors"
                        title="Mark Attendance"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      </Link>
                    )}
                  </div>

                </div>
              </div>
            </div>
          ))}

        </div>
      </div>

    </div>
  );
};

export default TeacherDashboard;