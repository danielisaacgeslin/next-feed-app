import { Post } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface PostReducerState {
  list: Post[];
  record: Record<string, Post>;
}

const postSlice = createSlice({
  name: 'post',
  initialState: { list: [], record: {} } as PostReducerState,
  reducers: {
    addToList: (state, { payload }: PayloadAction<{ list: Post[] }>) => {
      state.list = [...state.list, ...payload.list];
      state.record = payload.list.reduce((total, curr) => ({ ...total, [curr.id]: curr }), state.record);
    },
    addOne: (state, { payload }: PayloadAction<{ post: Post }>) => {
      state.record = { ...state.record, [payload.post.id]: payload.post };
    }
  }
});

export const { actions: postActions } = postSlice;
export const { reducer: postReducer } = postSlice;
