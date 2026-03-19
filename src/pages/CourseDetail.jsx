import StudentSidebar from "../components/StudentSidebar";
import { useParams } from "react-router-dom";
import { useState } from "react";

const dummyLessons = [
  { id: 1, title: "Variables & Data Types", completed: true },
  { id: 2, title: "Functions & Scope", completed: false },
  { id: 3, title: "Arrays & Loops", completed: false },
  { id: 4, title: "Objects & JSON", completed: false },
  { id: 5, title: "DOM Manipulation", completed: false },
];

function CourseDetail() {
  const { id } = useParams();
  const [lessons, setLessons] = useState(dummyLessons);
  const user = { name: "Tjay", role: "learner" }; // for now

  // Calculate progress
  const completedCount = lessons.filter(lesson => lesson.completed).length;
  const progressPercent = Math.round((completedCount / lessons.length) * 100);

  const toggleComplete = (lessonId) => {
    setLessons(prev =>
      prev.map(lesson =>
        lesson.id === lessonId ? { ...lesson, completed: !lesson.completed } : lesson
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-6">Course Detail - {id}</h1>

          <div className="bg-white p-6 rounded-lg shadow-md mb-6">
            <p className="text-gray-700 font-semibold mb-2">Overall Progress</p>
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-blue-600 h-4 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              ></div>
            </div>
            <p className="text-sm text-gray-500">{completedCount}/{lessons.length} lessons completed</p>
          </div>

          <ul className="space-y-3">
            {lessons.map(lesson => (
              <li key={lesson.id} className={`p-4 rounded-lg flex justify-between items-center shadow-sm ${lesson.completed ? 'bg-blue-50 border border-blue-100' : 'bg-white border border-gray-100'}`}>
                <span className={lesson.completed ? 'text-blue-800 font-medium' : 'text-gray-700'}>{lesson.title}</span>
                <button
                  onClick={() => toggleComplete(lesson.id)}
                  className={`px-4 py-2 rounded text-sm transition ${lesson.completed ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300 text-gray-700'}`}
                >
                  {lesson.completed ? "Completed" : "Mark Complete"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default CourseDetail;