import { useState } from 'react';
import useTasks from '../hooks/useTasks.jsx';
import { useNavigate } from 'react-router-dom';
import Layout from '../layout/Layout';
import { toast } from 'react-toastify';
import { validateDueDate } from '../utils/validate.jsx';

export default function AddTask() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('NOT_STARTED');
    const [dueDate, setDueDate] = useState('');
    const { addNewTask, loading } = useTasks();
    const [localError, setLocalError] = useState(null);
    const navigate = useNavigate();

    // Handle form submission to add a new task
    const onSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);

        const dueDateError = validateDueDate(dueDate);
        if (dueDateError) {
            setLocalError(dueDateError);
            return;
        }

        try {
            await addNewTask({ title, description, status, dueDate });
            setTitle('');
            setDescription('');
            setStatus('NOT_STARTED');
            setDueDate('');
            toast.success('Task added successfully!');
            navigate(`/home`);
        } catch (err) {
            setLocalError(err.message);
        }
    }

    return (
        <Layout>
            <div className="max-w-2xl mx-auto py-8 px-4">
                <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                    <h1 className="text-3xl font-bold mb-6 text-slate-800">Add a New Task</h1>
                    {(localError) && <p className="text-red-500 mb-4">{localError}</p>}
                    <form onSubmit={onSubmit} className="space-y-4">
                        {/* Title Field */}
                        <div>
                            <label htmlFor="task-title" className="block text-sm font-semibold text-slate-700 mb-2"><span className="text-red-500">*</span>Title:</label>
                            <input
                                required
                                id="task-title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder='Enter task title...'
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
                            />
                        </div>
                        {/* Description Field */}
                        <div>
                            <label htmlFor="task-description" className="block text-sm font-semibold text-slate-700 mb-2"><span className="text-red-500">*</span>Description:</label>
                            <textarea
                                required
                                id="task-description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder='Enter task description...'
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white resize-none"
                                rows="4"
                            />
                        </div>
                        {/* Status Field */}
                        <div>
                            <label htmlFor="task-status" className="block text-sm font-semibold text-slate-700 mb-2"><span className="text-red-500">*</span>Status:</label>
                            <select
                                required
                                id="task-status"
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
                            >
                                <option value="NOT_STARTED">To Do</option>
                                <option value="IN_PROGRESS">In Progress</option>
                                <option value="COMPLETED">Done</option>
                            </select>
                        </div>
                        {/* Due Date Field */}
                        <div>
                            <label htmlFor="task-due-date" className="block text-sm font-semibold text-slate-700 mb-2"><span className="text-red-500">*</span>Due Date:</label>
                            <input
                                required
                                id="task-due-date"
                                type="date"
                                value={dueDate}
                                onChange={(e) => setDueDate(e.target.value)}
                                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-white"
                            />
                        </div>
                        {/* Buttons */}
                        <div className="flex gap-2 pt-4">
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
                            >
                                {loading ? 'Adding...' : 'Add Task'}
                            </button>
                            <button
                                type="button"
                                disabled={loading}
                                onClick={() => navigate(-1)}
                                className="bg-slate-400 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded transition cursor-pointer"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </Layout>
    )
}