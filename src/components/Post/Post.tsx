import { useSinglePost } from '@/lib/useSinglePost';
import { avatarSize, styles } from './styles';
import Image from 'next/image';
import { PLACEHOLDER_IMAGE } from '@/constants';

export interface PostProps {
  id: string;
  onBack: () => void;
}

export const Post = ({ id, onBack }: PostProps) => {
  const { status, post } = useSinglePost(id);

  if (status.isLoading) {
    return (
      <div data-testid="post-loading" css={styles.container}>
        loading...
      </div>
    );
  }
  if (status.hasError) {
    return (
      <div data-testid="post-error" css={styles.container}>
        ups... error
      </div>
    );
  }

  return (
    <div css={styles.container} data-testid="post">
      <button css={styles.button} onClick={onBack}>
        {'<'}
      </button>
      <header css={styles.header}>
        <Image data-testid="post-image" src={post.user.image || PLACEHOLDER_IMAGE} alt={post.user.name} width={avatarSize} height={avatarSize} />
        <p data-testid="post-username">{post.user.name}</p>
      </header>
      <p data-testid="post-body">{post.body}</p>
    </div>
  );
};
