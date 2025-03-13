import React, { useState } from "react";

type Todo = {
  id: number;
  task: string;
  isCompleted: boolean;
};

const Todo = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [task, setTask] = useState<string>("");

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask(event.target.value);
  };

  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (task.trim().length === 0) {
      alert("Please enter a task");
      return;
    }
    const todo: Todo = {
      id: Date.now(),
      task: task,
      isCompleted: false,
    };
    setTodos([todo, ...todos]);
    setTask("");
  };

  const handleChangeChecked = (todo: Todo) => {
    setTodos(
      todos.map((t) =>
        t === todo ? { ...t, isCompleted: !t.isCompleted } : t
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* Form Section */}
      <div className="bg-white p-6 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4 text-center">
          Todo List
        </h2>
        <form onSubmit={handleFormSubmit} className="flex gap-2">
          <input
            type="text"
            name="task"
            value={task}
            onChange={handleInput}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter a task..."
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
          >
            Add
          </button>
        </form>
      </div>

      {/* Todo List Section */}
      <ul className="mt-6 w-full max-w-md">
        {todos.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks yet. Add one!</p>
        ) : (
          todos.map((element) => (
            <li
              key={element.id}
              className="flex justify-between items-center bg-white p-4 my-2 rounded-lg shadow-md"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={element.isCompleted}
                  onChange={() => handleChangeChecked(element)}
                  className="w-5 h-5 accent-green-500"
                />
                <span
                  className={`text-lg ${
                    element.isCompleted ? "line-through text-gray-500" : "text-gray-800"
                  }`}
                >
                  {element.task}
                </span>
              </div>
              <button
                onClick={() => handleDelete(element.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition-all"
              >
                Remove
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Todo;
