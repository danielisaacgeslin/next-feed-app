'use client';

import { useCallback } from 'react';
import { FeedPostList } from '@/components/FeedPostList';
import list from './deleteMe.json';

export const Feed = () => {
  const onBottomReached = useCallback(() => console.log('@todo load stuff'), []);
  return <FeedPostList list={list} onBottomReached={onBottomReached} />;
};
