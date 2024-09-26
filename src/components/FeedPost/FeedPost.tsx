'use client';

import { Post } from '@/app/types';
import { styles } from './styles';
import Image from 'next/image';

export const placeholderImageId = 'placeholder';

export interface FeedPostProps {
  post: Post;
}

export const FeedPost = ({ post }: FeedPostProps) => {
  const placeholderImage = `https://assets.example.com/${placeholderImageId}`;

  return (
    <article css={styles.container} data-testid="post">
      <p data-testid="post-username">{post.user.name}</p>
      <Image data-testid="post-image" src={post.user.image || placeholderImage} alt={post.user.name} width={50} height={50} />
      <p data-testid="post-body">{post.body}</p>
    </article>
  );
};
