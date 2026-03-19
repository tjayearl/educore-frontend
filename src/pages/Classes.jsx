import StudentSidebar from "../components/StudentSidebar";

const enrolledClasses = [
  {
    id: 1,
    title: "JavaScript Basics",
    instructor: "Dr. Smith",
    schedule: "Mon, Wed 10:00 AM",
    description: "Introduction to JavaScript programming and modern ES6+ features."
  },
  {
    id: 2,
    title: "Python Fundamentals",
    instructor: "Prof. Johnson",
    schedule: "Tue, Thu 2:00 PM",
    description: "Data structures, algorithms, and basic Python syntax."
  },
  {
    id: 3,
    title: "Web Development",
    instructor: "Ms. Davis",
    schedule: "Fri 1:00 PM",
    description: "Building responsive websites using HTML, CSS, and React."
  }
];

function Classes() {
  const user = { name: "Tjay", role: "learner" };

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-8">My Classes</h1>
          
          <div className="bg-white shadow-md rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Class Name</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Instructor</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Schedule</th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-50 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody>
                {enrolledClasses.map((cls) => (
                  <tr key={cls.id} className="hover:bg-gray-50 transition">
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <p className="text-gray-900 font-semibold">{cls.title}</p>
                      <p className="text-gray-500 text-xs mt-1">{cls.description}</p>
                    </td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm"><p className="text-gray-900">{cls.instructor}</p></td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm"><p className="text-gray-900">{cls.schedule}</p></td>
                    <td className="px-5 py-5 border-b border-gray-200 text-sm">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-xs transition duration-300">Enter Class</button>
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

export default Classes;