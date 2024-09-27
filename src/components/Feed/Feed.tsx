'use client';

import { useCallback, useEffect } from 'react';
import { FeedPostList } from '@/components/FeedPostList';
import { usePosts } from '@/utils/usePosts';

export const Feed = () => {
  const { loadPosts, status, list } = usePosts();

  const onBottomReached = useCallback(() => {
    if (!status.isLoading) loadPosts();
  }, [loadPosts, status.isLoading]);

  useEffect(() => {
    loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <FeedPostList list={list} isLoading={status.isLoading} onBottomReached={onBottomReached} />;
};
