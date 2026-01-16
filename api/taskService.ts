import { Task } from '../type/Task';

const baseURL = 'http://localhost:7060/api/task/';

// GET all tasks
export const fetchTasks = async (): Promise<Task[]> => {
    const response = await fetch(baseURL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return await response.json();
}

// CREATE a new task
export const createTask = async (task: Task): Promise<string> => {
    const response = await fetch(baseURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error('Failed to create task');
    return await response.json();
}

export const updateTask = async (task: Task, Id: string): Promise<string> => {
    const response = await fetch(`${baseURL}/${Id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    });
    if (!response.ok) throw new Error('Failed to update task');
    return await response.json();
}

export const deleteTask = async (Id: string): Promise<string> => {
    const response = await fetch(`${baseURL}/${Id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return await response.json();
}