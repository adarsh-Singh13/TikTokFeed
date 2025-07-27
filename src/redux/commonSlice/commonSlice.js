import { createSlice } from '@reduxjs/toolkit';

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        isDark: false,
        isBottomSheetOpen: false,
        bottomSheetContent: {
            component: null, // ✅ this allows JSX to be rendered
            props: {},        // ✅ optional props to pass to the component
        },
    },
    reducers: {
        toggleTheme: (state) => {
            state.isDark = !state.isDark;
        },
        setDarkMode: (state, action) => {
            state.isDark = action.payload;
        },
        openBottomSheet: (state, action) => {
            state.isBottomSheetOpen = true;
            state.bottomSheetContent = action.payload;
        },
        closeBottomSheet: (state) => {
            state.isBottomSheetOpen = false;
            state.bottomSheetContent = { component: null, props: {} };
        },
    },
});


export const {
    toggleTheme,
    setDarkMode,
    openBottomSheet,
    closeBottomSheet,
} = commonSlice.actions;

export default commonSlice.reducer;
