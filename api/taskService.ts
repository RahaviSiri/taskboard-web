import { SubTask } from '@/type/SubTask';
import { Task } from '../type/Task';

const baseURL = 'https://localhost:7060/api/task';

interface TaskDTO {
    title: string;
    description: string;
    startDate: string;
    subTasks: SubTask[];
    status: string;
}

// GET all tasks
export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return await response.json();
}

// CREATE a new task
export const createTask = async (task: TaskDTO): Promise<void> => {
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error('Failed to create task');
    return;
}

export const updateTask = async (task: TaskDTO, Id: string): Promise<void> => {
    const response = await fetch(`${baseURL}/${Id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error('Failed to update task');
    return;
}

export const deleteTask = async (Id: string): Promise<void> => {
    const response = await fetch(`${baseURL}/${Id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return;
}