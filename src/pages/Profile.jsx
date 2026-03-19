import { useState } from "react";
import StudentSidebar from "../components/StudentSidebar";

function Profile() {
  const user = { name: "Tjay", role: "learner" };
  
  // Profile State
  const [profile, setProfile] = useState({
    fullName: "",
    school: "",
    level: ""
  });

  // Class State
  const [classes, setClasses] = useState([]);
  const [newClass, setNewClass] = useState({
    name: "",
    teacher: "",
    schedule: ""
  });

  const handleProfileChange = (e) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    console.log("Profile Saved:", profile);
    alert("Profile saved successfully!");
  };

  const handleClassChange = (e) => {
    const { id, value } = e.target;
    setNewClass((prev) => ({ ...prev, [id]: value }));
  };

  const handleClassSubmit = (e) => {
    e.preventDefault();
    if (!newClass.name || !newClass.teacher) return;
    
    setClasses((prev) => [...prev, { ...newClass, id: Date.now() }]);
    setNewClass({ name: "", teacher: "", schedule: "" });
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <StudentSidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold text-blue-700 mb-8">My Profile & Setup</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Student Profile Section */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold text-blue-700 mb-4">Student Profile</h2>
                <form onSubmit={handleProfileSubmit} className="space-y-4">
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="fullName">Full Name</label>
                    <input type="text" id="fullName" value={profile.fullName} onChange={handleProfileChange} placeholder="Full Name" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="school">School / University</label>
                    <input type="text" id="school" value={profile.school} onChange={handleProfileChange} placeholder="School / University" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="level">Level</label>
                    <input type="text" id="level" value={profile.level} onChange={handleProfileChange} placeholder="Level (Primary, High School, College...)" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full">
                    Save Profile
                  </button>
                </form>
              </div>
            </div>

            {/* Class Management Section */}
            <div>
              <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                <h2 className="text-xl font-bold text-blue-700 mb-4">Add Class</h2>
                <form onSubmit={handleClassSubmit} className="space-y-4">
                  <div>
                     <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">Class Name</label>
                    <input type="text" id="name" value={newClass.name} onChange={handleClassChange} placeholder="Class Name (e.g. Mathematics)" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="teacher">Teacher Name</label>
                    <input type="text" id="teacher" value={newClass.teacher} onChange={handleClassChange} placeholder="Teacher Name" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                  </div>
                  <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="schedule">Schedule</label>
                    <input type="text" id="schedule" value={newClass.schedule} onChange={handleClassChange} placeholder="Schedule (e.g. Mon & Wed)" className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500" />
                  </div>
                  <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition w-full">
                    Add Class
                  </button>
                </form>
              </div>

              {/* Display Classes */}
              <div className="mt-6">
                <h2 className="text-xl font-bold text-blue-700 mb-4">My Classes</h2>
                <div className="space-y-4">
                  {classes.length === 0 ? <p className="text-gray-500 italic">No classes added yet.</p> : classes.map((cls) => (
                    <div key={cls.id} className="bg-white p-4 rounded-lg shadow-md border-l-4 border-blue-500">
                      <h3 className="text-lg font-bold text-blue-700">{cls.name}</h3>
                      <p className="text-gray-700"><span className="font-semibold">Teacher:</span> {cls.teacher}</p>
                      <p className="text-gray-600 text-sm"><span className="font-semibold">Schedule:</span> {cls.schedule}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;