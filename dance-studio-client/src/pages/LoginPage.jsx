import React, { useState, useContext } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../context/AuthContext"; // Dhyan dein: path check kar lein
import '../styles/auth.css';

const LoginPage = () => {
  // --- States for Login Logic ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // --- Login Handler ---
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        { email, password }
      );

      const userData = response.data.user;

      login(response.data.token, userData);

      navigate(
        userData.role === "student"
          ? "/student-dashboard"
          : "/dashboard"
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Invalid credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative h-screen w-full bg-gray-950 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-violet-600/20 to-transparent rounded-full blur-3xl animate-morph"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-fuchsia-600/20 to-transparent rounded-full blur-3xl animate-morph" style={{ animationDelay: '-4s' }}></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-cyan-500/10 rounded-full blur-2xl animate-float"></div>
      </div>

      <div className="h-full flex flex-col lg:flex-row relative z-10 overflow-y-auto">
        {/* Left Side - Branding */}
        <div className="lg:w-1/2 p-8 lg:p-16 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            {/* Logo */}
            <div className="animate-fade-up stagger-1 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center animate-pulse-glow">
                  <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="text-2xl font-bold text-white">ZenFlow</span>
              </div>
            </div>

            {/* Hero Text */}
            <h1 className="animate-fade-up stagger-2 text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight">
              Mind, Body & <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">Soul</span>
            </h1>
            <p className="animate-fade-up stagger-3 text-gray-400 text-lg mb-8">
              Transform your wellness journey with yoga, dance, and meditation all in one place.
            </p>

            {/* Feature Pills */}
            <div className="animate-fade-up stagger-4 flex flex-wrap gap-3 mb-8">
              <span className="px-4 py-2 rounded-full bg-violet-500/20 text-violet-300 text-sm font-medium border border-violet-500/30">🧘 Yoga</span>
              <span className="px-4 py-2 rounded-full bg-fuchsia-500/20 text-fuchsia-300 text-sm font-medium border border-fuchsia-500/30">💃 Zumba</span>
              <span className="px-4 py-2 rounded-full bg-cyan-500/20 text-cyan-300 text-sm font-medium border border-cyan-500/30">🧠 Meditation</span>
            </div>

            {/* Stats */}
            <div className="animate-fade-up stagger-5 grid grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white">50K+</div>
                <div className="text-xs text-gray-400">Active Users</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white">200+</div>
                <div className="text-xs text-gray-400">Classes</div>
              </div>
              <div className="text-center p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
                <div className="text-2xl font-bold text-white">4.9★</div>
                <div className="text-xs text-gray-400">Rating</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="lg:w-1/2 p-4 lg:p-8 flex items-center justify-center">
          <div className="w-full max-w-sm">
            <div className="animate-scale-in bg-gray-900/80 backdrop-blur-xl rounded-3xl p-6 border border-white/10 shadow-2xl">
              <h2 className="text-xl font-bold text-white mb-2">Welcome Back</h2>
              <p className="text-gray-400 text-sm mb-6">Sign in to continue your wellness journey</p>
              
              {/* Error Message UI */}
              {error && (
                <div className="mb-4 p-3 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 text-sm animate-fade-up">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Email */}
                <div className="animate-slide-left stagger-1">
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">Email</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                      </svg>
                    </span>
                    <input 
                      type="email" 
                      placeholder="you@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="input-focus text-sm w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none" 
                      required 
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="animate-slide-left stagger-2">
                  <label className="block text-xs font-medium text-gray-300 mb-1.5">Password</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </span>
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="input-focus text-sm w-full pl-11 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 outline-none" 
                      required 
                    />
                  </div>
                </div>

                {/* Remember & Forgot */}
                <div className="animate-slide-left stagger-3 flex items-center justify-between mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-3.5 h-3.5 rounded bg-gray-800 border-gray-600 text-violet-500 focus:ring-violet-500" />
                    <span className="text-xs text-gray-400">Remember me</span>
                  </label>
                  <button type="button" className="text-xs text-violet-400 hover:text-violet-300 transition-colors">Forgot password?</button>
                </div>

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={loading}
                  className={`animate-slide-left stagger-4 btn-press w-full py-3 mt-2 font-semibold rounded-xl shadow-lg transition-all duration-300 relative overflow-hidden group ${loading ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white shadow-violet-500/25'}`}
                >
                  <span className="relative z-10">{loading ? "Preparing Stage..." : "Sign In"}</span>
                  {!loading && <div className="absolute inset-0 shimmer"></div>}
                </button>

                {/* Divider */}
                <div className="animate-slide-left stagger-5 flex items-center gap-4 py-2">
                  <div className="flex-1 h-px bg-gray-700"></div>
                  <span className="text-xs text-gray-500">or continue with</span>
                  <div className="flex-1 h-px bg-gray-700"></div>
                </div>

                {/* Social Login */}
                <div className="animate-slide-left stagger-6 flex gap-3">
                  <button type="button" className="btn-press flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 flex items-center justify-center gap-2 transition-all">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#EA4335" d="M5.26620003,9.76452941 C6.19878754,6.93863203 8.85444915,4.90909091 12,4.90909091 C13.6909091,4.90909091 15.2181818,5.50909091 16.4181818,6.49090909 L19.9090909,3 C17.7818182,1.14545455 15.0545455,0 12,0 C7.27006974,0 3.1977497,2.69829785 1.23999023,6.65002441 L5.26620003,9.76452941 Z" />
                      <path fill="#34A853" d="M16.0407269,18.0125889 C14.9509167,18.7163016 13.5660892,19.0909091 12,19.0909091 C8.86648613,19.0909091 6.21911939,17.076871 5.27698177,14.2678769 L1.23746264,17.3349879 C3.19279051,21.2936293 7.26500293,24 12,24 C14.9328362,24 17.7353462,22.9573905 19.834192,20.9995801 L16.0407269,18.0125889 Z" />
                      <path fill="#4A90E2" d="M19.834192,20.9995801 C22.0291676,18.9520994 23.4545455,15.903663 23.4545455,12 C23.4545455,11.2909091 23.3454545,10.5272727 23.1818182,9.81818182 L12,9.81818182 L12,14.4545455 L18.4363636,14.4545455 C18.1187732,16.013626 17.2662994,17.2212117 16.0407269,18.0125889 L19.834192,20.9995801 Z" />
                      <path fill="#FBBC05" d="M5.27698177,14.2678769 C5.03832634,13.556323 4.90909091,12.7937589 4.90909091,12 C4.90909091,11.2182781 5.03443647,10.4668121 5.26620003,9.76452941 L1.23999023,6.65002441 C0.43658717,8.26043162 0,10.0753848 0,12 C0,13.9195484 0.444780743,15.7 1.23746264,17.3349879 L5.27698177,14.2678769 Z" />
                    </svg>
                    <span className="text-xs text-gray-300">Google</span>
                  </button>
                  <button type="button" className="btn-press flex-1 py-2.5 bg-gray-800 hover:bg-gray-700 rounded-xl border border-gray-700 flex items-center justify-center gap-2 transition-all">
                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.039 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.39-2.376-2-.156-3.675 1.09-4.61 1.09zM15.53 3.83c.843-1.012 1.4-2.427 1.245-3.83-1.207.052-2.662.805-3.532 1.818-.78.896-1.454 2.338-1.273 3.714 1.338.104 2.715-.688 3.559-1.701" />
                    </svg>
                    <span className="text-xs text-gray-300">Apple</span>
                  </button>
                </div>
              </form>

              {/* Sign Up Link */}
              <p className="text-center text-gray-400 text-sm mt-5">
                Don't have an account? <button type="button" className="text-violet-400 hover:text-violet-300 font-medium transition-colors">Sign up free</button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;