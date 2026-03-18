import { Link, useNavigate } from "react-router-dom";

function Navbar({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // For now, just redirect to login
    navigate("/");
  };

  return (
    <nav>
      <div>EduCore</div>
      <div>
        {user?.role === "admin" && (
          <Link to="/admin">Admin</Link>
        )}
        <Link to="/dashboard">Dashboard</Link>
        <button onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;