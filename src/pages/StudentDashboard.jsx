import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, TrendingUp, Award, LogOut, Search, Filter,
  ChevronRight, User
} from "lucide-react";
import { coursesAPI } from "../services/api";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");
  
  const [stats] = useState({
    enrolledCourses: 3,
    completedLessons: 18,
    averageProgress: 67
  });

  const [myCourses] = useState([
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
      completedLessons: 8,
      progress: 100
    },
    {
      id: 3,
      title: "Python for Beginners",
      category: "Programming",
      totalLessons: 10,
      completedLessons: 2,
      progress: 20
    }
  ]);

  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || userData.role === "admin") {
      navigate("/login");
      return;
    }
    setUser(userData);
    loadAllCourses();
  }, [navigate]);

  const loadAllCourses = async () => {
    try {
      const data = await coursesAPI.getAll();
      setAllCourses(data.courses || []);
    } catch (err) {
      console.error("Error loading courses:", err);
      setAllCourses([]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === "all" || course.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ["all", "Programming", "Design", "Business", "Marketing", "Data Science"];

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
                {user?.full_name?.charAt(0) || 'S'}
              </span>
            </div>
            <p className="font-semibold text-gray-800">{user?.full_name || 'Student'}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>

          <nav className="space-y-2">
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
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
          {/* Welcome Section */}
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user?.full_name?.split(' ')[0]}! 👋</h2>
            <p className="text-gray-500 mt-1">Continue your learning journey</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">Courses Enrolled</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.enrolledCourses}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">Lessons Completed</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.completedLessons}</p>
            </div>
            <div className="bg-white rounded-xl shadow p-6">
              <p className="text-gray-500 text-sm">Average Progress</p>
              <p className="text-3xl font-bold text-gray-800 mt-2">{stats.averageProgress}%</p>
            </div>
          </div>

          {/* My Courses */}
          <div className="mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">My Courses</h3>
            <div className="grid gap-4">
              {myCourses.map((course) => (
                <div 
                  key={course.id}
                  onClick={() => navigate(`/course/${course.id}`)}
                  className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-gray-800">{course.title}</h4>
                      <span className="text-sm text-gray-500">{course.category}</span>
                    </div>
                    <ChevronRight className="text-gray-400" size={24} />
                  </div>
                  <div>
                    <div className="flex justify-between text-sm text-gray-600 mb-2">
                      <span>{course.completedLessons}/{course.totalLessons} lessons completed</span>
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
                </div>
              ))}
            </div>
          </div>

          {/* Browse Courses */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Browse Courses</h3>
            
            {/* Search & Filter */}
            <div className="flex gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Search courses..."
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="pl-10 pr-8 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none appearance-none bg-white"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>
                      {cat === "all" ? "All Categories" : cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.length === 0 ? (
                <div className="col-span-full text-center py-12 bg-white rounded-xl shadow">
                  <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-500">No courses found.</p>
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <div 
                    key={course.id}
                    onClick={() => navigate(`/course/${course.id}`)}
                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer"
                  >
                    <h4 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h4>
                    <p className="text-sm text-gray-600 mb-4">{course.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                        {course.category}
                      </span>
                      <button className="text-blue-600 font-semibold text-sm hover:text-blue-700">
                        View Course →
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}