import StudentSidebar from "../components/StudentSidebar";
import { Link } from "react-router-dom";

function Dashboard() {
  const user = { name: "Tjay", role: "learner", level: "High School Student" };

  // Hardcoded data for Step 1 (Static Version)
  const stats = [
    { label: "Total Classes", value: 5, color: "bg-blue-100 text-blue-800" },
    { label: "Assignments Pending", value: 2, color: "bg-yellow-100 text-yellow-800" },
    { label: "Upcoming Exams", value: 1, color: "bg-purple-100 text-purple-800" },
    { label: "Overall Grade", value: "B+", color: "bg-green-100 text-green-800" },
  ];

  const upcomingItems = [
    { id: 1, type: "Class", title: "Mathematics", time: "09:00 AM", date: "Today", icon: "📚" },
    { id: 2, type: "Assignment", title: "Math Homework", time: "Due Tomorrow", date: "Oct 25", icon: "📝" },
    { id: 3, type: "Exam", title: "Physics Midterm", time: "10:00 AM", date: "Friday", icon: "🧪" },
  ];

  const recentActivity = [
    { id: 1, text: "You submitted Physics Lab", time: "2 hours ago", icon: "✅" },
    { id: 2, text: "Math Homework graded: 85%", time: "Yesterday", icon: "🎓" },
  ];

  const classesPreview = [
    { id: 1, title: "JavaScript Basics", teacher: "Dr. Smith" },
    { id: 2, title: "Python Fundamentals", teacher: "Prof. Johnson" },
    { id: 3, title: "Web Development", teacher: "Ms. Davis" },
  ];

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="container mx-auto max-w-6xl">
          
          {/* Welcome Section & Quick Actions */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">Welcome, {user.name} 👋</h1>
              <p className="text-gray-600">{user.level}</p>
            </div>
            <div className="flex gap-4 mt-4 md:mt-0">
               <Link to="/profile" className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition flex items-center gap-2">
                 <span>➕</span> Add Class
               </Link>
               <button className="px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-lg shadow hover:bg-gray-50 transition flex items-center gap-2">
                 <span>➕</span> Add Assignment
               </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <div key={index} className={`p-6 rounded-xl shadow-sm ${stat.color} flex flex-col justify-center items-center text-center`}>
                <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                <p className="text-sm font-medium uppercase tracking-wider opacity-80">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Today / Upcoming Section */}
            <div className="lg:col-span-2 bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>📅</span> Today & Upcoming
              </h2>
              <div className="space-y-4">
                {upcomingItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-sm transition">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-xl">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800">{item.title}</h4>
                        <p className="text-sm text-gray-500">{item.type} • {item.date}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-blue-600 font-semibold">{item.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                <span>🕒</span> Recent Activity
              </h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex gap-4 items-start pb-4 border-b border-gray-100 last:border-0 last:pb-0">
                    <div className="mt-1">{activity.icon}</div>
                    <div>
                      <p className="text-gray-800 font-medium">{activity.text}</p>
                      <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Classes Preview */}
          <div className="bg-white p-6 rounded-xl shadow-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">My Classes</h2>
              <Link to="/classes" className="text-blue-600 hover:text-blue-800 font-medium text-sm">View All Classes →</Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {classesPreview.map((cls) => (
                <div key={cls.id} className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition group cursor-pointer">
                  <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition">{cls.title}</h3>
                  <p className="text-gray-500 text-sm mt-1">{cls.teacher}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Dashboard;