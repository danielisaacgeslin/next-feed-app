'use client';

import { Post } from '@/types';
import { FeedPost } from '@/components/FeedPost';
import { styles } from './styles';
import { UIEvent, useCallback } from 'react';

export const placeholderImageId = 'placeholder';

export interface FeedPostListProps {
  list: Post[];
  isLoading: boolean;
  onBottomReached: () => void;
}

export const FeedPostList = ({ list, isLoading, onBottomReached }: FeedPostListProps) => {
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
      {list.map((post, index) => (
        <div key={`${post.id}-${index}` /** ids are not unique in this api */}>
          <div css={[!!index && styles.division]} />
          <FeedPost post={post} maxBodyLength={100} />
        </div>
      ))}
      {!!isLoading && <p css={styles.loading}>loading....</p>}
    </ul>
  );
};
