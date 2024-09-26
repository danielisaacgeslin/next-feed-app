import { FeedPost } from '@/components/FeedPost';

export default function Home() {
  return (
    <div>
      <FeedPost post={{ id: '1', body: 'hello', user: { id: 'a', name: 'user', image: 'https://assets.example.com/a' } }} />
    </div>
  );
}
