'use client';

import { useTasks } from '../../hooks/useTasks';
import { useSelector } from 'react-redux';
import { RootState } from '../../feature/store';

export default function TaskPage() {
  // CONNECT THE HOOK
  useTasks();

  // Read data from Redux
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Task Page
      </h1>

      <div className="w-full max-w-3xl bg-white shadow-lg rounded-lg p-6">
        {tasks.length === 0 ? (
          <p className="text-gray-500 text-center">No tasks found</p>
        ) : (
          <ul className="space-y-3">
            {tasks.map(task => (
              <li
                key={task.Id}
                className="p-3 border rounded flex justify-between"
              >
                <span>{task.title}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
