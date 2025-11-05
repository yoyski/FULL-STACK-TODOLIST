import { create } from "zustand";
import axios from "axios";
import { updateTodo } from "../../../server/controllers/todoController";

export const useTodoStore = create((set, get) => ({
  todos: [],
  loading: false,

  fetchTodos: async () => {
    try {
      set({ loading: true, error: null });
      const res = await axios.get("/api/todos", {
        withCredentials: true,
      });
      set({ todos: res.data, loading: false });
    } catch (err) {
      console.error("Failed to fetch todos:", err);
    }
  },
  createTodo: async (title) => {
    try {
      const res = await axios.post(
        "/api/todos",
        {
          title,
        },
        {
          withCredentials: true,
        }
      );
      set({ todos: [...get().todos, res.data] });
      console.log("Todo created:", res.data);
    } catch (err) {
      console.error("Failed to create todo:", err);
    }
  },

  deleteTodo: async (todoId) => {
    try {
      const res = await axios.delete(`/api/todos/${todoId}`, {
        withCredentials: true,
      });
      const updatedTodos = get().todos.filter((todo) => todo._id !== todoId);
      set({ todos: updatedTodos });
    } catch (error) {
      console.error("Failed to delete todo:", error);
    }
  },

  updateTodo: async (todoId, newTitle) => {
    try {
      const res = await axios.put(`/api/todos/${todoId}`, { title: newTitle }, {
        withCredentials: true,
      });
      const updatedTodos = get().todos.map((todo) =>
        todo._id === todoId ? res.data : todo
      );
      set({ todos: updatedTodos });
    } catch (error) {
      console.error("Failed to update todo:", error);
    }
  },
}));
