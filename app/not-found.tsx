import { Button } from '@/components/ui/button';
import Link from 'next/link';
import React from 'react';

const Page = () => {
  return (
    <div className='container m-auto p-4 '>
      <div className='flex flex-col gap-12 my-24 text-center'>
        <h4 className='font-mono uppercase font-bold text-4xl'>404</h4>
        <p className=' italic'>El famoso error 404 es porque estas queriendo entrar a una pagina que no existe pillo</p>
        <Button variant='secondary'>
          <Link href='/'>Volver a Inicio</Link>
        </Button>
      </div>
    </div>
  );
};

export default Page;
