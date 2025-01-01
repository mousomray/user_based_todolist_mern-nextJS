import { toast } from "react-toastify"
import axiosInstance from "../api/api"
import { myendpoints } from "../api/endpoints"

export const createTodo = async (data) => {
    try {
        const apiurl = myendpoints[2]
        const response = await axiosInstance.post(apiurl, data)
        console.log("Fetching addtodo data...", response);
        toast.success(response?.data?.message);
        return response
    } catch (error) {
        console.log("Error fetching addtodo...", error);
        toast.error(error?.response?.data?.message);
    }
}

export const showTodo = async () => {
    try {
        const apiurl = myendpoints[3]
        const response = await axiosInstance.get(apiurl)
        console.log("Fetching todolist data...", response);
        return response?.data
    } catch (error) {
        console.log("Error fetching todolist...", error);
    }
}