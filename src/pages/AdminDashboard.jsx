import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  BookOpen, Users, Activity, Plus, LogOut, 
  LayoutDashboard, X, FileText, Video, Trash2, ArrowLeft, Settings
} from "lucide-react";
import { coursesAPI, lessonsAPI } from "../services/api";
import { handleAPIError, showToast } from "../utils/errorHandler";

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [showCourseModal, setShowCourseModal] = useState(false);
  const [showLessonModal, setShowLessonModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const [viewingCourse, setViewingCourse] = useState(null);

  // Initialize ALL state at the top
  const [courses, setCourses] = useState([]);
  const [activities, setActivities] = useState([]);
  const [courseLessons, setCourseLessons] = useState([]);
  const [loading, setLoading] = useState(true);

  const [courseForm, setCourseForm] = useState({
    title: "",
    description: "",
    category: ""
  });

  const [lessonForm, setLessonForm] = useState({
    title: "",
    contentType: "text",
    contentUrl: "",
    contentBody: ""
  });

  useEffect(() => {
    const storedAdmin = localStorage.getItem("adminUser");
    if (!storedAdmin) {
      navigate("/admin/login");
      return;
    }
    setAdminUser(JSON.parse(storedAdmin));

    const loadData = async () => {
        try {
            setLoading(true);
            const coursesData = await coursesAPI.getAll();
            setCourses(Array.isArray(coursesData) ? coursesData : (coursesData.courses || []));
            const activityData = await activitiesAPI.getAll();
            setActivities(Array.isArray(activityData) ? activityData : (activityData.activities || []));
        } catch (error) {
            handleAPIError(error);
        } finally {
            setLoading(false);
        }
    };
    loadData();
  }, [navigate]);

  const handleManageCourse = async (course) => {
    setViewingCourse(course);
    setLoading(true);
    try {
        const lessons = await lessonsAPI.getAll(course.id);
        setCourseLessons(Array.isArray(lessons) ? lessons : (lessons.lessons || []));
    } catch (err) {
        handleAPIError(err);
    } finally {
        setLoading(false);
    }
  };

  const handleDeleteCourse = async (id, e) => {
    e.stopPropagation();
    if(!window.confirm("Are you sure you want to delete this course? This action cannot be undone.")) return;
    
    try {
        await coursesAPI.delete(id);
        setCourses(courses.filter(c => c.id !== id));
        if(viewingCourse?.id === id) setViewingCourse(null);
        showToast("Course deleted successfully", "success");
    } catch (err) {
        handleAPIError(err);
    }
  };

  const handleCreateCourse = async (e) => {
    e.preventDefault();
    try {
      const data = await coursesAPI.create(
        courseForm.title,
        courseForm.description,
        courseForm.category
      );
      setCourses([...courses, data.course || data]); // Handle if backend returns {course: ...} or just ...
      setCourseForm({ title: "", description: "", category: "" });
      setShowCourseModal(false);
      showToast("Course created successfully", "success");
    } catch (err) {
      handleAPIError(err);
    }
  };

  const handleAddLesson = async (e) => {
    e.preventDefault();
    try {
      const targetCourseId = viewingCourse ? viewingCourse.id : selectedCourse;
      await lessonsAPI.create(
        targetCourseId,
        lessonForm.title,
        lessonForm.contentType,
        lessonForm.contentUrl,
        lessonForm.contentBody
      );
      
      if (viewingCourse) {
        const lessons = await lessonsAPI.getAll(viewingCourse.id);
        setCourseLessons(Array.isArray(lessons) ? lessons : (lessons.lessons || []));
      }
      
      // Refresh courses to update lesson count
      const coursesData = await coursesAPI.getAll();
      setCourses(Array.isArray(coursesData) ? coursesData : (coursesData.courses || []));

      setLessonForm({ title: "", contentType: "text", contentUrl: "", contentBody: "" });
      setShowLessonModal(false);
      showToast("Lesson added successfully", "success");
    } catch (err) {
      handleAPIError(err);
    }
  };

  const handleDeleteLesson = async (lessonId) => {
    if(!window.confirm("Delete this lesson?")) return;
    try {
        await lessonsAPI.delete(viewingCourse.id, lessonId);
        setCourseLessons(courseLessons.filter(l => l.id !== lessonId));
        showToast("Lesson deleted successfully", "success");
        
        // Refresh courses to update lesson count
        const coursesData = await coursesAPI.getAll();
        setCourses(Array.isArray(coursesData) ? coursesData : (coursesData.courses || []));
    } catch (err) {
        handleAPIError(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("adminUser");
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-slate-800 text-white">
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <BookOpen size={32} />
            <div>
              <h1 className="text-xl font-bold">Educore Admin</h1>
              <p className="text-xs text-slate-300">Admin Panel</p>
            </div>
          </div>

          <nav className="space-y-2">
            <button
              onClick={() => { setActiveTab("dashboard"); setViewingCourse(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "dashboard" ? "bg-slate-700" : "hover:bg-slate-700"
              }`}
            >
              <LayoutDashboard size={20} />
              Dashboard
            </button>
            <button
              onClick={() => { setActiveTab("courses"); setViewingCourse(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "courses" ? "bg-slate-700" : "hover:bg-slate-700"
              }`}
            >
              <BookOpen size={20} />
              My Courses
            </button>
            <button
              onClick={() => { setActiveTab("activities"); setViewingCourse(null); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                activeTab === "activities" ? "bg-slate-700" : "hover:bg-slate-700"
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
            className="w-full flex items-center gap-2 px-4 py-3 bg-red-600 hover:bg-red-700 rounded-lg transition"
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
            <h2 className="text-3xl font-bold text-gray-800">
              {activeTab === "dashboard" && "Dashboard Overview"}
              {activeTab === "courses" && "My Courses"}
              {activeTab === "activities" && "User Activities"}
            </h2>
            <p className="text-gray-500 mt-1">Welcome back, {adminUser?.fullName || 'Admin'}</p>
          </div>

          {/* Dashboard Tab */}
          {activeTab === "dashboard" && (
            <div className="grid grid-cols-3 gap-6">
              <div className="bg-white rounded-xl shadow p-6">
                <p className="text-gray-500 text-sm">Total Courses</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">{courses.length}</p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <p className="text-gray-500 text-sm">Total Students</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">-</p>
              </div>
              <div className="bg-white rounded-xl shadow p-6">
                <p className="text-gray-500 text-sm">Total Lessons</p>
                <p className="text-3xl font-bold text-gray-800 mt-2">
                  {courses.reduce((sum, c) => sum + (c.lessons || 0), 0)}
                </p>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === "courses" && (
            <>
              {viewingCourse ? (
                // Course Detail / Manage View
                <div className="space-y-6">
                  <button 
                    onClick={() => setViewingCourse(null)}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition"
                  >
                    <ArrowLeft size={20} /> Back to Courses
                  </button>

                  <div className="bg-white rounded-xl shadow p-6 border-l-4 border-blue-600">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-2xl font-bold text-gray-800">{viewingCourse.title}</h3>
                        <p className="text-gray-500 mt-2">{viewingCourse.description}</p>
                        <div className="mt-4 flex gap-3">
                          <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded">{viewingCourse.category}</span>
                          <span className="text-sm text-gray-500">{courseLessons.length} Lessons</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowLessonModal(true)}
                        className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                      >
                        <Plus size={18} /> Add Lesson
                      </button>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-gray-800">Lessons</h3>
                  {loading ? (
                    <p>Loading lessons...</p>
                  ) : courseLessons.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-xl border border-dashed border-gray-300">
                      <p className="text-gray-500">No lessons added yet.</p>
                    </div>
                  ) : (
                    <div className="bg-white rounded-xl shadow overflow-hidden">
                      {courseLessons.map((lesson, idx) => (
                        <div key={lesson.id} className="p-4 border-b last:border-0 flex justify-between items-center hover:bg-gray-50 transition">
                          <div className="flex items-center gap-4">
                            <span className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 text-gray-500 text-sm font-bold">
                              {idx + 1}
                            </span>
                            <div>
                              <p className="font-semibold text-gray-800">{lesson.title}</p>
                              <div className="flex items-center gap-2 text-xs text-gray-500 mt-0.5">
                                {lesson.contentType === 'video' ? <Video size={14}/> : <FileText size={14}/>}
                                <span className="capitalize">{lesson.contentType}</span>
                              </div>
                            </div>
                          </div>
                          <button 
                            onClick={() => handleDeleteLesson(lesson.id)}
                            className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition"
                            title="Delete Lesson"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                // Course List View
                <>
              <button 
                onClick={() => setShowCourseModal(true)}
                className="mb-6 flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
              >
                <Plus size={20} />
                Create New Course
              </button>

              <div className="grid gap-6">
                {courses.map((course) => (
                  <div key={course.id} className="bg-white rounded-xl shadow p-6 hover:shadow-lg transition">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800">{course.title}</h3>
                        <p className="text-sm text-gray-500 mt-1">{course.category}</p>
                        <div className="flex gap-4 mt-2 text-sm text-gray-600">
                          {/* <span>{course.students} students</span> */}
                          {/* <span>•</span> */}
                          <span>{course.lessons || 0} lessons</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleManageCourse(course)}
                          className="text-slate-600 hover:text-blue-600 p-2 rounded hover:bg-slate-100 flex items-center gap-1"
                        >
                          <Settings size={18} /> Manage
                        </button>
                        <button 
                          onClick={(e) => handleDeleteCourse(course.id, e)}
                          className="text-red-400 hover:text-red-600 p-2 rounded hover:bg-red-50"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
                </>
              )}
            </>
          )}

          {/* Activities Tab */}
          {activeTab === "activities" && (
            <div className="bg-white rounded-xl shadow p-6">
              <div className="space-y-4">
                {activities.length > 0 ? (
                  activities.map((activity, idx) => (
                    <div key={idx} className="flex justify-between border-b pb-4 last:border-0">
                      <div>
                        <p className="font-semibold text-gray-800">{activity.user_id || 'User'}</p>
                        <p className="text-sm text-gray-500">{activity.action} {activity.details ? `• ${activity.details}` : ''}</p>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(activity.created_at || Date.now()).toLocaleDateString()}</span>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-gray-500">
                    <Activity size={48} className="mx-auto mb-2 opacity-20" />
                    No activities recorded yet
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Course Modal */}
      {showCourseModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 m-4">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Create New Course</h3>
              <button onClick={() => setShowCourseModal(false)}>
                <X size={24} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input
                  type="text"
                  value={courseForm.title}
                  onChange={(e) => setCourseForm({...courseForm, title: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description *</label>
                <textarea
                  value={courseForm.description}
                  onChange={(e) => setCourseForm({...courseForm, description: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                <input
                  type="text"
                  value={courseForm.category}
                  onChange={(e) => setCourseForm({...courseForm, category: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="e.g., Programming, Design"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Create Course
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Add Lesson Modal */}
      {showLessonModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl w-full max-w-md p-6 m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Add Lesson</h3>
              <button onClick={() => setShowLessonModal(false)}>
                <X size={24} className="text-gray-400 hover:text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleAddLesson} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Lesson Title *</label>
                <input
                  type="text"
                  value={lessonForm.title}
                  onChange={(e) => setLessonForm({...lessonForm, title: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content Type *</label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setLessonForm({...lessonForm, contentType: "text", contentUrl: ""})}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg ${
                      lessonForm.contentType === "text" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <FileText size={20} />
                    <span className="font-semibold">Text</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setLessonForm({...lessonForm, contentType: "video", contentBody: ""})}
                    className={`flex items-center gap-3 p-4 border-2 rounded-lg ${
                      lessonForm.contentType === "video" ? "border-blue-500 bg-blue-50" : "border-gray-200"
                    }`}
                  >
                    <Video size={20} />
                    <span className="font-semibold">Video</span>
                  </button>
                </div>
              </div>

              {lessonForm.contentType === "video" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Video URL *</label>
                  <input
                    type="url"
                    value={lessonForm.contentUrl}
                    onChange={(e) => setLessonForm({...lessonForm, contentUrl: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    placeholder="https://youtube.com/..."
                    required
                  />
                </div>
              )}

              {lessonForm.contentType === "text" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Content Body *</label>
                  <textarea
                    value={lessonForm.contentBody}
                    onChange={(e) => setLessonForm({...lessonForm, contentBody: e.target.value})}
                    className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    rows="6"
                    required
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700"
              >
                Add Lesson
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}