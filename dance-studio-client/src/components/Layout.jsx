import React, { useContext, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import '../styles/dashboard.css';

const Layout = ({ children }) => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Mobile menu control state
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Helper function to check if the link is active
  const isActive = (path) => location.pathname === path;

  // Reusable NavItem Component
  const NavItem = ({ to, icon, label }) => (
    <Link 
      to={to} 
      onClick={() => setIsMobileMenuOpen(false)}
      className={`flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 group ${
        isActive(to) 
          ? 'bg-gradient-to-r from-[#FF6B6B]/20 to-[#4ECDC4]/20 text-white border border-white/10 shadow-inner' 
          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
      }`}
    >
      <span className={`text-xl transition-transform duration-300 group-hover:scale-110 ${isActive(to) ? 'scale-110' : ''}`}>
        {icon}
      </span>
      <span>{label}</span>
      {isActive(to) && (
        <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#4ECDC4] shadow-[0_0_8px_#4ECDC4]"></span>
      )}
    </Link>
  );

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-[#0A0E27] via-[#0f1635] to-[#1a1a3a] text-white overflow-hidden font-outfit flex">
      
      {/* --- Mobile Top Navigation Bar --- */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 glass z-40 flex items-center justify-between px-4 border-b border-white/5 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-sm shadow-lg">💃</div>
          <span className="font-bold text-white tracking-wide">Rhythm Studio</span>
        </div>
        <button 
          onClick={() => setIsMobileMenuOpen(true)}
          className="p-2 text-gray-300 hover:text-white focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      {/* --- Mobile Menu Overlay --- */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      {/* --- Main Sidebar --- */}
      <aside className={`fixed top-0 left-0 h-full w-64 glass z-50 flex flex-col p-5 border-r border-white/5 transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
        
        {/* Mobile Close Button */}
        <button 
          className="md:hidden absolute top-5 right-5 text-gray-400 hover:text-white focus:outline-none"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Logo Area */}
        <div className="flex items-center gap-3 mb-10 w-full mt-2 md:mt-0">
          <div className="min-w-[48px] h-12 rounded-xl bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center text-2xl shadow-lg shadow-[#FF6B6B]/30">
            💃
          </div>
          <div className="overflow-hidden">
            <h2 className="text-xl font-bold text-white tracking-wide leading-tight">Rhythm</h2>
            <p className="text-[10px] text-[#4ECDC4] font-bold uppercase tracking-widest">Dance Studio</p>
          </div>
        </div>
        
        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1.5 w-full overflow-y-auto scrollbar-hide flex-1 pb-4">
          <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 px-2">Menu</p>
          
          {/* 🔥 NAYA GLOBAL PROFILE BUTTON 🔥 */}
          <NavItem to="/profile" icon="👤" label="My Profile" />
          
          {/* 1. STUDENT MENU */}
          {user?.role === 'student' && (
            <>
              <NavItem to="/student-dashboard" icon="🏠" label="Dashboard" />
              <NavItem to="/my-attendance" icon="📅" label="My Attendance" />
              <NavItem to="/billing" icon="💰" label="My Invoices" />
            </>
          )}

          {/* 2. TEACHER MENU */}
          {user?.role === 'teacher' && (
            <>
              <NavItem to="/teacher-dashboard" icon="👨‍🏫" label="Dashboard" />
              <NavItem to="/my-schedule" icon="📅" label="My Classes" />
              <NavItem to="/attendance" icon="✅" label="Attendance" />
              <NavItem to="/billing" icon="💸" label="My Payroll" />
            </>
          )}

          {/* 3. ADMIN MENU */}
          {user?.role === 'admin' && (
            <>
              <NavItem to="/dashboard" icon="📊" label="Dashboard" />
              <NavItem to="/students" icon="👥" label="Students" />
              <NavItem to="/classes" icon="📅" label="Classes" />
              <NavItem to="/attendance" icon="✅" label="Attendance" />
              <NavItem to="/billing" icon="💳" label="Billing" />
              <NavItem to="/teachers" icon="👨‍🏫" label="Teachers" />
              <NavItem to="/reports" icon="📈" label="Reports" />
              
              <div className="my-2 border-t border-white/5"></div>
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wider mb-2 px-2 mt-2">Preferences</p>
              
              <NavItem to="/settings" icon="⚙️" label="Settings" />
            </>
          )}
        </nav>
        
        {/* User Profile & Logout Area */}
        <div className="mt-auto w-full pt-4 border-t border-white/10">
          <div className="bg-black/20 rounded-xl p-3 flex items-center justify-between gap-3 border border-white/5 hover:border-white/10 transition-colors">
            
            {/* 🔥 YAHAN LINK FIX KAR DIYA HAI 🔥 */}
            <Link 
              to="/profile" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-3 overflow-hidden cursor-pointer group flex-1"
              title="View Profile"
            >
              <div className="min-w-[40px] h-10 rounded-full bg-gradient-to-br from-[#FF6B6B] to-[#4ECDC4] flex items-center justify-center shadow-inner text-lg group-hover:scale-105 transition-transform">
                {user?.role === 'student' ? '👩‍🎓' : user?.role === 'teacher' ? '👨‍🏫' : '👑'}
              </div>
              <div className="overflow-hidden">
                <p className="font-semibold text-white text-sm truncate group-hover:text-[#4ECDC4] transition-colors">
                  {user?.name || 'User'}
                </p>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider truncate">
                  {user?.role || 'Guest'}
                </p>
              </div>
            </Link>
            
            {/* Logout Button */}
            <button 
              onClick={handleLogout} 
              className="text-gray-400 hover:text-[#FF6B6B] bg-white/5 hover:bg-[#FF6B6B]/10 p-2 rounded-lg transition-all shrink-0"
              title="Logout"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </div>
        </div>

      </aside>

      {/* --- Main Content Area --- */}
      <main className="flex-1 w-full md:ml-64 pt-20 md:pt-0 h-screen overflow-y-auto overflow-x-hidden scroll-smooth">
        <div className="p-4 md:p-8 max-w-7xl mx-auto min-h-full">
          {children}
        </div>
      </main>

    </div>
  );
};

export default Layout;