import { Semester } from '@/config/types';
import prisma from './db';
import { NextResponse } from 'next/server';

export default async function getUserCourses(email: string) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı.');
    }

    const userCourses = await prisma.courses.findMany({
      where: {
        userId: user.id,
      },
      select: {
        semesterYear: true,
        courseName: true,
        courseNote: true,
        courseCredit: true,
      },
    });

    if (!userCourses) {
      throw new Error('Ders bulunamadı.');
    }

    // convert database data to client data
    const maxSemesterYear = Math.max(...userCourses.map((course) => course.semesterYear));
    const clientSemesters: Semester[] = Array.from({ length: maxSemesterYear }, () => ({ courses: [] }));

    clientSemesters.map((_, semesterYearIndex) => {
      userCourses.map((course) => {
        if (course.semesterYear === semesterYearIndex + 1) {
          clientSemesters[semesterYearIndex].courses.push({
            name: course.courseName,
            note: course.courseNote.toString(),
            credit: course.courseCredit.toString(),
          });
        }
      });
    });

    return clientSemesters;
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Dersler eklenirken bir hata oluştu.' }, { status: 500 });
  }
}
