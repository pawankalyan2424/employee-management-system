import { useEffect, useState } from "react";
import api from "../services/api";
import Sidebar from "../components/Sidebar";

export default function AdminDashboard() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    api.get("employees/").then((res) => setEmployees(res.data));
  }, []);

  const departments = [...new Set(employees.map((e) => e.department))];

  return (
    <div className="flex">
      <Sidebar role={user.role} />

      <div className="flex-1 bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card title="Total Employees" value={employees.length} />
          <Card title="Departments" value={departments.length} />
          <Card title="Status" value="Active" />
        </div>

        <div className="bg-white rounded-xl shadow overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Department</th>
                <th className="p-3 text-left">Designation</th>
                <th className="p-3 text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((emp) => (
                <tr key={emp.id} className="border-t">
                  <td className="p-3">{emp.name}</td>
                  <td className="p-3">{emp.department}</td>
                  <td className="p-3">{emp.designation}</td>
                  <td className="p-3">{emp.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <p className="text-gray-500">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );
}
