/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { db } from '@/server/db/prisma';
import { BlogPostContent } from '@/types/types';
import slugify from 'slugify';

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

export const getBlogPostById = async (slug: string) => {
  try {
    const post = await db.blogPost.findUnique({
      where: { slug },
    });
    return post;
  } catch (error) {
    console.error('Error fetching blog post by slug:', error);
    throw new Error('Error fetching blog post by slug');
  }
};

export const createBlogPost = async (content: BlogPostContent, matchId?: number) => {
  try {
    // Buscar el título en la primera sección de tipo 'heading'
    const titleSection = content.sections.find((section) => section.type === 'heading');
    const title = titleSection ? titleSection.content : 'Crónica sin título';
    console.log('5 ===== title', title);

    // Seleccionar una imagen aleatoria de las 18 disponibles
    const randomImageIndex = Math.floor(Math.random() * 18) + 1;
    const imageUrl = `/images/blog-post-${randomImageIndex}.jpg`; // Ruta dentro de /public

    console.log('6 ===== imageUrl', imageUrl);

    const slug = slugify(title, { lower: true, strict: true });
    console.log('7 ===== slug', slug);

    const newPost = await db.blogPost.create({
      data: {
        title,
        slug,
        content: content as unknown as any,
        matchId,
        createdBy: 'Carlitos',
        imageUrl,
      },
    });

    return newPost;
  } catch (error: any) {
    console.error('Error al crear el blog post:', error);
    throw new Error(`Error al crear el blog post: ${error.message}`);
  }
};
