import { configureStore, Middleware } from '@reduxjs/toolkit';
import tradesReducer from './tradesSlice';

export const store = configureStore({
  reducer: {
    trades: tradesReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these paths in the state
        ignoredActionPaths: ['payload.timestamp', 'meta.arg.timestamp'],
        ignoredPaths: ['trades.trades.timestamp']
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
