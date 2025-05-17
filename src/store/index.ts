import { configureStore } from '@reduxjs/toolkit';
import tradesReducer from './tradesSlice';

export const store = configureStore({
  reducer: {
    trades: tradesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
