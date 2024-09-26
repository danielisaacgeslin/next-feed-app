import { FeedPostList } from '@/components/FeedPostList';

const list = Array.from(Array(20)).map((_, index) => ({
  id: String(index),
  body: Array.from(Array(Number(String(Math.random()).substring(2, 3.5 + Math.round(Math.random())))))
    .map(() => String(Math.random()).substring(2, 6 + Math.round(Math.random())))
    .join(' '),
  user: { id: `a${index}`, name: `user_${String(Math.random()).substring(2, 5)}`, image: `https://assets.example.com/a${index}` }
}));

export default function Home() {
  return (
    <div>
      <FeedPostList list={list} />
    </div>
  );
}
