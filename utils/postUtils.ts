/* eslint-disable @typescript-eslint/no-explicit-any */
import { BlogPostContent, ContentSection } from '@/types/types';

export function parseBlogPostContent(rawContent: any): BlogPostContent {
  const parsedSections: ContentSection[] = rawContent.sections.map((section: any) => {
    if (section.type === 'heading') {
      return { type: 'heading', level: section.level, content: section.content };
    }
    if (section.type === 'paragraph') {
      return { type: 'paragraph', content: section.content };
    }
    if (section.type === 'quote') {
      return { type: 'quote', content: section.content };
    }
    if (section.type === 'list') {
      return { type: 'list', items: section.items || [] };
    }
    if (section.type === 'image') {
      return { type: 'image', src: section.src, alt: section.alt };
    }
    throw new Error(`Tipo de sección desconocido: ${section.type}`);
  });

  return { sections: parsedSections };
}
