import { useState, useEffect } from "react";

function TaskForm({ onSubmit, editingTask }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending"
  });

  useEffect(() => {
    if (editingTask) {
      setFormData({
        title: editingTask.title || "",
        description: editingTask.description || "",
        status: editingTask.status || "pending"
      });
    }
  }, [editingTask]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    if (!editingTask) {
      setFormData({ title: "", description: "", status: "pending" });
    }
  };

  return (
    <div className="card">
      <h2>{editingTask ? "Edit Task" : "Create Task"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Task title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Task description"
          value={formData.description}
          onChange={handleChange}
        />
        <select name="status" value={formData.status} onChange={handleChange}>
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        <button type="submit">
          {editingTask ? "Update Task" : "Create Task"}
        </button>
      </form>
    </div>
  );
}

export default TaskForm;