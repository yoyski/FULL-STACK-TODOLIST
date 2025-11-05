import Todo from "../models/Todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.user; // from decoded in protect

    const todo = new Todo({
      title,
      userId: id,
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ userId: req.user.id });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id }, //Query - Only the document that matches this filter will be updated.
      req.body, // this is the update
      { new: true } // this is option
    );
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!todo) return res.status(404).json({ message: "Todo not found" });
    res.json({ message: "Todo deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
