import { useState } from "react";
import api from "../services/api";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await api.post("users/login/", {
        username,
        password,
      });

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "ADMIN") {
        window.location.href = "/admin";
      } else {
        window.location.href = "/employee";
      }
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-8">
        <h2 className="text-3xl font-bold text-center text-slate-800 mb-2">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 mb-6">Login to continue</p>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600"
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-slate-600"
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-slate-800 text-white py-3 rounded-xl hover:bg-slate-900 transition font-semibold"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
}
