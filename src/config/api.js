
const config = {

    API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000',

    //the task api endpoints
    TASK_ENDPOINTS: {
        TASKS_LIST: '/tasks',      // get current user's tasks
        TASKS_ADD: '/tasks',
        TASKS_DELETE: '/tasks',    // + '/:id'
        TASKS_UPDATE: '/tasks',    // + '/:id'
        TASKS_UPDATE_STATUS: '/tasks/updateStatus' // + '/:id'
    },

    USER_ENDPOINTS: {
        LOGIN: '/user/login',
        REGISTER: '/user/register',
        FORGOT_PASSWORD: '/user/forgot-password',
        LOGOUT: '/user/logout',
        CURRENT_USER: '/user/me'
    }

}
export default config;