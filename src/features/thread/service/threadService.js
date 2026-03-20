import axios from "axios";

const API_URL = "https://pms-l909.onrender.com/api/v1/thread";

export const createThread = async (projectId, threadData) => {
    try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.post(
            `${API_URL}/${projectId}`,
            threadData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Create Thread Error:", error.response?.data || error.message);
        throw error;
    }
};

export const getThreads = async (projectId) => {
    try {
        const token = localStorage.getItem("accessToken");

        const response = await axios.get(
            `${API_URL}/${projectId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error("Get Threads Error:", error.response?.data || error.message);
        throw error;
    }
};