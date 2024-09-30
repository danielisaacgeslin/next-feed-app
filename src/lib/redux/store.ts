import { configureStore } from '@reduxjs/toolkit';
import { postReducer } from './postReducer';

export const makeStore = () => {
  return configureStore({
    reducer: {
      post: postReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
