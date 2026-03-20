import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, TrendingUp, Award, Clock, 
  LogOut, Search, ChevronRight, Filter
} from "lucide-react";
import { coursesAPI, progressAPI } from "../services/api";
import { handleAPIError } from "../utils/errorHandler";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [myCourses, setMyCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("all");

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    setUser(userData);
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const data = await coursesAPI.getAll();
      
      // Simulate enrolled courses and progress (in real app, fetch from backend)
      const enrolled = data.courses.slice(0, 2).map(course => ({
        ...course,
        progress: Math.floor(Math.random() * 100),
        completedLessons: Math.floor(Math.random() * 10),
        totalLessons: 10
      }));
      
      setMyCourses(enrolled);
      setAllCourses(data.courses);
    } catch (err) {
      handleAPIError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const filteredCourses = allCourses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterCategory === "all" || course.category === filterCategory;
    return matchesSearch && matchesFilter;
  });

  const categories = [...new Set(allCourses.map(c => c.category))];
  const totalCompleted = myCourses.reduce((acc, c) => acc + c.completedLessons, 0);
  const totalLessons = myCourses.reduce((acc, c) => acc + c.totalLessons, 0);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

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
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-blue-50 text-blue-600 rounded-lg font-medium">
              <TrendingUp size={20} />
              Dashboard
            </button>
            <button 
              onClick={() => window.scrollTo({ top: document.getElementById('browse').offsetTop, behavior: 'smooth' })}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg"
            >
              <BookOpen size={20} />
              Browse Courses
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 text-gray-600 hover:bg-gray-50 rounded-lg">
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
            <h2 className="text-3xl font-bold text-gray-800">Welcome back, {user?.fullName?.split(' ')[0]}! 👋</h2>
            <p className="text-gray-500 mt-1">Continue your learning journey</p>
          </div>

          {error && (
            <div className="mb-6 bg-red-50 border-l-4 border-red-500 p-4 rounded">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-xl shadow p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">Courses Enrolled</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">{myCourses.length}</p>
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
                  <p className="text-gray-500 text-sm">Average Progress</p>
                  <p className="text-3xl font-bold text-gray-800 mt-2">
                    {myCourses.length > 0 
                      ? Math.round(myCourses.reduce((acc, c) => acc + c.progress, 0) / myCourses.length)
                      : 0}%
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Clock className="text-purple-600" size={24} />
                </div>
              </div>
            </div>
          </div>

          {/* My Courses */}
          {myCourses.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">My Courses</h3>
              <div className="grid gap-6">
                {myCourses.map((course) => (
                  <div 
                    key={course.id} 
                    className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer"
                    onClick={() => navigate(`/course/${course.id}`)}
                  >
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

                    <button 
                      className="mt-4 text-blue-600 font-semibold hover:text-blue-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate(`/course/${course.id}`);
                      }}
                    >
                      Continue Learning →
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Browse Courses */}
          <div id="browse">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-xl font-bold text-gray-800">Browse Courses</h3>
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
                  <option value="all">All Categories</option>
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Course Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCourses.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition cursor-pointer"
                  onClick={() => navigate(`/course/${course.id}`)}
                >
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-blue-600" size={24} />
                    </div>
                  </div>
                  <h4 className="font-bold text-gray-800 mb-2">{course.title}</h4>
                  <p className="text-sm text-gray-500 mb-2">{course.description}</p>
                  <span className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs mb-4">
                    {course.category}
                  </span>
                  <button className="w-full text-blue-600 font-semibold hover:text-blue-700 text-sm">
                    View Course →
                  </button>
                </div>
              ))}
            </div>

            {filteredCourses.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500">No courses found matching your search.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}