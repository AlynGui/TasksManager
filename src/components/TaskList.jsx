import { useNavigate } from 'react-router-dom';
import useTasks from '../hooks/useTasks.jsx';

export default function TaskList({tasks}) {

    const navigate = useNavigate();
    const { deleteTaskById, toggleStatus } = useTasks();

    const getStatusColor = (status) => {
        switch(status) {
            case 'not_started':
                return 'bg-gray-100 text-gray-800 border-gray-300';
            case 'in_progress':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'completed':
                return 'bg-green-100 text-green-800 border-green-300';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getStatusLabel = (status) => {
        const labels = {
            'not_started': 'Not Started',
            'in_progress': 'In Progress',
            'completed': 'Completed'
        };
        return labels[status] || status;
    };

    return (
        <div className="max-w-6xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-slate-800">Tasks</h2>
            {tasks && tasks.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {tasks.map((task) => (
                        <div 
                            key={task.id} 
                            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-slate-200"
                        >
                            {/* Card Header */}
                            <div className="bg-indigo-600 p-4">
                                <h3 
                                    className="text-lg font-bold text-white cursor-pointer hover:text-indigo-100 transition"
                                    onClick={() => {navigate(`/task/${task.id}`)}}
                                >
                                    {task.title}
                                </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-4 space-y-3">
                                <p className="text-gray-600 text-sm line-clamp-2">{task.description}</p>
                                
                                {/* Status Badge */}
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-semibold text-gray-600">Status:</span>
                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(task.status)}`}>
                                        {getStatusLabel(task.status)}
                                    </span>
                                </div>

                                {/* Task Details */}
                                <div className="grid grid-cols-2 gap-2 text-sm">
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase tracking-wide">Due Date</p>
                                        <p className="text-gray-800 font-semibold">{task.dueDate}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500 text-xs uppercase tracking-wide">Assignee</p>
                                        <p className="text-gray-800 font-semibold">{task.assignee}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Card Footer */}
                            <div className="bg-gray-50 px-4 py-3 border-t border-gray-200 space-y-2">
                                <div className="flex gap-2">
                                    <select 
                                        value={task.status} 
                                        onChange={(e) => toggleStatus(task.id, e.target.value)}
                                        className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                                    >
                                        <option value="not_started">Not Started</option>
                                        <option value="in_progress">In Progress</option>
                                        <option value="completed">Completed</option>
                                    </select>
                                </div>
                                <button 
                                    type="button" 
                                    onClick={() => deleteTaskById(task.id)}
                                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 px-4 rounded-lg transition duration-200 text-sm cursor-pointer"
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500 text-lg">No tasks found</p>
                </div>
            )}
        </div>
    )
}
