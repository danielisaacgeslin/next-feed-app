import { ComponentProps } from 'react';
import { render, screen } from '@testing-library/react';

import { FeedPost, placeholderImageId } from './FeedPost';

describe('FeedPost', () => {
  let props: ComponentProps<typeof FeedPost>;
  beforeEach(() => {
    props = {
      post: { id: '1', body: 'hello', user: { id: 'a', name: 'user', image: 'https://assets.example.com/example4455' } }
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
    expect(screen.getByTestId('post-image').getAttribute('src')).not.toMatch(new RegExp(placeholderImageId));
    expect(screen.getByTestId('post-image').getAttribute('src')).toMatch(/example4455/);
  });

  it('should use a placeholder image when it is NOT set', () => {
    props.post.user.image = undefined;
    render(<FeedPost {...props} />);
    expect(screen.getByTestId('post-image').getAttribute('src')).toMatch(new RegExp(placeholderImageId));
    expect(screen.getByTestId('post-image').getAttribute('src')).not.toMatch(/example4455/);
  });
});
