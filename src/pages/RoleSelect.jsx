import { useNavigate } from "react-router-dom";

export default function RoleSelect() {
  const navigate = useNavigate();

  const selectRole = (role) => {
    // Navigate to login/register and pass role in state
    navigate("/auth", { state: { role } });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white font-sans">
      <h1 className="text-3xl font-bold text-blue-700 mb-8">
        Welcome to Educore
      </h1>

      <div className="flex flex-col md:flex-row gap-6">
        <button
          onClick={() => selectRole("admin")}
          className="px-6 py-4 bg-blue-600 text-white font-semibold rounded-md text-center hover:bg-blue-700 transition"
        >
          Admin
        </button>

        <button
          onClick={() => selectRole("learner")}
          className="px-6 py-4 bg-gray-500 text-white font-semibold rounded-md text-center hover:bg-gray-600 transition"
        >
          Learner
        </button>
      </div>
      <p className="text-gray-500 text-sm mt-8">Select your portal to continue</p>
    </div>
  );
}