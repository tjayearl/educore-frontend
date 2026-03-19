import StudentSidebar from "../components/StudentSidebar";

const assignments = [
  {
    id: 1,
    title: "Essay on Shakespeare",
    course: "English Literature",
    dueDate: "2023-10-25",
    status: "Pending",
  },
  {
    id: 2,
    title: "Algebra Quiz",
    course: "Mathematics",
    dueDate: "2023-10-20",
    status: "Submitted",
  },
  {
    id: 3,
    title: "Chemical Reactions Lab Report",
    course: "Chemistry",
    dueDate: "2023-10-15",
    status: "Graded",
    grade: "A",
  },
];

function Assignments() {
  const user = { name: "Tjay", role: "learner" };

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-8">My Assignments</h1>

          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Assignment
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Due Date
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {assignments.map((assignment) => (
                  <tr key={assignment.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 font-semibold">
                        {assignment.title}
                      </p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900">{assignment.course}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900">{assignment.dueDate}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <span
                        className={`relative inline-block px-3 py-1 font-semibold leading-tight rounded-full ${
                          assignment.status === "Pending"
                            ? "bg-yellow-200 text-yellow-900"
                            : assignment.status === "Submitted"
                            ? "bg-blue-200 text-blue-900"
                            : "bg-green-200 text-green-900"
                        }`}
                      >
                        <span aria-hidden className="absolute inset-0 opacity-50 rounded-full"></span>
                        <span className="relative">{assignment.status}</span>
                      </span>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      {assignment.status === "Pending" && (
                        <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs transition duration-300">
                          Submit
                        </button>
                      )}
                      {assignment.status === "Graded" && (
                        <span className="font-bold text-gray-700">Grade: {assignment.grade}</span>
                      )}
                       {assignment.status === "Submitted" && (
                        <span className="text-gray-500 italic">Under Review</span>
                      )}
                    </td>
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

export default Assignments;