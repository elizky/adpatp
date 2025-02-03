import { Metadata } from 'next';
import { getBlogPostById } from '@/actions/blog-actions';
import { BlogPostContent, PagesProps } from '@/types/types';

export async function generateMetadata({ params }: PagesProps): Promise<Metadata> {
  const id = (await params).id;
  const post = await getBlogPostById(Number(id));
  return {
    title: post?.title,
  };
}

export default async function BlogPostPage({ params }: PagesProps) {
  const { id } = await params;
  const post = await getBlogPostById(parseInt(id));

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
