import { createSlice, PayloadAction } from "@reduxjs/toolkit";




type InitialState = {

    value : AuthState;
}

type AuthState = {
    token: string;
    username : string;
    isLoggedIn: boolean

}
const initialState = {
    value :{
        token: " ",
        username: " ",
        isLoggedIn: false
    } as AuthState
} as InitialState

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        userAuthenticated: (state, action : PayloadAction<any>) => {
            debugger;
            sessionStorage.setItem('token', action.payload.token);
            localStorage.setItem("token", action.payload.token);
            return {
              value :{
                token : action.payload.token,
                username : action.payload.userName,
                isLoggedIn :true
              }
            }
        },
        signout: (state) => {
            sessionStorage.clear();
            state.value.isLoggedIn = false;
        }
    }
});

export const { userAuthenticated, signout } = authenticationSlice.actions;
export default authenticationSlice.reducer;