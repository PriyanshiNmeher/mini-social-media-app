import axios from 'axios';

// Create an instance of axios
const api = axios.create({
    baseURL: 'https://mini-social-media-app-backend.onrender.com/api', // Server URL
    headers: {
        'Content-Type': 'application/json'
    }
});

// Intercept requests to add token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers['x-auth-token'] = token;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export default api;
