import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, Users, GraduationCap, LogOut, Shield,
  Plus, X, Video, FileText, TrendingUp, Activity, Loader
} from "lucide-react";
import { coursesAPI, lessonsAPI, activitiesAPI } from "../services/api";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  
  // Stats
  const [stats, setStats] = useState({
    totalCourses: 0,
    totalStudents: 0,
    totalLessons: 0
  });

  // Courses
  const [courses, setCourses] = useState([]);
  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: "Programming"
  });
  const [courseError, setCourseError] = useState("");

  // Lessons
  const [lessonForm, setLessonForm] = useState({
    title: "",
    contentType: "video",
    contentUrl: "",
    contentBody: ""
  });
  const [lessonError, setLessonError] = useState("");

  // Activities
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData || userData.role !== "admin") {
      navigate("/admin/login");
      return;
    }
    setUser(userData);
    loadDashboardData();
  }, [navigate]);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      await loadCourses();
      if (activeTab === "activities") {
        await loadActivities();
      }
    } catch (err) {
      console.error("Error loading dashboard:", err);
    } finally {
      setLoading(false);
    }
  };

  const loadCourses = async () => {
    try {
      const data = await coursesAPI.getAll();
      setCourses(data.courses || []);
      
      // Calculate stats
      const totalLessons = data.courses?.reduce((sum, c) => sum + parseInt(c.total_lessons || 0), 0) || 0;
      setStats({
        totalCourses: data.courses?.length || 0,
        totalStudents: 248, // Mock data
        totalLessons
      });
    } catch (err) {
      console.error("Error loading courses:", err);
      setCourses([]);
    }
  };

  const loadActivities = async () => {
    try {
      const data = await activitiesAPI.getAll();
      setActivities(data.activities || []);
    } catch (err) {
      console.error("Error loading activities:", err);
      setActivities([]);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      await coursesAPI.create(
        courseForm.title,
        courseForm.description,
        courseForm.category
      );
      
      setShowCourseModal(false);
      setCourseForm({ title: "", description: "", category: "Programming" });
      await loadCourses();
    } catch (err) {
      setCourseError(err.message || "Failed to create course");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCreateLesson = async (e) => {
    e.preventDefault();
    setLessonError("");
    
    if (!lessonForm.title.trim()) {
      setLessonError("Title is required");
      return;
    }

    if (lessonForm.contentType === "video" && !lessonForm.contentUrl.trim()) {
      setLessonError("Video URL is required");
      return;
    }

    if (lessonForm.contentType === "text" && !lessonForm.contentBody.trim()) {
      setLessonError("Text content is required");
      return;
    }

    try {
      setSubmitting(true);
      await lessonsAPI.create(
        selectedCourse.id,
        lessonForm.title,
        lessonForm.contentType,
        lessonForm.contentUrl,
        lessonForm.contentBody
      );
      
      setShowLessonModal(false);
      setLessonForm({
        title: "",
        contentType: "video",
        contentUrl: "",
        contentBody: ""
      });
      await loadCourses();
    } catch (err) {
      setLessonError(err.message || "Failed to create lesson");
    } finally {
      setSubmitting(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/admin/login");
  };

  useEffect(() => {
    if (activeTab === "activities" && activities.length === 0) {
      loadActivities();
    }
  }, [activeTab]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-12 h-12 text-slate-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-slate-900 text-white">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <Shield className="text-slate-300" size={32} />
            <div>
              <h1 className="text-xl font-bold">Educore LMS</h1>
              <p className="text-xs text-slate-400">Admin Panel</p>
            </div>
          </div>

          <div className="mb-6 pb-6 border-b border-slate-700">
            <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-2">
              <span className="text-slate-300 font-bold text-lg">
                {user?.full_name?.charAt(0) || 'A'}
              </span>
            </div>
            <p className="font-semibold text-white">{user?.full_name || 'Admin'}</p>
            <p className="text-xs text-slate-400">{user?.email}</p>
          </div>

          <nav className="space-y-2">
            <button 
              onClick={() => setActiveTab("dashboard")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === "dashboard" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <TrendingUp size={20} />
              Dashboard
            </button>
            <button 
              onClick={() => setActiveTab("courses")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === "courses" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <BookOpen size={20} />
              My Courses
            </button>
            <button 
              onClick={() => setActiveTab("activities")}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg ${
                activeTab === "activities" ? "bg-slate-800 text-white" : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              <Activity size={20} />
              User Activities
            </button>
          </nav>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-8">
          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">Dashboard Overview</h2>
              
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <BookOpen className="text-blue-600" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total Courses</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.totalCourses}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Users className="text-green-600" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total Students</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.totalStudents}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow p-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <GraduationCap className="text-purple-600" size={24} />
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Total Lessons</p>
                      <p className="text-3xl font-bold text-gray-800">{stats.totalLessons}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h3>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowCourseModal(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    <Plus size={20} />
                    Create New Course
                  </button>
                  <button
                    onClick={() => setActiveTab("courses")}
                    className="flex items-center gap-2 px-6 py-3 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
                  >
                    <BookOpen size={20} />
                    View All Courses
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <>
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800">My Courses</h2>
                <button
                  onClick={() => setShowCourseModal(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                  <Plus size={20} />
                  Create New Course
                </button>
              </div>

              <div className="grid gap-6">
                {courses.length === 0 ? (
                  <div className="bg-white rounded-xl shadow p-12 text-center">
                    <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500 mb-4">No courses yet. Create your first course!</p>
                    <button
                      onClick={() => setShowCourseModal(true)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                      Create Course
                    </button>
                  </div>
                ) : (
                  courses.map((course) => (
                    <div key={course.id} className="bg-white rounded-xl shadow p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-gray-800 mb-2">{course.title}</h3>
                          <p className="text-gray-600 mb-2">{course.description}</p>
                          <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-semibold">
                            {course.category}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                        <span>{course.total_lessons || 0} lessons</span>
                        <span>•</span>
                        <span>Created {new Date(course.created_at).toLocaleDateString()}</span>
                      </div>
                      <button
                        onClick={() => {
                          setSelectedCourse(course);
                          setShowLessonModal(true);
                        }}
                        className="mt-4 w-full px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition"
                      >
                        Add Lesson
                      </button>
                    </div>
                  ))
                )}
              </div>
            </>
          )}

          {/* Activities Tab */}
          {activeTab === "activities" && (
            <>
              <h2 className="text-3xl font-bold text-gray-800 mb-8">User Activities</h2>
              <div className="bg-white rounded-xl shadow p-6">
                {activities.length === 0 ? (
                  <div className="text-center py-12">
                    <Activity className="mx-auto text-gray-400 mb-4" size={48} />
                    <p className="text-gray-500">No activities yet</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {activities.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-4 pb-4 border-b last:border-0">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          activity.success ? 'bg-green-100' : 'bg-red-100'
                        }`}>
                          <Activity className={activity.success ? 'text-green-600' : 'text-red-600'} size={20} />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            {activity.user_name || 'Unknown User'} - {activity.action.replace(/_/g, ' ')}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-gray-500 mt-1">
                            <span>{activity.user_email}</span>
                            <span>•</span>
                            <span>{new Date(activity.created_at).toLocaleString()}</span>
                            <span>•</span>
                            <span className={activity.success ? 'text-green-600' : 'text-red-600'}>
                              Status: {activity.status_code}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Create Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold">Create New Course</h3>
              <button onClick={() => {
                setShowCourseModal(false);
                setCourseError("");
              }}>
                <X className="text-gray-400 hover:text-gray-600" size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateCourse} className="p-6 space-y-4">
              {courseError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                  <p className="text-sm text-red-700">{courseError}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Course Title *</label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Introduction to JavaScript"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="3"
                  placeholder="Learn the fundamentals of JavaScript programming"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <select
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                >
                  <option value="Programming">Programming</option>
                  <option value="Design">Design</option>
                  <option value="Business">Business</option>
                  <option value="Marketing">Marketing</option>
                  <option value="Data Science">Data Science</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Creating...
                  </>
                ) : (
                  'Create Course'
                )}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
            <div className="flex items-center justify-between p-6 border-b">
              <h3 className="text-xl font-bold">Add Lesson to {selectedCourse?.title}</h3>
              <button onClick={() => {
                setShowLessonModal(false);
                setLessonError("");
              }}>
                <X className="text-gray-400 hover:text-gray-600" size={24} />
              </button>
            </div>
            <form onSubmit={handleCreateLesson} className="p-6 space-y-4">
              {lessonError && (
                <div className="bg-red-50 border-l-4 border-red-500 p-3 rounded">
                  <p className="text-sm text-red-700">{lessonError}</p>
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lesson Title *</label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({...lessonForm, title: e.target.value})}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="Variables and Data Types"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content Type *</label>
                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setLessonForm({...lessonForm, contentType: "video", contentBody: ""})}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 transition ${
                      lessonForm.contentType === "video" 
                        ? "border-blue-600 bg-blue-50 text-blue-600" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <Video size={20} />
                    Video
                  </button>
                  <button
                    type="button"
                    onClick={() => setLessonForm({...lessonForm, contentType: "text", contentUrl: ""})}
                    className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg border-2 transition ${
                      lessonForm.contentType === "text" 
                        ? "border-blue-600 bg-blue-50 text-blue-600" 
                        : "border-gray-300 hover:border-gray-400"
                    }`}
                  >
                    <FileText size={20} />
                    Text
                  </button>
                </div>
              </div>
              {lessonForm.contentType === "video" ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Video URL *</label>
                  <input
                    type="url"
                    value={lessonForm.contentUrl}
                    onChange={(e) => setLessonForm({...lessonForm, contentUrl: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://youtube.com/watch?v=..."
                    required
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Text Content *</label>
                  <textarea
                    value={lessonForm.contentBody}
                    onChange={(e) => setLessonForm({...lessonForm, contentBody: e.target.value})}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    rows="5"
                    placeholder="Write your lesson content here..."
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {submitting ? (
                  <>
                    <Loader className="animate-spin" size={20} />
                    Adding...
                  </>
                ) : (
                  'Add Lesson'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}