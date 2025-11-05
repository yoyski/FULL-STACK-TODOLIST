import { useEffect, useState } from "react";
import { useTodoStore } from "../stores/todoStore";

const TodoItem = () => {
  const fetchTodos = useTodoStore((state) => state.fetchTodos);
  const todos = useTodoStore((state) => state.todos);
  const deleteTodo = useTodoStore((state) => state.deleteTodo);
  const updateTodo = useTodoStore((state) => state.updateTodo);
  const { loading } = useTodoStore();
  const [editId, setEditId] = useState(null);
  const [newTitle, setNewTitle] = useState("");

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleDelete = async (todoId) => {
    await deleteTodo(todoId);
  };

  const startEditing = (todo) => {
    setEditId(todo._id);
    setNewTitle(todo.title);
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    await updateTodo(editId, newTitle);
    setEditId(null);
    setNewTitle("");
  };

  return (
    <div className="bg-white p-6 mt-4">
      {loading && <p className="text-gray-500">Loading...</p>}

      {todos.length === 0 ? (
        <p className="text-gray-400 text-center italic">No Todos Found</p>
      ) : (
        <ul className="space-y-3">
          {todos.map((todo) => (
            <li
              key={todo._id}
              className="flex items-center justify-between bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              {editId === todo._id ? (
                <form onSubmit={handleEdit} className="flex gap-2 flex-1">
                  <input
                    type="text"
                    value={newTitle}
                    required
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="flex-1  focus:outline-none"
                  />
                  <button
                    type="submit"
                    className="bg-green-500 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition"
                  >
                    Done
                  </button>
                </form>
              ) : (
                <div className="flex-1 text-gray-800 font-medium">{todo.title}</div>
              )}

              {editId !== todo._id && (
                <div className="flex gap-2">
                  <button
                    onClick={() => startEditing(todo)}
                    className="text-sm bg-yellow-400 hover:bg-yellow-500 text-white px-3 py-1 rounded-lg transition"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    className="text-sm bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg transition"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TodoItem;
