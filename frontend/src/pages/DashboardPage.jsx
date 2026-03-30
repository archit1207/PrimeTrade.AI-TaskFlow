import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import TaskForm from "../components/TaskForm";
import TaskCard from "../components/TaskCard";
import Alert from "../components/Alert";

function DashboardPage() {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  const fetchTasks = async () => {
    try {
      const data = await getTasks();
      setTasks(data.tasks);
    } catch (err) {
      setError("Failed to fetch tasks");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleCreateOrUpdate = async (formData) => {
    try {
      if (editingTask) {
        await updateTask(editingTask._id, formData);
        setMessage("Task updated successfully");
        setEditingTask(null);
      } else {
        await createTask(formData);
        setMessage("Task created successfully");
      }
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Operation failed");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteTask(id);
      setMessage("Task deleted successfully");
      fetchTasks();
    } catch (err) {
      setError(err.response?.data?.message || "Delete failed");
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="container">
      <div className="card">
        <h1>Dashboard</h1>
        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <button onClick={handleLogout}>Logout</button>
      </div>

      <Alert type="success" message={message} />
      <Alert type="error" message={error} />

      <TaskForm onSubmit={handleCreateOrUpdate} editingTask={editingTask} />

      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <div className="card">No tasks found</div>
      ) : (
        tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={setEditingTask}
            onDelete={handleDelete}
          />
        ))
      )}
    </div>
  );
}

export default DashboardPage;