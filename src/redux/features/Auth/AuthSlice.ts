import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../store";

const initialState = {
    user:null,
    token:null
}


export const authSlice= createSlice({
    name:'auth',
    initialState,
    reducers:{
        setUser: (state, action)=>{
            state.user = action.payload.user
            state.token = action.payload.token
        },
        logOut: (state)=>{
            state.user = null
            state.token = null
        }
    }
})

export const {setUser, logOut } = authSlice.actions;

export default authSlice.reducer;
export const currentUser = (state:RootState)=> state.auth.user;
export const currentToken = (state:RootState)=> state.auth.token;