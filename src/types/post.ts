import { User } from './user';

export interface Post {
  id: string;
  user: User;
  body: string;
  addedLiveAt?: number;
  key: string; // mock api ids are not unique
}

export interface RawApiPost {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
