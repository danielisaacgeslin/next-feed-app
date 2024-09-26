'use client';

import { Post } from '@/app/types';
import { FeedPost } from '@/components/FeedPost';
import { styles } from './styles';

export const placeholderImageId = 'placeholder';

export interface FeedPostListProps {
  list?: Post[];
}

export const FeedPostList = ({ list }: FeedPostListProps) => {
  return (
    <ul css={styles.container} data-testid="feed-post-list">
      {list?.map(post => <FeedPost key={post.id} post={post} maxBodyLength={100} />)}
    </ul>
  );
};
