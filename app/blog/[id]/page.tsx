// app/blog/[id]/page.tsx
import { getBlogPostById } from '@/actions/blog-actions';
import { BlogPostContent } from '@/types/types';

export default async function BlogPostPage({ params }: { params: { id: string } }) {
  const post = await getBlogPostById(parseInt(params.id));

  if (!post) {
    return <div>Post no encontrado</div>;
  }

  const content = post.content as BlogPostContent;

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>{post.title}</h1>
      <p className='text-gray-500'>{new Date(post.createdAt).toLocaleDateString()}</p>
      <div className='mt-4'>
        {content.sections.map((section, index) => (
          <div key={index} className='mb-4'>
            {section.type === 'heading' && (
              <h2 className='text-2xl font-semibold'>{section.content}</h2>
            )}
            {section.type === 'paragraph' && <p className='text-gray-700'>{section.content}</p>}
            {section.type === 'image' && (
              <img src={section.src} alt={section.alt} className='w-full h-auto rounded' />
            )}
            {section.type === 'list' && (
              <ul className='list-disc pl-5'>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex} className='text-gray-700'>
                    {item}
                  </li>
                ))}
              </ul>
            )}
            {section.type === 'quote' && (
              <blockquote className='border-l-4 border-gray-500 pl-4 italic text-gray-600'>
                {section.content}
              </blockquote>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
