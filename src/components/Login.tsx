import Link from 'next/link';
import type { LoginProps } from '@/config/types';

export default function Login({ className, user, type }: LoginProps) {
  return (
    <>
      {type === 'signout' ? (
        <Link href={`/api/auth/${type}`} className={className}>
          Çıkış Yap ({user?.name?.split(' ')[0]})
        </Link>
      ) : (
        <Link href={`/api/auth/${type}`} className={className}>
          Giriş Yap
        </Link>
      )}
    </>
  );
}
