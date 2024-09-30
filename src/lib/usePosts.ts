import { useCallback, useEffect, useRef, useState } from 'react';
import { IMG_BASE, POST_API } from '@/app/constants';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { postActions } from './redux/postReducer';

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
  const list = useAppSelector(state => state.post.list);
  const dispatch = useAppDispatch();

  const loadPosts = useCallback(async () => {
    $controller.current = new AbortController();
    try {
      setStatus({ isLoading: true, hasError: false });
      const skip = Math.floor(list.length / limit);
      const rawList: RawApiPost[] = await fetch(`${POST_API}?_start=${skip}&_limit=${limit}&_delay=1000`, { signal: $controller.current.signal }).then(r =>
        r.json()
      );

      dispatch(
        postActions.addPosts({
          list: rawList.map(({ postId, email, body }) => ({
            id: `${postId}-${Math.random() /** ids are not unique in this api */}`,
            user: { id: email, name: email, image: `${IMG_BASE}?text=${email.substring(0, 2)}&font=lobster&font_size=25` },
            body
          }))
        })
      );
    } catch {
      setStatus(p => ({ ...p, hasError: true }));
    } finally {
      setStatus(p => ({ ...p, isLoading: false }));
    }
  }, [dispatch, list.length]);

  useEffect(() => () => $controller.current?.abort(), []);

  return { loadPosts, status, list };
};
