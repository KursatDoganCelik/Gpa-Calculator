import Link from 'next/link';
import type { LoginProps } from '@/config/types';
import { signIn, signOut } from 'next-auth/react';

export default function Login({ className, user, type }: LoginProps) {
  return (
    <>
      {type === 'signout' ? (
        <button onClick={() => signOut()} className={className}>
          Çıkış Yap ({user?.name?.split(' ')[0]})
        </button>
      ) : (
        <button onClick={() => signIn(undefined, { callbackUrl: '/' })} className={className}>
          Giriş Yap
        </button>
      )}
    </>
  );
}
