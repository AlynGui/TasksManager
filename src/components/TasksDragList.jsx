import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useNavigate } from 'react-router-dom';
import useTasks from '../hooks/useTasks.jsx';
import bars from '../assets/bars.svg';
import { getStatusColor, getStatusTranslation } from '../utils/common.jsx';

// TasksDragList component for drag-and-drop task management
export default function TasksDragList({ tasks }) {
    const navigate = useNavigate();
    const [taskColumns, setTaskColumns] = useState({
        'NOT_STARTED': {
            id: 'NOT_STARTED',
            title: 'To Do',
            tasks: []
        },
        'IN_PROGRESS': {
            id: 'IN_PROGRESS',
            title: 'In Progress',
            tasks: []
        },
        'COMPLETED': {
            id: 'COMPLETED',
            title: 'Done',
            tasks: []
        }
    });
    const { deleteTaskById, toggleStatus } = useTasks();

    // Update column data based on incoming tasks
    useEffect(() => {
        const updatedColumns = {
            'NOT_STARTED': {
                id: 'NOT_STARTED',
                title: 'To Do',
                tasks: []
            },
            'IN_PROGRESS': {
                id: 'IN_PROGRESS',
                title: 'In Progress',
                tasks: []
            },
            'COMPLETED': {
                id: 'COMPLETED',
                title: 'Done',
                tasks: []
            }
        };

        // Assign tasks to corresponding columns
        tasks?.forEach(task => {
            if (updatedColumns[task.status]) {
                updatedColumns[task.status].tasks.push(task);
            }
        });
        setTaskColumns(updatedColumns);
    }, [tasks]);

    // Handle drag end event
    const handleDragEnd = (result) => {
        const { destination, source, draggableId } = result;

        // If no destination or position unchanged, do nothing
        if (!destination ||
            (destination.droppableId === source.droppableId &&
                destination.index === source.index)) {
            return;
        }

        const taskId = parseInt(draggableId);
        const newStatus = destination.droppableId;

        // Update task status
        toggleStatus(taskId, newStatus);
    };

    return (
        <div className="max-w-6xl mx-auto px-4">
            {/* Header Section */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-slate-800 mb-2">Task Board</h2>
                <p className="text-slate-600">Drag and drop tasks to organize your workflow</p>
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Object.values(taskColumns).map(column => (
                        <div key={column.id} className="bg-gray-50 rounded-xl overflow-hidden">
                            {/* Column Header */}
                            <div className="px-4 py-3 bg-white border-b border-gray-200">
                                <div className="flex items-center justify-between">
                                    <h3 className="font-semibold text-gray-800 text-sm">
                                        {column.title}
                                    </h3>
                                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
                                        {column.tasks.length}
                                    </span>
                                </div>
                            </div>

                            {/* Column Body */}
                            <Droppable droppableId={column.id}>
                                {(provided, snapshot) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                        className={`min-h-96 p-3 transition-all duration-300 ${snapshot.isDraggingOver
                                                ? 'bg-blue-50'
                                                : 'bg-gray-50'
                                            }`}
                                    >
                                        {column.tasks.map((task, index) => (
                                            <Draggable
                                                key={task.id}
                                                draggableId={task.id.toString()}
                                                index={index}
                                            >
                                                {(provided, snapshot) => (
                                                    <div
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        className={`bg-white rounded-lg shadow-sm border border-gray-200 mb-3 cursor-move transition-all duration-200 hover:shadow-md ${snapshot.isDragging
                                                                ? 'shadow-lg rotate-1 scale-105'
                                                                : ''
                                                            }`}
                                                    >
                                                        {/* Card Header */}
                                                        <div className="bg-gradient-to-r from-sky-600 to-sky-700 p-4 relative">
                                                            <h3
                                                                className="text-base font-bold text-white cursor-pointer hover:text-slate-200 transition line-clamp-2 pr-8"
                                                                onClick={() => navigate(`/task/${task.id}`)}
                                                            >
                                                                {task.title}
                                                            </h3>
                                                            {/* Drag indicator */}
                                                            <div className="absolute top-3 right-3 opacity-60 group-hover:opacity-90 transition-opacity">
                                                                <img src={bars} alt="Drag Handle" className="w-5 h-5 filter brightness-0 invert" />
                                                            </div>
                                                        </div>

                                                        {/* Card Body */}
                                                        <div className="p-4 space-y-3">
                                                            {/* Description */}
                                                            {task.description && (
                                                                <p className="text-slate-600 text-sm leading-relaxed line-clamp-3">
                                                                    {task.description}
                                                                </p>
                                                            )}

                                                            {/* Task Details */}
                                                            <div className="space-y-2">
                                                                {/* Status Badge */}
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-sm font-medium text-slate-500">Status</span>
                                                                    <span className={`px-3 py-1.5 rounded-full text-xs font-medium border ${getStatusColor(task.status)}`}>
                                                                        {getStatusTranslation(task.status)}
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
                                                )}
                                            </Draggable>
                                        ))}
                                        {provided.placeholder}

                                        {column.tasks.length === 0 && (
                                            <div className="text-center py-12 text-gray-400">
                                                <div className="bg-gray-100 rounded-full p-4 w-16 h-16 mx-auto mb-3 flex items-center justify-center">
                                                    <img src={bars} alt="No tasks" className="w-8 h-8 filter brightness-0 invert" />
                                                </div>
                                                <p className="text-sm font-medium text-gray-500">No tasks</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </Droppable>
                        </div>
                    ))}
                </div>
            </DragDropContext>
        </div>
    );
}
