import { useLocation, useNavigate } from "react-router-dom";
import StudentSidebar from "../components/StudentSidebar";

function ExamDetail() {
  const location = useLocation();
  const navigate = useNavigate();
  const user = { name: "Tjay", role: "learner" };
  const exam = location.state?.exam;

  if (!exam) {
    return (
        <div className="flex h-screen bg-gray-100">
            <StudentSidebar />
            <div className="flex-1 p-8 flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-700 mb-4">Exam details not available</h2>
                    <button onClick={() => navigate("/exams")} className="text-blue-600 hover:underline">
                        Return to Exams List
                    </button>
                </div>
            </div>
        </div>
    );
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="container mx-auto max-w-4xl">
          <button
            onClick={() => navigate("/exams")}
            className="mb-6 text-gray-600 hover:text-blue-600 flex items-center font-medium transition"
          >
            ← Back to Exams
          </button>

          <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
            <div className="bg-blue-600 p-8 text-white">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold mb-2">{exam.title}</h1>
                        <p className="text-blue-100 text-lg">{exam.subject}</p>
                    </div>
                    <span className="bg-white/20 px-4 py-2 rounded-lg text-sm font-semibold backdrop-blur-sm border border-white/10">
                        {exam.status}
                    </span>
                </div>
            </div>
            
            <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 pb-8 border-b border-gray-100">
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Date & Time</p>
                        <p className="text-gray-800 font-medium">{exam.date}</p>
                        <p className="text-gray-600">{exam.time}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Duration</p>
                        <p className="text-gray-800 font-medium">{exam.duration}</p>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold mb-1">Format</p>
                        <p className="text-gray-800 font-medium">Online Examination</p>
                    </div>
                </div>

                <div className="mb-10">
                    <h3 className="text-xl font-bold text-gray-800 mb-4">Instructions</h3>
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 text-gray-700 leading-relaxed">
                        {exam.instructions}
                    </div>
                </div>

                {exam.status === "Upcoming" && (
                    <div className="flex flex-col items-center">
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-xl shadow-lg transition duration-300 transform hover:-translate-y-1">
                            Start Exam
                        </button>
                        <p className="text-sm text-gray-500 mt-4">The exam link will be active at the scheduled time.</p>
                    </div>
                )}

                {exam.status === "Completed" && (
                    <div className="bg-gray-50 rounded-xl p-8">
                        <h3 className="text-xl font-bold text-gray-800 mb-6 border-b border-gray-200 pb-4">Performance Result</h3>
                        <div className="grid grid-cols-3 gap-6 text-center">
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500 font-semibold uppercase mb-2">Score</p>
                                <p className="text-4xl font-bold text-blue-600">{exam.score}%</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500 font-semibold uppercase mb-2">Grade</p>
                                <p className="text-4xl font-bold text-purple-600">{exam.grade}</p>
                            </div>
                            <div className="bg-white p-6 rounded-xl shadow-sm">
                                <p className="text-sm text-gray-500 font-semibold uppercase mb-2">Status</p>
                                <p className={`text-4xl font-bold ${exam.resultStatus === "Passed" ? "text-green-600" : "text-red-600"}`}>{exam.resultStatus}</p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExamDetail;