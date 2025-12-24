import { Link } from "react-router-dom";

export default function Sidebar({ role }) {
  return (
    <div className="w-64 min-h-screen bg-slate-900 text-white p-5">
      <nav className="space-y-4">
        {role === "ADMIN" && (
          <Link to="/admin" className="block hover:text-slate-300 text-2xl">
            Dashboard
          </Link>
        )}

        {role === "EMPLOYEE" && (
          <Link to="/employee" className="block hover:text-slate-300">
            My Profile
          </Link>
        )}

        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/";
          }}
          className="text-red-400 hover:text-red-300"
        >
          Logout
        </button>
      </nav>
    </div>
  );
}
