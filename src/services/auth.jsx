import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Function to get CSRF token from cookies (assumes it's stored in a cookie)
function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

export async function login(email, password) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/user/login/', { email, password });

        // Assume the CSRF token is in the response headers
        const csrfToken = response.data.csrfToken;

        // Set the CSRF token in the session storage for later use
        // window.sessionStorage.setItem('token', csrfToken);

        toast.success('Logged in successfully!');
        return response.data;

    } catch (error) {
        toast.error('Login failed!');
    }
}

export async function signup(email, password, username) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/user/createUser', { email, password, username });
        toast.success('Account created successfully!');
        return response.data;
    } catch (error) {
        toast.error('Signup failed!');
    }
}

export async function logout() {
    try {
        await axios.post('http://127.0.0.1:8000/user/logout/');
        toast.success('Logged out successfully!');
    } catch (error) {
        toast.error('Logout failed!');
    }
}

// Set up axios to include CSRF token from the start (if using Django's CSRF token cookie approach)
axios.defaults.headers.common['X-CSRFToken'] = getCookie('csrftoken');
