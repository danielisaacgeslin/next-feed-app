import { renderHook, waitFor } from '@testing-library/react';
import { useSinglePost } from './useSinglePost';
import { StoreProvider } from '@/app/StoreProvider';
import { RawApiPost } from '@/types';

describe('useSinglePost', () => {
  it('should add a single post', async () => {
    const id = '123';
    const rawPost: RawApiPost = {
      id: Number(id),
      postId: 2,
      name: 'name',
      email: 'email',
      body: 'body'
    };
    global.fetch = jest.fn().mockResolvedValue({ json: async () => rawPost });
    const { result } = renderHook(() => useSinglePost(id), { wrapper: ({ children }) => <StoreProvider>{children}</StoreProvider> });

    expect(result.current.status.isLoading).toBe(true);
    expect(result.current.post).toBeFalsy();

    await waitFor(() => expect(result.current.status.isLoading).toBe(false));
    await waitFor(() =>
      expect(result.current.post).toEqual({
        id,
        user: { id: rawPost.email, name: rawPost.email, image: expect.any(String) },
        body: rawPost.body,
        key: expect.any(String)
      })
    );

    expect(global.fetch).toHaveBeenCalledWith(expect.stringContaining(id), expect.objectContaining({ signal: expect.anything() }));
  });

  it('should handle errors', async () => {
    const id = '123';
    global.fetch = jest.fn().mockRejectedValue(null);
    const { result } = renderHook(() => useSinglePost(id), { wrapper: ({ children }) => <StoreProvider>{children}</StoreProvider> });

    expect(result.current.status.isLoading).toBe(true);
    expect(result.current.status.hasError).toBe(false);

    await waitFor(() => expect(result.current.status.isLoading).toBe(false));
    await waitFor(() => expect(result.current.status.hasError).toBe(true));
    expect(result.current.post).toBeFalsy();
  });
});
