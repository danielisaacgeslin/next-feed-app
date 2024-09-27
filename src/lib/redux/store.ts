import { configureStore, Reducer } from '@reduxjs/toolkit';

const placeholderReducer: Reducer = (state = {}) => {
  return state;
};

export const makeStore = () => {
  return configureStore({
    reducer: {
      placeholder: placeholderReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
