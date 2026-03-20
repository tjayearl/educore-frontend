import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, CheckCircle, Circle, PlayCircle, FileText, Clock } from "lucide-react";
import { coursesAPI, lessonsAPI, progressAPI } from "../services/api";
import { handleAPIError } from "../utils/errorHandler";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [progress, setProgress] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchCourseData();
  }, [id]);

  const fetchCourseData = async () => {
    try {
      setLoading(true);
      const [courseData, lessonsData] = await Promise.all([
        coursesAPI.getById(id),
        lessonsAPI.getAll(id)
      ]);
      
      setCourse(courseData.course);
      setLessons(lessonsData.lessons || []);
      
      // Fetch progress
      try {
        const progressData = await progressAPI.get(id);
        setProgress(progressData.progress);
      } catch (err) {
        // No progress yet
        setProgress({ completedLessons: [] });
      }
    } catch (err) {
      handleAPIError(err, setError);
    } finally {
      setLoading(false);
    }
  };

  const toggleLesson = async (lessonId) => {
    const isCompleted = progress?.completedLessons?.some(l => l.lessonId === lessonId);
    
    if (!isCompleted) {
      try {
        await progressAPI.markComplete(id, lessonId);
        // Refresh progress
        const progressData = await progressAPI.get(id);
        setProgress(progressData.progress);
      } catch (err) {
        handleAPIError(err, setError);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading course...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => navigate(-1)} className="text-blue-600 font-semibold">
            ← Go Back
          </button>
        </div>
      </div>
    );
  }

  const completed = progress?.completedLessons?.length || 0;
  const total = lessons.length;
  const progressPercent = total > 0 ? Math.round((completed / total) * 100) : 0;

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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{course?.title}</h1>
          <p className="text-gray-600 mb-4">{course?.description}</p>
          <span className="inline-block px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm">
            {course?.category}
          </span>

          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{completed}/{total} lessons completed</span>
              <span>{progressPercent}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-green-500 h-3 rounded-full transition-all"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-8">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Course Lessons</h2>
          
          {lessons.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No lessons available yet.</p>
          ) : (
            <div className="space-y-4">
              {lessons.map((lesson, index) => {
                const isCompleted = progress?.completedLessons?.some(l => l.lessonId === lesson.id);
                
                return (
                  <div 
                    key={lesson.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 cursor-pointer transition"
                    onClick={() => toggleLesson(lesson.id)}
                  >
                    <div className="flex items-center gap-4 flex-1">
                      {isCompleted ? (
                        <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                      ) : (
                        <Circle className="text-gray-300 flex-shrink-0" size={24} />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold text-gray-500">Lesson {index + 1}</span>
                        </div>
                        <h3 className="font-semibold text-gray-800">{lesson.title}</h3>
                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                          {lesson.contentType === "video" ? (
                            <><PlayCircle size={16} /> Video Lesson</>
                          ) : (
                            <><FileText size={16} /> Reading</>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {!isCompleted && (
                      <button 
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition text-sm font-semibold"
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleLesson(lesson.id);
                        }}
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}