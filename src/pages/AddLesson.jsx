import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, FileText, Video } from "lucide-react";

export default function AddLesson() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: "",
    contentType: "text",
    contentUrl: "",
    contentBody: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save lesson (mock for now)
    const lesson = {
      id: Date.now(),
      courseId: courseId,
      ...formData,
      createdAt: new Date().toISOString()
    };
    
    console.log("Lesson created:", lesson);
    
    // Navigate back to course
    navigate(`/admin/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6"
        >
          <ArrowLeft size={20} />
          Back to Course
        </button>

        <div className="bg-white rounded-xl shadow p-8">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Add New Lesson</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Lesson Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                placeholder="e.g., Introduction to Variables"
                required
              />
            </div>

            {/* Content Type */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Content Type *
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, contentType: "text", contentUrl: ""})}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg transition ${
                    formData.contentType === "text" 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <FileText size={24} className={formData.contentType === "text" ? "text-blue-600" : "text-gray-400"} />
                  <div className="text-left">
                    <p className="font-semibold">Text</p>
                    <p className="text-xs text-gray-500">Written content</p>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({...formData, contentType: "video", contentBody: ""})}
                  className={`flex items-center gap-3 p-4 border-2 rounded-lg transition ${
                    formData.contentType === "video" 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <Video size={24} className={formData.contentType === "video" ? "text-blue-600" : "text-gray-400"} />
                  <div className="text-left">
                    <p className="font-semibold">Video</p>
                    <p className="text-xs text-gray-500">Video URL</p>
                  </div>
                </button>
              </div>
            </div>

            {/* Content URL (Video) */}
            {formData.contentType === "video" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Video URL *
                </label>
                <input
                  type="url"
                  value={formData.contentUrl}
                  onChange={(e) => setFormData({...formData, contentUrl: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  placeholder="https://youtube.com/watch?v=..."
                  required
                />
                <p className="text-xs text-gray-500 mt-1">YouTube, Vimeo, or direct video link</p>
              </div>
            )}

            {/* Content Body (Text) */}
            {formData.contentType === "text" && (
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Lesson Content *
                </label>
                <textarea
                  value={formData.contentBody}
                  onChange={(e) => setFormData({...formData, contentBody: e.target.value})}
                  className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  rows="10"
                  placeholder="Write your lesson content here..."
                  required
                />
              </div>
            )}

            {/* Submit */}
            <div className="flex gap-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition flex items-center justify-center gap-2"
              >
                <Plus size={20} />
                Add Lesson
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="px-6 py-3 border-2 border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}