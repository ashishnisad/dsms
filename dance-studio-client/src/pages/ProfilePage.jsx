import React, { useState, useEffect } from 'react';

// ==========================================
// 1. DATA ENGINE (Role-Based Highlights)
// ==========================================
const getMockData = (role) => {
  const base = {
    personal: { 
      fullName: 'Jacob Smith', dob: '1990-05-15', gender: 'Male', 
      phone: '+91 9876543210', email: `jacob.${role}@rhythm.com`, address: '123 Studio Line, Bhopal' 
    },
    activity: [
      { title: role === 'admin' ? 'System Backup Completed' : role === 'teacher' ? 'Marked Weekend Batch Attendance' : 'Paid Monthly Fee via UPI', time: 'Yesterday' },
      { title: 'Logged in from new device', time: '3 days ago' }
    ]
  };

  if (role === 'admin') return { ...base,
    highlights: [
      { label: 'Total Revenue', value: '₹2.4L', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
      { label: 'Pending Dues', value: '₹45K', color: 'text-rose-400', bg: 'bg-rose-500/10' },
      { label: 'Active Staff', value: '24', color: 'text-blue-400', bg: 'bg-blue-500/10' },
      { label: 'Branches', value: '4', color: 'text-purple-400', bg: 'bg-purple-500/10' }
    ]
  };

  if (role === 'teacher') return { ...base,
    highlights: [
      { label: 'This Month Salary', value: '₹45,000', color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
      { label: 'Active Batches', value: '8', color: 'text-blue-400', bg: 'bg-blue-500/10' },
      { label: 'Attendance', value: '96%', color: 'text-[#4ECDC4]', bg: 'bg-[#4ECDC4]/10' },
      { label: 'Student Rating', value: '4.9 ⭐', color: 'text-amber-400', bg: 'bg-amber-500/10' }
    ],
    documents: [{ name: 'Instructor Contract', type: 'PDF' }]
  };

  return { ...base, // Student
    highlights: [
      { label: 'Pending Fee', value: '₹2,500', color: 'text-rose-400', bg: 'bg-rose-500/10' },
      { label: 'Current Batch', value: 'Hip-Hop', color: 'text-blue-400', bg: 'bg-blue-500/10' },
      { label: 'Attendance', value: '88%', color: 'text-[#4ECDC4]', bg: 'bg-[#4ECDC4]/10' },
      { label: 'Joined', value: 'Aug 2025', color: 'text-purple-400', bg: 'bg-purple-500/10' }
    ],
    documents: [{ name: 'ID Proof', type: 'IMG' }, { name: 'Medical Form', type: 'PDF' }]
  };
};

// ==========================================
// 2. REUSABLE UI WIDGETS
// ==========================================
const Field = ({ label, value, isEditing, onChange, type = "text", fullWidth }) => (
  <div className={`mb-3 ${fullWidth ? 'col-span-full' : ''}`}>
    <label className="text-[10px] font-bold text-gray-500 uppercase tracking-widest block mb-1">{label}</label>
    {isEditing ? (
      <input type={type} value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2.5 rounded-xl bg-black/40 border border-white/10 text-white focus:border-[#4ECDC4] focus:ring-1 focus:ring-[#4ECDC4] transition-all text-sm outline-none" />
    ) : (
      <p className="text-white text-sm font-medium bg-white/5 px-4 py-2.5 rounded-xl border border-white/5 truncate">{value}</p>
    )}
  </div>
);

// ==========================================
// 3. MAIN PAGE ENGINE
// ==========================================
const ProfilePage = () => {
  const [currentRole, setCurrentRole] = useState('student');
  const [isEditing, setIsEditing] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    setData(null);
    setTimeout(() => setData(getMockData(currentRole)), 300); // Fast snap loading
  }, [currentRole]);

  const updateField = (field, value) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  if (!data) return <div className="min-h-screen bg-[#030712] flex justify-center items-center"><div className="w-8 h-8 border-2 border-t-[#4ECDC4] rounded-full animate-spin"></div></div>;

  const roleTheme = {
    admin: { bg: 'from-purple-600 to-indigo-600', title: 'System Admin', icon: '👑' },
    teacher: { bg: 'from-rose-500 to-[#4ECDC4]', title: 'Instructor', icon: '👨‍🏫' },
    student: { bg: 'from-blue-500 to-cyan-500', title: 'Student', icon: '👩‍🎓' }
  }[currentRole];

  return (
    <div className="min-h-screen bg-[#030712] font-sans text-slate-200 p-4 md:p-8 selection:bg-[#4ECDC4] selection:text-black">
      <div className="max-w-5xl mx-auto animate-fade-in pb-20">
        
        {/* ========================================== */}
        {/* 1. HERO HEADER (Who am I?) */}
        {/* ========================================== */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-[#0f172a]/80 backdrop-blur-xl p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl mb-6 relative overflow-hidden">
          <div className={`absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br ${roleTheme.bg} rounded-full blur-[80px] opacity-20 pointer-events-none`}></div>
          
          <div className="flex items-center gap-5 relative z-10 w-full md:w-auto">
            <div className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl bg-gradient-to-br ${roleTheme.bg} p-1 shadow-lg shrink-0`}>
              <div className="w-full h-full bg-[#0A0E27] rounded-[14px] flex items-center justify-center text-3xl">{roleTheme.icon}</div>
            </div>
            <div>
              <h1 className="text-2xl md:text-3xl font-black text-white">{data.personal.fullName}</h1>
              <p className="text-gray-400 font-medium text-sm mt-1 flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-white/10 text-white border border-white/10`}>{roleTheme.title}</span>
                ID: RHY-8842
              </p>
            </div>
          </div>
          
          <button onClick={() => setIsEditing(!isEditing)}
            className={`mt-6 md:mt-0 w-full md:w-auto px-6 py-2.5 rounded-xl text-sm font-bold transition-all z-10 ${
              isEditing ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white/10 hover:bg-white/20 text-white border border-white/10'
            }`}>
            {isEditing ? '✓ Save Changes' : '✎ Edit Profile'}
          </button>
        </div>

        {/* ========================================== */}
        {/* 2. IMPORTANT FIRST: QUICK STATS ROW */}
        {/* ========================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {data.highlights.map((stat, i) => (
            <div key={i} className="bg-[#0f172a]/80 backdrop-blur-xl p-5 rounded-3xl border border-white/5 flex flex-col justify-center relative overflow-hidden group hover:border-white/10 transition-colors">
              <div className={`absolute -right-4 -top-4 w-16 h-16 rounded-full blur-2xl opacity-40 ${stat.bg}`}></div>
              <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1 relative z-10">{stat.label}</p>
              <p className={`text-2xl font-black relative z-10 ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* ========================================== */}
        {/* 3. SECONDARY INFO: TWO COLUMN LAYOUT */}
        {/* ========================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* LEFT: Personal Details (Combined Basic + Contact) */}
          <div className="lg:col-span-2 bg-[#0f172a]/60 backdrop-blur-xl rounded-3xl p-6 md:p-8 border border-white/5">
            <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-6 border-b border-white/5 pb-3">Personal Details</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              <Field label="Full Name" value={data.personal.fullName} isEditing={isEditing} onChange={(v) => updateField('fullName', v)} />
              <Field label="Email" type="email" value={data.personal.email} isEditing={isEditing} onChange={(v) => updateField('email', v)} />
              <Field label="Phone" value={data.personal.phone} isEditing={isEditing} onChange={(v) => updateField('phone', v)} />
              <Field label="Date of Birth" type="date" value={data.personal.dob} isEditing={isEditing} onChange={(v) => updateField('dob', v)} />
              <Field label="Address" value={data.personal.address} isEditing={isEditing} onChange={(v) => updateField('address', v)} fullWidth />
            </div>
          </div>

          {/* RIGHT: Documents & Activity */}
          <div className="space-y-6">
            
            {/* Show Documents only if applicable */}
            {data.documents && (
              <div className="bg-[#0f172a]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/5">
                <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-3">
                  <h3 className="text-sm font-bold text-white uppercase tracking-widest">Documents</h3>
                  <button className="text-[10px] bg-white/10 px-2 py-1 rounded font-bold hover:bg-white/20 transition-colors">UPLOAD</button>
                </div>
                <div className="space-y-3">
                  {data.documents.map((doc, i) => (
                    <div key={i} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                      <span className="text-xs font-medium text-gray-300">{doc.name}</span>
                      <span className="text-[9px] font-black tracking-wider bg-[#4ECDC4]/10 text-[#4ECDC4] px-2 py-1 rounded">{doc.type}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Recent Activity */}
            <div className="bg-[#0f172a]/60 backdrop-blur-xl rounded-3xl p-6 border border-white/5">
              <h3 className="text-sm font-bold text-white uppercase tracking-widest mb-5 border-b border-white/5 pb-3">Recent Activity</h3>
              <div className="space-y-4">
                {data.activity.map((act, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-500 mt-1.5 shrink-0 shadow-[0_0_8px_rgba(59,130,246,0.6)]"></div>
                    <div>
                      <p className="text-xs text-gray-200 font-medium">{act.title}</p>
                      <p className="text-[10px] text-gray-500 font-bold mt-0.5">{act.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* --- TEST WIDGET: ROLE SWITCHER --- */}
      <div className="fixed bottom-4 right-4 z-50 bg-black/80 border border-white/10 p-1.5 rounded-full flex gap-1 backdrop-blur-xl shadow-2xl">
        {['student', 'teacher', 'admin'].map(r => (
          <button key={r} onClick={() => setCurrentRole(r)}
            className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
              currentRole === r ? 'bg-white text-black' : 'text-gray-500 hover:text-white'
            }`}>
            {r}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ProfilePage;