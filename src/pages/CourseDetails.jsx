import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Circle, PlayCircle, FileText } from "lucide-react";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [course] = useState({
    id: 1,
    title: "Introduction to JavaScript",
    description: "Learn the fundamentals of JavaScript programming",
    category: "Programming",
    lessons: [
      { id: 1, title: "Variables and Data Types", type: "video", completed: true },
      { id: 2, title: "Functions and Scope", type: "video", completed: true },
      { id: 3, title: "Arrays and Objects", type: "text", completed: false },
      { id: 4, title: "DOM Manipulation", type: "video", completed: false },
      { id: 5, title: "Async JavaScript", type: "video", completed: false }
    ]
  });

  const [lessons, setLessons] = useState(course.lessons);
  
  const completed = lessons.filter(l => l.completed).length;
  const progress = Math.round((completed / lessons.length) * 100);

  const toggleLesson = (lessonId) => {
    setLessons(lessons.map(l => 
      l.id === lessonId ? { ...l, completed: !l.completed } : l
    ));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto p-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        <div className="bg-white rounded-xl shadow p-8 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{course.title}</h1>
          <p className="text-gray-600 mb-4">{course.description}</p>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
            {course.category}
          </span>

          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{completed}/{lessons.length} lessons completed</span>
              <span>{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Course Lessons</h2>
          <div className="space-y-4">
            {lessons.map((lesson) => (
              <div 
                key={lesson.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => toggleLesson(lesson.id)}
              >
                <div className="flex items-center gap-4">
                  {lesson.completed ? (
                    <CheckCircle className="text-green-500" size={24} />
                  ) : (
                    <Circle className="text-gray-300" size={24} />
                  )}
                  <div>
                    <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                      {lesson.type === "video" ? (
                        <><PlayCircle size={16} /> Video Lesson</>
                      ) : (
                        <><FileText size={16} /> Reading</>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}