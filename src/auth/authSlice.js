import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.isAuthenticated = true;
            state.accessToken = action.payload.accessToken;
            state.refreshToken = action.payload.refreshToken;
        },
        logout(state) {
            state.isAuthenticated = false;
            state.accessToken = null;
            state.refreshToken = null;
        }
    }
})
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;