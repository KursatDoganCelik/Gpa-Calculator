import Home from '@/containers/Home';
import { getServerSession } from 'next-auth/next';
import { options } from './api/auth/[...nextauth]/options';
import getUserCourses from '@/lib/getUserCourses';

export default async function Page() {
  const session = await getServerSession(options);
  let userCourses: any = null;

  // If the user is logged in, get their courses and check if they have any
  session && session.user && (userCourses = await getUserCourses(session.user?.email!));
  !userCourses?.length && (userCourses = [{ courses: [{ name: '', note: '', credit: '' }] }]);

  return <Home userCourses={userCourses} />;
}
