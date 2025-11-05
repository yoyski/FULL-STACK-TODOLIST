import "./App.css";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";
import { useAuthStore } from "./stores/authStore";
import { useEffect } from 'react';

function App() {
  const { checkAuth, loading } = useAuthStore();

  useEffect(() => {
    checkAuth(); // runs once on load
  }, []);

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route path="/AuthPage" element={<AuthPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
