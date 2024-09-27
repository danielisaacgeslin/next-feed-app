'use client';

import { Post } from '@/app/types';
import { FeedPost } from '@/components/FeedPost';
import { styles } from './styles';
import { UIEvent, useCallback } from 'react';

export const placeholderImageId = 'placeholder';

export interface FeedPostListProps {
  list?: Post[];
  onBottomReached: () => void;
}

export const FeedPostList = ({ list, onBottomReached }: FeedPostListProps) => {
  const onScroll = useCallback(
    (event: UIEvent<HTMLUListElement, globalThis.UIEvent>) => {
      const { scrollHeight, scrollTop: position, clientHeight } = event.currentTarget;
      const total = scrollHeight - clientHeight;

      if (position >= total) onBottomReached();
    },
    [onBottomReached]
  );

  return (
    <ul css={styles.container} data-testid="feed-post-list" onScroll={onScroll}>
      {list?.map(post => <FeedPost key={post.id} post={post} maxBodyLength={100} />)}
    </ul>
  );
};
