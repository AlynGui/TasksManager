import request from '../utils/request';
import config from '../config/api';

/**
 * Login a user.
 * @param {Object} userData - The data of the user to log in.
 * @returns {Promise<Object>} The logged-in user object from the server response.
 */
export const login = (userData) => {
    return request(`${config.API_BASE_URL}${config.USER_ENDPOINTS.LOGIN}`, {
        method: 'POST',
        body: JSON.stringify(userData)
    });
};

/**
 * Logout a user.
 * @returns {Promise<Object>} The server response after logout.
 */
export const logout = () => {
    return request(`${config.API_BASE_URL}${config.USER_ENDPOINTS.LOGOUT}`, {
        method: 'DELETE'
    });
};

/**
 * Adds a new user to the server.
 * @param {Object} userData - The data of the user to add.
 * @returns {Promise<Object>} The created user object from the server response.
 */
export const register = (userData) => {
    return request(`${config.API_BASE_URL}${config.USER_ENDPOINTS.REGISTER}`, {
        method: 'POST',
        body: JSON.stringify(userData)
    });
};

/**
 * Resets a user's password.
 * @param {Object} userData - The data containing the new password.
 * @returns {Promise<Object>} The server response after password reset.
 */
export const forgotPassword = (userData) => {
    return request(`${config.API_BASE_URL}${config.USER_ENDPOINTS.FORGOT_PASSWORD}`, {
        method: 'POST',
        body: JSON.stringify(userData)
    });
};

/**
 * Fetches the current logged-in user's information.
 * @param {AbortSignal} signal - Optional signal to abort the fetch request.
 * @returns {Promise<Object>} The current user object from the server response.         
 * */   
export const getCurrentUser = (signal) => {
    return request(`${config.API_BASE_URL}${config.USER_ENDPOINTS.CURRENT_USER}`, {
        method: 'GET',
        signal
    });
}