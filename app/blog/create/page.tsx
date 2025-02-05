import { generateNewsContent } from '@/actions/ia-actions';
import { auth } from '@/auth';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { redirect } from 'next/navigation';

export default async function CreateNewsPage() {
  const session = await auth();
  const isAdmin = session?.user.role === 'admin';

  // Si el usuario no es admin, redirigirlo a la página principal
  if (!isAdmin) {
    redirect('/');
    return null;
  }
  async function handleSubmit(formData: FormData) {
    'use server';

    const input = formData.get('input') as string;

    try {
      await generateNewsContent(input);
      redirect('/blog');
    } catch (error) {
      console.error('Error creating news:', error);
      throw error;
    }
  }

  return (
    <div className='max-w-2xl mx-auto p-4'>
      <h1 className='text-3xl font-bold font-mono mb-12'>Crear Noticia</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12'>
        <form action={handleSubmit} className='space-y-8'>
          <div className='space-y-8'>
            <label htmlFor='newsInput' className='block text-sm font-medium mb-4'>
              Ingresa el contenido de la noticia:
            </label>
            <Textarea
              id='newsInput'
              name='input'
              placeholder='Escribe aquí la noticia que quieres generar...'
              required
            />
          </div>
          <Button type='submit'>Generar Noticia</Button>
        </form>
      </div>
    </div>
  );
}
