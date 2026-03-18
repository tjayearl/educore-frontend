import Navbar from "../components/Navbar";

// Dummy data for assignments (similar to Assignments.jsx, but focusing on graded ones)
const assignmentsGrades = [
  {
    id: 1,
    type: "Assignment",
    title: "Essay on Shakespeare",
    course: "English Literature",
    status: "Graded",
    score: 88,
    grade: "B+",
  },
  {
    id: 2,
    type: "Assignment",
    title: "Algebra Quiz",
    course: "Mathematics",
    status: "Graded",
    score: 75,
    grade: "C",
  },
  {
    id: 3,
    type: "Assignment",
    title: "Chemical Reactions Lab Report",
    course: "Chemistry",
    status: "Graded",
    score: 92,
    grade: "A-",
  },
];

// Dummy data for exams (filtered to only include completed and graded ones)
const examsGrades = [
  {
    id: 3,
    type: "Exam",
    title: "History Quiz",
    course: "History",
    status: "Completed",
    score: 85,
    grade: "B",
  },
  {
    id: 4,
    type: "Exam",
    title: "Chemistry Lab",
    course: "Chemistry",
    status: "Completed",
    score: 92,
    grade: "A",
  },
];

function Grades() {
  const user = { name: "Tjay", role: "learner" };

  // Combine all grades
  const allGrades = [...assignmentsGrades, ...examsGrades].sort((a, b) =>
    a.title.localeCompare(b.title)
  );

  return (
    <div className="flex h-screen bg-gray-100">
      <Navbar user={user} />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-8">My Grades</h1>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Type
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course/Subject
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Score
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Grade
                  </th>
                </tr>
              </thead>
              <tbody>
                {allGrades.map((item) => (
                  <tr key={`${item.type}-${item.id}`} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-5 border-b border-gray-200 text-sm"><p className="text-gray-900">{item.type}</p></td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm"><p className="text-gray-900 font-semibold">{item.title}</p></td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm"><p className="text-gray-900">{item.course}</p></td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm"><p className="text-gray-900">{item.score}%</p></td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm"><p className="text-gray-900 font-bold">{item.grade}</p></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Grades;