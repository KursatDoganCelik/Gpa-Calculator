import prisma from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    const noteType = await prisma.user.findFirst({
      where: {
        email: email as string,
      },
      select: {
        noteType: true,
      },
    });

    return Response.json({ noteType: noteType?.noteType }, { status: 200 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Note tipi çekilirken bir hata oluştu.' }, { status: 500 });
  }
}
