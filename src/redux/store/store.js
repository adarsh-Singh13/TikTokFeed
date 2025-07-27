import { configureStore } from '@reduxjs/toolkit';
import commonReducer from '../commonSlice/commonSlice'; // ✅ Path fixed with semicolon

const store = configureStore({
  reducer: {
    common: commonReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: false,
    }),
});

export default store;
