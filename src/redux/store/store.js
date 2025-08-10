import { configureStore } from '@reduxjs/toolkit';
import commonReducer from '../commonSlice/commonSlice';
import authReducer from '../authSlice/authSlice';

const store = configureStore({
  reducer: {
    common: commonReducer,
    auth : authReducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
