'use server';

import { db } from '@/server/db/prisma';
import { BlogPostContent } from '@/types/types';

export const getBlogPosts = async () => {
  try {
    const posts = await db.blogPost.findMany({
      orderBy: { createdAt: 'desc' },
    });
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

export const createBlogPost = async (title: string, content: BlogPostContent, matchId: number) => {
  try {
    if (!title || !content || !matchId) {
      throw new Error('Título, contenido y matchId son requeridos');
    }

    const newPost = await db.blogPost.create({
      data: { title, content, matchId },
    });
    return newPost;
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw new Error('Error creating blog post');
  }
};
