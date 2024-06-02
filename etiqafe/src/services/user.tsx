import React from 'react'
import { User } from "../Model/User";
import axios, { InternalAxiosRequestConfig } from "axios";
import { AppDispatch } from '@/redux/store'; // Ensure this import is correct
import { setUsers, deleteUser, editUser } from '@/redux/slices/user-slice';

const api = "https://localhost:7254";

const axiosInstance = axios.create({    
    baseURL: `https://localhost:7254/api/User`,
})

axiosInstance.interceptors.request.use((config : InternalAxiosRequestConfig) => {
    config.headers['Authorization'] = 'Bearer ' + sessionStorage.getItem('token');
    return config;
});


export const getUsers = async (
    dispatch: AppDispatch // Correct function signature
) => {
    try {
        const { data } = await axiosInstance.get<User[]>("");     
        dispatch(setUsers(data));    
        return data;

    } catch (error) {
        // Handle error
        console.error(error);
    }
};

export const deleteUserApi = async (
    userId : number,
    dispatch: AppDispatch // Correct function signature
) => {
    try {
        //const { data } = await axios.delete<User>(api + '/api/User?userId=${userId}', {});    
        const { data } = await axiosInstance.delete<User>(`?userId=${userId}`);
        debugger
        dispatch(deleteUser(userId));    
        return data;

    } catch (error) {
        // Handle error
        console.error(error);
    }
};


export const editUserApi = async (
    user : User,
    dispatch : AppDispatch
) => {
   
    try{
        const { data } = await axiosInstance.put<User>("", user);

        dispatch(editUser(data));
    }catch(error)
    {

    }
}
