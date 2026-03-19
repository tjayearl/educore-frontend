import { Link, useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // For now, just redirect to login
    navigate("/");
  };

  return (
    <aside className="w-64 bg-white shadow-lg flex flex-col">
      <div className="h-16 flex items-center justify-center border-b border-gray-200">
        <h2 className="text-2xl font-bold text-blue-700">EduCore</h2>
      </div>
      <nav className="flex-1 py-4">
        <ul className="space-y-1">
          {user?.role === "admin" && (
            <li>
              <Link to="/admin" className="block px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition">Admin</Link>
            </li>
          )}
          <li>
            <Link to="/classes" className="block px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition">Course Catalog</Link>
          </li>
          <li>
            <Link to="/dashboard" className="block px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition">My Progress</Link>
          </li>
          <li>
            <Link to="/assignments" className="block px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition">Assignments</Link>
          </li>
          <li>
            <Link to="/exams" className="block px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition">Exams</Link>
          </li>
          <li>
            <Link to="/grades" className="block px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition">Grades</Link>
          </li>
          <li>
            <Link to="/profile" className="block px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition">Profile</Link>
          </li>
        </ul>
      </nav>
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-center gap-3 mb-4 px-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-sm">
                {user.name?.[0] || "U"}
            </div>
            <div className="overflow-hidden">
                <p className="text-sm font-bold text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 capitalize truncate">{user.role}</p>
            </div>
        </div>
        <button
          onClick={handleLogout}
          className="w-full bg-red-50 text-red-600 py-2 rounded hover:bg-red-100 transition font-medium"
          >
            Logout
          </button>
      </div>
    </aside>
  );
}

export default Navbar;