import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, BookOpen, Video, FileText, CheckCircle, Circle,
  Play, ExternalLink, Loader
} from "lucide-react";
import { coursesAPI, lessonsAPI, progressAPI } from "../services/api";

export default function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [completedLessonIds, setCompletedLessonIds] = useState([]);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [markingComplete, setMarkingComplete] = useState(false);

  useEffect(() => {
    loadCourseData();
  }, [id]);

  const loadCourseData = async () => {
    try {
      setLoading(true);
      
      // Load course details
      const courseData = await coursesAPI.getById(id);
      setCourse(courseData.course);

      // Load lessons
      const lessonsData = await lessonsAPI.getAll(id);
      setLessons(lessonsData.lessons || []);

      // Load progress
      const progressData = await progressAPI.get(id);
      setCompletedLessonIds(progressData.progress?.completedLessonIds || []);
    } catch (err) {
      console.error("Error loading course:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleMarkComplete = async (lessonId) => {
    try {
      setMarkingComplete(true);
      await progressAPI.markComplete(id, lessonId);
      
      // Update local state
      if (completedLessonIds.includes(lessonId)) {
        setCompletedLessonIds(completedLessonIds.filter(id => id !== lessonId));
      } else {
        setCompletedLessonIds([...completedLessonIds, lessonId]);
      }
    } catch (err) {
      console.error("Error marking lesson:", err);
      alert("Failed to update lesson status");
    } finally {
      setMarkingComplete(false);
    }
  };

  const progress = lessons.length > 0 
    ? Math.round((completedLessonIds.length / lessons.length) * 100) 
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="w-12 h-12 text-blue-600 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <button 
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Dashboard
        </button>

        {/* Course Info */}
        <div className="bg-white rounded-xl shadow p-8 mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">{course?.title}</h1>
          <p className="text-gray-600 mb-4">{course?.description}</p>
          <div className="flex items-center gap-4">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
              {course?.category}
            </span>
            {course?.instructor_name && (
              <span className="text-sm text-gray-500">
                Instructor: {course.instructor_name}
              </span>
            )}
          </div>

          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{completedLessonIds.length}/{lessons.length} lessons completed</span>
              <span className="font-bold">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className={`h-3 rounded-full transition-all ${
                  progress === 100 ? 'bg-green-500' : 'bg-blue-600'
                }`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Lessons List */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Lesson List */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Course Lessons</h2>
            {lessons.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-6 text-center">
                <BookOpen className="mx-auto text-gray-400 mb-2" size={32} />
                <p className="text-gray-500 text-sm">No lessons yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {lessons.map((lesson) => {
                  const isCompleted = completedLessonIds.includes(lesson.id);
                  const isSelected = selectedLesson?.id === lesson.id;
                  
                  return (
                    <div
                      key={lesson.id}
                      onClick={() => setSelectedLesson(lesson)}
                      className={`bg-white rounded-lg shadow p-4 cursor-pointer transition ${
                        isSelected ? 'ring-2 ring-blue-600' : 'hover:shadow-md'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {isCompleted ? (
                          <CheckCircle className="text-green-500 flex-shrink-0" size={24} />
                        ) : (
                          <Circle className="text-gray-300 flex-shrink-0" size={24} />
                        )}
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">{lesson.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            {lesson.contentType === "video" ? (
                              <Video size={14} className="text-gray-400" />
                            ) : (
                              <FileText size={14} className="text-gray-400" />
                            )}
                            <span className="text-xs text-gray-500 capitalize">
                              {lesson.contentType}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <div className="bg-white rounded-xl shadow p-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">{selectedLesson.title}</h3>
                
                {/* Video Content */}
                {selectedLesson.contentType === "video" && (
                  <div className="mb-6">
                    <div className="bg-gray-900 rounded-lg aspect-video flex items-center justify-center mb-4">
                      <a 
                        href={selectedLesson.contentUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                      >
                        <Play size={20} />
                        Watch Video
                        <ExternalLink size={16} />
                      </a>
                    </div>
                    <p className="text-sm text-gray-500">Click to watch on YouTube</p>
                  </div>
                )}

                {/* Text Content */}
                {selectedLesson.contentType === "text" && (
                  <div className="mb-6">
                    <div className="prose max-w-none bg-gray-50 p-6 rounded-lg">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {selectedLesson.contentBody}
                      </p>
                    </div>
                  </div>
                )}

                {/* Mark Complete Button */}
                <button
                  onClick={() => handleMarkComplete(selectedLesson.id)}
                  disabled={markingComplete}
                  className={`w-full py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 ${
                    completedLessonIds.includes(selectedLesson.id)
                      ? 'bg-green-500 text-white hover:bg-green-600'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  } disabled:opacity-50`}
                >
                  {markingComplete ? (
                    <Loader className="animate-spin" size={20} />
                  ) : completedLessonIds.includes(selectedLesson.id) ? (
                    <>
                      <CheckCircle size={20} />
                      Completed
                    </>
                  ) : (
                    <>
                      <Circle size={20} />
                      Mark as Complete
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow p-12 text-center">
                <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
                <p className="text-gray-500">Select a lesson to start learning</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}