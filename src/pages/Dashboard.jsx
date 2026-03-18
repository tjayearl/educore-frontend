import Navbar from "../components/Navbar";
import CourseCard from "../components/CourseCard";

const courses = [
  {
    id: 1,
    title: "JavaScript Basics",
    progress: 60,
  },
  {
    id: 2,
    title: "Python Fundamentals",
    progress: 30,
  },
];

function Dashboard() {
  const user = { name: "Tjay", role: "learner" }; // fake user for now

  return (
    <div>
      <Navbar user={user} />
      <div className="container">
        <h1>Dashboard</h1>
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;