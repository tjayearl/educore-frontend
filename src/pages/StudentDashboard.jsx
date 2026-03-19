import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, TrendingUp, Award, Clock, 
  LogOut, Search, ChevronRight 
} from "lucide-react";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([
    {
      id: 1,
      title: "Introduction to JavaScript",
      category: "Programming",
      totalLessons: 12,
      completedLessons: 8,
      progress: 67
    },
    {
      id: 2,
      title: "Web Design Fundamentals",
      category: "Design",
      totalLessons: 8,
      completedLessons: 3,
      progress: 38
    },
    {
      id: 3,
      title: "Python for Beginners",
      category: "Programming",
      totalLessons: 10,
      completedLessons: 0,
      progress: 0
    }
  ]);

  const [allCourses, setAllCourses] = useState([
    { id: 4, title: "Advanced React Patterns", category: "Programming", lessons: 15 },
    { id: 5, title: "UI/UX Design Principles", category: "Design", lessons: 12 },
    { id: 6, title: "Database Management", category: "Backend", lessons: 18 }
  ]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const totalCompleted = courses.reduce((acc, c) => acc + c.completedLessons, 0);
  const totalLessons = courses.reduce((acc, c) => acc + c.totalLessons, 0);

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

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
              <TrendingUp size={20} />
              Dashboard
            </button>
            <button 
              onClick={() => navigate("/courses")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <BookOpen size={20} />
              Browse Courses
            </button>
            <button 
              onClick={() => navigate("/profile")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
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
            <h2 className="text-3xl font-bold text-gray-800">Welcome back!</h2>
            <p className="text-gray-500 mt-1">Continue your learning journey</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Courses Enrolled</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{courses.length}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <BookOpen className="text-blue-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Lessons Completed</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{totalCompleted}/{totalLessons}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Award className="text-green-600" size={24} />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Study Time</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">24h</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* My Courses */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-gray-800 mb-4">My Courses</h3>
            <div className="grid gap-6">
              {courses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer"
                     onClick={() => navigate(`/course/${course.id}`)}>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="text-lg font-bold text-gray-800">{course.title}</h4>
                      <p className="text-sm text-gray-500">{course.category}</p>
                    </div>
                    <ChevronRight className="text-gray-400" />
                  </div>
                  
                  <div className="mb-2">
                    <div className="flex justify-between text-sm text-gray-600 mb-1">
                      <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${course.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Browse More Courses */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Browse More Courses</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCourses.map((course) => (
                <div key={course.id} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-blue-600" size={24} />
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{course.title}</h4>
                  <p className="text-sm text-gray-500 mb-4">{course.category}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">{course.lessons} lessons</span>
                    <button className="text-blue-600 text-sm font-semibold hover:text-blue-700">
                      Enroll →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}