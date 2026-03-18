import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const role = location.state?.role || "learner";

  const handleSubmit = (e) => {
    e.preventDefault();

    // For prototype, redirect based on role
    if (role === "admin") navigate("/admin");
    else navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white shadow-xl rounded-2xl px-8 pt-6 pb-8 mb-4">
          <h1 className="text-3xl font-bold text-center text-blue-700 mb-6">{role === "admin" ? "Admin" : "Learner"} {isLogin ? "Login" : "Register"}</h1>
          <form onSubmit={handleSubmit}>
            {!isLogin && role !== "admin" && (
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Name</label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" type="text" placeholder="Your Name" />
              </div>
            )}
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">Email</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" type="email" placeholder="you@example.com" />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline focus:border-blue-500" type="password" placeholder="********" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full transition duration-300" type="submit">{isLogin ? "Login" : "Register"}</button>
          </form>
          <div className="text-center mt-4 text-sm text-blue-600 cursor-pointer hover:text-blue-800" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Don't have an account? Register" : "Already have an account? Login"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;