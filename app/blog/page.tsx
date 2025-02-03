import { getBlogPosts } from '@/actions/blog-actions';
import Link from 'next/link';

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>Blog</h1>
      <Link href='/blog/create' className='mb-4 p-2 bg-blue-500 text-white rounded'>
        Crear nuevo post
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id} className='mb-4 p-4 border rounded shadow'>
            <h2 className='text-xl font-semibold'>{post.title}</h2>
            <p className='text-gray-500'>{new Date(post.createdAt).toLocaleDateString()}</p>
            <Link href={`/blog/${post.id}`} className='text-blue-500'>
              Leer más
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
