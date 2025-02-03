import { getBlogPosts } from '@/actions/blog-actions';
import PostCard from '@/components/PostCard';

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Noticias',
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold font-mono mb-12'>Noticias</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
        {posts.map((post) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
