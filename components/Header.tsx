import Image from 'next/image';
import { auth } from '@/auth';
import { SignIn, SignOut } from './Login';
import Link from 'next/link';
import RulesModal from './RulesModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu } from 'lucide-react';

export default async function Header() {
  const session = await auth();
  return (
    <header className='border-b border-border'>
      <div className='container mx-auto px-6 py-4 flex justify-between '>
        <Link className='flex items-center gap-4' href='/'>
          <Image
            className='dark:invert'
            src='/tennis.svg'
            alt='ADP ATP Logo'
            width={15}
            height={15}
            priority
          />
          <h1 className='text-xl font-semibold font-sans'>ADP ATP</h1>
        </Link>

        <RulesModal />
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Menu />
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>
              <Link href='/'> Inicio</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/matches'> Partidos</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href='/blog'> Noticias</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            {!session ? (
              <DropdownMenuItem>
                <SignIn />
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem>
                <SignOut />
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
