// app/blog/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createBlogPost } from '@/actions/blog-actions';
import { BlogPostContent, ContentSection } from '@/types/types';

export default function CreateBlogPostPage() {
  const [title, setTitle] = useState('');
  const [matchId, setMatchId] = useState('');
  const [content, setContent] = useState<BlogPostContent>({ sections: [] });
  const router = useRouter();

  const handleAddSection = (type: ContentSection['type']) => {
    let newSection: ContentSection;

    switch (type) {
      case 'heading':
        newSection = { type: 'heading', level: 2, content: '' };
        break;
      case 'paragraph':
        newSection = { type: 'paragraph', content: '' };
        break;
      case 'image':
        newSection = { type: 'image', src: '', alt: '' };
        break;
      case 'list':
        newSection = { type: 'list', items: [] };
        break;
      case 'quote':
        newSection = { type: 'quote', content: '' };
        break;
      default:
        throw new Error('Tipo de sección no válido');
    }

    setContent((prevContent) => ({
      sections: [...prevContent.sections, newSection],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createBlogPost(title, content, parseInt(matchId));
      router.push('/blog');
    } catch (error) {
      console.error('Error creating blog post:', error);
    }
  };

  return (
    <div className='container mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>Crear nuevo post</h1>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-gray-700'>Título</label>
          <input
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Match ID</label>
          <input
            type='number'
            value={matchId}
            onChange={(e) => setMatchId(e.target.value)}
            className='w-full p-2 border rounded'
            required
          />
        </div>
        <div className='mb-4'>
          <label className='block text-gray-700'>Contenido</label>
          <button
            type='button'
            onClick={() => handleAddSection('heading')}
            className='mr-2 p-2 bg-blue-500 text-white rounded'
          >
            Añadir Título
          </button>
          <button
            type='button'
            onClick={() => handleAddSection('paragraph')}
            className='mr-2 p-2 bg-blue-500 text-white rounded'
          >
            Añadir Párrafo
          </button>
          <button
            type='button'
            onClick={() => handleAddSection('image')}
            className='mr-2 p-2 bg-blue-500 text-white rounded'
          >
            Añadir Imagen
          </button>
          <button
            type='button'
            onClick={() => handleAddSection('list')}
            className='mr-2 p-2 bg-blue-500 text-white rounded'
          >
            Añadir Lista
          </button>
          <button
            type='button'
            onClick={() => handleAddSection('quote')}
            className='p-2 bg-blue-500 text-white rounded'
          >
            Añadir Cita
          </button>
        </div>
        <div className='mb-4'>
          {content.sections.map((section, index) => (
            <div key={index} className='mb-4 p-4 border rounded'>
              {section.type === 'heading' && (
                <div>
                  <label className='block text-gray-700'>Título</label>
                  <input
                    type='text'
                    value={section.content}
                    onChange={(e) => {
                      const newSections = [...content.sections];
                      (newSections[index] as typeof section).content = e.target.value;
                      setContent({ sections: newSections });
                    }}
                    className='w-full p-2 border rounded'
                  />
                </div>
              )}
              {section.type === 'paragraph' && (
                <div>
                  <label className='block text-gray-700'>Párrafo</label>
                  <textarea
                    value={section.content}
                    onChange={(e) => {
                      const newSections = [...content.sections];
                      (newSections[index] as typeof section).content = e.target.value;
                      setContent({ sections: newSections });
                    }}
                    className='w-full p-2 border rounded'
                  />
                </div>
              )}
              {section.type === 'image' && (
                <div>
                  <label className='block text-gray-700'>URL de la imagen</label>
                  <input
                    type='text'
                    value={section.src}
                    onChange={(e) => {
                      const newSections = [...content.sections];
                      (newSections[index] as typeof section).src = e.target.value;
                      setContent({ sections: newSections });
                    }}
                    className='w-full p-2 border rounded'
                  />
                  <label className='block text-gray-700'>Texto alternativo</label>
                  <input
                    type='text'
                    value={section.alt}
                    onChange={(e) => {
                      const newSections = [...content.sections];
                      (newSections[index] as typeof section).alt = e.target.value;
                      setContent({ sections: newSections });
                    }}
                    className='w-full p-2 border rounded'
                  />
                </div>
              )}
              {section.type === 'list' && (
                <div>
                  <label className='block text-gray-700'>Elementos de la lista</label>
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex} className='mb-2'>
                      <input
                        type='text'
                        value={item}
                        onChange={(e) => {
                          const newSections = [...content.sections];
                          (newSections[index] as typeof section).items[itemIndex] = e.target.value;
                          setContent({ sections: newSections });
                        }}
                        className='w-full p-2 border rounded'
                      />
                    </div>
                  ))}
                  <button
                    type='button'
                    onClick={() => {
                      const newSections = [...content.sections];
                      (newSections[index] as typeof section).items.push('');
                      setContent({ sections: newSections });
                    }}
                    className='p-2 bg-green-500 text-white rounded'
                  >
                    Añadir elemento
                  </button>
                </div>
              )}
              {section.type === 'quote' && (
                <div>
                  <label className='block text-gray-700'>Cita</label>
                  <textarea
                    value={section.content}
                    onChange={(e) => {
                      const newSections = [...content.sections];
                      (newSections[index] as typeof section).content = e.target.value;
                      setContent({ sections: newSections });
                    }}
                    className='w-full p-2 border rounded'
                  />
                </div>
              )}
            </div>
          ))}
        </div>
        <button type='submit' className='p-2 bg-green-500 text-white rounded'>
          Crear Post
        </button>
      </form>
    </div>
  );
}
