import { useEffect } from "react";
import { useAuthStore } from "../stores/authStore";
import { useNavigate, Link } from "react-router-dom";
import TodoItem from "../components/TodoItem";
import TodoForm from "../components/TodoForm";

const Home = () => {
  const logout = useAuthStore((state) => state.logout);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const user = useAuthStore((state) => state.user);
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/AuthPage");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-2xl p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Todo Dashboard</h1>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>

        <div className="text-gray-600 mb-4">
          Welcome, <span className="font-semibold text-gray-800">{user?.name}</span> 👋
        </div>

        <TodoForm />
        <TodoItem />
      </div>
    </div>
  );
};

export default Home;
