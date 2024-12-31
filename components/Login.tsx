import { signIn, signOut } from '@/auth';
import { LogIn, LogOut } from 'lucide-react';

export function SignIn() {
  return (
    <form
      action={async () => {
        'use server';
        await signIn('google');
      }}
    >
      <button type='submit'>
        <LogIn />
      </button>
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
      <button type='submit'>
        <LogOut />
      </button>
    </form>
  );
}
