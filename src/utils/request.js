
const request = async (url, options = {}) => {
    try {
        const res = await fetch(url, {
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
                ...(options.headers || {})
            },
            ...options
        });

        const result = await res.json();

        if (!res.ok || result.success === false) {

            throw new Error(result.error || `Request failed with status ${res.status}`);
        }

        return result.data;
    } catch (error) {
        console.error('API Request Failed:', error.message);
        // Don't log AbortError as it's expected when requests are cancelled
        if (error.name === 'AbortError') {
            throw error;
        }
        throw error;
    }
};

export default request;
