import { ComponentProps } from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { FeedPost } from './FeedPost';
import { PLACEHOLDER_IMAGE_ID, NEW_POST_CRITERIA_MS } from '@/constants';

jest.mock('../../constants/general', () => ({
  ...jest.requireActual('../../constants/general'),
  NEW_POST_CRITERIA_MS: 500
}));

describe('FeedPost', () => {
  let props: ComponentProps<typeof FeedPost>;
  beforeEach(() => {
    props = {
      post: { id: '1', body: 'hello', user: { id: 'a', name: 'user', image: 'https://assets.example.com/example4455' }, key: '1' },
      maxBodyLength: 100
    };
  });

  it('should render a post', () => {
    render(<FeedPost {...props} />);
    expect(screen.getByTestId('post-username')).toHaveTextContent(props.post.user.name);
    expect(screen.getByTestId('post-body')).toHaveTextContent(props.post.body);
  });

  it('should NOT use a placeholder image when it is set', () => {
    props.post.user.image = 'https://assets.example.com/example4455';
    render(<FeedPost {...props} />);
    expect(screen.getByTestId('post-image').getAttribute('src')).not.toMatch(new RegExp(PLACEHOLDER_IMAGE_ID));
    expect(screen.getByTestId('post-image').getAttribute('src')).toMatch(/example4455/);
  });

  it('should use a placeholder image when it is NOT set', () => {
    props.post.user.image = undefined;
    render(<FeedPost {...props} />);
    expect(screen.getByTestId('post-image').getAttribute('src')).toMatch(new RegExp(PLACEHOLDER_IMAGE_ID));
    expect(screen.getByTestId('post-image').getAttribute('src')).not.toMatch(/example4455/);
  });

  it('should truncate the body when it is longer than the max length', () => {
    render(<FeedPost {...props} maxBodyLength={2} />);
    expect(screen.getByTestId('post-body')).toHaveTextContent('he...');
  });

  it('should flag new posts for fixed time', async () => {
    const then = Date.now();
    props.post.addedLiveAt = then - 450;
    render(<FeedPost {...props} />);
    expect(screen.getByTestId('post-new')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByTestId('post-new')).not.toBeInTheDocument());
    expect(Date.now()).not.toBeGreaterThan(then + NEW_POST_CRITERIA_MS + 50 /** process error margin */);
  });
});
