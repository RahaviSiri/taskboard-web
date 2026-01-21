import { Pencil, Trash2, Calendar } from 'lucide-react';
import { SubTask } from '@/type/SubTask';

interface TaskCardProps {
  task: {
    id: string;
    title: string;
    description: string;
    startDate: string;
    status: string;
    subTasks: SubTask[];
  };
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TaskCard({ task, onEdit, onDelete }: TaskCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-5 space-y-3 hover:shadow-md transition">
      {/* HEADER */}
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
          {task.description && (
            <p className="text-sm text-gray-500 mt-1">{task.description}</p>
          )}
        </div>

        <span
          className={`text-xs px-3 py-1 rounded-full font-medium ${
            task.status === 'Completed'
              ? 'bg-green-100 text-green-700'
              : task.status === 'InProgress'
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          {task.status}
        </span>
      </div>

      {/* DATE */}
      {task.startDate && (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Calendar size={16} />
          <span>{new Date(task.startDate).toLocaleDateString()}</span>
        </div>
      )}

      {/* SUBTASKS */}
      {task.subTasks.length > 0 && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-1">Subtasks</p>
          <ul className="space-y-1">
            {task.subTasks.map((subTask, index) => (
              <li
                key={index}
                className="text-sm bg-gray-100 px-3 py-1 rounded flex justify-between"
              >
                <div className='flex flex-col gap-2'>
                  <span className='font-bold'>Title : {subTask.title}</span>
                  <span>Description : {subTask.description}</span>
                </div>
                <span className="text-xs text-gray-400">#{subTask.order}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* ACTIONS */}
      <div className="flex justify-end gap-4 pt-2">
        <Pencil
          size={18}
          className="cursor-pointer text-blue-500 hover:text-blue-600"
          onClick={() => onEdit(task.id)}
        />
        <Trash2
          size={18}
          className="cursor-pointer text-red-500 hover:text-red-600"
          onClick={() => onDelete(task.id)}
        />
      </div>
    </div>
  );
}
