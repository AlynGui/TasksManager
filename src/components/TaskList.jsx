import { useNavigate } from 'react-router-dom';
import { useState, useMemo, useEffect } from 'react';
import useTasks from '../hooks/useTasks.jsx';
import leftArrow from '../assets/leftArrow.svg';
import rightArrow from '../assets/rightArrow.svg';

// TaskList component to display tasks in a paginated grid
export default function TaskList({ tasks }) {
    const navigate = useNavigate();
    const { deleteTaskById } = useTasks();
    // pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 6; // tasks per page
    const totalPages = Math.ceil((tasks?.length || 0) / tasksPerPage);
    // paginated tasks
    const paginatedTasks = useMemo(() => {
        const startIndex = (currentPage - 1) * tasksPerPage;
        const endIndex = startIndex + tasksPerPage;
        return tasks?.slice(startIndex, endIndex) || [];
    }, [tasks, currentPage]);

    // page change reset to page 1
    useEffect(() => {
        setCurrentPage(1);
    }, [tasks?.length]);

    // pagination handlers
    const goToPage = (page) => {
        setCurrentPage(page);
        //scroll to top after page change
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // previous and next page handlers
    const goToPreviousPage = () => {
        if (currentPage > 1) {
            goToPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            goToPage(currentPage + 1);
        }
    };

    // get status color classes
    const getStatusColor = (status) => {
        switch (status) {
            case 'NOT_STARTED':
                return 'bg-gray-100 text-gray-800 border-gray-300';
            case 'IN_PROGRESS':
                return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'COMPLETED':
                return 'bg-green-100 text-green-800 border-green-300';
            default:
                return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4">
            {/* Header Section */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mb-8">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold text-slate-800 mb-2">Task Overview</h2>
                    </div>
                    {tasks && tasks.length > 0 && (
                        <div className="bg-sky-50 border border-sky-200 px-4 py-2 rounded-lg">
                            <div className="text-sm font-semibold text-sky-700">
                                {Math.min((currentPage - 1) * tasksPerPage + 1, tasks.length)}-{Math.min(currentPage * tasksPerPage, tasks.length)} of {tasks.length}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            {paginatedTasks && paginatedTasks.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">{paginatedTasks.map((task) => (
                        <div
                            key={task.id}
                            className="bg-white rounded-lg shadow-sm border border-gray-200 transition-all duration-200 hover:shadow-md group"
                        >
                            {/* Card Header */}
                            <div className="bg-gradient-to-r from-sky-600 to-sky-700 p-4 relative">
                                <h3
                                    className="text-base font-bold text-white cursor-pointer hover:text-slate-200 transition line-clamp-2 pr-8"
                                    onClick={() => { navigate(`/task/${task.id}`) }}
                                >
                                    {task.title}
                                </h3>
                            </div>

                            {/* Card Body */}
                            <div className="p-4 space-y-3">
                                {/* Description */}
                                {task.description && (
                                    <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                        {task.description}
                                    </p>
                                )}

                                <div className="space-y-2">
                                    {/* Status Badge */}
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-medium text-slate-500">Status</span>
                                        <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                                            {task.status === 'NOT_STARTED' ? 'To Do' :
                                                task.status === 'IN_PROGRESS' ? 'In Progress' :
                                                    'Done'}
                                        </span>
                                    </div>

                                    {/* Due Date */}
                                    {task.dueDate && (
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-slate-500">Due Date</span>
                                            <span className="text-slate-700 font-semibold text-sm">
                                                {new Date(task.dueDate).toISOString().split('T')[0]}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Card Footer */}
                            {/* <div className="bg-slate-50/50 px-4 py-3 border-t border-slate-100">
                                <button
                                    type="button"
                                    onClick={() => deleteTaskById(task.id)}
                                    className="w-full bg-red-50 hover:bg-red-100 border border-red-200 hover:border-red-300 text-red-600 font-medium py-2 px-3 rounded-md transition-all duration-200 text-sm cursor-pointer hover:shadow-sm"
                                >
                                    <svg className="w-4 h-4 inline-block mr-1" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                    Delete
                                </button>
                            </div> */}
                        </div>
                    ))}
                    </div>

                    {/* pagination controls */}
                    {totalPages > 1 && (
                        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-6 mt-8">
                            <div className="flex justify-center items-center space-x-3">
                                <button
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-medium hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                                >
                                    <img src={leftArrow} alt="Previous" className="w-4 h-4" />
                                    Previous
                                </button>

                                <div className="flex space-x-1">
                                    {Array.from({ length: totalPages }, (_, index) => {
                                        const page = index + 1;
                                        // Display strategy: always show the first page, last page, and one page before and after the current page
                                        const showPage =
                                            page === 1 ||
                                            page === totalPages ||
                                            (page >= currentPage - 1 && page <= currentPage + 1);

                                        const showEllipsis =
                                            (page === 2 && currentPage > 4) ||
                                            (page === totalPages - 1 && currentPage < totalPages - 3);

                                        if (!showPage && !showEllipsis) return null;

                                        if (showEllipsis) {
                                            return (
                                                <span key={`ellipsis-${page}`} className="px-3 py-2 text-slate-500">
                                                    ...
                                                </span>
                                            );
                                        }

                                        return (
                                            <button
                                                key={page}
                                                onClick={() => goToPage(page)}
                                                className={`px-4 py-2 rounded-lg transition font-medium ${currentPage === page
                                                    ? 'bg-gradient-to-r from-sky-600 to-sky-700 text-white shadow-md'
                                                    : 'bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 hover:border-slate-400'
                                                    }`}
                                            >
                                                {page}
                                            </button>
                                        );
                                    })}
                                </div>

                                <button
                                    onClick={goToNextPage}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-300 text-slate-700 font-medium hover:border-slate-400 disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-2"
                                >
                                    Next
                                    <img src={rightArrow} alt="Next" className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            ) : (
                <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-slate-200">
                    <div className="mb-6">
                        <div className="bg-slate-100 rounded-full p-6 w-24 h-24 mx-auto mb-4 flex items-center justify-center">
                            <svg className="w-12 h-12 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <h3 className="text-xl font-semibold text-slate-800 mb-2">No tasks found</h3>
                        <p className="text-slate-600 mb-6">Start by creating your first task to get organized</p>
                    </div>
                </div>
            )}
        </div>
    )
}
