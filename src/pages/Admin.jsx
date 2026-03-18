import { useState } from "react";

function Admin() {
  const [activeTab, setActiveTab] = useState("dashboard");

  // Simulated data
  const [learners] = useState([
    { id: 1, name: "Alice Johnson" },
    { id: 2, name: "Bob Smith" },
    { id: 3, name: "Charlie Brown" },
  ]);

  const [courses, setCourses] = useState([]);
  const [courseTitle, setCourseTitle] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseCategory, setCourseCategory] = useState("");

  const [lessons, setLessons] = useState([]);
  const [lessonTitle, setLessonTitle] = useState("");
  const [lessonType, setLessonType] = useState("text");
  const [lessonContent, setLessonContent] = useState("");
  const [selectedCourseIndex, setSelectedCourseIndex] = useState(null);

  // Create new course
  const addCourse = () => {
    if (!courseTitle) return;
    const newCourse = { title: courseTitle, description: courseDesc, category: courseCategory, lessons: [] };
    setCourses([...courses, newCourse]);
    setCourseTitle(""); setCourseDesc(""); setCourseCategory("");
  };

  // Add lesson to selected course
  const addLesson = () => {
    if (selectedCourseIndex === null || !lessonTitle) return;
    const updatedCourses = [...courses];
    updatedCourses[selectedCourseIndex].lessons.push({
      title: lessonTitle,
      type: lessonType,
      content: lessonContent
    });
    setCourses(updatedCourses);
    setLessonTitle(""); setLessonType("text"); setLessonContent("");
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
            {["dashboard", "courses", "students", "activities"].map((tab) => (
              <li
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 cursor-pointer transition-colors capitalize ${
                  activeTab === tab
                    ? "bg-blue-50 text-blue-700 border-r-4 border-blue-700 font-semibold"
                    : "text-gray-600 hover:bg-gray-50 hover:text-blue-600"
                }`}
              >
                {tab}
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        {activeTab === "dashboard" && (
          <section>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Welcome, Admin!</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-blue-600">
                <p className="text-gray-500">Total Students</p>
                <p className="text-3xl font-bold text-gray-800">{learners.length}</p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-green-500">
                <p className="text-gray-500">Total Courses</p>
                <p className="text-3xl font-bold text-gray-800">{courses.length}</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "courses" && (
          <section>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Manage Courses</h1>

            {/* Create Course */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Create a Course</h3>
              <div className="grid grid-cols-1 gap-4 mb-4">
                <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="text" placeholder="Title" value={courseTitle} onChange={(e) => setCourseTitle(e.target.value)} />
                <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="text" placeholder="Description" value={courseDesc} onChange={(e) => setCourseDesc(e.target.value)} />
                <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="text" placeholder="Category" value={courseCategory} onChange={(e) => setCourseCategory(e.target.value)} />
              </div>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition" onClick={addCourse}>Add Course</button>
            </div>

            {/* Courses List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {courses.map((c, idx) => (
                <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
                  <h4 className="text-xl font-bold text-blue-700 mb-2">{c.title}</h4>
                  <p className="text-gray-600 mb-2">{c.description}</p>
                  <p className="text-sm text-gray-500"><strong>Category:</strong> {c.category}</p>
                  <p className="text-sm text-gray-500"><strong>Lessons:</strong> {c.lessons.length}</p>
                </div>
              ))}
            </div>

            {/* Add Lessons */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-700 mb-4">Add Lesson</h3>
              <div className="grid grid-cols-1 gap-4 mb-4">
              <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" onChange={(e) => setSelectedCourseIndex(e.target.value)} value={selectedCourseIndex ?? ""}>
                <option value="">Select Course</option>
                {courses.map((c, idx) => <option key={idx} value={idx}>{c.title}</option>)}
              </select>
              <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="text" placeholder="Lesson Title" value={lessonTitle} onChange={(e) => setLessonTitle(e.target.value)} />
              <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" value={lessonType} onChange={(e) => setLessonType(e.target.value)}>
                <option value="text">Text</option>
                <option value="video">Video</option>
              </select>
              <input className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500" type="text" placeholder="Lesson Content (text or video URL)" value={lessonContent} onChange={(e) => setLessonContent(e.target.value)} />
              </div>
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition" onClick={addLesson}>Add Lesson</button>
            </div>
          </section>
        )}

        {activeTab === "students" && (
          <section>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Students</h1>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="min-w-full leading-normal">
                <thead>
                  <tr>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                  </tr>
                </thead>
                <tbody>
                  {learners.map((l) => (
                    <tr key={l.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{l.id}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm font-medium text-gray-900">{l.name}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        {activeTab === "activities" && (
          <section>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">User Activities</h1>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic">Activity logs will appear here when backend is connected.</p>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}

export default Admin;