
const config = {
    //api base url
    API_BASE_URL: 'http://localhost:3001',

    //the api endpoints
    ENDPOINTS: {
        TASKS_LIST: '/tasks',
        TASKS_ADD: '/tasks',
        TASKS_DETAIL: '/tasks',    // + '/:id'
        TASKS_DELETE: '/tasks',    // + '/:id'
        TASKS_UPDATE: '/tasks',    // + '/:id'
    },

    //vercel  fetch 
    VERCEL_FETCH_DATA: '/data.json',
}
export default config;