import { useState } from "react";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, LogIn, BookOpen, Shield } from "lucide-react";

export default function Login() {
  const [searchParams] = useSearchParams();
  const isAdminMode = searchParams.get("admin") === "true";
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("https://educore-backend-7p4o.onrender.com/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Redirect based on role
        if (data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/dashboard");
        }
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      setError("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-gradient-to-br ${isAdminMode ? 'from-slate-800 via-slate-900 to-black' : 'from-blue-600 via-blue-700 to-indigo-800'} flex items-center justify-center p-4`}>
      <div className="w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-full shadow-lg mb-4">
            {isAdminMode ? (
              <Shield className="text-slate-800" size={40} />
            ) : (
              <BookOpen className="text-blue-600" size={40} />
            )}
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Educore LMS</h1>
          <p className={`${isAdminMode ? 'text-slate-300' : 'text-blue-100'}`}>
            {isAdminMode ? 'Administrator Portal' : 'Student Learning Portal'}
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {isAdminMode ? 'Admin Login' : 'Welcome Back!'}
            </h2>
            <p className="text-gray-500 mt-1">
              {isAdminMode ? 'Access your admin dashboard' : 'Sign in to continue learning'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-3">
                  <p className="text-sm text-red-700">{error}</p>
                </div>
              </div>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className={`h-5 w-5 text-gray-400 group-focus-within:${isAdminMode ? 'text-slate-700' : 'text-blue-500'} transition-colors`} />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 ${isAdminMode ? 'focus:ring-slate-700' : 'focus:ring-blue-500'} focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400`}
                  placeholder={isAdminMode ? "admin@educore.com" : "student@example.com"}
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className={`h-5 w-5 text-gray-400 group-focus-within:${isAdminMode ? 'text-slate-700' : 'text-blue-500'} transition-colors`} />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 ${isAdminMode ? 'focus:ring-slate-700' : 'focus:ring-blue-500'} focus:border-transparent transition-all outline-none text-gray-900 placeholder-gray-400`}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className={`h-4 w-4 ${isAdminMode ? 'text-slate-700 focus:ring-slate-600' : 'text-blue-600 focus:ring-blue-500'} border-gray-300 rounded`}
                />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
              <a href="#" className={`text-sm font-medium ${isAdminMode ? 'text-slate-700 hover:text-slate-600' : 'text-blue-600 hover:text-blue-500'}`}>
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full flex items-center justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-white ${isAdminMode ? 'bg-slate-800 hover:bg-slate-900 focus:ring-slate-700' : 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'} focus:outline-none focus:ring-2 focus:ring-offset-2 font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed`}
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </>
              ) : (
                <>
                  <LogIn className="mr-2 h-5 w-5" />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  {isAdminMode ? 'Not an admin?' : 'New to Educore?'}
                </span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <div className="mt-6">
            <Link
              to={isAdminMode ? "/register?admin=true" : "/register"}
              className={`w-full flex items-center justify-center py-3 px-4 border-2 ${isAdminMode ? 'border-slate-800 text-slate-800 hover:bg-slate-50' : 'border-blue-600 text-blue-600 hover:bg-blue-50'} rounded-lg bg-white font-semibold transition-all`}
            >
              {isAdminMode ? 'Register as Admin' : 'Create an Account'}
            </Link>
          </div>

          {/* Admin/Student Mode Toggle */}
          <div className="mt-4 text-center">
            {isAdminMode ? (
              <Link to="/login" className="text-sm text-gray-500 hover:text-gray-700">
                ← Back to Student Login
              </Link>
            ) : (
              <Link to="/login?admin=true" className="text-sm text-gray-500 hover:text-gray-700 flex items-center justify-center gap-1">
                <Shield size={14} />
                Admin Login
              </Link>
            )}
          </div>
        </div>

        {/* Footer */}
        <p className={`mt-8 text-center text-sm ${isAdminMode ? 'text-slate-300' : 'text-blue-100'}`}>
          © 2026 Educore LMS. Built for Kenya Broadcasting Corporation (KBC)
        </p>
      </div>
    </div>
  );
}