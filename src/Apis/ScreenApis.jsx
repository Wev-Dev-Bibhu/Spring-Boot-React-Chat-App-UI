// useApi.js
import axios from "axios";
import Cookies from "universal-cookie";
import { useContext } from "react";
import { AuthContext } from "./AuthContext";

const cookie = new Cookies();

export const ScreenApis = () => {
    const { apiUrl } = useContext(AuthContext);

    const signUpApi = async (signUpData) => {
        try {
            const response = await axios.post(`${apiUrl}/signup`, signUpData, {
                headers: { "Content-Type": "application/json" },
            });
            cookie.set("token", response.data.data.token, { path: "/" });
            cookie.set("currentUser", response.data.data.userData, { path: "/" });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };

    const signInApi = async (signInData) => {
        try {
            const response = await axios.post(`${apiUrl}/signin`, signInData, {
                headers: { "Content-Type": "application/json" },
            });
            cookie.set("token", response.data.data.token, { path: "/" });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };

    const fetchAllUsers = async (formData) => {
        try {
            const response = await axios.get(`${apiUrl}/fetch-all-users`, {
                params: formData,
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching users:", error.response || error.message || error);
            return [];
        }
    };

    const fetchUserMessages = async (formData) => {
        try {
            const response = await axios.get(`${apiUrl}/fetch-user-message`, {
                params: formData,
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            console.error("Error fetching messages:", error.response || error.message || error);
            return [];
        }
    };

    const updateUserProfile = async (formData) => {
        try {
            const response = await axios.post(`${apiUrl}/update-user`, formData, {
                headers: { "Content-Type": "application/json" },
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error.message;
        }
    };

    return {
        signUpApi,
        signInApi,
        fetchAllUsers,
        fetchUserMessages,
        updateUserProfile,
    };
};
