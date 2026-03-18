import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaUserGraduate, FaChalkboardTeacher, FaBook, FaClipboardList, FaRegFileAlt, FaBell, FaCog, FaSignOutAlt, FaChartLine, FaList, FaCheckCircle, FaPlusCircle, FaTools, FaSearch, FaPlus, FaEdit, FaTrash, FaEye, FaArrowLeft, FaVideo, FaFileAlt, FaLock, FaShieldAlt, FaLaptop, FaUserShield } from 'react-icons/fa';

function Admin() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("dashboard");

  // Mock Data: Students & Teachers (required for stats)
  const [students, setStudents] = useState([
    { id: 1, name: "Alice Johnson", email: "alice@example.com", class: "Mathematics 101" },
    { id: 2, name: "Bob Smith", email: "bob@example.com", class: "Physics Fundamentals" },
  ]);
  const [teachers, setTeachers] = useState([
    { id: 1, name: "Dr. Brown", subject: "Mathematics", email: "brown@edu.com" },
    { id: 2, name: "Prof. Davis", subject: "Physics", email: "davis@edu.com" },
  ]);

  // Activity Log State
  const [activities, setActivities] = useState([
    { id: 1, user: "Alice Johnson", type: "Logged in", course: "-", lesson: "-", time: "2023-10-26 09:00 AM" },
    { id: 2, user: "Bob Smith", type: "Viewed a lesson", course: "Physics Fundamentals", lesson: "Newton's Laws", time: "2023-10-26 09:15 AM" },
    { id: 3, user: "Alice Johnson", type: "Submitted assignment", course: "Mathematics 101", lesson: "Algebra HW1", time: "2023-10-26 10:30 AM" },
    { id: 4, user: "Bob Smith", type: "Took an exam", course: "Physics Fundamentals", lesson: "Midterm", time: "2023-10-26 11:00 AM" },
  ]);

  // Course State
  const [courses, setCourses] = useState([
    { id: 1, title: "Mathematics 101", description: "Introduction to Algebra", category: "Math", contentType: "text", content: "Welcome to Math 101", createdDate: "2023-08-15", lessons: [
        { id: 101, title: "Algebra Basics", type: "text", content: "Introduction to variables..." },
        { id: 102, title: "Linear Equations", type: "video", content: "http://video.url/123" }
    ] },
    { id: 2, title: "Physics Fundamentals", description: "Basics of Physics", category: "Science", contentType: "video", content: "http://physics.com/intro", createdDate: "2023-09-01", lessons: [] },
  ]);
  
  // Course Form State
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDescription, setCourseDescription] = useState("");
  const [courseCategory, setCourseCategory] = useState("");
  const [courseContentType, setCourseContentType] = useState("text");
  const [courseContent, setCourseContent] = useState("");
  const [showClassForm, setShowClassForm] = useState(false);
  const [classSearch, setClassSearch] = useState("");
  const [editingClassId, setEditingClassId] = useState(null);

  // Lesson Management State
  const [viewingCourse, setViewingCourse] = useState(null); // The course currently being managed
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonType, setLessonType] = useState("text"); // 'text' or 'video'
  const [lessonContent, setLessonContent] = useState("");

  // Settings State
  const [settingsTab, setSettingsTab] = useState("profile");
  const [adminProfile, setAdminProfile] = useState({
    name: "Admin User",
    email: "admin@educore.com",
    role: "Super Admin",
    bio: "Administrator account for system management."
  });
  const [passwordData, setPasswordData] = useState({ current: "", new: "", confirm: "" });
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [platformSettings, setPlatformSettings] = useState({
    theme: "light",
    notifications: true,
    defaultLessonType: "text"
  });
  const [sessions, setSessions] = useState([
    { id: 1, device: "Chrome on Windows", ip: "192.168.1.10", lastActive: "Now", current: true },
    { id: 2, device: "Safari on iPhone", ip: "192.168.1.15", lastActive: "2 hours ago", current: false }
  ]);
  const [adminUsers, setAdminUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@educore.com", role: "Super Admin" },
    { id: 2, name: "Support Staff", email: "support@educore.com", role: "Moderator" }
  ]);
  const [newAdminEmail, setNewAdminEmail] = useState("");

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: <FaHome /> },
    { id: "classes", label: "Courses", icon: <FaBook /> },
    { id: "activities", label: "Activity Log", icon: <FaList /> },
    { id: "students", label: "Students", icon: <FaUserGraduate /> },
    { id: "teachers", label: "Teachers", icon: <FaChalkboardTeacher /> },
    { id: "settings", label: "Settings", icon: <FaCog /> },
  ];

  const stats = [
    { label: "Total Students", value: students.length, color: "text-blue-600", border: "border-blue-600" },
    { label: "Total Teachers", value: teachers.length, color: "text-green-600", border: "border-green-600" },
    { label: "Total Courses", value: courses.length, color: "text-purple-600", border: "border-purple-600" },
    { label: "Activities Today", value: activities.length, color: "text-yellow-600", border: "border-yellow-600" },
  ];

  // --- Course Handlers ---

  const handleSaveClass = () => {
    if (!courseTitle || !courseDescription || !courseCategory || !courseContent) {
      alert("Please fill in all required fields (Title, Description, Category, Content).");
      return;
    }

    const newCourse = { 
      id: editingClassId || Date.now(), 
      title: courseTitle, 
      description: courseDescription, 
      category: courseCategory,
      contentType: courseContentType,
      content: courseContent,
      createdDate: new Date().toISOString().split('T')[0],
      lessons: editingClassId ? courses.find(c => c.id === editingClassId).lessons : [] 
    };

    if (editingClassId) {
      setCourses(courses.map(c => c.id === editingClassId ? newCourse : c));
    } else {
      setCourses([...courses, newCourse]);
    }
    resetClassForm();
  };

  const handleEditClass = (course) => {
    setEditingClassId(course.id);
    setCourseTitle(course.title);
    setCourseDescription(course.description);
    setCourseCategory(course.category);
    setCourseContentType(course.contentType || "text");
    setCourseContent(course.content || "");
    setShowClassForm(true);
  };

  const handleDeleteClass = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      setCourses(courses.filter(c => c.id !== id));
      if (viewingCourse && viewingCourse.id === id) {
          setViewingCourse(null);
      }
    }
  };

  const resetClassForm = () => {
    setCourseTitle("");
    setCourseDescription("");
    setCourseCategory("");
    setCourseContentType("text");
    setCourseContent("");
    setEditingClassId(null);
    setShowClassForm(false);
  };

  // --- Lesson Handlers ---

  const handleViewLessons = (course) => {
      setViewingCourse(course);
      setShowClassForm(false);
  };

  const handleAddLesson = () => {
      if (!lessonTitle || !lessonContent) {
          alert("Please provide a title and content for the lesson.");
          return;
      }
      
      const newLesson = {
          id: Date.now(),
          title: lessonTitle,
          type: lessonType,
          content: lessonContent
      };

      const updatedCourse = {
          ...viewingCourse,
          lessons: [...viewingCourse.lessons, newLesson]
      };

      // Update local view state
      setViewingCourse(updatedCourse);
      
      // Update global courses state
      setCourses(courses.map(c => c.id === viewingCourse.id ? updatedCourse : c));

      // Reset form
      setLessonTitle("");
      setLessonContent("");
      setLessonType("text");
  };

  const handleDeleteLesson = (lessonId) => {
      if(!window.confirm("Delete this lesson?")) return;

      const updatedCourse = {
          ...viewingCourse,
          lessons: viewingCourse.lessons.filter(l => l.id !== lessonId)
      };

      setViewingCourse(updatedCourse);
      setCourses(courses.map(c => c.id === viewingCourse.id ? updatedCourse : c));
  };

  // --- Settings Handlers ---
  
  const handleProfileUpdate = (e) => {
    e.preventDefault();
    alert("Profile updated successfully (Simulation).");
  };

  const handlePasswordUpdate = (e) => {
    e.preventDefault();
    if (passwordData.new !== passwordData.confirm) {
      alert("New passwords do not match.");
      return;
    }
    alert("Password changed successfully (Simulation).");
    setPasswordData({ current: "", new: "", confirm: "" });
  };

  const handleLogoutSession = (id) => {
      if(window.confirm("Force logout this session?")) {
          setSessions(sessions.filter(s => s.id !== id));
      }
  };

  const handleAddAdmin = () => {
      if(!newAdminEmail) return;
      setAdminUsers([...adminUsers, { id: Date.now(), name: "New Admin", email: newAdminEmail, role: "Editor" }]);
      setNewAdminEmail("");
      alert("Invitation sent to " + newAdminEmail);
  }

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-lg flex flex-col">
        <div className="h-16 flex items-center justify-center border-b border-gray-200">
          <h2 className="text-2xl font-bold text-blue-700">EduCore Admin</h2>
        </div>
        <nav className="flex-1 py-4">
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li
                key={item.id}
                onClick={() => { setActiveTab(item.id); setViewingCourse(null); if (item.id === 'settings') setSettingsTab('profile'); }}
                className={`px-6 py-3 cursor-pointer transition-colors capitalize ${
                  activeTab === item.id
                    ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                <span className="mr-3">{item.icon}</span> {item.label}
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={handleLogout} className="w-full bg-red-50 text-red-600 hover:bg-red-100 py-2 rounded transition flex items-center justify-center gap-2">
            <FaSignOutAlt /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        
        {/* DASHBOARD TAB */}
        {activeTab === "dashboard" && (
          <section>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, idx) => (
                <div key={idx} className={`bg-white p-6 rounded-lg shadow-md border-l-4 ${stat.border}`}>
                  <p className="text-gray-500">{stat.label}</p>
                  <p className={`text-3xl font-bold ${stat.color}`}>{stat.value}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-800">Recent User Activity</h3>
                <button onClick={() => setActiveTab("activities")} className="text-blue-600 hover:text-blue-800 text-sm font-semibold">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full leading-normal">
                    <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Activity Type</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course / Lesson</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {activities.slice(0, 5).map(act => (
                            <tr key={act.id} className="hover:bg-gray-50">
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-bold text-gray-700">{act.user}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                    <span className="bg-blue-100 text-blue-800 py-1 px-2 rounded-full text-xs">{act.type}</span>
                                </td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-600">{act.course} {act.lesson !== '-' ? `/ ${act.lesson}` : ''}</td>
                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-500">{act.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
              </div>
            </div>
          </section>
        )}

        {/* COURSES TAB */}
        {activeTab === "classes" && (
          <section>
            {!viewingCourse ? (
                <>
                    <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
                    <div className="flex gap-4">
                        <div className="relative">
                        <input 
                            type="text" 
                            placeholder="Search courses..." 
                            className="pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                            value={classSearch}
                            onChange={(e) => setClassSearch(e.target.value)}
                        />
                        <FaSearch className="absolute left-3 top-3 text-gray-400" />
                        </div>
                        <button onClick={() => setShowClassForm(!showClassForm)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                        <FaPlus /> {showClassForm ? "Close Form" : "Create Course"}
                        </button>
                    </div>
                    </div>

                    {/* Add/Edit Course Form */}
                    {showClassForm && (
                    <div className="bg-white p-6 rounded-lg shadow-md mb-8 border-l-4 border-blue-600">
                        <h3 className="text-xl font-semibold text-gray-700 mb-4">{editingClassId ? "Edit Course" : "Create New Course"}</h3>
                        <div className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Course Title</label>
                                    <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="text" placeholder="e.g. Mathematics 101" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Category</label>
                                    <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="text" placeholder="e.g. Math, Science, History" value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)} />
                                </div>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">Content Type</label>
                                    <select 
                                        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" 
                                        value={courseContentType} 
                                        onChange={(e) => setCourseContentType(e.target.value)}
                                    >
                                        <option value="text">Text</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-gray-700 text-sm font-bold mb-2">{courseContentType === 'video' ? 'Content URL' : 'Content Body'}</label>
                                    {courseContentType === 'video' ? (
                                        <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="text" placeholder="Video URL" value={courseContent} onChange={(e) => setCourseContent(e.target.value)} />
                                    ) : (
                                        <textarea className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" rows="1" placeholder="Content body..." value={courseContent} onChange={(e) => setCourseContent(e.target.value)} />
                                    )}
                                </div>
                            </div>
                            <div>
                                <label className="block text-gray-700 text-sm font-bold mb-2">Description</label>
                                <textarea className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" rows="3" placeholder="Course description..." value={courseDescription} onChange={(e) => setCourseDescription(e.target.value)}></textarea>
                            </div>
                        </div>
                        <div className="flex gap-2 mt-4">
                        <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={handleSaveClass}>{editingClassId ? "Update Course" : "Create Course"}</button>
                        <button className="px-6 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition" onClick={resetClassForm}>Cancel</button>
                        </div>
                    </div>
                    )}

                    {/* Courses Table */}
                    <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full leading-normal">
                        <thead>
                        <tr>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Title</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Category</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Created Date</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Lessons</th>
                            <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {courses.filter(c => c.title.toLowerCase().includes(classSearch.toLowerCase())).map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50">
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium text-blue-600">{c.title}</td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-700">{c.category}</td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-500">{c.createdDate}</td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-700">{c.lessons.length}</td>
                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm flex gap-2">
                                <button onClick={() => handleViewLessons(c)} className="text-gray-500 hover:text-blue-600 bg-gray-100 p-2 rounded flex items-center gap-1"><FaEye /> Manage Lessons</button>
                                <button onClick={() => handleEditClass(c)} className="text-blue-500 hover:text-blue-700 bg-blue-50 p-2 rounded"><FaEdit /></button>
                                <button onClick={() => handleDeleteClass(c.id)} className="text-red-500 hover:text-red-700 bg-red-50 p-2 rounded"><FaTrash /></button>
                            </td>
                            </tr>
                        ))}
                        {courses.length === 0 && (
                            <tr>
                            <td colSpan="5" className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-center text-gray-500">No courses found.</td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    </div>
                </>
            ) : (
                /* LESSON MANAGEMENT VIEW */
                <div className="space-y-6">
                    <button onClick={() => setViewingCourse(null)} className="flex items-center text-gray-600 hover:text-blue-600 mb-4 transition">
                        <FaArrowLeft className="mr-2" /> Back to Courses
                    </button>
                    
                    <div className="bg-white p-6 rounded-lg shadow-md border-t-4 border-blue-600">
                        <h2 className="text-2xl font-bold text-gray-800 mb-2">{viewingCourse.title}</h2>
                        <p className="text-gray-600 mb-4">{viewingCourse.description}</p>
                        <div className="flex gap-4 text-sm text-gray-500">
                            <span className="bg-gray-100 px-3 py-1 rounded-full">Category: {viewingCourse.category}</span>
                            <span className="bg-gray-100 px-3 py-1 rounded-full">Lessons: {viewingCourse.lessons.length}</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Lesson List */}
                        <div className="lg:col-span-2">
                            <h3 className="text-xl font-bold text-gray-800 mb-4">Course Lessons</h3>
                            <div className="bg-white rounded-lg shadow overflow-hidden">
                                {viewingCourse.lessons.length === 0 ? (
                                    <div className="p-8 text-center text-gray-500">No lessons added yet. Use the form to add one.</div>
                                ) : (
                                    <table className="min-w-full">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lesson Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200">
                                            {viewingCourse.lessons.map(lesson => (
                                                <tr key={lesson.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{lesson.title}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex items-center gap-2">
                                                        {lesson.type === 'video' ? <FaVideo className="text-red-500"/> : <FaFileAlt className="text-blue-500"/>}
                                                        {lesson.type}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                        <button onClick={() => handleDeleteLesson(lesson.id)} className="text-red-600 hover:text-red-900">Delete</button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>
                        </div>

                        {/* Add Lesson Form */}
                        <div>
                            <div className="bg-white p-6 rounded-lg shadow-md">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Add Lesson</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Title</label>
                                        <input 
                                            type="text" 
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                            value={lessonTitle}
                                            onChange={(e) => setLessonTitle(e.target.value)}
                                            placeholder="e.g. Introduction"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Content Type</label>
                                        <select 
                                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                            value={lessonType}
                                            onChange={(e) => setLessonType(e.target.value)}
                                        >
                                            <option value="text">Text / Article</option>
                                            <option value="video">Video</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">
                                            {lessonType === 'video' ? 'Video URL' : 'Body Text'}
                                        </label>
                                        {lessonType === 'video' ? (
                                            <input 
                                                type="text" 
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                                value={lessonContent}
                                                onChange={(e) => setLessonContent(e.target.value)}
                                                placeholder="https://..."
                                            />
                                        ) : (
                                            <textarea 
                                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
                                                rows="4"
                                                value={lessonContent}
                                                onChange={(e) => setLessonContent(e.target.value)}
                                                placeholder="Lesson content goes here..."
                                            />
                                        )}
                                    </div>
                                    <button 
                                        onClick={handleAddLesson}
                                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition flex justify-center items-center gap-2"
                                    >
                                        <FaPlusCircle /> Add Lesson
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
          </section>
        )}

        {/* ACTIVITIES TAB */}
        {activeTab === "activities" && (
            <section>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">User Activity Monitoring</h1>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="p-4 border-b border-gray-200 bg-gray-50 flex justify-between items-center">
                        <span className="text-gray-500 text-sm">Showing all activities</span>
                        <div className="flex gap-2">
                            <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">Filter by User</button>
                            <button className="px-3 py-1 bg-white border border-gray-300 rounded text-sm text-gray-600 hover:bg-gray-50">Filter by Type</button>
                        </div>
                    </div>
                    <table className="min-w-full leading-normal">
                        <thead>
                            <tr>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">User Name</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Activity Type</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Course / Lesson</th>
                                <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date & Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activities.map(act => (
                                <tr key={act.id} className="hover:bg-gray-50">
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-bold text-gray-700">{act.user}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                        <span className={`py-1 px-2 rounded-full text-xs ${act.type.includes('Log') ? 'bg-gray-100 text-gray-800' : 'bg-blue-100 text-blue-800'}`}>
                                            {act.type}
                                        </span>
                                    </td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-600">{act.course} {act.lesson !== '-' ? `/ ${act.lesson}` : ''}</td>
                                    <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-500">{act.time}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        )}

        {/* STUDENTS TAB (Placeholder / Simplified) */}
        {activeTab === "students" && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Manage Students</h1>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Student</button>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Class</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {students.map((l) => (
                    <tr key={l.id} className="hover:bg-gray-50">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{l.id}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium text-gray-900">{l.name}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-500">{l.class}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-500">{l.email}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* TEACHERS TAB (Placeholder / Simplified) */}
        {activeTab === "teachers" && (
          <section>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">Manage Teachers</h1>
              <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Teacher</button>
            </div>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {teachers.map((t) => (
                    <tr key={t.id} className="hover:bg-gray-50">
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{t.id}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium text-gray-900">{t.name}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-500">{t.subject}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm text-gray-500">{t.email}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        <button className="text-blue-600 hover:text-blue-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {/* SETTINGS TAB */}
        {activeTab === "settings" && (
            <section>
                <h1 className="text-3xl font-bold text-gray-800 mb-6">Settings</h1>
                
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    {/* Settings Navigation */}
                    <div className="flex border-b border-gray-200 bg-gray-50">
                        {['profile', 'password', 'platform', 'security'].map(tab => (
                            <button
                                key={tab}
                                onClick={() => setSettingsTab(tab)}
                                className={`px-6 py-4 font-medium capitalize focus:outline-none transition-colors duration-200 ${
                                    settingsTab === tab 
                                    ? 'text-blue-600 border-b-2 border-blue-600 bg-white' 
                                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Settings Content */}
                    <div className="p-8">
                        
                        {/* Profile Settings */}
                        {settingsTab === 'profile' && (
                            <div className="max-w-2xl">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Account Information</h3>
                                <form onSubmit={handleProfileUpdate} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                                            <input type="text" value={adminProfile.name} onChange={(e) => setAdminProfile({...adminProfile, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                                            <input type="email" value={adminProfile.email} onChange={(e) => setAdminProfile({...adminProfile, email: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Bio / Role Description</label>
                                        <textarea rows="3" value={adminProfile.bio} onChange={(e) => setAdminProfile({...adminProfile, bio: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
                                    </div>
                                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition">Save Changes</button>
                                </form>
                            </div>
                        )}

                        {/* Password Settings */}
                        {settingsTab === 'password' && (
                            <div className="max-w-2xl">
                                <h3 className="text-xl font-bold text-gray-800 mb-6">Change Password</h3>
                                <form onSubmit={handlePasswordUpdate} className="space-y-4 mb-8">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Current Password</label>
                                        <input type="password" value={passwordData.current} onChange={(e) => setPasswordData({...passwordData, current: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">New Password</label>
                                        <input type="password" value={passwordData.new} onChange={(e) => setPasswordData({...passwordData, new: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Confirm New Password</label>
                                        <input type="password" value={passwordData.confirm} onChange={(e) => setPasswordData({...passwordData, confirm: e.target.value})} className="w-full p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
                                    </div>
                                    <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition flex items-center gap-2"><FaLock /> Update Password</button>
                                </form>

                                <div className="border-t border-gray-200 pt-6">
                                    <h3 className="text-lg font-bold text-gray-800 mb-4">Two-Factor Authentication</h3>
                                    <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                                        <div>
                                            <p className="font-medium text-gray-800">Enable 2FA</p>
                                            <p className="text-sm text-gray-500">Secure your account with an extra layer of protection.</p>
                                        </div>
                                        <button onClick={() => setTwoFactorEnabled(!twoFactorEnabled)} className={`px-4 py-2 rounded font-medium transition ${twoFactorEnabled ? 'bg-red-100 text-red-600 hover:bg-red-200' : 'bg-green-100 text-green-600 hover:bg-green-200'}`}>
                                            {twoFactorEnabled ? "Disable" : "Enable"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Platform Settings */}
                        {settingsTab === 'platform' && (
                            <div className="max-w-2xl space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 mb-2">Platform Configuration</h3>
                                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                    <span>Theme</span>
                                    <select value={platformSettings.theme} onChange={(e) => setPlatformSettings({...platformSettings, theme: e.target.value})} className="p-2 border border-gray-300 rounded bg-white">
                                        <option value="light">Light Mode</option>
                                        <option value="dark">Dark Mode</option>
                                        <option value="system">System Default</option>
                                    </select>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                    <span>Email Notifications</span>
                                    <input type="checkbox" checked={platformSettings.notifications} onChange={(e) => setPlatformSettings({...platformSettings, notifications: e.target.checked})} className="h-5 w-5 text-blue-600" />
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg flex justify-between items-center">
                                    <span>Default Lesson Content Type</span>
                                    <select value={platformSettings.defaultLessonType} onChange={(e) => setPlatformSettings({...platformSettings, defaultLessonType: e.target.value})} className="p-2 border border-gray-300 rounded bg-white">
                                        <option value="text">Text / Article</option>
                                        <option value="video">Video</option>
                                    </select>
                                </div>
                            </div>
                        )}

                        {/* Security Settings */}
                        {settingsTab === 'security' && (
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaLaptop /> Active Sessions</h3>
                                    <div className="space-y-3">
                                        {sessions.map(session => (
                                            <div key={session.id} className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
                                                <div>
                                                    <p className="font-bold text-gray-800">{session.device} {session.current && <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full ml-2">Current</span>}</p>
                                                    <p className="text-sm text-gray-500">IP: {session.ip} • Last active: {session.lastActive}</p>
                                                </div>
                                                {!session.current && <button onClick={() => handleLogoutSession(session.id)} className="text-red-600 hover:text-red-800 text-sm font-medium">Log Out</button>}
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><FaUserShield /> Admin Management</h3>
                                    <div className="flex gap-2 mb-4">
                                        <input type="email" placeholder="Enter email to invite..." value={newAdminEmail} onChange={(e) => setNewAdminEmail(e.target.value)} className="flex-1 p-2 border border-gray-300 rounded focus:border-blue-500 focus:outline-none" />
                                        <button onClick={handleAddAdmin} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Invite Admin</button>
                                    </div>
                                    <div className="space-y-2">
                                        {adminUsers.map(admin => (
                                            <div key={admin.id} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">{admin.name[0]}</div>
                                                    <div>
                                                        <p className="text-sm font-bold text-gray-800">{admin.name}</p>
                                                        <p className="text-xs text-gray-500">{admin.email} • {admin.role}</p>
                                                    </div>
                                                </div>
                                                {admin.role !== 'Super Admin' && <button onClick={() => setAdminUsers(adminUsers.filter(a => a.id !== admin.id))} className="text-red-600 hover:text-red-800 text-sm">Remove</button>}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        )}

      </main>
    </div>
  );
}

export default Admin;