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
      <Button size='icon' variant='ghost' type='submit'>
        <LogIn />
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
      <Button  size='icon'variant='ghost' type='submit'>
        <LogOut />
      </Button>
    </form>
  );
}
