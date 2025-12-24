import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function EmployeeDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [profile, setProfile] = useState({});
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    api.get("employees/me/").then((res) => setProfile(res.data));
  }, []);

  const saveProfile = async () => {
    await api.put("employees/me/", profile);
    alert("Profile updated");
    setEditing(false);
  };

  return (
    <div className="flex">
      <Sidebar role={user.role} />

      <div className="flex-1 p-8 bg-gray-100">
        <h2 className="text-2xl font-bold mb-6">My Profile</h2>

        {["phone", "department", "designation"].map((field) => (
          <input
            key={field}
            disabled={!editing}
            value={profile[field] || ""}
            onChange={(e) =>
              setProfile({ ...profile, [field]: e.target.value })
            }
            className="block w-1/2 mb-4 p-2 border rounded"
            placeholder={field}
          />
        ))}

        {editing ? (
          <button
            onClick={saveProfile}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setEditing(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
}
