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
            <Link to="/dashboard" className="block px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition">Dashboard</Link>
          </li>
          <li>
            <Link to="/classes" className="block px-6 py-3 text-gray-600 hover:bg-blue-50 hover:text-blue-700 transition">Classes</Link>
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
        <button
          onClick={handleLogout}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
          >
            Logout
          </button>
      </div>
    </aside>
  );
}

export default Navbar;