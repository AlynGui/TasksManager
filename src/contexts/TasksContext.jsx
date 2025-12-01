import { createContext, useState, useEffect } from 'react';
import * as TasksApi from '../api/TasksApi.jsx';
import useAuth from '../hooks/useAuth.jsx';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);
    const { user } = useAuth();

    // Fetch tasks when user changes
    useEffect(() => {
        // Only fetch tasks if user is logged in
        if (!user) {
            setLoading(false);
            setTasks([]);
            return;
        }

        const controller = new AbortController();

        const fetchTasks = async (controller) => {
            setLoading(true);
            setError(null);
            try {
                const data = await TasksApi.getCurrentUserTasks(controller.signal);
                if (!controller.signal.aborted) {
                    setTasks(data);
                }
            } catch (err) {
                if (err.name !== 'AbortError' && !controller.signal.aborted) {
                    setError(err.message);
                    throw err;
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        };

        fetchTasks(controller);

        return () => controller.abort();
    }, [user]);

    // Delete task by ID
    const deleteTaskById = async (id) => {
        setError(null);
        setLoading(true);
        try {
            await TasksApi.deleteTaskById(id);
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // Toggle task status
    const toggleStatus = async (id, newStatus) => {
        setError(null);
        setLoading(true);
        try {
            await TasksApi.updateTaskStatusById(id, { status: newStatus });
            setTasks(prevTasks => prevTasks.map(task =>
                task.id === id ? { ...task, status: newStatus } : task
            ));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // Toggle task status
    const updateTaskById = async (id, updatedData) => {
        setError(null);
        setLoading(true);
        try {
            await TasksApi.updateTaskById(id, updatedData);
            setTasks(prevTasks => prevTasks.map(task =>
                task.id === id ? { ...task, ...updatedData } : task
            ));
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    // Add new task
    const addNewTask = async (taskData) => {
        setError(null);
        setLoading(true);
        try {
            const newTask = await TasksApi.addTask(taskData);
            setTasks(prevTasks => [...prevTasks, newTask]);
            return newTask;
        } catch (err) {
            setError(err.message);
            throw err;
        } finally {
            setLoading(false);
        }
    }

    const value = { tasks, loading, error, deleteTaskById, toggleStatus, updateTaskById, addNewTask };

    return (
        <TasksContext.Provider value={value}>
            {children}
        </TasksContext.Provider>
    )
}
