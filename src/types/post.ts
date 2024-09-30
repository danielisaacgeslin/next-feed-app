import { User } from './user';

export interface Post {
  id: string;
  user: User;
  body: string;
  addedLiveAt?: number;
}

export interface RawApiPost {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}
