import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, TrendingUp, Award, Clock, LogOut, 
  Search, Filter, ChevronRight, ArrowLeft
} from "lucide-react";

export default function MyCourses() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const [myCourses] = useState([
    {
      id: 1,
      title: "Introduction to JavaScript",
      category: "Programming",
      description: "Learn the fundamentals of JavaScript programming",
      totalLessons: 12,
      completedLessons: 8,
      progress: 67,
      lastAccessed: "2 hours ago",
      status: "in-progress"
    },
    {
      id: 2,
      title: "Web Design Fundamentals",
      category: "Design",
      description: "Master the basics of modern web design",
      totalLessons: 8,
      completedLessons: 8,
      progress: 100,
      lastAccessed: "1 day ago",
      status: "completed"
    },
    {
      id: 3,
      title: "Python for Beginners",
      category: "Programming",
      description: "Start your Python programming journey",
      totalLessons: 10,
      completedLessons: 2,
      progress: 20,
      lastAccessed: "3 days ago",
      status: "in-progress"
    },
    {
      id: 4,
      title: "React Advanced Patterns",
      category: "Frontend",
      description: "Advanced React concepts and patterns",
      totalLessons: 15,
      completedLessons: 0,
      progress: 0,
      lastAccessed: "5 days ago",
      status: "not-started"
    }
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

  const filteredCourses = myCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = 
      filterStatus === "all" || 
      (filterStatus === "completed" && course.status === "completed") ||
      (filterStatus === "in-progress" && course.status === "in-progress") ||
      (filterStatus === "not-started" && course.status === "not-started");
    return matchesSearch && matchesFilter;
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case "completed":
        return <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">Completed</span>;
      case "in-progress":
        return <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">In Progress</span>;
      case "not-started":
        return <span className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-semibold">Not Started</span>;
      default:
        return null;
    }
  };

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
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
              <BookOpen size={20} />
              My Courses
            </button>
            <button 
              onClick={() => navigate("/progress")}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <Award size={20} />
              My Progress
            </button>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </nav>
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
            <h2 className="text-3xl font-bold text-gray-800">My Courses</h2>
            <p className="text-gray-500 mt-1">Manage and track your enrolled courses</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">Total Enrolled</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{myCourses.length}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">Completed</p>
              <p className="text-3xl font-bold text-green-600 mt-2">
                {myCourses.filter(c => c.status === "completed").length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">In Progress</p>
              <p className="text-3xl font-bold text-blue-600 mt-2">
                {myCourses.filter(c => c.status === "in-progress").length}
              </p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">Avg Progress</p>
              <p className="text-3xl font-bold text-purple-600 mt-2">
                {Math.round(myCourses.reduce((acc, c) => acc + c.progress, 0) / myCourses.length)}%
              </p>
            </div>
          </div>

          {/* Search & Filter */}
          <div className="flex gap-4 mb-6">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="Search your courses..."
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="pl-10 pr-8 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
              >
                <option value="all">All Courses</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="not-started">Not Started</option>
              </select>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="grid gap-6">
            {filteredCourses.map((course) => (
              <div 
                key={course.id}
                className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/course/${course.id}`)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                      {getStatusBadge(course.status)}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{course.description}</p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <BookOpen size={16} />
                        {course.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock size={16} />
                        Last accessed {course.lastAccessed}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="text-gray-400 flex-shrink-0" size={24} />
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
                    <span className="font-semibold">{course.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3">
                    <div 
                      className={`h-3 rounded-full transition-all ${
                        course.progress === 100 ? 'bg-green-500' : 'bg-blue-600'
                      }`}
                      style={{ width: `${course.progress}%` }}
                    />
                  </div>
                </div>

                <button 
                  className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/course/${course.id}`);
                  }}
                >
                  {course.status === "not-started" ? "Start Course" : "Continue Learning"} →
                </button>
              </div>
            ))}
          </div>

          {filteredCourses.length === 0 && (
            <div className="text-center py-12 bg-white rounded-xl shadow">
              <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
              <p className="text-gray-500">No courses found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}