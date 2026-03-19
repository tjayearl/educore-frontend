import { Link, useLocation } from "react-router-dom";
import { 
  Home, 
  BookOpen, 
  FileText, 
  ClipboardList, 
  Award, 
  User 
} from "lucide-react";

export default function StudentSidebar() {
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const navItems = [
    { path: "/dashboard", icon: Home, label: "Dashboard" },
    { path: "/classes", icon: BookOpen, label: "Classes" },
    { path: "/assignments", icon: FileText, label: "Assignments" },
    { path: "/exams", icon: ClipboardList, label: "Exams" },
    { path: "/grades", icon: Award, label: "Grades" },
    { path: "/profile", icon: User, label: "Profile" },
  ];

  return (
    <div className="w-64 bg-white h-screen shadow-lg flex-shrink-0 relative">
      <div className="p-6">
        <h1 className="text-2xl font-bold text-blue-600">Educore LMS</h1>
        <p className="text-sm text-gray-500 mt-1">Student Portal</p>
      </div>
      
      <nav className="mt-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-6 py-3 transition-colors ${
                isActive(item.path)
                  ? "bg-blue-50 text-blue-600 border-r-4 border-blue-600"
                  : "text-gray-600 hover:bg-gray-50"
              }`}
            >
              <Icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
      
      <div className="absolute bottom-6 left-6 right-6">
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/auth";
          }}
          className="w-full px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
}