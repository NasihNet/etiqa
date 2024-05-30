import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../Model/User";

// type UserState = {
//     Id: string;
//     UserName: string;
//     Email: string;
//     PhoneNumber: string;
//     SkillSets: string;
//     Hobby: string;
// };

type InitialState = {
    Users: User[];
};

const initialState: InitialState = {
    Users: []
};

export const userSlice = createSlice({
    name: 'Users',
    initialState,
    reducers: {
        setUsers: (state, action) => {
            //sessionStorage.setItem('token', action.payload.token);    
                   
            state.Users = action.payload;
            
        },
        editUser: (state, action) => {
              state.Users = action.payload;
        },
        deleteUser: (state, action) => {
             state.Users = action.payload;
        },
    }
});

export const { setUsers, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
