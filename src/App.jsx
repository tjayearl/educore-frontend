import RoleSelect from "./pages/RoleSelect";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Assignments from "./pages/Assignments";
import CourseDetail from "./pages/CourseDetail";
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
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/classes" element={<Classes />} />
        <Route path="/assignments" element={<Assignments />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/grades" element={<Grades />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/exams/:id" element={<ExamDetail />} />
        <Route path="/course/:id" element={<CourseDetail />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
