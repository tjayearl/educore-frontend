import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { BookOpen, User, LogOut, Clock, Award, PlayCircle } from "lucide-react";
import { coursesAPI } from "../services/api";

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }

    // Fetch courses
    const fetchCourses = async () => {
      try {
        const data = await coursesAPI.getAll();
        setCourses(data);
      } catch (err) {
        console.error("Failed to load courses", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-sm px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="text-blue-600" size={28} />
          <span className="text-xl font-bold text-gray-800">Educore</span>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
              {user.fullName ? user.fullName[0] : "U"}
            </div>
            <span className="text-gray-700 font-medium">{user.fullName}</span>
          </div>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 text-gray-500 hover:text-red-600 transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.fullName}!</h1>
          <p className="text-gray-500 mt-1">Pick up where you left off</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
            <div className="flex items-center gap-4">
              <div className="bg-white/20 p-3 rounded-lg"><BookOpen size={24} /></div>
              <div>
                <p className="text-blue-100 text-sm">Available Courses</p>
                <p className="text-2xl font-bold">{courses.length}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-green-100 p-3 rounded-lg text-green-600"><Clock size={24} /></div>
              <div>
                <p className="text-gray-500 text-sm">Hours Spent</p>
                <p className="text-2xl font-bold text-gray-800">12.5</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 p-3 rounded-lg text-purple-600"><Award size={24} /></div>
              <div>
                <p className="text-gray-500 text-sm">Certificates</p>
                <p className="text-2xl font-bold text-gray-800">2</p>
              </div>
            </div>
          </div>
        </div>

        {/* Course List */}
        <h2 className="text-xl font-bold text-gray-800 mb-6">Available Courses</h2>
        {loading ? (
          <p>Loading courses...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div key={course.id} className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                <div className="h-32 bg-gray-200 w-full relative">
                   {/* Placeholder for course image */}
                   <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                     <BookOpen size={40} />
                   </div>
                </div>
                <div className="p-6">
                  <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">{course.category}</span>
                  <h3 className="text-lg font-bold text-gray-800 mt-2 mb-2">{course.title}</h3>
                  <p className="text-gray-500 text-sm line-clamp-2 mb-4">{course.description}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <span className="text-xs text-gray-400">{course.lessons} Lessons</span>
                    <Link to={`/course/${course.id}`} className="text-blue-600 font-semibold text-sm flex items-center gap-1 hover:underline">
                      Start Learning <PlayCircle size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}