import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/api/v1',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    },
    timeout: 10000
});

// Request interceptor
axiosInstance.interceptors.request.use(
    (config) => {
        // Get token from localStorage
        const token = localStorage.getItem('token');

        // If token exists, add to headers
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response) {
            // Handle different error status codes
            switch (error.response.status) {
                case 401: // Unauthorized
                    // Clear local storage and redirect to login
                    localStorage.clear();
                    window.location.href = '/signin';
                    break;
                case 403: // Forbidden
                    console.error('Access Denied');
                    break;
                case 404: // Not Found
                    console.error('Resource Not Found');
                    break;
                case 500: // Server Error
                    console.error('Internal Server Error');
                    break;
                default:
                    console.error('An error occurred');
            }
        } else if (error.request) {
            // Network error
            console.error('Network Error');
        } else {
            console.error('Error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;

