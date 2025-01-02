import Image from 'next/image';

export default function Loading() {
  return (
    <div className='mt-80 justify-items-center'>
      <Image
        className='dark:invert animate-spin'
        src='/tennis.svg'
        alt='ADP ATP Logo'
        width={45}
        height={45}
        priority
      />
    </div>
  );
}
