import { TaskStatus } from '@/enums/TaskStatus';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TStatus = TaskStatus.Pending | TaskStatus.InProgress | TaskStatus.Completed;

interface SubTask {
  title: string;
  description: string;
  order: number;
}

interface Task {
  id: string;
  title: string;
  description: string;
  startDate: string;
  subTasks: SubTask[];
  status: TStatus;
}

interface TaskState {
  tasks: Task[]; // This is the single source of truth for entire app.
}

const initialState: TaskState = { tasks: [] };

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => { state.tasks = action.payload },
    addTask: (state, action: PayloadAction<Task>) => { state.tasks.push(action.payload) },
    updateTask: (state, action: PayloadAction<Task>) => {
      const index = state.tasks.findIndex(t => t.id === action.payload.id);
      if (index >= 0) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.id !== action.payload);
    }
  }
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
