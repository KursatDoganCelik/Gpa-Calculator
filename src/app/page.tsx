import Home from '@/containers/Home';
import prisma from '@/lib/db';

// const dummyData = [
//   {
//     semesterYear: 1,
//     courseName: 'Abc',
//     courseNote: 3.5,
//     courseCredit: 1,
//   },
//   {
//     semesterYear: 2,
//     courseName: 'Computer Science',
//     courseNote: 1.5,
//     courseCredit: 5,
//   },
//   {
//     semesterYear: 2,
//     courseName: 'Science',
//     courseNote: 3.5,
//     courseCredit: 2,
//   },
//   {
//     semesterYear: 3,
//     courseName: 'Qweasd',
//     courseNote: 3,
//     courseCredit: 4,
//   },
// ];

export default async function Page() {
  return <Home />;
}
