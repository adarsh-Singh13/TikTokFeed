import { createSlice } from '@reduxjs/toolkit';

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
        isDark: false,
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDark= !state.isDark;
        },
        setdarkMode: (state, action) => {
            state.isDark = action.payload;
        },
    },
})

export const { toggleTheme, setdarkMode } = themeSlice.actions;
export default themeSlice.reducer;
