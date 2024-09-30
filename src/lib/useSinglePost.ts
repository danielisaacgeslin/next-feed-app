import { useEffect, useState } from 'react';
import { IMG_BASE, POST_API } from '@/constants';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { postActions } from './redux/postReducer';

interface RawApiPost {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const useSinglePost = (id: string) => {
  const [status, setStatus] = useState<{ isLoading: boolean; hasError: boolean }>({ isLoading: true, hasError: false });
  const post = useAppSelector(state => state.post.record[id]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setStatus({ isLoading: true, hasError: false });

        if (post) return;

        const raw: RawApiPost = await fetch(`${POST_API}/${id}?_delay=1000`, { signal: controller.signal }).then(r => r.json());

        dispatch(
          postActions.addOne({
            post: {
              id,
              user: { id: raw.email, name: raw.email, image: `${IMG_BASE}?text=${raw.email.substring(0, 2)}&font=lobster&font_size=25` },
              body: raw.body
            }
          })
        );
      } catch {
        if (!controller.signal.aborted) setStatus(p => ({ ...p, hasError: true }));
      } finally {
        if (!controller.signal.aborted) setStatus(p => ({ ...p, isLoading: false }));
      }
    })();
    return () => controller.abort();
  }, [dispatch, id, post]);

  return { status, post };
};
