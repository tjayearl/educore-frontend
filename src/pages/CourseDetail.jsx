import Navbar from "../components/Navbar";
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
    <div>
      <Navbar user={user} />
      <div className="container">
        <h1>Course Detail - {id}</h1>

        <div className="mb-6">
          <p>Overall Progress</p>
          <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
          </div>
          <p>{completedCount}/{lessons.length} lessons completed</p>
        </div>

        <ul>
          {lessons.map(lesson => (
            <li key={lesson.id} className={`lesson ${lesson.completed ? 'completed' : ''}`}>
              <span>{lesson.title}</span>
              <button
                onClick={() => toggleComplete(lesson.id)}
              >
                {lesson.completed ? "Completed" : "Mark Complete"}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default CourseDetail;