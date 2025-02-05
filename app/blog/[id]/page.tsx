/* eslint-disable @next/next/no-img-element */
import type { Metadata } from 'next';
import { getBlogPostById } from '@/actions/blog-actions';
import type { BlogPostContent, PagesProps } from '@/types/types';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getMatchById } from '@/actions/data-actions';
import MatchCard from '@/components/Match';

export async function generateMetadata({ params }: PagesProps): Promise<Metadata> {
  const id = (await params).id;
  const post = await getBlogPostById(Number(id));
  return {
    title: post?.title,
  };
}

export default async function BlogPostPage({ params }: PagesProps) {
  const { id } = await params;
  const post = await getBlogPostById(Number.parseInt(id));

  if (!post) {
    return <div className='container mx-auto p-6 text-center'>Post no encontrado</div>;
  }

  const match = post.matchId ? await getMatchById(post.matchId) : null;

  const content = post.content as BlogPostContent;

  return (
    <div className='container mx-auto px-6 sm:px-8 lg:px-10 py-12'>
      <div className='max-w-3xl mx-auto'>
        <Button variant='link' className='px-0'>
          <Link href='/blog' className='inline-flex items-center text-white hover:underline mb-6'>
            <ArrowLeft className='mr-2 h-4 w-4 text-primary' />
            Volver a todos los posts
          </Link>
        </Button>
        <h1 className='text-4xl font-bold font-mono mb-6 '>{post.title}</h1>
        <p className='text-muted-foreground italic mb-12'>
          {new Date(post.createdAt).toLocaleDateString()} - Creado por <span className='italic'>Carlitos</span>
        </p>
        <div className='space-y-8 text-justify'>
          {content.sections.map((section, index) => (
            <div key={index}>
              {section.type === 'paragraph' && (
                <p className='text-lg leading-relaxed'>{section.content}</p>
              )}
              {section.type === 'image' && (
                <img
                  src={section.src || '/placeholder.svg'}
                  alt={section.alt}
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
          {match && (
            <div className='w-full lg:w-1/2 place-self-center'>
              <MatchCard match={match} isAdmin={false} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
