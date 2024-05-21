import { Semester, UserCourses } from '@/config/types';
import prisma from '@/lib/db';

export async function POST(request: Request) {
  try {
    const res = await request.json();
    const { email, semesters, noteType } = res;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      throw new Error('Kullanıcı bulunamadı.');
    }

    await prisma.user.update({
      where: {
        email,
      },
      data: {
        noteType,
      },
    });

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
    return Response.json('Dersler başarıyla güncellendi', { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json('Dersler eklenirken bir hata oluştu', { status: 500 });
  }
}
