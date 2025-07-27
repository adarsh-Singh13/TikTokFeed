import { configureStore } from "@reduxjs/toolkit";
import themeReducer from '../commonSlice/themeSlice';

const store = configureStore({
    reducer: {
        theme: themeReducer,
    },
});

export default store;