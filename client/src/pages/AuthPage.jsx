import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";

export default function AuthPage() {
  const login = useAuthStore((state) => state.login);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const [isLogin, setIsLogin] = useState(true);
  const register = useAuthStore((state) => state.register);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, [isAuthenticated, navigate]);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      const { email, password } = formData;

      try {
        await login(email, password);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Something went wrong. Please try again."
        );
      }
    } else {
      const { name, email, password } = formData;

      try {
        await register(name, email, password);
        setIsLogin(true);
        setFormData({ email: "", password: "" });
        setError("");
      } catch (err) {
        setError(err.response?.data?.message || "Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        {/* ---- Navigation Tabs ---- */}
        <div className="flex mb-6">
          <button
            className={`flex-1 text-center py-2 font-semibold transition-all ${
              isLogin
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => {
              setIsLogin(true);
              setFormData({ email: "", password: "" });
              setError("");
            }}
          >
            Login
          </button>
          <button
            className={`flex-1 text-center py-2 font-semibold transition-all ${
              !isLogin
                ? "border-b-2 border-blue-600 text-blue-600"
                : "text-gray-500 hover:text-blue-600"
            }`}
            onClick={() => {
              setIsLogin(false);
              setFormData({ name: "", email: "", password: "" });
              setError("");
            }}
          >
            Register
          </button>
        </div>

        {/* ---- Form ---- */}
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {!isLogin && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="p-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {error && <p>{error}</p>}
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            {isLogin ? "Log In" : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
