import type { Metadata } from 'next';
import { getBlogPostById } from '@/actions/blog-actions';
import type { BlogPostContent, PagesPropsSlug } from '@/types/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMatchById } from '@/actions/data-actions';
import MatchCard from '@/components/Match';
import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export async function generateMetadata({ params }: PagesPropsSlug): Promise<Metadata> {
  const slug = (await params).slug;
  const post = await getBlogPostById(slug);
  return {
    title: post?.title,
    openGraph: {
      images: post?.imageUrl || '/images/blog-post-0.jpg',
    },
  };
}

export default async function BlogPostPage({ params }: PagesPropsSlug) {
  const { slug } = await params;
  const post = await getBlogPostById(slug);

  if (!post) {
    return <div className='container mx-auto p-6 text-center'>Post no encontrado</div>;
  }

  const match = post.matchId ? await getMatchById(post.matchId) : null;

  const content = post.content as BlogPostContent;

  return (
    <article className='container mx-auto px-4 sm:px-6 lg:px-8 py-12'>
      <div className='max-w-4xl mx-auto'>
        <Button variant='ghost' className='mb-6 p-0 hover:bg-transparent'>
          <Link href='/blog' className='inline-flex items-center text-primary hover:underline'>
            <ArrowLeft className='mr-2 h-4 w-4' />
            Volver a todos los posts
          </Link>
        </Button>

        <div className='relative w-full h-[300px] sm:h-[400px] mb-8 rounded-lg overflow-hidden'>
          <Image
            src={post.imageUrl || '/images/tenisbg0.jpg'}
            alt={`Imagen de ${post.title}`}
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>

        <h1 className='text-4xl font-bold font-mono mb-4'>{post.title}</h1>

        <div className='flex items-center mb-8'>
          <Avatar className='h-10 w-10 mr-3'>
            <AvatarImage src='/carlitos.png' alt='Carlitos' />
            <AvatarFallback>C</AvatarFallback>
          </Avatar>
          <div>
            <p className='text-sm font-medium'>{post.createdBy}</p>
            <p className='text-sm text-muted-foreground'>
              {new Date(post.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className='space-y-8 text-justify'>
          {content.sections.map((section, index) => (
            <div key={index}>
              {section.type === 'paragraph' && (
                <p className='text-lg leading-relaxed'>{section.content}</p>
              )}
              {section.type === 'image' && (
                <Image
                  src={section.src || '/placeholder.svg'}
                  alt={section.alt}
                  width={800}
                  height={450}
                  className='w-full h-auto rounded-lg shadow-md'
                />
              )}
              {section.type === 'list' && (
                <ul className='list-disc pl-5 space-y-2'>
                  {section.items.map((item, itemIndex) => (
                    <li key={itemIndex} className='text-gray-700'>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {section.type === 'quote' && (
                <blockquote className='border-l-4 border-primary pl-4 py-2 italic text-primary text-lg'>
                  {section.content}
                </blockquote>
              )}
            </div>
          ))}
        </div>

        {match && (
          <div className='mt-12'>
            <h2 className='text-2xl font-bold mb-4'>Partido Relacionado</h2>
            <div className='w-full lg:w-2/3 mx-auto'>
              <MatchCard match={match} isAdmin={false} />
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
