import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './slices/tasksSlice';

// Creates the Redux store — the global container that holds all app’s state.
export const store = configureStore(
    { 
        reducer: { 
            tasks: tasksReducer 
        } 
    }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
