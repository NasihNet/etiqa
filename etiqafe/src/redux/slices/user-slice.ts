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
        editUser: (state, action: PayloadAction<User>) => {
            const updatedUser = action.payload;
            const users = state.Users.map(user => {
                if (user.id === updatedUser.id) {
                    return updatedUser;
                }
                return user;
            });
            return { ...state, Users: [...users] };
        },
        deleteUser: (state, action: PayloadAction<number>) => {
            debugger
            state.Users = state.Users.filter(user => user.id !== action.payload);
        }
    }
});

export const { setUsers, editUser, deleteUser } = userSlice.actions;
export default userSlice.reducer;
