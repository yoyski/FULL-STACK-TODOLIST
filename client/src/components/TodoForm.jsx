import { useTodoStore } from "../stores/todoStore";

const TodoForm = () => {
  const createTodo = useTodoStore((state) => state.createTodo);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const title = e.target[0].value.trim();
    if (!title) return;
    await createTodo(title);
    e.target.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-3 bg-white p-4 mb-6"
    >
      <input
        type="text"
        placeholder="Enter a new todo..."
        required
        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition"
      >
        Add
      </button>
    </form>
  );
};

export default TodoForm;
