import { useState } from "react";
import { Link } from "react-router-dom";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function AuthForm({ mode, onSubmit }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [remember, setRemember] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isLogin = mode === "login";
  const isSignup = mode === "signup";
  const isReset = mode === "reset";

  function handleSubmit(e) {
    e.preventDefault();
    const payload = { name, email, phone, password, identifier, remember };
    if (onSubmit) onSubmit(payload);
  }

  return (
    <form className="space-y-6 flex flex-col pt-2" onSubmit={handleSubmit}>
      {isSignup && (
        <input
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          className="w-full border-b border-gray-400 py-3 px-2 text-gray-800 focus:outline-none placeholder:text-gray-400"
        />
      )}

      {(isSignup || isReset) && (
        <input
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email or Phone Number"
          className="w-full border-b border-gray-400 py-3 px-2 text-gray-800 focus:outline-none placeholder:text-gray-400"
        />
      )}

      {isLogin && (
        <input
          name="identifier"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          placeholder="Email or Phone Number"
          className="w-full border-b border-gray-400 py-3 px-2 text-gray-800 focus:outline-none placeholder:text-gray-400"
        />
      )}

      {!isReset && (
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full border-b border-gray-400 py-3 px-2 text-gray-800 focus:outline-none placeholder:text-gray-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
          >
            {showPassword ? (
              <IoEyeOffOutline
                style={{ width: "1.25rem", height: "1.25rem" }}
              />
            ) : (
              <IoEyeOutline style={{ width: "1.25rem", height: "1.25rem" }} />
            )}
          </button>
        </div>
      )}

      <div className="flex justify-between gap-2 mt-8">
        <button
          type="submit"
          className={`bg-[#fd4444] hover:bg-red-500 active:scale-[0.98] transition-all py-3.5 rounded-md text-white font-medium text-base shadow-lg shadow-red-200 ${
            isLogin ? "" : "w-full"
          }`}
          style={isLogin ? { width: "9rem" } : {}}
        >
          {isLogin ? "Log In" : isSignup ? "Create Account" : "Send Reset Link"}
        </button>

        {isLogin && (
          <div className="flex items-center justify-between mt-2">
            <Link
              to="/reset-password"
              className="text-sm text-[#ffad33]  hover:text-yellow-600 hover:underline transition-colors ml-auto"
            >
              Forgot Password?
            </Link>
          </div>
        )}
      </div>
    </form>
  );
}
