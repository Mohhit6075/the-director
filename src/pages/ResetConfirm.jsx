import { useState } from "react";
import { useSearchParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ResetConfirm() {
  const [params] = useSearchParams();
  const token = params.get("token");
  const auth = useAuth();
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(null);

  async function submit() {
    try {
      await auth.resetPassword(token, password);
      navigate("/login");
    } catch (err) {
      setMsg(err.message);
    }
  }

  return (
    <div className="min-h-screen  flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl md:text-3xl text-[#ffad33] font-bold mb-4">
          Set new password
        </h2>
        <p className="text-gray-600 text-sm mb-4">Set up a new password</p>
        {msg && <div className="mb-4 text-sm text-green-600">{msg}</div>}
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border-b border-gray-400 py-3 px-2 text-gray-800 focus:outline-none placeholder:text-gray-400"
          placeholder="New password"
        />
        <button
          onClick={submit}
          className="bg-[#fd4444] hover:bg-red-500 transition-colors px-4 py-3 rounded text-white mt-12 font-medium w-full text-center"
        >
          Set password
        </button>
        <div className="mt-4 text-sm text-gray-600">
          Back to{" "}
          <Link
            to="/login"
            className="text-yellow-500 hover:underline hover:text-yellow-600 transition-all"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
}
