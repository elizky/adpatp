/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/server/db/prisma';
import { BlogPostContent } from '@/types/types';

export const getBlogPosts = async () => {
  try {
    const posts = await db.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
    console.log('posts', posts);
    return posts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    throw new Error('Error fetching blog posts');
  }
};

export const getBlogPostById = async (id: number) => {
  try {
    const post = await db.blogPost.findUnique({
      where: { id },
    });
    return post;
  } catch (error) {
    console.error('Error fetching blog post by ID:', error);
    throw new Error('Error fetching blog post by ID');
  }
};

export const createBlogPost = async (content: BlogPostContent, matchId?: number) => {
  try {
    // Buscar el título en la primera sección de tipo 'heading'
    const titleSection = content.sections.find((section) => section.type === 'heading');
    const title = titleSection ? titleSection.content : 'Crónica sin título';

    const newPost = await db.blogPost.create({
      data: {
        title,
        content: content as unknown as any, // 🔹 Prisma espera un JSON, pero TypeScript puede quejarse
        matchId,
      },
    });

    return newPost;
  } catch (error: any) {
    console.error('Error al crear el blog post:', error);
    throw new Error(`Error al crear el blog post: ${error.message}`);
  }
};
