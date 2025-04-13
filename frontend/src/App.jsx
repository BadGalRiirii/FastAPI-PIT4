import { useEffect, useState } from 'react';
import './App.css';

const API = "https://fastapi-pit4.onrender.com/todos/"; // ✅ Correct API base

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [filter, setFilter] = useState("all");
  const [darkMode, setDarkMode] = useState(false);

  const fetchTodos = async () => {
    let url = API;
    if (filter !== "all") url += `filter/${filter}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, [filter]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = { title, completed: false };

    try {
      if (editingId) {
        await fetch(`${API}${editingId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...payload,
            completed: todos.find(t => t.id === editingId).completed,
          }),
        });
        setEditingId(null);
      } else {
        await fetch(API, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      setTitle("");
      fetchTodos();
    } catch (error) {
      console.error("Error submitting todo:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${API}${id}`, { method: "DELETE" });
      fetchTodos();
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    const todo = todos.find(t => t.id === id);
    try {
      await fetch(`${API}${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...todo, completed: !completed }),
      });
      fetchTodos();
    } catch (error) {
      console.error("Error toggling completion:", error);
    }
  };

  return (
    <div className={`App ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <h1>To-Do List</h1>

        <button className="toggle-btn" onClick={() => setDarkMode(!darkMode)}>
          Toggle {darkMode ? "Light" : "Dark"} Mode
        </button>

        <form className="todo-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter a task"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <button type="submit">{editingId ? "Update" : "Add"}</button>
        </form>

        <div className="filters">
          {["all", "completed", "pending"].map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={filter === f ? "active" : ""}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="todo-list">
          {todos.map(todo => (
            <li className="todo-item" key={todo.id}>
              <span
                className={`todo-title ${todo.completed ? 'completed' : ''}`}
                onClick={() => toggleComplete(todo.id, todo.completed)}
              >
                {todo.title}
              </span>
              <div className="actions">
                <button className="edit-btn" onClick={() => {
                  setTitle(todo.title);
                  setEditingId(todo.id);
                }}>✏️</button>
                <button className="delete-btn" onClick={() => handleDelete(todo.id)}>❌</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
