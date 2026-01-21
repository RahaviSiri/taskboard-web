'use client';

import { useTasks } from '../../hooks/useTasks';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';
import { Plus, X } from 'lucide-react';
import { updateTask, deleteTask, createTask } from '../../api/taskService';
import { useState } from 'react';
import { SubTask } from '@/type/SubTask';
import TaskCard from '@/components/TaskCard';

export default function TaskPage() {
  const [showForm, setShowForm] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [subTaskTitle, setSubTaskTitle] = useState('');
  const [subTaskDescription, setSubTaskDescription] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startDate: '',
    subTasks: [] as SubTask[],
    status: 'Pending'
  });

  // Call custom hook to fetch tasks
  useTasks();

  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  // Handle form input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addSubTask = () => {
    if (!subTaskTitle.trim()) return;
    setFormData(prev => ({
      ...prev,
      subTasks: [
        ...prev.subTasks,
        { title: subTaskTitle, description: subTaskDescription, order: prev.subTasks.length + 1 }
      ]
    }));
    setSubTaskTitle('');
    setSubTaskDescription('');
  };

  const removeSubTask = (index: number) => {
    setFormData(prev => ({
      ...prev,
      subTasks: prev.subTasks.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateClick = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    setEditingTaskId(id);
    setFormData({
      title: task.title,
      description: task.description,
      startDate: task.startDate
        ? task.startDate.split('T')[0]
        : '',
      subTasks: task.subTasks,
      status: task.status
    });

    setShowForm(true);
  };

  // Handle deleting a task 
  const handleDelete = async (id: string) => {
    try {
      await deleteTask(id);
      console.log("Task deleted");
    }
    catch (error) {
      console.error("Failed to delete task:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    editingTaskId
      ? await updateTask(formData, editingTaskId)
      : await createTask(formData);

    setShowForm(false);
    setEditingTaskId(null);
    setFormData({
      title: '',
      description: '',
      startDate: '',
      subTasks: [],
      status: 'Pending'
    });
    setSubTaskDescription('');
    setSubTaskTitle('');
  };

  const moveSubTask = (index: number, direction: 'up' | 'down') => {
    setFormData(prev => {
      const updated = [...prev.subTasks];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;

      if (targetIndex < 0 || targetIndex >= updated.length) return prev;

      [updated[index], updated[targetIndex]] =
        [updated[targetIndex], updated[index]];

      // Recalculate order
      return {
        ...prev,
        subTasks: updated.map((st, i) => ({ ...st, order: i + 1 }))
      };
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-4xl font-bold text-center mb-8">📝 Task Manager</h1>

      <div className="flex justify-center mb-6">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
        >
          {showForm ? 'Close Form' : 'Add Task'}
        </button>
      </div>

      {/* FORM */}
      {showForm && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow mb-8">
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Task title"
              className="w-full border px-4 py-2 rounded"
            />

            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Task description"
              className="w-full border px-4 py-2 rounded"
            />

            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            />

            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border px-4 py-2 rounded"
            >
              <option value="Pending">Pending</option>
              <option value="InProgress">In Progress</option>
              <option value="Completed">Completed</option>
            </select>

            {/* SUBTASKS */}
            <div>
              <div className="space-y-2">
                <input
                  value={subTaskTitle}
                  onChange={e => setSubTaskTitle(e.target.value)}
                  placeholder="Subtask title"
                  className="w-full border px-3 py-2 rounded"
                />

                <textarea
                  value={subTaskDescription}
                  onChange={e => setSubTaskDescription(e.target.value)}
                  placeholder="Subtask description"
                  className="w-full border px-3 py-2 rounded"
                />

                <button
                  type="button"
                  onClick={addSubTask}
                  className="bg-green-500 text-white px-3 py-2 rounded flex items-center gap-1"
                >
                  <Plus size={16} /> Add Subtask
                </button>
              </div>

              <ul className="mt-2 space-y-2">
                {formData.subTasks.map((st, i) => (
                  <li
                    key={i}
                    className="bg-gray-100 px-3 py-2 rounded space-y-1"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">
                        {st.order}. {st.title}
                      </span>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={i === 0}
                          onClick={() => moveSubTask(i, 'up')}
                          className="text-xs bg-gray-300 px-2 rounded disabled:opacity-50"
                        >
                          up
                        </button>

                        <button
                          type="button"
                          disabled={i === formData.subTasks.length - 1}
                          onClick={() => moveSubTask(i, 'down')}
                          className="text-xs bg-gray-300 px-2 rounded disabled:opacity-50"
                        >
                          down
                        </button>

                        <X
                          size={16}
                          className="cursor-pointer text-red-500"
                          onClick={() => removeSubTask(i)}
                        />
                      </div>
                    </div>

                    {st.description && (
                      <p className="text-sm text-gray-600">{st.description}</p>
                    )}
                  </li>
                ))}
              </ul>

            </div>

            <button
              type="submit"
              className={`w-full py-2 rounded text-white ${editingTaskId ? 'bg-yellow-500' : 'bg-green-600'
                }`}
            >
              {editingTaskId ? 'Update Task' : 'Create Task'}
            </button>
          </form>
        </div>
      )}

      {/* TASK LIST */}
      <div className="max-w-3xl mx-auto space-y-4">
        {tasks.length === 0 ? (
          <p className="text-center text-gray-400 italic">No tasks found</p>
        ) : (
          tasks.map(task => (
            <TaskCard
              key={task.id}
              task={task}
              onEdit={handleUpdateClick}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>

    </div>
  );
}
