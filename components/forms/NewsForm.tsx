'use client';

import { useState } from 'react';
import { Loader } from 'lucide-react';
import { generateNewsContent } from '@/actions/ia-actions';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

interface NewsFormProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onSuccess: () => Promise<void>;
}

export default function NewsForm({ isOpen, setIsOpen, onSuccess }: NewsFormProps) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      await generateNewsContent(input);
      setInput('');
      await onSuccess();
      setIsOpen(false);
    } catch (error) {
      console.error('Error creating news:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className='w-full mb-6'>+ Crear Noticia</Button>
      </DialogTrigger>
      <DialogContent className='w-10/12 sm:max-w-[500px]'>
        <DialogHeader>
          <DialogTitle>Crear Noticia</DialogTitle>
          <DialogDescription>
            Ingresa el contenido para generar una nueva noticia
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='space-y-4'>
            <Textarea
              id='newsInput'
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder='Escribe aquí la noticia que quieres generar...'
              disabled={loading}
              required
            />
          </div>

          <Button type='submit' className='w-full' disabled={loading}>
            {loading ? (
              <Loader className='animate-spin h-4 w-4' />
            ) : (
              'Generar Noticia'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
} 