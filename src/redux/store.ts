import { configureStore } from '@reduxjs/toolkit';

import unitSlice from './slices/unit-slice';
import nodesSlice from './slices/node-slice';
import selectedItemSlice from './slices/selected-item-slice';

export const store = configureStore({
  reducer: {
    nodesSlice,
    selectedItemSlice,
    unitSlice,
  },
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
