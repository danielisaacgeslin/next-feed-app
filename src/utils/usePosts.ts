import { useCallback, useEffect, useRef, useState } from 'react';
import { Post } from '@/app/types';
import { IMG_BASE, POST_API } from '@/app/constants';

interface RawApiPost {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const usePosts = () => {
  const limit = 20;
  const $controller = useRef<AbortController>();

  const [status, setStatus] = useState<{ isLoading: boolean; hasError: boolean }>({ isLoading: false, hasError: false });
  const [list, setList] = useState<Post[]>([]);
  const skip = useRef<number>(-1);

  const loadPosts = useCallback(async () => {
    $controller.current = new AbortController();
    try {
      setStatus({ isLoading: true, hasError: false });
      const nextSkip = skip.current + 1;
      const rawList: RawApiPost[] = await fetch(`${POST_API}?_start=${nextSkip}&_limit=${limit}&_delay=1000`, { signal: $controller.current.signal }).then(r =>
        r.json()
      );
      setList(p => [
        ...p,
        ...rawList.map(({ postId, id, email, body }) => ({
          id: `${id}-${postId}`,
          user: { id: email, name: email, image: `${IMG_BASE}?text=${email.substring(0, 2)}&font=lobster&font_size=25` },
          body
        }))
      ]);
      skip.current = nextSkip;
    } catch {
      setStatus(p => ({ ...p, hasError: true }));
    } finally {
      setStatus(p => ({ ...p, isLoading: false }));
    }
  }, []);

  useEffect(() => () => $controller.current?.abort(), []);

  return { loadPosts, status, list };
};
