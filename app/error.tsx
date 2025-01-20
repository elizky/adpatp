'use client';

import { useEffect } from 'react';

export default function Error({ error }: { error: Error }) {
  useEffect(() => {}, [error]);

  return (
    <div className='container m-auto p-4 '>
      <div className='flex flex-col gap-4 my-4 text-center'>
        <h4>Oops!</h4>
        <p>Algo salió mal. Refresca la página</p>
        <p className='font-mono'>{error.message}</p>
      </div>
    </div>
  );
}
