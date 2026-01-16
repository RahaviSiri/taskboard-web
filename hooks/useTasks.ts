import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setTasks, addTask, updateTask, deleteTask } from '../feature/slices/tasksSlice';
import axios from 'axios';
import * as signalR from '@microsoft/signalr';

export const useTasks = () => {
    const baseURL = "https://localhost:7060/api/task/";
    const dispatch = useDispatch();

    useEffect(() => {
        axios.get(`${baseURL}`).then(res => dispatch(setTasks(res.data)));

        // SignalR connection
        const connection = new signalR.HubConnectionBuilder()
            .withUrl('https://localhost:7060/taskHub',{
                withCredentials: true
            })
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.Information)
            .build();

        connection.start();
        connection.on('TaskCreated', (task) => dispatch(addTask(task)));
        connection.on('TaskUpdated', (task) => dispatch(updateTask(task)));
        connection.on('TaskDeleted', (id) => dispatch(deleteTask(id)));

        return () => { connection.stop(); }
    }, [dispatch]);
}
