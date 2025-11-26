import { useNavigate, useParams } from 'react-router-dom';
import Header from '../components/Header';
import useTasks from "../hooks/useTasks";
import { useState, useEffect } from 'react';

export default function TaskDetail() {
    const { tasks, deleteTaskById, toggleStatus } = useTasks();
    const [task, setTask] = useState();
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const getTaskById = (taskId) => {
            // Convert taskId to number to match the type from server
            return tasks.find(t => t.id === parseInt(taskId));
        }
        setTask(getTaskById(id));
    }, [tasks, id]);

    const handleOnChangeStatus = (e) => {
        if (!task) return;
        const newStatus = e.target.value;
        toggleStatus(task.id, newStatus);
    }

    const handleDelete = (id) => {
        deleteTaskById(id);
        navigate(`/`);
    }

  return (
    <div className="min-h-screen bg-slate-50">
        <Header />
        <div className="max-w-4xl mx-auto py-8 px-4">
            {
                task ? (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                        <h2 className="text-3xl font-bold mb-6 text-slate-800">Task Detail</h2>
                        <div className="grid gap-4 mb-6">
                            <div className="border-b border-slate-200 pb-4">
                                <p className="text-sm text-slate-600 font-semibold">Title</p>
                                <p className="text-lg text-slate-800">{task.title}</p>
                            </div>
                            <div className="border-b border-slate-200 pb-4">
                                <p className="text-sm text-slate-600 font-semibold">Description</p>
                                <p className="text-slate-800">{task.description}</p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 border-b border-slate-200 pb-4">
                                <div>
                                    <p className="text-sm text-slate-600 font-semibold">Status</p>
                                    <p className="text-slate-800 capitalize">{task.status}</p>
                                </div>
                                <div>
                                    <p className="text-sm text-slate-600 font-semibold">Due Date</p>
                                    <p className="text-slate-800">{task.dueDate}</p>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-slate-600 font-semibold">Assignee</p>
                                <p className="text-slate-800">{task.assignee}</p>
                            </div>
                        </div>
                        
                        <div className="flex gap-4 pt-6 border-t border-slate-200">
                            <div className="flex-1">
                                <label className="block text-sm font-semibold text-slate-700 mb-2">Update Status:</label>
                                <select 
                                    value={task.status} 
                                    onChange={handleOnChangeStatus}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-slate-50"
                                >
                                    <option value="NOT_STARTED">Not Started</option>
                                    <option value="IN_PROGRESS">In Progress</option>
                                    <option value="COMPLETED">Completed</option>
                                </select>
                            </div>
                            <button 
                                type="button" 
                                onClick={() => handleDelete(task.id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-6 rounded transition self-end cursor-pointer"
                            >
                                Delete Task
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        <p className="text-gray-600 text-lg">Task not found. Please go back and select a task.</p>
                    </div>
                )                                                       
            }
            <button 
                type="button" 
                onClick={() => navigate(-1)}
                className="mt-6 bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded transition cursor-pointer"
            >
                Go Back
            </button>
        </div>
    </div>
  )
}
