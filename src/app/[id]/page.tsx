'use client';

import { Post } from '@/components/Post';
import { useParams, useRouter } from 'next/navigation';

export default function Page() {
  const params = useParams();
  const { back } = useRouter();
  return <Post id={params.id as string} onBack={back}></Post>;
}
