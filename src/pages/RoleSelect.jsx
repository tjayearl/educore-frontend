import { useNavigate } from "react-router-dom";
import { BookOpen, User, Shield } from "lucide-react";

export default function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-full shadow-lg mb-6">
            <BookOpen className="text-indigo-600" size={48} />
          </div>
          <h1 className="text-5xl font-bold text-white mb-4">Educore LMS</h1>
          <p className="text-xl text-purple-100">Learning Management System</p>
          <p className="text-purple-200 mt-2">Built for Kenya Broadcasting Corporation</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Student Portal */}
          <div 
            onClick={() => navigate("/login")}
            className="bg-white rounded-2xl shadow-2xl p-8 cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6 mx-auto">
              <User className="text-blue-600" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">Student Portal</h2>
            <p className="text-gray-600 text-center mb-6">
              Browse courses, track your progress, and complete lessons
            </p>
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
              Student Login →
            </button>
          </div>

          {/* Admin Portal */}
          <div 
            onClick={() => navigate("/admin/login")}
            className="bg-white rounded-2xl shadow-2xl p-8 cursor-pointer hover:scale-105 transition-transform"
          >
            <div className="flex items-center justify-center w-16 h-16 bg-slate-100 rounded-full mb-6 mx-auto">
              <Shield className="text-slate-800" size={32} />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 text-center mb-3">Admin Portal</h2>
            <p className="text-gray-600 text-center mb-6">
              Create courses, add lessons, and manage user activities
            </p>
            <button className="w-full bg-slate-800 text-white py-3 rounded-lg font-semibold hover:bg-slate-900 transition">
              Admin Login →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}