
import config from '../config/api.js';

// Handles fetch API responses, throwing an error if the response is not OK, otherwise returning the parsed JSON.
const handleResponse = async (response) => {
    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Request failed');
    }
    return response.json();
}

/**
 * Fetches all tasks.
 * @param {AbortSignal} signal - Optional signal to abort the fetch request.
 * @returns {Promise<Array>} Resolves to an array of tasks.
 */
export const getAllTasks = async (signal) => {
    try {
        const response = await fetch(config.API_BASE_URL + config.ENDPOINTS.TASKS_LIST, { signal });
        return await handleResponse(response);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Fetch aborted');
            return [];
        }
        throw error;
    }
};

/**
 * Adds a new task to the server.
 * @param {Object} taskData - The data of the task to add.
 * @returns {Promise<Object>} The created task object from the server response.
 */
export const addTask = async (taskData) => {
    const response = await fetch(config.API_BASE_URL + config.ENDPOINTS.TASKS_ADD, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    return await handleResponse(response);
};

/**
 * Updates an existing task.
 * @param {string} id - The ID of the task to update.
 * @param {Object} taskData - The updated task data.
 * @returns {Promise<Object>} The updated task object from the server response.
 */
export const updateTask = async (id, taskData) => {
    const response = await fetch(`${config.API_BASE_URL + config.ENDPOINTS.TASKS_UPDATE}/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(taskData),
    });
    return await handleResponse(response);
};

/**
 * Deletes a task.
 * @param {string} id - The ID of the task to delete.
 * @returns {Promise<Object>} The server response after deletion.
 */
export const deleteTask = async (id) => {
    const response = await fetch(`${config.API_BASE_URL}${config.ENDPOINTS.TASKS_DELETE}/${id}`, {
        method: 'DELETE',
    });
    return await handleResponse(response);
};