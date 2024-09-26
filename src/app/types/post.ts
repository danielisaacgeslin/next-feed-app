import { User } from './user';

export interface Post {
  id: string;
  user: User;
  body: string;
}
