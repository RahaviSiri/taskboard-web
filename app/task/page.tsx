'use client';

import { useTasks } from '../../hooks/useTasks';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { Pencil, Trash2 } from 'lucide-react';
import { updateTask, deleteTask, createTask } from '../../api/taskService';
import { useState } from 'react';

export default function TaskPage() {
  const [showForm, setShowForm] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null); 
  // track which task we are editing

  // CONNECT THE HOOK
  useTasks();

  // Read data from Redux
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // Handle clicking edit
  const handleUpdateClick = (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setEditingTaskId(taskId); // store the id of the task being edited
    setInputValue(task.title); // populate the input with the task title
    setShowForm(true); // show the form if hidden
  };

  // Handle deleting a task
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      console.log("Task deleted");
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  // Handle form submission (add or update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim()) return; // ignore empty input

    try {
      if (editingTaskId) {
        // Update existing task
        await updateTask({ title: inputValue }, editingTaskId);
        setEditingTaskId(null); // reset edit mode
      } else {
        // Create new task
        await createTask({ title: inputValue });
      }

      setInputValue(''); // clear input
      setShowForm(false); // close form
    } catch (error) {
      console.error("Failed to submit task:", error);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-6">📝 Task Manager</h1>

      {/* Toggle Add/Edit Form */}
      <button
        onClick={() => {
          setShowForm(!showForm);
          setEditingTaskId(null); // reset editing if opening form manually
          setInputValue('');
        }}
        className="mb-6 bg-blue-600 text-white px-6 py-2 rounded-full shadow hover:bg-blue-700 transition"
      >
        {showForm ? 'Close Form' : 'Add Task'}
      </button>

      {/* Add/Edit Task Form */}
      {showForm && (
        <div className="mb-6 w-full max-w-md bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="flex flex-col space-y-3">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              type="text"
              placeholder="Task Title"
              className="border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              type="submit"
              className={`px-4 py-2 rounded text-white ${
                editingTaskId ? 'bg-yellow-500 hover:bg-yellow-600' : 'bg-green-500 hover:bg-green-600'
              } transition`}
            >
              {editingTaskId ? 'Update Task' : 'Add Task'}
            </button>
          </form>
        </div>
      )}

      {/* Task List */}
      <div className="w-full max-w-3xl">
        {tasks.length === 0 ? (
          <p className="text-gray-400 text-center italic">No tasks found</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map(task => (
              <li
                key={task.id}
                className="p-4 bg-white rounded-lg shadow flex justify-between items-center hover:bg-gray-50 transition"
              >
                <span className="font-medium text-gray-700">{task.title}</span>
                <div className="flex gap-3">
                  <Pencil
                    className="text-blue-500 cursor-pointer hover:text-blue-600 transition"
                    onClick={() => handleUpdateClick(task.id)}
                  />
                  <Trash2
                    className="text-red-500 cursor-pointer hover:text-red-600 transition"
                    onClick={() => handleDelete(task.id)}
                  />
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
