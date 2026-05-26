import axiosInstance from "@/lib/axios";

export const registeruser = async (userData :{name : string,email : string,password : string}) => {
    try {
        const response = await axiosInstance.post("/auth/register", userData);
        return response.data;
    } catch (error) {
        console.error("Error registering user:", error);
        throw error;
    }
};

export const loginuser = async (userData :{email : string,password : string}) => {
    try {
        const response = await axiosInstance.post("/auth/login", userData);
        return response.data;
    } catch (error) {
        console.error("Error logging in user:", error);
        throw error;
    }
};

export const meuser = async () => {
    try {
        const response = await axiosInstance.get("/auth/me");
        return response.data.user;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};