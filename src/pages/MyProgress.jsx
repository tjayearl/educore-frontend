import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Award, TrendingUp, BookOpen, Loader } from "lucide-react";
import { progressAPI } from "../services/api";

export default function MyProgress() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [progressData, setProgressData] = useState([]);
  const [stats, setStats] = useState({
    totalCourses: 0,
    completedCourses: 0,
    totalLessons: 0,
    completedLessons: 0,
    overallProgress: 0
  });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    loadProgress();
  }, []);

  const loadProgress = async () => {
    try {
      setLoading(true);
      const data = await progressAPI.getAllProgress();
      const progress = data.progress || [];
      setProgressData(progress);

      // Calculate stats
      const totalLessons = progress.reduce((sum, p) => sum + p.totalLessons, 0);
      const completedLessons = progress.reduce((sum, p) => sum + p.completedLessons, 0);
      const completedCourses = progress.filter(p => p.percentage === 100).length;
      const avgProgress = progress.length > 0
        ? Math.round(progress.reduce((sum, p) => sum + p.percentage, 0) / progress.length)
        : 0;

      setStats({
        totalCourses: progress.length,
        completedCourses,
        totalLessons,
        completedLessons,
        overallProgress: avgProgress
      });
    } catch (err) {
      console.error("Error loading progress:", err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        <h1 className="text-4xl font-bold text-gray-800 mb-2">My Progress</h1>
        <p className="text-gray-500 mb-8">Track your learning journey, {user?.full_name?.split(' ')[0]}!</p>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <BookOpen className="text-blue-600" size={24} />
              <p className="text-gray-500 text-sm">Courses Started</p>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.totalCourses}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <Award className="text-green-600" size={24} />
              <p className="text-gray-500 text-sm">Courses Completed</p>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.completedCourses}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-purple-600" size={24} />
              <p className="text-gray-500 text-sm">Lessons Completed</p>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.completedLessons}/{stats.totalLessons}</p>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex items-center gap-3 mb-2">
              <TrendingUp className="text-orange-600" size={24} />
              <p className="text-gray-500 text-sm">Overall Progress</p>
            </div>
            <p className="text-3xl font-bold text-gray-800">{stats.overallProgress}%</p>
          </div>
        </div>

        {/* Progress by Course */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Progress by Course</h2>
          
          {progressData.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500 mb-4">You haven't started any courses yet.</p>
              <button
                onClick={() => navigate("/dashboard")}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Browse Courses
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {progressData.map((item) => (
                <div key={item.courseId} className="border-b last:border-0 pb-6 last:pb-0">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-bold text-gray-800 text-lg">{item.courseTitle}</h3>
                      <p className="text-sm text-gray-500">
                        {item.completedLessons}/{item.totalLessons} lessons completed
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-800">{item.percentage}%</p>
                      {item.percentage === 100 && (
                        <span className="text-xs text-green-600 font-semibold">✓ Completed</span>
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        item.percentage === 100 ? 'bg-green-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${item.percentage}%` }}
                    />
                  </div>
                  <button
                    onClick={() => navigate(`/course/${item.courseId}`)}
                    className="mt-3 text-sm text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Continue Course →
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}