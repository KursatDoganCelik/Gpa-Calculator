import Link from 'next/link';
import type { LoginProps } from '@/config/types';
import { signIn, signOut } from 'next-auth/react';

export default function Login({ className, user, type }: LoginProps) {
  return (
    <>
      {type === 'signout' ? (
        <Link onClick={() => signOut({ callbackUrl: '/' })} className={className} href={`/api/auth/${type}`}>
          Çıkış Yap ({user?.name?.split(' ')[0]})
        </Link>
      ) : (
        <Link onClick={() => signIn(undefined, { callbackUrl: '/' })} className={className} href={`/api/auth/${type}`}>
          Giriş Yap
        </Link>
      )}
    </>
  );
}
