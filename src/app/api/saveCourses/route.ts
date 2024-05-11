import { Semester, UserCourses } from '@/config/types';
import prisma from '@/lib/db';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    const { email, semesters } = res;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı.');
    }

    const userCourses: UserCourses[] = [];

    semesters.map((semester: Semester, semesterIndex: number) => {
      semester.courses.map((course) => {
        userCourses.push({
          semesterYear: semesterIndex + 1,
          courseName: course.name,
          courseNote: +course.note,
          courseCredit: +course.credit,
          userId: user?.id,
        });
      });
    });

    await prisma.courses.deleteMany({
      where: {
        userId: user?.id,
      },
    });
    await prisma.courses.createMany({
      data: userCourses,
    });
    return NextResponse.json({ message: 'Dersler başarıyla eklendi.' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Dersler eklenirken bir hata oluştu.' }, { status: 500 });
  }
}
