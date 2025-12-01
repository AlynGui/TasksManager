import config from '../config/api.js';
import request from '../utils/request';

/**
 * Fetches tasks for the current user.
 * @param {AbortSignal} signal - Optional signal to abort the fetch request.
 * @returns {Promise<Array>} An array of task objects from the server response.
 */
 export const getCurrentUserTasks = async (signal) => {
    return request(`${config.API_BASE_URL + config.TASK_ENDPOINTS.TASKS_LIST}`, {
        method: 'GET',
        signal: signal
    });
 };

    /**
 * Adds a new task to the server.
 * @param {Object} taskData - The data of the task to add.
 * @returns {Promise<Object>} The created task object from the server response.
 */
export const addTask = async (taskData) => {
    return request (config.API_BASE_URL + config.TASK_ENDPOINTS.TASKS_ADD, {
        method: 'POST',
        body: JSON.stringify(taskData)
    });
};

/**
 * Updates an existing task.
 * @param {string} id - The ID of the task to update.
 * @param {Object} taskData - The updated task data.
 * @returns {Promise<Object>} The updated task object from the server response.
 */
export const updateTaskById = async (id, taskData) => {
    return request(`${config.API_BASE_URL + config.TASK_ENDPOINTS.TASKS_UPDATE}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(taskData)
    });
};

/**
 * Updates an existing task.
 * @param {string} id - The ID of the task to update.
 * @param {Object} taskData - The updated task data.
 * @returns {Promise<Object>} The updated task object from the server response.
 */
export const updateTaskStatusById = async (id, taskData) => {
    return request(`${config.API_BASE_URL + config.TASK_ENDPOINTS.TASKS_UPDATE_STATUS}/${id}`, {
        method: 'PUT',
        body: JSON.stringify(taskData)
    });
};

/**
 * Deletes a task.
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise<Object>} The server response after deletion.
 */
export const deleteTaskById = async (id) => {
    return request(`${config.API_BASE_URL + config.TASK_ENDPOINTS.TASKS_DELETE}/${id}`, {
        method: 'DELETE'
    });
};