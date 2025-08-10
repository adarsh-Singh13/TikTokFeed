import { createSlice } from '@reduxjs/toolkit';

const initialState = {
        isLoggedIn: false,
    };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loggedIn: (state, action) => {
            state.isLoggedIn = true;
        },
        loggedOut: (state, action) => {
            state.isLoggedIn = false;
        },
    },
});

export const {
    loggedIn,
    loggedOut,
} = authSlice.actions;

export default authSlice.reducer;