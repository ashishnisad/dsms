import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import '../../styles/dashboard.css';

const TeacherProfile = () => {
  const { user } = useContext(AuthContext);
  
  // Dummy profile data (Baad mein backend se aayega)
  const [profile] = useState({
    name: user?.name || 'Rahul Sharma',
    role: 'Senior Choreographer',
    email: user?.email || 'rahul.dance@rhythm.com',
    phone: '+91 98765 43210',
    joiningDate: 'August 15, 2024',
    bio: 'Passionate dance instructor with over 5 years of experience in Hip-Hop and Contemporary styles. Dedicated to helping students discover their rhythm and build confidence through movement.',
    expertise: ['Hip-Hop', 'Contemporary', 'Zumba', 'Salsa'],
    stats: {
      totalStudents: 145,
      classesTaught: 320,
      rating: 4.9
    }
  });

  return (
    <div className="w-full pb-10 animate-fade-up font-outfit">
      
      {/* --- Cover Banner --- */}
      <div className="w-full h-48 md:h-64 rounded-3xl bg-gradient-to-r from-[#FF6B6B] via-[#8b5cf6] to-[#4ECDC4] relative overflow-hidden shadow-lg">
        {/* Overlay Pattern */}
        <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        {/* Edit Cover Button */}
        <button className="absolute top-4 right-4 bg-black/30 hover:bg-black/50 text-white backdrop-blur-md px-4 py-2 rounded-xl text-sm font-medium transition-colors border border-white/10 flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
          <span className="hidden md:inline">Edit Cover</span>
        </button>
      </div>

      {/* --- Main Profile Section (Overlapping Banner) --- */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 md:-mt-24 relative z-10">
        
        {/* Profile Header Card */}
        <div className="glass rounded-3xl p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center md:items-start shadow-2xl border border-white/10">
          
          {/* Avatar */}
          <div className="relative group shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full p-1.5 bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] shadow-[0_0_20px_rgba(78,205,196,0.4)]">
              <div className="w-full h-full rounded-full bg-[#0A0E27] flex items-center justify-center text-5xl border-4 border-[#0A0E27] overflow-hidden relative">
                👨‍🏫
                {/* Hover Edit Overlay */}
                <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* Name & Title */}
          <div className="flex-1 text-center md:text-left mt-2 md:mt-4 w-full">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-white mb-1">{profile.name}</h1>
                <p className="text-[#4ECDC4] font-medium tracking-wide uppercase text-sm mb-3">{profile.role}</p>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                  {profile.expertise.map((skill, index) => (
                    <span key={index} className="px-3 py-1 text-xs font-bold text-white bg-white/5 border border-white/10 rounded-full shadow-inner">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex gap-3 justify-center md:justify-end shrink-0 mt-4 md:mt-0">
                <button className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium transition-all text-sm border border-white/10 focus:outline-none">
                  Change Password
                </button>
                <button className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#FF6B6B] to-[#4ECDC4] text-white font-bold transition-all text-sm shadow-lg hover:shadow-[#4ECDC4]/25 focus:outline-none hover:scale-105">
                  Edit Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* --- Grid Layout for Details & Stats --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
          
          {/* Left Column: Contact & Info */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            <div className="glass rounded-3xl p-6 border border-white/5 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-5 border-b border-white/10 pb-3">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#4ECDC4] group-hover:bg-[#4ECDC4]/10 transition-colors shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Email</p>
                    <p className="text-white text-sm font-medium truncate">{profile.email}</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-[#FF6B6B] group-hover:bg-[#FF6B6B]/10 transition-colors shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Phone</p>
                    <p className="text-white text-sm font-medium">{profile.phone}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-purple-400 group-hover:bg-purple-400/10 transition-colors shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-0.5">Joined</p>
                    <p className="text-white text-sm font-medium">{profile.joiningDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Bio & Performance Stats */}
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            {/* About Me */}
            <div className="glass rounded-3xl p-6 md:p-8 border border-white/5 shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B6B]/5 rounded-full blur-3xl"></div>
              <h3 className="text-lg font-bold text-white mb-3">About Me</h3>
              <p className="text-gray-300 leading-relaxed text-sm md:text-base">
                {profile.bio}
              </p>
            </div>

            {/* Performance Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass rounded-2xl p-5 border-t-2 border-[#4ECDC4] hover:-translate-y-1 transition-transform">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Total Students</p>
                <div className="flex items-end gap-2">
                  <h2 className="text-3xl font-bold text-white">{profile.stats.totalStudents}</h2>
                  <span className="text-[#4ECDC4] text-xl mb-0.5">👥</span>
                </div>
              </div>

              <div className="glass rounded-2xl p-5 border-t-2 border-[#FF6B6B] hover:-translate-y-1 transition-transform">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Classes Taught</p>
                <div className="flex items-end gap-2">
                  <h2 className="text-3xl font-bold text-white">{profile.stats.classesTaught}</h2>
                  <span className="text-[#FF6B6B] text-xl mb-0.5">🎵</span>
                </div>
              </div>

              <div className="glass rounded-2xl p-5 border-t-2 border-yellow-400 hover:-translate-y-1 transition-transform">
                <p className="text-gray-400 text-xs font-bold uppercase tracking-wider mb-1">Avg. Rating</p>
                <div className="flex items-end gap-2">
                  <h2 className="text-3xl font-bold text-white">{profile.stats.rating}</h2>
                  <span className="text-yellow-400 text-xl mb-0.5">⭐</span>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};

export default TeacherProfile;