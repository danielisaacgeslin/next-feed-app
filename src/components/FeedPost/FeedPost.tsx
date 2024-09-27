'use client';

import { Post } from '@/app/types';
import { avatarSize, styles } from './styles';
import Image from 'next/image';
import { useMemo } from 'react';
import { IMG_BASE } from '@/app/constants';

export const placeholderImageId = 'placeholder';

export interface FeedPostProps {
  post: Post;
  maxBodyLength: number;
}

export const FeedPost = ({ post, maxBodyLength }: FeedPostProps) => {
  const placeholderImage = `${IMG_BASE}?text=${placeholderImageId}&font=lobster&font_size=25`;
  const body = useMemo(() => (post.body.length > maxBodyLength ? `${post.body.substring(0, maxBodyLength)}...` : post.body), [maxBodyLength, post.body]);

  return (
    <article css={styles.container} data-testid="post">
      <Image data-testid="post-image" src={post.user.image || placeholderImage} alt={post.user.name} width={avatarSize} height={avatarSize} />

      <div css={styles.content}>
        <p data-testid="post-username" css={styles.username}>
          {post.user.name}
        </p>
        <p data-testid="post-body">{body}</p>
      </div>
    </article>
  );
};
