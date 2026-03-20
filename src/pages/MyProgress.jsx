import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, TrendingUp, Award, LogOut, ArrowLeft,
  CheckCircle, Trophy, Target, Calendar
} from "lucide-react";

export default function MyProgress() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const [stats] = useState({
    totalCourses: 4,
    completedCourses: 1,
    totalLessons: 45,
    completedLessons: 18,
    totalHours: 24,
    streakDays: 7,
    certificatesEarned: 1
  });

  const [courseProgress] = useState([
    {
      id: 1,
      title: "Introduction to JavaScript",
      progress: 67,
      completedLessons: 8,
      totalLessons: 12,
      status: "in-progress",
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      title: "Web Design Fundamentals",
      progress: 100,
      completedLessons: 8,
      totalLessons: 8,
      status: "completed",
      lastActivity: "1 day ago"
    },
    {
      id: 3,
      title: "Python for Beginners",
      progress: 20,
      completedLessons: 2,
      totalLessons: 10,
      status: "in-progress",
      lastActivity: "3 days ago"
    },
    {
      id: 4,
      title: "React Advanced Patterns",
      progress: 0,
      completedLessons: 0,
      totalLessons: 15,
      status: "not-started",
      lastActivity: "Never"
    }
  ]);

  const [recentActivity] = useState([
    { lesson: "JavaScript Functions", course: "Introduction to JavaScript", date: "Today, 2:30 PM", status: "completed" },
    { lesson: "CSS Grid Layout", course: "Web Design Fundamentals", date: "Yesterday, 4:15 PM", status: "completed" },
    { lesson: "Python Variables", course: "Python for Beginners", date: "3 days ago", status: "completed" },
    { lesson: "JavaScript Arrays", course: "Introduction to JavaScript", date: "3 days ago", status: "completed" }
  ]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const overallProgress = Math.round((stats.completedLessons / stats.totalLessons) * 100);

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen className="text-blue-600" size={32} />
            <div>
              <h1 className="text-xl font-bold">Educore LMS</h1>
              <p className="text-xs text-gray-500">Student Portal</p>
            </div>
          </div>

          <div className="mb-6">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-2">
              <span className="text-blue-600 font-bold text-lg">
                {user?.fullName?.charAt(0) || 'S'}
              </span>
            </div>
            <p className="font-semibold text-gray-800">{user?.fullName || 'Student'}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => navigate("/dashboard")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <TrendingUp size={20} />
              Dashboard
            </button>
            <button 
              onClick={() => navigate("/my-courses")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <BookOpen size={20} />
              My Courses
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
              <Award size={20} />
              My Progress
            </button>
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Header */}
          <div className="mb-8">
            <button 
              onClick={() => navigate("/dashboard")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft size={20} />
              Back to Dashboard
            </button>
            <h2 className="text-3xl font-bold text-gray-800">My Progress</h2>
            <p className="text-gray-500 mt-1">Track your learning journey and achievements</p>
          </div>

          {/* Overall Stats */}
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 mb-8 text-white">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-2">Overall Progress</h3>
                <p className="text-blue-100">Keep up the great work!</p>
              </div>
              <Trophy size={48} className="opacity-80" />
            </div>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>{stats.completedLessons}/{stats.totalLessons} lessons completed</span>
                <span className="font-bold">{overallProgress}%</span>
              </div>
              <div className="w-full bg-white bg-opacity-30 rounded-full h-4">
                <div 
                  className="bg-white h-4 rounded-full transition-all"
                  style={{ width: `${overallProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="text-green-600" size={20} />
                </div>
                <p className="text-gray-500 text-sm">Completed</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.completedCourses}/{stats.totalCourses}</p>
              <p className="text-xs text-gray-500 mt-1">Courses finished</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Target className="text-blue-600" size={20} />
                </div>
                <p className="text-gray-500 text-sm">Study Time</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.totalHours}h</p>
              <p className="text-xs text-gray-500 mt-1">Total hours</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                  <Calendar className="text-orange-600" size={20} />
                </div>
                <p className="text-gray-500 text-sm">Streak</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.streakDays}</p>
              <p className="text-xs text-gray-500 mt-1">Day streak</p>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Trophy className="text-purple-600" size={20} />
                </div>
                <p className="text-gray-500 text-sm">Certificates</p>
              </div>
              <p className="text-2xl font-bold text-gray-800">{stats.certificatesEarned}</p>
              <p className="text-xs text-gray-500 mt-1">Earned</p>
            </div>
          </div>

          {/* Course Progress */}
          <div className="bg-white rounded-xl shadow p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Course Progress</h3>
            <div className="space-y-4">
              {courseProgress.map((course) => (
                <div key={course.id} className="border-b pb-4 last:border-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-800">{course.title}</h4>
                      <p className="text-xs text-gray-500">Last activity: {course.lastActivity}</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      course.status === "completed" ? "bg-green-100 text-green-700" :
                      course.status === "in-progress" ? "bg-blue-100 text-blue-700" :
                      "bg-gray-100 text-gray-700"
                    }`}>
                      {course.status === "completed" ? "Completed" :
                       course.status === "in-progress" ? "In Progress" :
                       "Not Started"}
                    </span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <div className="flex justify-between text-sm text-gray-600 mb-1">
                        <span>{course.completedLessons}/{course.totalLessons} lessons</span>
                        <span className="font-semibold">{course.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all ${
                            course.progress === 100 ? 'bg-green-500' : 'bg-blue-600'
                          }`}
                          style={{ width: `${course.progress}%` }}
                        />
                      </div>
                    </div>
                    <button 
                      onClick={() => navigate(`/course/${course.id}`)}
                      className="text-blue-600 font-semibold text-sm hover:text-blue-700 whitespace-nowrap"
                    >
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
            <div className="space-y-4">
              {recentActivity.map((activity, idx) => (
                <div key={idx} className="flex items-center gap-4 pb-4 border-b last:border-0">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="text-green-600" size={20} />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{activity.lesson}</p>
                    <p className="text-sm text-gray-500">{activity.course}</p>
                  </div>
                  <p className="text-xs text-gray-400 whitespace-nowrap">{activity.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}