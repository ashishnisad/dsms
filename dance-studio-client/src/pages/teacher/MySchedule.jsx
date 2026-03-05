import React, { useState } from 'react';
import '../../styles/dashboard.css';

// --- Dummy Schedule Data ---
const scheduleData = {
  Monday: [
    { id: 101, time: '10:00 AM - 11:30 AM', name: 'Morning Zumba', room: 'Studio A', level: 'All Levels' },
    { id: 102, time: '05:00 PM - 06:30 PM', name: 'Salsa Beginners', room: 'Studio B', level: 'Beginner' }
  ],
  Tuesday: [
    { id: 103, time: '04:00 PM - 05:30 PM', name: 'Hip Hop Fundamentals', room: 'Studio A', level: 'Beginner' },
    { id: 104, time: '06:00 PM - 07:30 PM', name: 'Advanced Choreography', room: 'Studio A', level: 'Advanced' }
  ],
  Wednesday: [
    { id: 105, time: '10:00 AM - 11:30 AM', name: 'Morning Zumba', room: 'Studio A', level: 'All Levels' },
    { id: 106, time: '05:00 PM - 06:30 PM', name: 'Contemporary Flow', room: 'Studio C', level: 'Intermediate' }
  ],
  Thursday: [
    { id: 107, time: '04:00 PM - 05:30 PM', name: 'Hip Hop Fundamentals', room: 'Studio A', level: 'Beginner' },
  ],
  Friday: [
    { id: 108, time: '05:00 PM - 07:00 PM', name: 'Salsa Social Practice', room: 'Main Hall', level: 'All Levels' }
  ],
  Saturday: [
    { id: 109, time: '11:00 AM - 01:00 PM', name: 'Weekend Workshop', room: 'Studio B', level: 'Intermediate' }
  ],
  Sunday: [] // Free day
};

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

const MySchedule = () => {
  const [selectedDay, setSelectedDay] = useState('Monday');
  const todaysClasses = scheduleData[selectedDay] || [];

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">My Weekly Schedule</h1>
        <p className="text-[#b0bec5] text-sm">View your upcoming classes and studio assignments.</p>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
        {daysOfWeek.map(day => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`whitespace-nowrap px-6 py-3 rounded-xl font-bold transition-all duration-300 focus:outline-none ${
              selectedDay === day 
                ? 'bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white shadow-lg shadow-[#FF6B6B]/20 scale-105' 
                : 'glass text-gray-400 hover:text-white hover:bg-white/10 border border-transparent'
            }`}
          >
            {day}
            {scheduleData[day].length > 0 && selectedDay !== day && (
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#4ECDC4] ml-2 mb-0.5"></span>
            )}
          </button>
        ))}
      </div>

      {/* Classes List */}
      <div className="glass rounded-3xl p-6 md:p-8 min-h-[400px]">
        <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-4">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <span className="text-[#4ECDC4]">📅</span> {selectedDay}'s Classes
          </h2>
          <span className="text-sm font-medium px-3 py-1 rounded-lg bg-white/5 text-gray-300">
            {todaysClasses.length} {todaysClasses.length === 1 ? 'Class' : 'Classes'}
          </span>
        </div>

        {todaysClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {todaysClasses.map((cls, index) => (
              <div 
                key={cls.id} 
                className="bg-black/20 border border-white/5 rounded-2xl p-6 hover:border-[#4ECDC4]/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-xl hover:shadow-[#4ECDC4]/10"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="inline-block px-3 py-1 rounded-full bg-white/5 text-[#4ECDC4] text-xs font-bold tracking-wider uppercase border border-white/5 group-hover:bg-[#4ECDC4]/10 transition-colors">
                    {cls.time}
                  </div>
                  <span className="text-2xl opacity-50 group-hover:opacity-100 transition-opacity">💃</span>
                </div>
                
                <h3 className="text-2xl font-bold text-white mb-1 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-[#FF6B6B] group-hover:to-[#4ECDC4] transition-all">
                  {cls.name}
                </h3>
                
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-white/5">
                  <div className="flex items-center gap-1.5 text-sm text-gray-400">
                    <span>📍</span>
                    <span className="font-medium">{cls.room}</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-gray-400">
                    <span>⭐</span>
                    <span className="font-medium">{cls.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-center animate-fade-up">
            <div className="text-6xl mb-4 opacity-50">🌴</div>
            <h3 className="text-xl font-bold text-white mb-2">No classes scheduled</h3>
            <p className="text-gray-400 max-w-sm">You have a free day! Rest, practice, or plan your next choreographies.</p>
          </div>
        )}
      </div>

    </div>
  );
};

export default MySchedule;