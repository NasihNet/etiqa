import React from 'react'
import { User } from "../Model/User";
import axios from "axios";
import { AppDispatch } from '@/redux/store'; // Ensure this import is correct
import { setUsers, deleteUser } from '@/redux/slices/user-slice';

const api = "https://localhost:7254";

export const getUsers = async (
    dispatch: AppDispatch // Correct function signature
) => {
    try {
        const { data } = await axios.get<User>(api + "/api/User", {});      
        debugger
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
        const data = await axios.delete<User>(api + `/api/User?userId=${userId}`,{});  
        debugger;
        dispatch(deleteUser(userId));    
        return data;

    } catch (error) {
        // Handle error
        console.error(error);
    }
};
