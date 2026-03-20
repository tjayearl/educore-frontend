import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Shield, BookOpen } from "lucide-react";
import { authAPI } from "../services/api";

export default function AdminLogin() {
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
      const data = await authAPI.login(email, password);
      
      // Check if user is actually an admin
      if (data.user.role !== "admin") {
        setError("Access denied. Admin credentials required.");
        setLoading(false);
        return;
      }
      
      // Save token and user
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      
      // Redirect to admin dashboard
      navigate("/admin/dashboard");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-slate-800 rounded-full shadow-lg mb-4 border-2 border-slate-600">
            <Shield className="text-slate-300" size={40} />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Educore LMS</h1>
          <p className="text-slate-400">Administrator Portal</p>
        </div>

        <div className="bg-slate-800 rounded-2xl shadow-2xl p-8 border border-slate-700">
          <h2 className="text-2xl font-bold text-white mb-6">Admin Access</h2>

          {error && (
            <div className="mb-6 bg-red-900/50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-sm text-red-200">{error}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Admin Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-slate-500 outline-none placeholder-slate-400"
                  placeholder="admin@educore.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 h-5 w-5" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 bg-slate-700 border border-slate-600 text-white rounded-lg focus:ring-2 focus:ring-slate-500 outline-none placeholder-slate-400"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-700 text-white py-3 rounded-lg font-semibold hover:bg-slate-600 transition disabled:opacity-50 flex items-center justify-center gap-2 border border-slate-600"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield size={20} />
                  Sign In as Admin
                </>
              )}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <p className="text-center text-slate-400 text-sm">
              Need admin access?{" "}
              <Link to="/admin/register" className="text-slate-300 font-semibold hover:underline">
                Register Admin Account
              </Link>
            </p>
          </div>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-slate-400 text-sm hover:text-slate-300 hover:underline">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}