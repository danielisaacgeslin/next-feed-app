'use client';

import { useCallback, useEffect } from 'react';
import { FeedPostList } from '@/components/FeedPostList';
import { usePostList } from '@/lib/usePostList';
import { styles } from './styles';

export const Feed = () => {
  const { loadPosts, status, list } = usePostList();

  const onBottomReached = useCallback(() => {
    if (!status.isLoading) loadPosts();
  }, [loadPosts, status.isLoading]);

  useEffect(() => {
    if (!list.length) loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div css={styles.container}>
      <FeedPostList list={list} isLoading={status.isLoading} onBottomReached={onBottomReached} />
    </div>
  );
};
