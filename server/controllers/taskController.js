import * as taskService from '../services/taskService.js';
import { successResponse, errorResponse } from '../utils/responseHandlers.js';

// Get tasks by user ID
export const getCurrentUserTasks = async (req, res) => {
    try {
        const userId = req.user.id;
        const task = await taskService.getTasksByUserId(userId);
        return successResponse(res, 'Task fetched successfully', task);
    } catch (error) {
        return errorResponse(res, 'Failed to fetch tasks', error.message);
    }
};

// Add a new task
export const addTask = async (req, res) => {
    const userId = req.user.id;
    const { title, description, status, dueDate } = req.body;

    try {
        // Basic validation 
        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('Title is required and must be a non-empty string.');
        }
        if (!description || typeof description !== 'string' || description.trim() === '') {
            throw new Error('Description is required and must be a non-empty string.');
        }
        if (!status || !['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
            throw new Error('Status is required and must be a non-empty string.');
        }
        if (dueDate && isNaN(Date.parse(dueDate))) {
            throw new Error('Due date must be a valid date string.');
        }

        const newData = {
            title,
            description,
            status,
            dueDate: dueDate ? new Date(dueDate) : null,
            userId,
        };

        const task = await taskService.createTask(newData);
        return successResponse(res, 'Task added successfully', task);
    } catch (error) {
        return errorResponse(res, 'Failed to add task', error.message);
    }
};

// Delete a task by ID
export const deleteTaskById = async (req, res) => {
    try {
        const taskId = Number(req.params.id);
        await taskService.deleteTaskById(taskId);
        return successResponse(res, 'Task deleted successfully');

    } catch (error) {
        return errorResponse(res, 'Failed to delete task', error.message);
    }
};

// Update task(title, description, status, dueDate)
export const updateTaskById = async (req, res) => {
    try {
        const taskId = Number(req.params.id);
        const { title, description, status, dueDate } = req.body;

        // Basic validation 
        if (!title || typeof title !== 'string' || title.trim() === '') {
            throw new Error('Title is required and must be a non-empty string.');
        }
        if (!description || typeof description !== 'string' || description.trim() === '') {
            throw new Error('Description is required and must be a non-empty string.');
        }
        if (!status || !['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'].includes(status)) {
            throw new Error('Status is required and must be a non-empty string.');
        }
        if (dueDate && isNaN(Date.parse(dueDate))) {
            throw new Error('Due date must be a valid date string.');
        }

        const updatedData = { title, description, status, dueDate: dueDate ? new Date(dueDate) : null };
        const task = await taskService.updateTaskById(taskId, updatedData);
        return successResponse(res, 'Task updated successfully', task);
    } catch (error) {
        return errorResponse(res, 'Failed to update task', error.message);
    }
}

// Update task status only
export const changeTaskStatusById = async (req, res) => {
    try {
        const taskId = Number(req.params.id);
        const { status } = req.body;
        const task = await taskService.updateTaskStatusById(taskId, status);
        return successResponse(res, 'Status updated successfully', task);
    } catch (error) {
        return errorResponse(res, 'Failed to update status', error.message);
    }
};


