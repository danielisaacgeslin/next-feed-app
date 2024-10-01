'use client';

import { Post } from '@/types';
import { avatarSize, styles } from './styles';
import Image from 'next/image';
import { memo, useEffect, useMemo, useState } from 'react';
import { NEW_POST_CRITERIA_MS, PLACEHOLDER_IMAGE } from '@/constants';
import Link from 'next/link';

export interface FeedPostProps {
  post: Post;
  maxBodyLength: number;
}

export const FeedPost = memo(({ post, maxBodyLength }: FeedPostProps) => {
  const body = useMemo(() => (post.body.length > maxBodyLength ? `${post.body.substring(0, maxBodyLength)}...` : post.body), [maxBodyLength, post.body]);
  const [isNew, setNew] = useState<boolean>(post.addedLiveAt! > Date.now() - NEW_POST_CRITERIA_MS);

  useEffect(() => {
    if (!isNew) return;
    const newFlagLeft = Math.max(0, NEW_POST_CRITERIA_MS - Date.now() + post.addedLiveAt!);

    const timeout = setTimeout(() => setNew(false), newFlagLeft);
    return () => clearTimeout(timeout);
  }, [isNew, post.addedLiveAt]);

  return (
    <Link href={`/${post.id}`}>
      <article css={[styles.container, isNew && styles.newPost]} data-testid="post">
        <Image data-testid="post-image" src={post.user.image || PLACEHOLDER_IMAGE} alt={post.user.name} width={avatarSize} height={avatarSize} />

        <div css={styles.content}>
          <p data-testid="post-username" css={styles.username}>
            {post.user.name}
          </p>
          <p data-testid="post-body">{body}</p>
        </div>
      </article>
    </Link>
  );
});

FeedPost.displayName = 'FeedPost';
