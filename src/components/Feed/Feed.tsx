'use client';

import { useCallback, useEffect, useRef } from 'react';
import { FeedPostList } from '@/components/FeedPostList';
import { usePostList } from '@/lib/usePostList';
import { styles } from './styles';
import { usePostListener } from '@/lib/usePostListener';

export const Feed = () => {
  const { loadPosts, status, list } = usePostList();
  const $container = useRef<HTMLDivElement>(null);
  const $list = useRef<HTMLUListElement>(null);

  const onBottomReached = useCallback(() => {
    if (!status.isLoading) loadPosts();
  }, [loadPosts, status.isLoading]);

  useEffect(() => {
    /**
     * Loads when list is not higher than the container.
     * Example coming back from details when there are list items, but not enough to get a scroll.
     * If there are enough items to get a scroll, then initial load is not needed
     *  */
    if ($container.current?.clientHeight! > $list.current?.scrollHeight!) loadPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // usePostListener();

  return (
    <div ref={$container} css={styles.container}>
      <FeedPostList ref={$list} list={list} isLoading={status.isLoading} onBottomReached={onBottomReached} />
    </div>
  );
};
