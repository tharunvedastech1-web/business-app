import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import fishReducer from './slices/fishSlice';
import api from '@/api/axios';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    fish: fishReducer,
  },
});

api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;