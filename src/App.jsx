import RoleSelect from "./pages/RoleSelect";
import Auth from "./pages/Auth";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import Classes from "./pages/Classes";
import AddLesson from "./pages/AddLesson";
import Assignments from "./pages/Assignments";
import CourseDetails from "./pages/CourseDetails";
import Exams from "./pages/Exams";
import Grades from "./pages/Grades";
import ExamDetail from "./pages/ExamDetail";
import Profile from "./pages/Profile";
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<RoleSelect />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/course/:courseId/add-lesson" element={<AddLesson />} />
        <Route path="/dashboard" element={<StudentDashboard />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exams/:id" element={<ExamDetail />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
