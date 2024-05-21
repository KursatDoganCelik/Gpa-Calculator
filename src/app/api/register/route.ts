import prisma from '@/lib/db';
import { hash } from 'bcrypt';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password, name } = body;

  if (!email || !password || !name) {
    return new Response('Missing fields', { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (user) {
    return new Response('User already exists', { status: 400 });
  }

  const hashedPassword = await hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
      noteType: 'Aa',
    },
  });

  return Response.json(newUser);
}
