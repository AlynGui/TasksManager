import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import useTasks from "../hooks/useTasks";
import { useMemo, useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { validateDueDate } from '../utils/validate.jsx';

export default function TaskDetail() {
    const { tasks, deleteTaskById, updateTaskById, loading } = useTasks();
    const { id } = useParams();
    const [description, setDescription] = useState('');
    const [status, setStatus] = useState('NOT_STARTED');
    const [dueDate, setDueDate] = useState('');
    const [localError, setLocalError] = useState(null);
    const [isEditable, setIsEditable] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const navigate = useNavigate();
    const task = useMemo(() => {
        // Find the task with the matching ID
        return tasks.find(t => t.id === parseInt(id));
    }, [tasks, id]);

    // Initialize form fields when task is loaded
    useEffect(() => {
        if (task) {
            setDescription(task.description || '');
            setStatus(task.status || 'NOT_STARTED');
            // Format dueDate for date input (YYYY-MM-DD format)
            if (task.dueDate) {
                const date = new Date(task.dueDate);
                const formattedDate = date.toISOString().split('T')[0];
                setDueDate(formattedDate);
            } else {
                setDueDate('');
            }
        }
    }, [task]);

    // Handle task update
    const handleUpdate = async (e) => {
        e.preventDefault();
        setLocalError(null);

        const dueDateError = validateDueDate(dueDate);
        if (dueDateError) {
            setLocalError(dueDateError);
            return;
        }

        try {
            await updateTaskById(task.id, { title: task.title, description, status, dueDate });
            toast.success('Task updated successfully!');
            setIsEditable(false);
        } catch (err) {
            setLocalError(err.message);
        }
    };

    // Handle task deletion
    const handleDelete = async (e) => {
        e.preventDefault();
        try {
            await deleteTaskById(task.id);
            toast.success('Task deleted successfully!');
            navigate('/');
        } catch (err) {
            toast.error('Failed to delete task');
        }

    };

    // Close delete confirmation modal
    const closeDeleteModal = (e) => {
        e.preventDefault();
        setIsDeleteOpen(false);
    };

    // Enable editing mode
    const handleEdit = (e) => {
        e.preventDefault();
        setIsEditable(true);
        setLocalError(null);
    };

    // Cancel editing and revert changes
    const handleCancel = () => {
        if (task) {
            setDescription(task.description || '');
            setStatus(task.status || 'NOT_STARTED');
            // Format dueDate for date input when canceling
            if (task.dueDate) {
                const date = new Date(task.dueDate);
                const formattedDate = date.toISOString().split('T')[0];
                setDueDate(formattedDate);
            } else {
                setDueDate('');
            }
        }
        setIsEditable(false);
        setLocalError(null);
    };

    return (
        <Layout>
            <div className="max-w-2xl mx-auto py-8 px-4">
                {task ? (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
                        <h1 className="text-3xl font-bold mb-6 text-slate-800">Task Details</h1>
                        {/* Error Message */}
                        {localError && (
                            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm mb-6">
                                <div className="flex items-center">
                                    {localError}
                                </div>
                            </div>
                        )}

                        <form onSubmit={handleUpdate} className="space-y-4">
                            {/* Title Field */}
                            <div>
                                <label htmlFor="task-title" className="block text-sm font-semibold text-slate-700 mb-2">Title:</label>
                                <input
                                    disabled
                                    required
                                    id="task-title"
                                    type="text"
                                    value={task.title}
                                    className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50"
                                />
                            </div>

                            {/* Description Field */}
                            <div>
                                <label htmlFor="task-description" className="block text-sm font-semibold text-slate-700 mb-2"><span className="text-red-500">*</span>Description:</label>
                                <textarea
                                    disabled={!isEditable}
                                    required
                                    id="task-description"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    placeholder='Enter task description...'
                                    className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50 resize-none ${!isEditable ? 'cursor-not-allowed' : 'bg-white'}`}
                                    rows="4"
                                />
                            </div>
                            {/* Status Field */}
                            <div>
                                <label htmlFor="task-status" className="block text-sm font-semibold text-slate-700 mb-2"><span className="text-red-500">*</span>Status:</label>
                                <select
                                    disabled={!isEditable}
                                    required
                                    id="task-status"
                                    value={status}
                                    onChange={(e) => setStatus(e.target.value)}
                                    className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50 ${!isEditable ? 'cursor-not-allowed' : 'bg-white'}`}
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
                                    disabled={!isEditable}
                                    required
                                    id="task-due-date"
                                    type="date"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    className={`w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent bg-slate-50 ${!isEditable ? 'cursor-not-allowed' : 'bg-white'}`}
                                />
                            </div>
                            {/* Action Buttons */}
                            <div className="flex gap-2 pt-4">
                                {isEditable ? (
                                    <>
                                        <button
                                            type="submit"
                                            disabled={loading}
                                            className="flex-1 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
                                        >
                                            {loading ? 'Updating...' : 'Save Changes'}
                                        </button>
                                        <button
                                            type="button"
                                            onClick={handleCancel}
                                            className="bg-slate-400 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded transition cursor-pointer"
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            type="button"
                                            onClick={(e) => handleEdit(e)}
                                            className="flex-1 bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
                                        >
                                            Edit Task
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setIsDeleteOpen(true)}
                                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition cursor-pointer"
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </div>
                        </form>

                        <div className="mt-6">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="bg-slate-400 hover:bg-slate-500 text-white font-semibold py-2 px-4 rounded transition cursor-pointer"
                            >
                                Go Back
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 text-center">
                        <h1 className="text-3xl font-bold mb-6 text-slate-800">Task Not Found</h1>
                        <p className="text-slate-600 mb-6">The task you're looking for doesn't exist or may have been deleted.</p>
                        <button
                            onClick={() => navigate('/')}
                            className="bg-gradient-to-r from-sky-600 to-sky-700 hover:from-sky-700 hover:to-sky-800 text-white font-semibold py-2 px-4 rounded-lg transition cursor-pointer"
                        >
                            Return to Home
                        </button>
                    </div>
                )}

                {/* Delete Confirmation Modal */}
                {isDeleteOpen && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl p-8 w-full max-w-md mx-4 shadow-2xl">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl font-bold text-slate-800">Delete Task</h2>
                                <button
                                    onClick={(e) => closeDeleteModal(e)}
                                    className="text-slate-400 hover:text-slate-600 text-2xl cursor-pointer"
                                >
                                    ×
                                </button>
                            </div>
                            <p className="text-slate-700 mb-6">Are you sure you want to delete this task? This action cannot be undone.</p>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={(e) => closeDeleteModal(e)}
                                    className="flex-1 py-2 px-4 bg-slate-200 text-slate-800 rounded-lg hover:bg-slate-300 transition cursor-pointer"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={(e) => handleDelete(e)}
                                    className="flex-1 py-2 px-4 bg-gradient-to-r from-sky-600 to-sky-700 text-white rounded-lg hover:from-sky-700 hover:to-sky-800 transition disabled:opacity-50 cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>

                        </div>
                    </div>
                )}
            </div>
        </Layout>
    )
}
