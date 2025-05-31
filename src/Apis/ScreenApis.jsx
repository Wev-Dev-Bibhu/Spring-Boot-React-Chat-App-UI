import axios from "axios";
import Cookies from 'universal-cookie'

const API_URL = "http://localhost:5000";
const cookie = new Cookies()


export const signUpApi = async (signUpData) => {

    try {
        const response = await axios.post(`${API_URL}/signup`, signUpData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        cookie.set('token', response.data.data.token, { path: '/' })
        cookie.set('currentUser', response.data.data.userData, { path: '/' })
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const signInApi = async (signInData) => {

    try {
        const response = await axios.post(`${API_URL}/signin`, signInData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        cookie.set('token', response.data.data.token, { path: '/' });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
};

export const fetchAllUsers = async (formData) => {
    try {
        const response = await axios.get(`${API_URL}/fetch-all-users`, {
            params: formData,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching users:", error.response || error.message || error);
        return []
    }
    
};

export const fetchUserMessages = async (formData) => {
    try {
        const response = await axios.get(`${API_URL}/fetch-user-message`, {
            params: formData,
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching messages:", error.response || error.message || error);
        return []
    }
    
}

export const updateUserProfile = async (formData) => {
    try {
        const response = await axios.post(`${API_URL}/update-user`, formData, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return response.data;
    } catch (error) {
        throw error.response?.data || error.message;
    }
}