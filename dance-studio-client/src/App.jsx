import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContext, AuthProvider } from './context/AuthContext';
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// --- COMMON PAGES ---
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// --- ADMIN PAGES ---
import AdminDashboard from './pages/admin/DashboardPage';
import StudentManagement from './pages/admin/StudentManagement';
import ClassesPage from './pages/admin/ClassesPage';
import AdminBilling from './pages/admin/BillingPage';
import ReportsPage from './pages/admin/ReportsPage';
import SettingsPage from './pages/admin/SettingsPage';
import TeacherManagement from './pages/admin/TeacherManagement';

// --- TEACHER PAGES ---
import TeacherDashboard from './pages/teacher/TeacherDashboard';
import MySchedule from './pages/teacher/MySchedule';
import AttendancePage from './pages/teacher/AttendancePage';
import MyPayroll from './pages/teacher/MyPayroll';
import TeacherProfile from './pages/teacher/TeacherProfile';

// --- STUDENT PAGES ---
import StudentDashboard from './pages/student/StudentDashboard';
import MyAttendance from './pages/student/MyAttendance';
import StudentBilling from './pages/student/StudentBilling';


// ==========================================
// SMART WRAPPERS (Logic Components)
// ==========================================

// 1. Dynamic Billing: User ka role check karke sahi billing page dikhayega
const DynamicBilling = () => {
  const { user } = useContext(AuthContext);
  
  if (user?.role === 'admin') {
    return <AdminBilling />;
  } else if (user?.role === 'teacher') {
    return <MyPayroll />;
  } else if (user?.role === 'student') {
    return <StudentBilling />;
  } else {
    return <Navigate to="/" replace />;
  }
};

// 2. Root Redirect: Login hote hi user ko uske sahi dashboard par bhejega
const RootRedirect = () => {
  const { user } = useContext(AuthContext);
  
  if (user?.role === 'student') return <Navigate to="/student-dashboard" replace />;
  if (user?.role === 'teacher') return <Navigate to="/teacher-dashboard" replace />;
  
  // Default (Admin)
  return <Navigate to="/dashboard" replace />;
};


function App() {
  return (
    <AuthProvider>
      <Router>
       <ToastContainer 
    position="top-right" 
    autoClose={3000} 
    theme="dark" 
    toastClassName="glass border border-white/10 rounded-xl"
  />
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<LoginPage />} />
          

          {/* ==========================================
              ADMIN ROUTES
          ========================================== */}
          <Route path="/dashboard" element={<ProtectedRoute requiredRole="admin"><Layout><AdminDashboard /></Layout></ProtectedRoute>} />
          <Route path="/students" element={<ProtectedRoute requiredRole="admin"><Layout><StudentManagement /></Layout></ProtectedRoute>} />
          <Route path="/classes" element={<ProtectedRoute requiredRole="admin"><Layout><ClassesPage /></Layout></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute requiredRole="admin"><Layout><ReportsPage /></Layout></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute requiredRole="admin"><Layout><SettingsPage /></Layout></ProtectedRoute>} />
          <Route path="/teachers" element={<ProtectedRoute requiredRole="admin"><Layout><TeacherManagement /></Layout></ProtectedRoute>} />
          
          {/* ==========================================
              TEACHER ROUTES
          ========================================== */}
          <Route path="/teacher-dashboard" element={<ProtectedRoute requiredRole="teacher"><Layout><TeacherDashboard /></Layout></ProtectedRoute>} />
          <Route path="/my-schedule" element={<ProtectedRoute requiredRole="teacher"><Layout><MySchedule /></Layout></ProtectedRoute>} />
          <Route path="/teacher-profile" element={<ProtectedRoute requiredRole="teacher"><Layout><TeacherProfile /></Layout></ProtectedRoute>} />
          
          {/* Note: Attendance Teacher aur Admin dono access kar sakte hain */}
          <Route path="/attendance" element={<ProtectedRoute><Layout><AttendancePage /></Layout></ProtectedRoute>} />

          {/* ==========================================
              STUDENT ROUTES
          ========================================== */}
          <Route path="/student-dashboard" element={<ProtectedRoute requiredRole="student"><Layout><StudentDashboard /></Layout></ProtectedRoute>} />
          <Route path="/my-attendance" element={<ProtectedRoute requiredRole="student"><Layout><MyAttendance /></Layout></ProtectedRoute>} />

          {/* ==========================================
              DYNAMIC / SHARED ROUTES
          ========================================== */}
          <Route path="/billing" element={<ProtectedRoute><Layout><DynamicBilling /></Layout></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Layout><ProfilePage /></Layout></ProtectedRoute>}/>
          {/* Main Entry Point */}
          <Route path="/" element={<ProtectedRoute><RootRedirect /></ProtectedRoute>} />
          
          {/* Catch-all: Wrong URLs */}
          <Route path="*" element={<Navigate to="/" replace />} />

        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;