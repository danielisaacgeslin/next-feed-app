import { Post } from '@/app/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostReducerState {
  list: Post[];
}

const postSlice = createSlice({
  name: 'post',
  initialState: { list: [] } as PostReducerState,
  reducers: {
    addPosts: (state, action: PayloadAction<{ list: Post[] }>) => {
      state.list = [...state.list, ...action.payload.list];
    }
  }
});

export const { actions: postActions } = postSlice;
export const { reducer: postReducer } = postSlice;
