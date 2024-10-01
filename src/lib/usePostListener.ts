'use client';

import io from 'socket.io-client';
import { useEffect } from 'react';
import { IMG_BASE, WS_POST_EV, WS_URL } from '@/constants';
import { useAppDispatch } from './redux/hooks';
import { postActions } from './redux/postReducer';
import { RawApiPost } from '@/types';

export const usePostListener = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const socket = io(WS_URL);
    socket.connect();
    const handler = (raw: RawApiPost) => {
      dispatch(
        postActions.addToList({
          prepend: true,
          list: [
            {
              id: String(raw.id),
              user: { id: raw.email, name: raw.email, image: `${IMG_BASE}?text=${raw.id}&font=lobster&font_size=25` },
              body: raw.body,
              addedLiveAt: Date.now(),
              key: String(Math.random())
            }
          ]
        })
      );
    };

    socket.on(WS_POST_EV, handler);

    return () => {
      socket.disconnect();
      socket.off(WS_POST_EV, handler);
    };
  }, [dispatch]);
};
