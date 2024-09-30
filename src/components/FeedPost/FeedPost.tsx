'use client';

import { Post } from '@/types';
import { avatarSize, styles } from './styles';
import Image from 'next/image';
import { useMemo } from 'react';
import { PLACEHOLDER_IMAGE } from '@/constants';
import Link from 'next/link';

export interface FeedPostProps {
  post: Post;
  maxBodyLength: number;
}

export const FeedPost = ({ post, maxBodyLength }: FeedPostProps) => {
  const body = useMemo(() => (post.body.length > maxBodyLength ? `${post.body.substring(0, maxBodyLength)}...` : post.body), [maxBodyLength, post.body]);

  return (
    <Link href={`/${post.id}`}>
      <article css={styles.container} data-testid="post">
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
};
