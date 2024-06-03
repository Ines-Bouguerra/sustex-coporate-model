import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export async function login(email, password) {
    try {
        const response = await axios.post('http://127.0.0.1:8000/user/login/', { email, password });
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
