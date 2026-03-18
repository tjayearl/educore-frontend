import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

const examsData = [
  {
    id: 1,
    title: "Math Midterm",
    subject: "Mathematics",
    date: "2023-10-25",
    time: "10:00 AM",
    duration: "2 hours",
    status: "Upcoming",
    instructions: "No calculators allowed. Bring your ID.",
  },
  {
    id: 2,
    title: "Physics Final",
    subject: "Physics",
    date: "2023-11-10",
    time: "1:00 PM",
    duration: "3 hours",
    status: "Upcoming",
    instructions: "Open book exam. Scientific calculator permitted.",
  },
  {
    id: 3,
    title: "History Quiz",
    subject: "History",
    date: "2023-09-15",
    time: "9:00 AM",
    duration: "45 mins",
    status: "Completed",
    score: 85,
    grade: "B",
    resultStatus: "Passed",
    instructions: "Multiple choice questions about World War II.",
  },
  {
    id: 4,
    title: "Chemistry Lab",
    subject: "Chemistry",
    date: "2023-09-20",
    time: "11:00 AM",
    duration: "1.5 hours",
    status: "Completed",
    score: 92,
    grade: "A",
    resultStatus: "Passed",
    instructions: "Lab report submission.",
  },
];

function Exams() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const navigate = useNavigate();
  const user = { name: "Tjay", role: "learner" };

  const filteredExams = examsData.filter((exam) => {
    if (activeTab === "upcoming") {
      return exam.status === "Upcoming" || exam.status === "Ongoing";
    }
    return exam.status === "Completed";
  });

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar user={user} />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-8">Exams</h1>

          <div className="flex border-b border-gray-300 mb-6">
            <button
              className={`py-2 px-4 font-semibold ${
                activeTab === "upcoming"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("upcoming")}
            >
              Upcoming
            </button>
            <button
              className={`py-2 px-4 font-semibold ${
                activeTab === "completed"
                  ? "text-blue-600 border-b-2 border-blue-600"
                  : "text-gray-500 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </div>

          <div className="grid gap-6">
            {filteredExams.map((exam) => (
              <div
                key={exam.id}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition cursor-pointer"
                onClick={() => navigate(`/exams/${exam.id}`, { state: { exam } })}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      {exam.title}
                    </h3>
                    <p className="text-gray-600 mb-1">
                      <span className="font-semibold">Subject:</span> {exam.subject}
                    </p>
                    <p className="text-gray-600">
                      <span className="font-semibold">Date:</span> {exam.date} | <span className="font-semibold">Time:</span> {exam.time}
                    </p>
                  </div>
                  <div>
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        exam.status === "Upcoming"
                          ? "bg-blue-100 text-blue-800"
                          : exam.status === "Ongoing"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-green-100 text-green-800"
                      }`}
                    >
                      {exam.status}
                    </span>
                  </div>
                </div>
                {activeTab === "completed" && (
                   <div className="mt-4 pt-4 border-t border-gray-100 flex gap-6">
                      <p className="text-gray-700"><span className="font-semibold">Score:</span> {exam.score}%</p>
                      <p className="text-gray-700"><span className="font-semibold">Grade:</span> {exam.grade}</p>
                      <p className={`font-bold ${exam.resultStatus === "Passed" ? "text-green-600" : "text-red-600"}`}>{exam.resultStatus}</p>
                   </div>
                )}
              </div>
            ))}
            {filteredExams.length === 0 && (
                <div className="text-center py-10 bg-white rounded-lg shadow">
                    <p className="text-gray-500 italic">No exams found in this category.</p>
                </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Exams;