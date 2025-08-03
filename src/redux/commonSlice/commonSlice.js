import { createSlice } from '@reduxjs/toolkit';
import { Appearance } from 'react-native';

const getSystemTheme = () => Appearance.getColorScheme();
const initialThemeMode = 'system'; // default
const initialIsDark = getSystemTheme() === 'dark';

const commonSlice = createSlice({
    name: 'common',
    initialState: {
        themeMode: initialThemeMode, // 'light', 'dark', or 'system'
        isDark: initialIsDark,
        isBottomSheetOpen: false,
        bottomSheetContent: {
            component: null,
            props: {},
        },
    },
    reducers: {
        setThemeMode: (state, action) => {
            const mode = action.payload;
            state.themeMode = mode;

            if (mode === 'system') {
                // Don't override isDark manually anymore — listener will take over
                state.isDark = Appearance.getColorScheme() === 'dark';
            } else {
                state.isDark = mode === 'dark';
            }
        },
        syncSystemTheme: (state) => {
            if (state.themeMode === 'system') {
                state.isDark = getSystemTheme() === 'dark';
            }
        },
        openBottomSheet: (state, action) => {
            state.isBottomSheetOpen = true;
            state.bottomSheetContent = action.payload;
        },
        closeBottomSheet: (state) => {
            state.isBottomSheetOpen = false;
            state.bottomSheetContent = { component: null, props: {} };
        },
        setBottomSheetProps: (state, action) => {
            state.bottomSheetContent.props = {
                ...state.bottomSheetContent.props,
                ...action.payload,
            };
        }
    },
});

export const {
    setThemeMode,
    syncSystemTheme,
    openBottomSheet,
    closeBottomSheet,
    setBottomSheetProps,
} = commonSlice.actions;

export default commonSlice.reducer;
