import { createContext, useState, useEffect } from 'react';
import { getAllTasks, deleteTask, updateTask, addTask } from '../api/TasksApi.jsx';

export const TasksContext = createContext();

export const TasksProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const controller = new AbortController();

        getAllTasks(controller.signal)
        .then(data => {
            // setTasks(data);
            setTasks(data.tasks);    // vercel data structure
        })
        .catch(err => { 
            setError(err.message);
        })
        .finally(() => setLoading(false));

        return () => controller.abort();
    }, []);

    const deleteTaskById = (id) => {
        deleteTask(id)
        .then(() => {     
            setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
        })
        .catch(err => {
            setError(err.message);
        });
    }

    const toggleStatus = (id, newStatus) => {
        
        updateTask(id, { status: newStatus })
        .then(() => {
            setTasks(prevTasks => 
                prevTasks.map(task => 
                    task.id === id ? { ...task, status: newStatus } : task
                )
            );
        })
        .catch(err => {
            setError(err.message);
        });
    }

    const addNewTask = (taskData) => {
        addTask(taskData)
        .then((newTask) => {
            setTasks(prevTasks => [...prevTasks, newTask]);
        })
        .catch(err => {
            setError(err.message);
        });
    }
    const value = { tasks, loading, error, deleteTaskById, toggleStatus, addNewTask };

    return (
    <TasksContext.Provider value={value}>
        {children}
    </TasksContext.Provider>
    )
}
