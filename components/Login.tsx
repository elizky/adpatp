import { signIn, signOut } from '@/auth';
import { LogIn, LogOut } from 'lucide-react';
import { Button } from './ui/button';

export function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <Button className='px-0' size='sm' variant='ghost' type='submit'>
        <LogIn /> Log In
      </Button>
    </form>
  );
}

export function SignOut() {
  return (
    <form
      action={async () => {
        'use server';
        await signOut();
      }}
    >
      <Button className='px-0' size='sm' variant='ghost' type='submit'>
        <LogOut /> Log Out
      </Button>
    </form>
  );
}
