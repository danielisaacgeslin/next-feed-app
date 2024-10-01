import { useCallback, useEffect, useRef, useState } from 'react';
import { IMG_BASE, POST_API, POST_LIMIT } from '@/constants';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { postActions } from './redux/postReducer';
import { RawApiPost } from '@/types';

export const usePostList = () => {
  const $controller = useRef<AbortController>();

  const [status, setStatus] = useState<{ isLoading: boolean; hasError: boolean }>({ isLoading: false, hasError: false });
  const list = useAppSelector(state => state.post.list);
  const dispatch = useAppDispatch();

  const loadPosts = useCallback(async () => {
    $controller.current = new AbortController();
    try {
      setStatus({ isLoading: true, hasError: false });
      const skip = Math.floor(list.length / POST_LIMIT);
      const rawList: RawApiPost[] = await fetch(`${POST_API}?_start=${skip}&_limit=${POST_LIMIT}&_delay=1000`, { signal: $controller.current.signal }).then(r =>
        r.json()
      );

      dispatch(
        postActions.addToList({
          list: rawList.map(({ id, email, body }) => ({
            id: String(id),
            user: { id: email, name: email, image: `${IMG_BASE}?text=${email.substring(0, 2)}&font=lobster&font_size=25` },
            body,
            key: String(Math.random())
          }))
        })
      );
    } catch {
      if (!$controller.current?.signal.aborted) setStatus(p => ({ ...p, hasError: true }));
    } finally {
      if (!$controller.current?.signal.aborted) setStatus(p => ({ ...p, isLoading: false }));
    }
  }, [dispatch, list.length]);

  useEffect(() => () => $controller.current?.abort(), []);

  return { loadPosts, status, list };
};
