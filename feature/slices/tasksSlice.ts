import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Task {
  Id: string;
  title: string;
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
      const index = state.tasks.findIndex(t => t.Id === action.payload.Id);
      if (index >= 0) state.tasks[index] = action.payload;
    },
    deleteTask: (state, action: PayloadAction<string>) => {
      state.tasks = state.tasks.filter(t => t.Id !== action.payload);
    }
  }
});

export const { setTasks, addTask, updateTask, deleteTask } = tasksSlice.actions;
export default tasksSlice.reducer;
