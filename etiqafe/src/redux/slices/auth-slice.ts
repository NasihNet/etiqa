import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserProfileToken } from "../../Model/User";



type InitialState = {

    value : AuthState;
}

type AuthState = {
    token: string;
    username : string;

}
const initialState = {
    value :{
        token: "",
        username: "",
        isLoggedIn:""
    } as AuthState
} as InitialState

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        userAuthenticated: (state, action : PayloadAction<any>) => {
            sessionStorage.setItem('token', action.payload.token);
            return {
              value :{
                token : action.payload.token,
                username : action.payload.userName,
                isLoggedIn :true
              }
            }
        },
        signout: () => {
            sessionStorage.clear();
        }
    }
});

export const { userAuthenticated, signout } = authenticationSlice.actions;
export default authenticationSlice.reducer;